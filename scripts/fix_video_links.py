#!/usr/bin/env python3
"""
fix_video_links.py  -  give every playlist lecture its REAL YouTube video id.

Reads from public/data/syllabus.json and updates VIDEO_ID_ALIASES in src/data/syllabusData.ts.
"""
import argparse, difflib, json, os, re, shutil, subprocess, sys

PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"
DATA_MARK = "const SYLLABUS_DATA: Unit[] = "
ALIAS_RE = re.compile(r"(export\s+)?const VIDEO_ID_ALIASES: Record<string, string> = (\{.*?\});", re.S)
DEFAULT_TARGET = os.path.join(os.path.dirname(__file__), "..", "public", "data", "syllabus.json")
ALIASES_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "syllabusData.ts")


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
    ap.add_argument("target", nargs="?", default=DEFAULT_TARGET, help="path to syllabus.json")
    ap.add_argument("--list", help="text file with lines:  index | id | title")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    target_path = a.target
    if not os.path.exists(target_path):
        sys.exit(f"Target file not found: {target_path}")

    is_json = target_path.endswith(".json")
    if is_json:
        with open(target_path, encoding="utf-8") as f:
            data = json.load(f)
        aliases_text = open(ALIASES_FILE, encoding="utf-8").read() if os.path.exists(ALIASES_FILE) else ""
        am = ALIAS_RE.search(aliases_text)
        aliases = json.loads(am.group(2)) if am else {}
        export_prefix = am.group(1) or "" if am else ""
    else:
        text = open(target_path, encoding="utf-8").read()
        start = text.index(DATA_MARK) + len(DATA_MARK)
        data, end = json.JSONDecoder().raw_decode(text, start)
        am = ALIAS_RE.search(text)
        aliases = json.loads(am.group(2)) if am else {}
        export_prefix = am.group(1) or "" if am else ""

    replaced = fixed_pos = unknown = 0
    warnings = []

    rows = load_playlist(a.list)
    by_id = {vid: pos for pos, (vid, _) in rows.items()}

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
                    real_pos = by_id[real]
                    if v.get("playlistIndex") != real_pos:
                        v["playlistIndex"] = real_pos
                        fixed_pos += 1
                else:
                    unknown += 1
                    warnings.append(f"{unit['id']} {real}: not in this playlist (other source?) '{v['title']}'")
        for p in unit["problems"]:
            p["videoIds"] = [renames.get(x, x) for x in p.get("videoIds", [])]

    print(f"real ids filled in : {replaced}\nplaylist positions fixed: {fixed_pos}\nnot in playlist     : {unknown}")
    for w in warnings: print("  -", w)
    if a.dry_run:
        print("\n(dry run - nothing written)"); return

    shutil.copy(target_path, target_path + ".bak")
    if is_json:
        with open(target_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
        if am and os.path.exists(ALIASES_FILE):
            alias_src = f"{export_prefix}const VIDEO_ID_ALIASES: Record<string, string> = " + json.dumps(aliases, indent=2) + ";"
            new_aliases_text = ALIAS_RE.sub(lambda _m: alias_src, aliases_text, count=1)
            with open(ALIASES_FILE, "w", encoding="utf-8") as f:
                f.write(new_aliases_text)
    else:
        new_data = json.dumps(data, indent=2, ensure_ascii=False)
        new_text = text[:start] + new_data + text[end:]
        alias_src = f"{export_prefix}const VIDEO_ID_ALIASES: Record<string, string> = " + json.dumps(aliases, indent=2) + ";"
        if am:
            new_text = ALIAS_RE.sub(lambda _m: alias_src, new_text, count=1)
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(new_text)

    print(f"\nWritten. Backup: {target_path}.bak")


if __name__ == "__main__":
    main()
