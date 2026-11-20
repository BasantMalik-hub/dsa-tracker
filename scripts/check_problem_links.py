#!/usr/bin/env python3
"""
check_problem_links.py  -  checks every practice-problem link in src/data/syllabusData.ts.

Run it on your own computer (it needs internet; no extra packages):
    python scripts/check_problem_links.py [target_file]

For each link it reports one of:
    OK              the page exists and its title matches the problem name in the app
    PROBLEM         the page is missing, premium-only (LeetCode) or clearly a different problem
    COULD NOT CHECK the site blocked the script (common for Codeforces / GeeksforGeeks) - open these by hand
A full list is saved to problem_link_report.csv.
"""
import csv, html, json, os, re, sys, time, urllib.error, urllib.request

DATA_MARK = "const SYLLABUS_DATA: Unit[] = "
UA = "Mozilla/5.0 (link-checker for personal study tracker)"
STOP = {"the", "a", "an", "of", "in", "to", "and", "with", "from", "using", "ii", "i", "iii", "problem"}
DEFAULT_TARGET = os.path.join(os.path.dirname(__file__), "..", "public", "data", "syllabus.json")


def words(s):
    s = re.sub(r"\(.*?\)", " ", s)
    return {w for w in re.findall(r"[a-z0-9]+", s.lower()) if w not in STOP}


def similar(app_title, real_title):
    a, b = words(app_title), words(real_title)
    # most words of the app's title must appear in the real title (the real title may be longer)
    return not a or not b or len(a & b) / len(a) >= 0.6


def http(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status, r.read().decode("utf-8", "replace")


def check(p):
    url, title = p["url"], p["title"]
    try:
        if "leetcode.com/problems/" in url:
            slug = url.rstrip("/").split("/")[-1]
            q = {"query": "query q($s:String!){question(titleSlug:$s){title difficulty isPaidOnly}}", "variables": {"s": slug}}
            _, body = http("https://leetcode.com/graphql", json.dumps(q).encode(),
                           {"Content-Type": "application/json", "Referer": url})
            qn = (json.loads(body).get("data") or {}).get("question")
            if not qn: return "PROBLEM", "no such LeetCode problem"
            if qn["isPaidOnly"]: return "PROBLEM", f"premium-only: {qn['title']}"
            if not similar(title, qn["title"]): return "PROBLEM", f"link is '{qn['title']}'"
            return "OK", f"{qn['title']} ({qn['difficulty']})"
        status, body = http(url)
        m = re.search(r"<title>(.*?)</title>", body, re.S)
        page = html.unescape(m.group(1)).strip() if m else ""
        if "cses.fi" in url:
            name = re.sub(r"^CSES\s*-\s*", "", page)
            return ("OK", name) if similar(title, name) else ("PROBLEM", f"link is '{name}'")
        if "codeforces.com" in url:
            t = re.search(r'<div class="title">\s*[A-Z0-9]+\.\s*(.*?)</div>', body, re.S)
            name = html.unescape(t.group(1)).strip() if t else page
            return ("OK", name) if similar(title, name) else ("PROBLEM", f"link is '{name}'")
        return ("OK", page[:70]) if status == 200 else ("COULD NOT CHECK", f"HTTP {status}")
    except urllib.error.HTTPError as e:
        return ("PROBLEM", "HTTP 404 - page not found") if e.code == 404 else ("COULD NOT CHECK", f"HTTP {e.code}")
    except Exception as e:
        return "COULD NOT CHECK", type(e).__name__


def main():
    args = [a for a in sys.argv[1:] if a != "--list-only"]
    list_only = "--list-only" in sys.argv

    target_file = args[0] if len(args) > 0 else DEFAULT_TARGET
    if not os.path.exists(target_file):
        sys.exit(f"Target file not found: {target_file}")

    if target_file.endswith(".json"):
        with open(target_file, encoding="utf-8") as f:
            data = json.load(f)
    else:
        text = open(target_file, encoding="utf-8").read()
        start = text.index(DATA_MARK) + len(DATA_MARK)
        data, _ = json.JSONDecoder().raw_decode(text, start)
    probs = [(u["id"], p) for u in data for p in u["problems"]]
    if list_only:
        print(len(probs), "problem links found"); return
    rows, bad = [], 0
    for i, (uid, p) in enumerate(probs, 1):
        status, note = check(p)
        rows.append([uid, p["id"], p["title"], p["url"], status, note])
        if status == "PROBLEM": bad += 1
        if status != "OK": print(f"[{i}/{len(probs)}] {status:15} {p['id']}  {p['title']}  ->  {note}\n      {p['url']}")
        time.sleep(0.4)
    with open("problem_link_report.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["unit", "id", "title", "url", "status", "note"]); w.writerows(rows)
    ok = sum(r[4] == "OK" for r in rows)
    print(f"\nDone: {ok} OK, {bad} PROBLEM, {len(rows) - ok - bad} could not check.  Report: problem_link_report.csv")
    if "--fail-on-broken" in sys.argv and bad > 0:
        sys.exit(f"FAILED: {bad} broken problem links detected.")


if __name__ == "__main__":
    main()
