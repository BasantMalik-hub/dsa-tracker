#!/usr/bin/env python3
"""
fix_video_links.py  -  give every playlist lecture its REAL YouTube video id.

What it does to c_dsa_master_tracker.tsx:
  * lectures stored as "playlist position only" (id ACnnn) get their real id + normal watch URL
  * lectures that already have a real id are checked: if the id sits at a different playlist
    position than the file says, the position is corrected (and a warning is printed)
  * saved progress / notes are kept: old -> new ids are written to VIDEO_ID_ALIASES, which the
    app uses to migrate localStorage automatically
  * a backup  <file>.bak  is written first

Get the playlist list (pick ONE way):
  A) automatic (needs yt-dlp installed):     python fix_video_links.py c_dsa_master_tracker.tsx
  B) from a text file you made yourself:
       yt-dlp --flat-playlist --print "%(playlist_index)s | %(id)s | %(title)s" "<playlist url>" > playlist.txt
       python fix_video_links.py c_dsa_master_tracker.tsx --list playlist.txt

Add --dry-run to only print what would change.
"""
import argparse, difflib, json, re, shutil, subprocess, sys

PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"
DATA_MARK = "const SYLLABUS_DATA: Unit[] = "
ALIAS_RE = re.compile(r"const VIDEO_ID_ALIASES: Record<string, string> = (\{.*?\});", re.S)


def load_playlist(list_path):
    """returns {position(1-based): (video_id, title)}"""
    rows = {}
    if list_path:
        for line in open(list_path, encoding="utf-8"):
            parts = [p.strip() for p in line.rstrip("\n").split(" | ", 2)]
            if len(parts) == 3 and parts[0].isdigit() and re.fullmatch(r"[\w-]{11}", parts[1]):
                rows[int(parts[0])] = (parts[1], parts[2])
    else:
        out = subprocess.run(["yt-dlp", "--flat-playlist", "--dump-single-json", PLAYLIST_URL],
                             capture_output=True, text=True, check=True).stdout
        for i, e in enumerate([e for e in json.loads(out)["entries"] if e], start=1):
            rows[i] = (e["id"], e.get("title", ""))
    if len(rows) < 100:
        sys.exit(f"Only {len(rows)} playlist rows were read - expected about 144. Check the list/format.")
    return rows


def sim(a, b):
    n = lambda s: re.sub(r"[^a-z0-9 ]", " ", s.lower())
    return difflib.SequenceMatcher(None, n(a).split(), n(b).split()).ratio()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tsx")
    ap.add_argument("--list", help="text file with lines:  index | id | title")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    rows = load_playlist(a.list)
    by_id = {vid: pos for pos, (vid, _) in rows.items()}
    text = open(a.tsx, encoding="utf-8").read()

    start = text.index(DATA_MARK) + len(DATA_MARK)
    data, end = json.JSONDecoder().raw_decode(text, start)
    # the file was generated with json.dumps(indent=2); make sure we can write it back identically
    assert text[start:end] == json.dumps(data, indent=2, ensure_ascii=False), \
        "Unexpected formatting in the data block - was the file edited by hand?"

    am = ALIAS_RE.search(text)
    aliases = json.loads(am.group(1)) if am else {}
    replaced = fixed_pos = unknown = 0
    warnings = []

    for unit in data:
        renames = {}
        for v in unit["videos"]:
            if v.get("playlistOnly"):
                pos = v["playlistIndex"]
                if pos not in rows:
                    warnings.append(f"{unit['id']} #{pos}: not in the playlist list"); continue
                real, ptitle = rows[pos]
                if sim(v["title"], ptitle) < 0.25:
                    warnings.append(f"CHECK {unit['id']} #{pos}: '{v['title']}'  vs playlist '{ptitle}'")
                renames[v["id"]] = real
                aliases[v["id"]] = real
                v["id"] = real
                v["url"] = f"https://www.youtube.com/watch?v={real}"
                v.pop("playlistOnly", None)
                replaced += 1
            else:
                real = v["id"]
                if real in by_id:
                    if v.get("playlistIndex") != by_id[real]:
                        warnings.append(f"{unit['id']} {real}: playlist position {v.get('playlistIndex')} -> {by_id[real]} ('{v['title']}')")
                        v["playlistIndex"] = by_id[real]; fixed_pos += 1
                    if sim(v["title"], rows[by_id[real]][1]) < 0.25:
                        warnings.append(f"CHECK {unit['id']} {real}: '{v['title']}'  vs playlist '{rows[by_id[real]][1]}'")
                else:
                    unknown += 1
                    warnings.append(f"{unit['id']} {real}: not in this playlist (other source?) '{v['title']}'")
        for p in unit["problems"]:
            p["videoIds"] = [renames.get(x, x) for x in p.get("videoIds", [])]

    new_data = json.dumps(data, indent=2, ensure_ascii=False)
    new_text = text[:start] + new_data + text[end:]
    alias_src = "const VIDEO_ID_ALIASES: Record<string, string> = " + json.dumps(aliases, indent=2) + ";"
    if am:
        new_text = ALIAS_RE.sub(lambda _m: alias_src, new_text, count=1)
    else:
        sys.exit("VIDEO_ID_ALIASES not found - use the latest c_dsa_master_tracker.tsx")

    print(f"real ids filled in : {replaced}\nplaylist positions fixed: {fixed_pos}\nnot in playlist     : {unknown}")
    for w in warnings: print("  -", w)
    if a.dry_run:
        print("\n(dry run - nothing written)"); return
    shutil.copy(a.tsx, a.tsx + ".bak")
    open(a.tsx, "w", encoding="utf-8").write(new_text)
    print(f"\nWritten. Backup: {a.tsx}.bak")


if __name__ == "__main__":
    main()
