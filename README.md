# C++ & DSA Master Tracker

A comprehensive 23-unit dynamic tracker (21 Core Units + 2 Phase-4 Extension Units) for mastering C++ and Data Structures & Algorithms, fully aligned with the complete 144-lecture Apna College C++ DSA course.

## Features
- **23 Curriculum Units (4 Phases)**: From C++ fundamentals, OOP, and STL to advanced Graphs, Trees, Tries, Dynamic Programming, and Knapsack.
- **144 Apna College Video Lectures**: Full playlist mapping with lecture runtime, playlist positions, and in-app YouTube player.
- **290+ Curated Problems**: Follow-up practice on LeetCode, Codeforces, CSES, GFG, and SPOJ directly linked to corresponding lectures.
- **Dynamic Scheduling**: Supports 60-day, 90-day, and 120-day pace targets calculated proportionally.
- **Export & Import**: Save your progress as JSON and restore it at any time.
- **Dark Modern UI**: Built with React, Tailwind CSS, and Lucide icons.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build
```bash
npm run build
```

## Maintenance & Verification Tools

The project includes built-in Python tools for verifying problem links and updating YouTube video IDs:

### Check Problem Links
Checks practice problem links across LeetCode, Codeforces, CSES, and GeeksforGeeks:
```bash
# Count problem links
npm run check:links:list

# Run verification and generate problem_link_report.csv
npm run check:links
```

### Video ID Resolver & Migration
Updates playlist position lectures (`ACnnn`) to real YouTube video IDs while preserving user ticks and notes via `VIDEO_ID_ALIASES`:
```bash
# View usage options
python fix_video_links.py --help

# Automatic resolution using yt-dlp
npm run fix:videos

# Or using an exported playlist.txt
python fix_video_links.py c_dsa_master_tracker.tsx --list playlist.txt
```
