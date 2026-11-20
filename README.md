# C++ & DSA Master Tracker

Live site: [https://basantmalik-hub.github.io/dsa-tracker/](https://basantmalik-hub.github.io/dsa-tracker/)

A comprehensive 23-unit dynamic tracker (21 Core Units + 2 Phase-4 Extension Units) for mastering C++ and Data Structures & Algorithms, fully aligned with the complete Apna College C++ DSA course.

## Features
- **23 Curriculum Units (4 Phases)**: From C++ fundamentals, OOP, and STL to advanced Graphs, Trees, Tries, Dynamic Programming, and Knapsack.
- **127 Granular Subtopics**: 100% syllabus coverage across three university syllabi (25CS101, 25CS201, 25CS303), mapped 1-to-1 as tickable items (see [SYLLABUS_COVERAGE.md](file:///c:/Users/chaud/Downloads/dsa-tracker/SYLLABUS_COVERAGE.md)).
- **152 Apna College Video Lectures**: Full playlist mapping with lecture runtime, playlist positions, and in-app YouTube player.
- **299 Curated Practice Problems**: Follow-up practice on LeetCode, Codeforces, CSES, GFG, and SPOJ directly linked to corresponding lectures.
- **Dynamic Scheduling**: Supports 60-day, 90-day, and 120-day pace targets calculated proportionally.
- **Export, Import & File Upload**: Save your progress as JSON, copy to clipboard, or upload a backup file at any time with automatic schema migrations.
- **Responsive Dark UI**: Built with React 18, Tailwind CSS v4, and Lucide icons.
- **Modular Architecture**: Cleanly separated into custom hooks, typed datasets, and atomic UI components.

## Project Structure

```
dsa-tracker/
├── index.html                     # HTML shell and entry point
├── vite.config.ts                 # Vite bundler configuration
├── tsconfig.json                  # TypeScript compiler settings
├── eslint.config.js               # ESLint 9 configuration with TS and React Hooks
├── .prettierrc                    # Prettier formatting rules
├── package.json                   # Dependencies & npm scripts
├── public/
│   └── data/
│       └── syllabus.json          # Decoupled static curriculum dataset (127 subtopics, 23 units)
├── scripts/                       # Maintenance & dataset verification scripts
│   ├── check_problem_links.py     # Verifies problem URLs (reads public/data/syllabus.json)
│   ├── fix_video_links.py         # Resolves & migrates YouTube video IDs
│   └── apply_syllabus_patch.py    # Applies syllabus coverage patches
└── src/
    ├── main.tsx                   # React root mount & ErrorBoundary wrapper
    ├── index.css                  # Tailwind styles and custom dark scrollbar
    ├── App.tsx                    # Lean root shell composing layout & tabs
    ├── types/                     # Shared TypeScript interfaces & types
    ├── data/                      # Course metadata and alias definitions (syllabusData.ts)
    ├── utils/                     # Storage persistence, date math, schedule generator
    ├── hooks/                     # Custom hooks (syllabus fetcher, state, schedule, stats)
    └── components/                # Reusable modular UI components (<200 lines each)
        ├── common/                # ErrorBoundary, Toast, Icons
        ├── layout/                # Header, KpiOverview, MobileNav
        ├── daily/                 # DailyPlanTab, TodayHeroCard, DayStrip, WeeklyAccordion
        ├── syllabus/              # SyllabusTab, SyllabusFilters, SyllabusUnitCard
        ├── practice/              # PracticeNotesTab, ProblemRow, AddProblemForm
        └── modals/                # VideoModal, BackupModal
```

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
Open [http://localhost:5173/dsa-tracker/](http://localhost:5173/dsa-tracker/) in your browser.

### Quality, Linting & Build
```bash
# Typecheck
npm run typecheck

# Lint with ESLint
npm run lint

# Format with Prettier
npm run format

# Production build
npm run build
```

## Maintenance & Verification Tools

The project includes Python maintenance tools inside `scripts/`:

### Check Problem Links
Checks practice problem links across LeetCode, Codeforces, CSES, and GeeksforGeeks:
```bash
# Count problem links
npm run check:links:list

# Run verification and generate problem_link_report.csv
npm run check:links
```

### Syllabus Coverage & Subtopic Migration
Applies granular syllabus coverage expansions while seamlessly migrating user progress via schema versioning:
```bash
# Dry run check
python scripts/apply_syllabus_patch.py --dry-run

# Apply syllabus patch
npm run patch:syllabus
```
See [SYLLABUS_COVERAGE.md](file:///c:/Users/chaud/Downloads/dsa-tracker/SYLLABUS_COVERAGE.md) for the 1-to-1 mapping table across all 127 topics.
