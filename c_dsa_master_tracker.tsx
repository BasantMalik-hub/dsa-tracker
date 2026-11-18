// @ts-nocheck  (UI is loosely typed; the data below has real types)
'use client';
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  Calendar,
  Flame,
  BookOpen,
  Award,
  Download,
  Upload,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Code2,
  FileText,
  Check,
  Plus,
  Trash2,
  Search,
  Filter,
  Clock,
  Target,
  X,
  Sparkles,
  Layers,
  ListChecks,
  Copy
} from 'lucide-react';

const Youtube = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


// ==========================================
// DATA: all units, lectures and problems
// ==========================================
const PLAYLIST_ID = 'PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';
const PLAYLIST_NAME = 'Apna College - Complete C++ DSA Course';
const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';

// When a playlist-only lecture (id ACnnn) is later replaced by its real YouTube id,
// the old -> new pair is recorded here so saved progress and notes are carried over.
const VIDEO_ID_ALIASES: Record<string, string> = {};

interface Video {
  id: string; // YouTube video id, or ACnnn for playlist-only lectures (opened by playlist position)
  title: string;
  url: string;
  type: string;
  playlistIndex?: number; // 1-based position in the Apna College playlist
  playlistOnly?: boolean; // true when we only know the playlist position, not the video id
  minutes?: number; // approximate runtime
}

interface Problem {
  id: string;
  title: string;
  url: string;
  platform: string;
  difficulty: string;
  videoIds?: string[]; // lecture video(s) this problem follows up on
  isCustom?: boolean;
}

interface Unit {
  id: string;
  phase: 1 | 2 | 3 | 4;
  phaseName: string;
  courseCode: string;
  unitTitle: string;
  hours: number;
  subtopics: string[];
  videos: Video[];
  problems: Problem[];
}

// ==========================================
// COMPLETE SYLLABUS DATASET (21 core units + 2 Phase-4 extension units)
// Every lecture of the playlist (144) is attached to a unit, with follow-up problems.
// ==========================================
const SYLLABUS_DATA: Unit[] = [
  {
    "id": "P1-U1",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 1: System Basics, Flowcharts & First C++ Program",
    "hours": 8,
    "subtopics": [
      "Computer System Architecture: Memory, Processor, I/O Devices & OS Role",
      "Language Translators: Assembler, Compiler, Interpreter, Loader & Linker",
      "Algorithm Representation: Flowcharts, Pseudocode & Dry-Run Tracing",
      "C++ Program Structure: Headers, Namespaces, main(), std::cin / std::cout & Compilation Errors"
    ],
    "videos": [
      {
        "id": "VTLCoHnyACE",
        "title": "Lec 1: Flowchart & Pseudocode + Installation",
        "url": "https://www.youtube.com/watch?v=VTLCoHnyACE",
        "type": "Playlist",
        "playlistIndex": 1,
        "minutes": 86
      },
      {
        "id": "AC028",
        "title": "How to Set Up a C++ Compiler on Mac",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=28",
        "type": "Playlist",
        "playlistIndex": 28,
        "minutes": 2,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P1-U1-PR1",
        "title": "Sum of Two Numbers & Basic C++ I/O",
        "url": "https://www.codechef.com/practice/cpp",
        "platform": "CodeChef",
        "difficulty": "Easy",
        "videoIds": [
          "VTLCoHnyACE"
        ]
      },
      {
        "id": "P1-U1-PR2",
        "title": "Flowchart & Pseudocode Logic Tracing",
        "url": "https://www.geeksforgeeks.org/an-introduction-to-flowcharts/",
        "platform": "GFG",
        "difficulty": "Easy",
        "videoIds": [
          "VTLCoHnyACE"
        ]
      },
      {
        "id": "P1-U1-PR3",
        "title": "Watermelon (Basic I/O & Conditions)",
        "url": "https://codeforces.com/problemset/problem/4/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "VTLCoHnyACE"
        ]
      },
      {
        "id": "P1-U1-PR4",
        "title": "Weird Algorithm (Loop + Simple Math)",
        "url": "https://cses.fi/problemset/task/1068",
        "platform": "CSES",
        "difficulty": "Easy",
        "videoIds": [
          "VTLCoHnyACE"
        ]
      },
      {
        "id": "P1-U1-PR5",
        "title": "Add Two Integers (Basic Functions & I/O)",
        "url": "https://leetcode.com/problems/add-two-integers/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "VTLCoHnyACE"
        ]
      },
      {
        "id": "P1-U1-PR6",
        "title": "Number of Steps to Reduce a Number to Zero (Dry-Run Tracing)",
        "url": "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "VTLCoHnyACE"
        ]
      }
    ]
  },
  {
    "id": "P1-U2A",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 2A: Tokens, Data Types & Operators",
    "hours": 6,
    "subtopics": [
      "C++ Tokens: Keywords, Identifiers, Constants, Variable Scope & Lifetime",
      "Data Types & Modifiers: Primitive, Derived, User-Defined & Explicit/Implicit Typecasting",
      "Arithmetic, Relational, Logical & Ternary Conditional Operators",
      "Bitwise Operators (&, |, ^, ~, <<, >>), Operator Precedence & <cmath> Library"
    ],
    "videos": [
      {
        "id": "Dxu7GKtdbnA",
        "title": "Lec 2: Variables, Data Types & Operators",
        "url": "https://www.youtube.com/watch?v=Dxu7GKtdbnA",
        "type": "Playlist",
        "playlistIndex": 2,
        "minutes": 77
      },
      {
        "id": "AC006",
        "title": "Binary Number System",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=6",
        "type": "Playlist",
        "playlistIndex": 6,
        "minutes": 37,
        "playlistOnly": true
      },
      {
        "id": "r-u4uh3QvsQ",
        "title": "Lec 7: Bitwise Operators & Data Type Modifiers",
        "url": "https://www.youtube.com/watch?v=r-u4uh3QvsQ",
        "type": "Playlist",
        "playlistIndex": 7,
        "minutes": 39
      },
      {
        "id": "AC034",
        "title": "Maths for DSA: Euclid's Algorithm, Sieve & Modular Arithmetic",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=34",
        "type": "Playlist",
        "playlistIndex": 34,
        "minutes": 56,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P1-U2A-PR1",
        "title": "Single Number (Bitwise XOR Trick)",
        "url": "https://leetcode.com/problems/single-number/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "r-u4uh3QvsQ"
        ]
      },
      {
        "id": "P1-U2A-PR2",
        "title": "Number of 1 Bits (Hamming Weight)",
        "url": "https://leetcode.com/problems/number-of-1-bits/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "r-u4uh3QvsQ",
          "AC006"
        ]
      },
      {
        "id": "P1-U2A-PR3",
        "title": "Power of Two (Bitwise AND Trick)",
        "url": "https://leetcode.com/problems/power-of-two/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "r-u4uh3QvsQ"
        ]
      },
      {
        "id": "P1-U2A-PR4",
        "title": "Missing Number (XOR / Arithmetic Operators)",
        "url": "https://leetcode.com/problems/missing-number/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "r-u4uh3QvsQ"
        ]
      },
      {
        "id": "P1-U2A-PR5",
        "title": "Counting Bits (Bit Manipulation)",
        "url": "https://leetcode.com/problems/counting-bits/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "r-u4uh3QvsQ"
        ]
      },
      {
        "id": "P1-U2A-PR6",
        "title": "Hamming Distance (XOR & Bit Count)",
        "url": "https://leetcode.com/problems/hamming-distance/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "r-u4uh3QvsQ"
        ]
      },
      {
        "id": "P1-U2A-PR8",
        "title": "Soldier and Bananas (Arithmetic Operators)",
        "url": "https://codeforces.com/problemset/problem/546/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "Dxu7GKtdbnA"
        ]
      },
      {
        "id": "P1-U2A-PR9",
        "title": "Bit Strings (Powers & Modulo Arithmetic)",
        "url": "https://cses.fi/problemset/task/1617",
        "platform": "CSES",
        "difficulty": "Easy",
        "videoIds": [
          "Dxu7GKtdbnA"
        ]
      },
      {
        "id": "P1-U2A-PR10",
        "title": "Add Binary (Binary Arithmetic)",
        "url": "https://leetcode.com/problems/add-binary/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC006"
        ]
      },
      {
        "id": "P1-U2A-PR11",
        "title": "Complement of Base 10 Integer (Binary Representation)",
        "url": "https://leetcode.com/problems/complement-of-base-10-integer/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC006"
        ]
      },
      {
        "id": "P1-U2A-PR12",
        "title": "Find Greatest Common Divisor of Array (Euclid’s Algorithm)",
        "url": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC034"
        ]
      },
      {
        "id": "P1-U2A-PR7",
        "title": "Sum of Two Integers (Add Without + Operator)",
        "url": "https://leetcode.com/problems/sum-of-two-integers/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "r-u4uh3QvsQ"
        ]
      },
      {
        "id": "P1-U2A-PR13",
        "title": "Sieve of Eratosthenes",
        "url": "https://www.geeksforgeeks.org/sieve-of-eratosthenes/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "AC034"
        ]
      },
      {
        "id": "P1-U2A-PR14",
        "title": "Exponentiation (Modular Arithmetic)",
        "url": "https://cses.fi/problemset/task/1095",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC034"
        ]
      }
    ]
  },
  {
    "id": "P1-U2B",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 2B: Control Flow & Platform Input Handling",
    "hours": 6,
    "subtopics": [
      "Conditional Branching: if, if-else, nested if-else & else-if ladders",
      "Switch-Case Statements, Fall-through Behavior & Menu-Driven Logic",
      "Competitive Programming I/O: Handling single & multiple known test-case inputs"
    ],
    "videos": [
      {
        "id": "qR9U6bKxJ7g",
        "title": "Lec 3: Conditional Statements & Loops (Part 1)",
        "url": "https://www.youtube.com/watch?v=qR9U6bKxJ7g",
        "type": "Playlist",
        "playlistIndex": 3,
        "minutes": 95
      }
    ],
    "problems": [
      {
        "id": "P1-U2B-PR1",
        "title": "Fizz Buzz (Conditional Branching)",
        "url": "https://leetcode.com/problems/fizz-buzz/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U2B-PR2",
        "title": "Team (Conditional Branching)",
        "url": "https://codeforces.com/problemset/problem/231/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U2B-PR3",
        "title": "Next Round (If-Else Logic)",
        "url": "https://codeforces.com/problemset/problem/158/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U2B-PR4",
        "title": "Domino Piling (Simple Decision Logic)",
        "url": "https://codeforces.com/problemset/problem/50/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U2B-PR5",
        "title": "Robot Return to Origin (Switch-Case Style Moves)",
        "url": "https://leetcode.com/problems/robot-return-to-origin/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U2B-PR6",
        "title": "Day of the Week (Conditional Logic)",
        "url": "https://leetcode.com/problems/day-of-the-week/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      }
    ]
  },
  {
    "id": "P1-U3A",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 3A: Iteration, Loops & Pattern Building",
    "hours": 6,
    "subtopics": [
      "Iterative Loops: while, do-while, and for loops with multiple control variables",
      "Jump Statements: break & continue execution management",
      "Nested Loops & 2D Star/Number/Character Pattern Engineering",
      "EOF Input Handling: Reading unknown-count inputs across lines"
    ],
    "videos": [
      {
        "id": "qR9U6bKxJ7g",
        "title": "Lec 3: Conditional Statements & Loops",
        "url": "https://www.youtube.com/watch?v=qR9U6bKxJ7g",
        "type": "Playlist",
        "playlistIndex": 3,
        "minutes": 95
      },
      {
        "id": "rga_q2N7vU8",
        "title": "Lec 4: Patterns in C++ (Nested Loops)",
        "url": "https://www.youtube.com/watch?v=rga_q2N7vU8",
        "type": "Playlist",
        "playlistIndex": 4,
        "minutes": 91
      }
    ],
    "problems": [
      {
        "id": "P1-U3A-PR1",
        "title": "Palindrome Number",
        "url": "https://leetcode.com/problems/palindrome-number/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U3A-PR3",
        "title": "Pascal’s Triangle (Nested Loop Pattern)",
        "url": "https://leetcode.com/problems/pascals-triangle/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "rga_q2N7vU8"
        ]
      },
      {
        "id": "P1-U3A-PR4",
        "title": "Happy Number (While Loop & Digit Extraction)",
        "url": "https://leetcode.com/problems/happy-number/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U3A-PR5",
        "title": "Add Digits (Loops & Digit Sum)",
        "url": "https://leetcode.com/problems/add-digits/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U3A-PR6",
        "title": "Stones on the Table (Loop Scanning)",
        "url": "https://codeforces.com/problemset/problem/266/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U3A-PR7",
        "title": "Repetitions (Single-Pass Loop)",
        "url": "https://cses.fi/problemset/task/1069",
        "platform": "CSES",
        "difficulty": "Easy",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U3A-PR2",
        "title": "Reverse Integer (Overflow Safe)",
        "url": "https://leetcode.com/problems/reverse-integer/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "qR9U6bKxJ7g"
        ]
      },
      {
        "id": "P1-U3A-PR8",
        "title": "Count Primes (Nested Loops / Sieve)",
        "url": "https://leetcode.com/problems/count-primes/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "rga_q2N7vU8"
        ]
      }
    ]
  },
  {
    "id": "P1-U3B",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 3B: 1D/2D Arrays & Dynamic Vectors",
    "hours": 6,
    "subtopics": [
      "1D Arrays: Contiguous Memory Representation, Indexing & Element Manipulation",
      "Subarray Fundamentals & Kadane’s Maximum Subarray Sum Algorithm",
      "Multi-dimensional (2D) Matrices: Row/Column Major Storage & Spiral Traversal",
      "STL Dynamic Vectors: push_back, pop_back, size vs capacity & resizing"
    ],
    "videos": [
      {
        "id": "8wmn7k1TTcI",
        "title": "Lec 8: Array Data Structure - Part 1",
        "url": "https://www.youtube.com/watch?v=8wmn7k1TTcI",
        "type": "Playlist",
        "playlistIndex": 8,
        "minutes": 54
      },
      {
        "id": "NWg38xWYzEg",
        "title": "Lec 9: Vectors in C++ (Arrays Part 2)",
        "url": "https://www.youtube.com/watch?v=NWg38xWYzEg",
        "type": "Playlist",
        "playlistIndex": 9,
        "minutes": 40
      },
      {
        "id": "AC010",
        "title": "Kadane's Algorithm | Maximum Subarray Sum",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=10",
        "type": "Playlist",
        "playlistIndex": 10,
        "minutes": 23,
        "playlistOnly": true
      },
      {
        "id": "AC011",
        "title": "Majority Element (Moore's Voting) & Pair Sum",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=11",
        "type": "Playlist",
        "playlistIndex": 11,
        "minutes": 39,
        "playlistOnly": true
      },
      {
        "id": "AC013",
        "title": "Buy & Sell Stock and Pow(x, n)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=13",
        "type": "Playlist",
        "playlistIndex": 13,
        "minutes": 29,
        "playlistOnly": true
      },
      {
        "id": "AC014",
        "title": "Container With Most Water (Two Pointers)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=14",
        "type": "Playlist",
        "playlistIndex": 14,
        "minutes": 32,
        "playlistOnly": true
      },
      {
        "id": "AC015",
        "title": "Product of Array Except Self",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=15",
        "type": "Playlist",
        "playlistIndex": 15,
        "minutes": 30,
        "playlistOnly": true
      },
      {
        "id": "lBL8327gq8I",
        "title": "2D Arrays in C++ | Part 1",
        "url": "https://www.youtube.com/watch?v=lBL8327gq8I",
        "type": "Playlist",
        "playlistIndex": 35,
        "minutes": 38
      },
      {
        "id": "AC036",
        "title": "Search a 2D Matrix - Variations I & II (2D Arrays Part 2)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=36",
        "type": "Playlist",
        "playlistIndex": 36,
        "minutes": 38,
        "playlistOnly": true
      },
      {
        "id": "AC037",
        "title": "Spiral Matrix (2D Arrays Part 3)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=37",
        "type": "Playlist",
        "playlistIndex": 37,
        "minutes": 25,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P1-U3B-PR3",
        "title": "Running Sum of 1d Array",
        "url": "https://leetcode.com/problems/running-sum-of-1d-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "8wmn7k1TTcI"
        ]
      },
      {
        "id": "P1-U3B-PR4",
        "title": "Move Zeroes (In-Place Array Manipulation)",
        "url": "https://leetcode.com/problems/move-zeroes/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "NWg38xWYzEg"
        ]
      },
      {
        "id": "P1-U3B-PR5",
        "title": "Best Time to Buy and Sell Stock (Single Pass)",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "8wmn7k1TTcI",
          "AC013"
        ]
      },
      {
        "id": "P1-U3B-PR6",
        "title": "Beautiful Matrix (2D Matrix Indexing)",
        "url": "https://codeforces.com/problemset/problem/263/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "lBL8327gq8I"
        ]
      },
      {
        "id": "P1-U3B-PR7",
        "title": "Increasing Array (Array Traversal)",
        "url": "https://cses.fi/problemset/task/1094",
        "platform": "CSES",
        "difficulty": "Easy",
        "videoIds": [
          "8wmn7k1TTcI"
        ]
      },
      {
        "id": "P1-U3B-PR1",
        "title": "Maximum Subarray (Kadane's Algorithm)",
        "url": "https://leetcode.com/problems/maximum-subarray/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "8wmn7k1TTcI",
          "AC010"
        ]
      },
      {
        "id": "P1-U3B-PR2",
        "title": "Spiral Matrix (2D Array Traversal)",
        "url": "https://leetcode.com/problems/spiral-matrix/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "lBL8327gq8I",
          "AC037"
        ]
      },
      {
        "id": "P1-U3B-PR8",
        "title": "Rotate Array (Vector Rotation)",
        "url": "https://leetcode.com/problems/rotate-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "NWg38xWYzEg"
        ]
      },
      {
        "id": "P1-U3B-PR9",
        "title": "Rotate Image (2D Matrix Transform)",
        "url": "https://leetcode.com/problems/rotate-image/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "lBL8327gq8I"
        ]
      },
      {
        "id": "P1-U3B-PR10",
        "title": "Majority Element II (Moore’s Voting)",
        "url": "https://leetcode.com/problems/majority-element-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC011"
        ]
      },
      {
        "id": "P1-U3B-PR11",
        "title": "Container With Most Water (Two Pointers)",
        "url": "https://leetcode.com/problems/container-with-most-water/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC014"
        ]
      },
      {
        "id": "P1-U3B-PR12",
        "title": "Product of Array Except Self (Prefix/Suffix)",
        "url": "https://leetcode.com/problems/product-of-array-except-self/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC015"
        ]
      },
      {
        "id": "P1-U3B-PR13",
        "title": "Search a 2D Matrix (Binary Search on Matrix)",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC036"
        ]
      },
      {
        "id": "P1-U3B-PR14",
        "title": "Search a 2D Matrix II (Staircase Search)",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC036"
        ]
      }
    ]
  },
  {
    "id": "P1-U4",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 4: Modular Functions, Pointers & Intro to Recursion",
    "hours": 8,
    "subtopics": [
      "Modular Functions: Prototypes, Call Stack Frame, Default Arguments & Overloading",
      "Pointers & Memory Addresses: Dereferencing (*), Address-of (&) & Pointer Arithmetic",
      "Parameter Passing: Call by Value vs Call by Reference (Pointers & C++ References)",
      "Introductory Recursion: Base Case, Recursive Call Stack & Factorial/Fibonacci"
    ],
    "videos": [
      {
        "id": "P08Z_NC8GuY",
        "title": "Lec 5: Functions in C++",
        "url": "https://www.youtube.com/watch?v=P08Z_NC8GuY",
        "type": "Playlist",
        "playlistIndex": 5,
        "minutes": 49
      },
      {
        "id": "qYEjR6M0wSk",
        "title": "Pointers in C++ (In Detail)",
        "url": "https://www.youtube.com/watch?v=qYEjR6M0wSk",
        "type": "Playlist",
        "playlistIndex": 16,
        "minutes": 46
      },
      {
        "id": "9OsMG4fI4OY",
        "title": "Recursion Tutorial - Basics to Advanced (Part 1)",
        "url": "https://www.youtube.com/watch?v=9OsMG4fI4OY",
        "type": "Playlist",
        "playlistIndex": 42,
        "minutes": 46
      }
    ],
    "problems": [
      {
        "id": "P1-U4-PR2",
        "title": "Fibonacci Number (Recursive & Iterative)",
        "url": "https://leetcode.com/problems/fibonacci-number/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      },
      {
        "id": "P1-U4-PR3",
        "title": "Climbing Stairs (Intro Recursion / Memoization)",
        "url": "https://leetcode.com/problems/climbing-stairs/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      },
      {
        "id": "P1-U4-PR4",
        "title": "N-th Tribonacci Number (Recursion vs Iteration)",
        "url": "https://leetcode.com/problems/n-th-tribonacci-number/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      },
      {
        "id": "P1-U4-PR8",
        "title": "Remove Element (In-Place via Pointers/References)",
        "url": "https://leetcode.com/problems/remove-element/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qYEjR6M0wSk"
        ]
      },
      {
        "id": "P1-U4-PR9",
        "title": "Remove Duplicates from Sorted Array (Read/Write Pointers)",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "qYEjR6M0wSk"
        ]
      },
      {
        "id": "P1-U4-PR1",
        "title": "Pow(x, n) (Binary Exponentiation)",
        "url": "https://leetcode.com/problems/powx-n/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      },
      {
        "id": "P1-U4-PR5",
        "title": "Factorial Trailing Zeroes",
        "url": "https://leetcode.com/problems/factorial-trailing-zeroes/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "P08Z_NC8GuY"
        ]
      },
      {
        "id": "P1-U4-PR6",
        "title": "Trailing Zeros (Factorial Function Logic)",
        "url": "https://cses.fi/problemset/task/1618",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "P08Z_NC8GuY"
        ]
      },
      {
        "id": "P1-U4-PR7",
        "title": "K-th Symbol in Grammar (Recursion Tree)",
        "url": "https://leetcode.com/problems/k-th-symbol-in-grammar/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      }
    ]
  },
  {
    "id": "P1-U5A",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 5A: C++ Strings & Manipulation Operations",
    "hours": 5,
    "subtopics": [
      "Character Arrays vs std::string Class: Null-termination & Dynamic Allocation",
      "String Modification: insert(), erase(), replace(), append() & concatenation",
      "Substring & Search Operations: substr(), find(), length(), case conversion & alphanumeric parsing"
    ],
    "videos": [
      {
        "id": "MOSjYaVymcU",
        "title": "Strings & Character Arrays in C++ - Part 1",
        "url": "https://www.youtube.com/watch?v=MOSjYaVymcU",
        "type": "Playlist",
        "playlistIndex": 29,
        "minutes": 30
      },
      {
        "id": "AC030",
        "title": "Valid Palindrome & Remove All Occurrences (Strings Part 2)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=30",
        "type": "Playlist",
        "playlistIndex": 30,
        "minutes": 24,
        "playlistOnly": true
      },
      {
        "id": "AC031",
        "title": "Permutation in String (Strings Part 3)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=31",
        "type": "Playlist",
        "playlistIndex": 31,
        "minutes": 22,
        "playlistOnly": true
      },
      {
        "id": "RitppzIdMCo",
        "title": "Strings - Part 4 (Reverse Words in String)",
        "url": "https://www.youtube.com/watch?v=RitppzIdMCo",
        "type": "Playlist",
        "playlistIndex": 32,
        "minutes": 15
      },
      {
        "id": "AC033",
        "title": "String Compression",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=33",
        "type": "Playlist",
        "playlistIndex": 33,
        "minutes": 19,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P1-U5A-PR1",
        "title": "Valid Palindrome (Two-Pointer String)",
        "url": "https://leetcode.com/problems/valid-palindrome/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "MOSjYaVymcU",
          "AC030"
        ]
      },
      {
        "id": "P1-U5A-PR3",
        "title": "Reverse String (Two-Pointer, In-Place)",
        "url": "https://leetcode.com/problems/reverse-string/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "MOSjYaVymcU"
        ]
      },
      {
        "id": "P1-U5A-PR4",
        "title": "Way Too Long Words (String Manipulation)",
        "url": "https://codeforces.com/problemset/problem/71/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "MOSjYaVymcU"
        ]
      },
      {
        "id": "P1-U5A-PR5",
        "title": "String Task (Char Parsing & Case)",
        "url": "https://codeforces.com/problemset/problem/118/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "MOSjYaVymcU"
        ]
      },
      {
        "id": "P1-U5A-PR6",
        "title": "Petya and Strings (Case-Insensitive Compare)",
        "url": "https://codeforces.com/problemset/problem/112/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "MOSjYaVymcU"
        ]
      },
      {
        "id": "P1-U5A-PR7",
        "title": "Valid Anagram (Character Counting)",
        "url": "https://leetcode.com/problems/valid-anagram/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "MOSjYaVymcU"
        ]
      },
      {
        "id": "P1-U5A-PR8",
        "title": "Longest Common Prefix",
        "url": "https://leetcode.com/problems/longest-common-prefix/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "RitppzIdMCo"
        ]
      },
      {
        "id": "P1-U5A-PR9",
        "title": "Find the Index of the First Occurrence in a String (find())",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "RitppzIdMCo"
        ]
      },
      {
        "id": "P1-U5A-PR2",
        "title": "Reverse Words in a String",
        "url": "https://leetcode.com/problems/reverse-words-in-a-string/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "RitppzIdMCo"
        ]
      },
      {
        "id": "P1-U5A-PR10",
        "title": "Longest Palindromic Substring",
        "url": "https://leetcode.com/problems/longest-palindromic-substring/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "RitppzIdMCo"
        ]
      },
      {
        "id": "P1-U5A-PR11",
        "title": "Remove All Occurrences of a Substring",
        "url": "https://leetcode.com/problems/remove-all-occurrences-of-a-substring/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC030"
        ]
      },
      {
        "id": "P1-U5A-PR12",
        "title": "Permutation in String (Sliding Window)",
        "url": "https://leetcode.com/problems/permutation-in-string/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC031"
        ]
      },
      {
        "id": "P1-U5A-PR13",
        "title": "String Compression (In-Place Two Pointers)",
        "url": "https://leetcode.com/problems/string-compression/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC033"
        ]
      }
    ]
  },
  {
    "id": "P1-U5B",
    "phase": 1,
    "phaseName": "Phase 1: C++ Programming Fundamentals",
    "courseCode": "25CS101",
    "unitTitle": "Unit 5B: Object-Oriented Programming (OOP) Fundamentals",
    "hours": 5,
    "subtopics": [
      "Core OOP Pillars: Encapsulation, Abstraction, Inheritance & Polymorphism",
      "Classes & Objects: Access Specifiers (public, private, protected), Attributes & Member Methods",
      "Constructors (Default, Parameterized, Copy), Destructors & the this Pointer"
    ],
    "videos": [
      {
        "id": "mlIUKyZIUUU",
        "title": "OOPs Tutorial in One Shot (C++ Language)",
        "url": "https://www.youtube.com/watch?v=mlIUKyZIUUU",
        "type": "Playlist",
        "playlistIndex": 56,
        "minutes": 124
      }
    ],
    "problems": [
      {
        "id": "P1-U5B-PR1",
        "title": "Design Parking System (OOP Class State)",
        "url": "https://leetcode.com/problems/design-parking-system/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "mlIUKyZIUUU"
        ]
      },
      {
        "id": "P1-U5B-PR2",
        "title": "Design an Ordered Stream (Class State)",
        "url": "https://leetcode.com/problems/design-an-ordered-stream/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "mlIUKyZIUUU"
        ]
      },
      {
        "id": "P1-U5B-PR3",
        "title": "Simple Bank System (Encapsulation & Methods)",
        "url": "https://leetcode.com/problems/simple-bank-system/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "mlIUKyZIUUU"
        ]
      },
      {
        "id": "P1-U5B-PR4",
        "title": "Design Browser History (Class Design)",
        "url": "https://leetcode.com/problems/design-browser-history/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "mlIUKyZIUUU"
        ]
      },
      {
        "id": "P1-U5B-PR5",
        "title": "Design Underground System (Classes & Maps)",
        "url": "https://leetcode.com/problems/design-underground-system/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "mlIUKyZIUUU"
        ]
      }
    ]
  },
  {
    "id": "P2-U1",
    "phase": 2,
    "phaseName": "Phase 2: Core Data Structures & Algorithms",
    "courseCode": "25CS201",
    "unitTitle": "Unit 1: Asymptotic Complexity & Searching Techniques",
    "hours": 8,
    "subtopics": [
      "Data Structure Classification (Linear/Non-Linear) & Abstract Data Types (ADTs)",
      "Asymptotic Notations: Big-Oh (O), Big-Theta (Θ), Big-Omega (Ω) & Time-Space Trade-off",
      "Sequential (Linear) Search vs Binary Search (Iterative & Recursive Complexity Analysis)",
      "Binary Search on Answer Space: Rotated Arrays, Peak Element & Book Allocation"
    ],
    "videos": [
      {
        "id": "PwKv8fOcriM",
        "title": "Time & Space Complexity Complete Guide",
        "url": "https://www.youtube.com/watch?v=PwKv8fOcriM",
        "type": "Playlist",
        "playlistIndex": 12,
        "minutes": 86
      },
      {
        "id": "TbbSJrY5GqQ",
        "title": "Binary Search Algorithm (Iterative & Recursive)",
        "url": "https://www.youtube.com/watch?v=TbbSJrY5GqQ",
        "type": "Playlist",
        "playlistIndex": 17,
        "minutes": 44
      },
      {
        "id": "AC018",
        "title": "Search in Rotated Sorted Array",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=18",
        "type": "Playlist",
        "playlistIndex": 18,
        "minutes": 20,
        "playlistOnly": true
      },
      {
        "id": "AC019",
        "title": "Peak Index in Mountain Array",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=19",
        "type": "Playlist",
        "playlistIndex": 19,
        "minutes": 24,
        "playlistOnly": true
      },
      {
        "id": "AC020",
        "title": "Single Element in Sorted Array",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=20",
        "type": "Playlist",
        "playlistIndex": 20,
        "minutes": 28,
        "playlistOnly": true
      },
      {
        "id": "AC021",
        "title": "Book Allocation Problem (Binary Search on Answer)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=21",
        "type": "Playlist",
        "playlistIndex": 21,
        "minutes": 33,
        "playlistOnly": true
      },
      {
        "id": "AC022",
        "title": "Painter's Partition Problem (Binary Search on Answer)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=22",
        "type": "Playlist",
        "playlistIndex": 22,
        "minutes": 28,
        "playlistOnly": true
      },
      {
        "id": "AC023",
        "title": "Aggressive Cows (Binary Search on Answer)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=23",
        "type": "Playlist",
        "playlistIndex": 23,
        "minutes": 30,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P2-U1-PR1",
        "title": "Binary Search (Standard O(log N))",
        "url": "https://leetcode.com/problems/binary-search/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR3",
        "title": "Search Insert Position (Binary Search Boundary)",
        "url": "https://leetcode.com/problems/search-insert-position/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR4",
        "title": "Sqrt(x) (Binary Search on Answer)",
        "url": "https://leetcode.com/problems/sqrtx/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR11",
        "title": "Squares of a Sorted Array (O(n log n) vs O(n))",
        "url": "https://leetcode.com/problems/squares-of-a-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "PwKv8fOcriM"
        ]
      },
      {
        "id": "P2-U1-PR2",
        "title": "Search in Rotated Sorted Array",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TbbSJrY5GqQ",
          "AC018"
        ]
      },
      {
        "id": "P2-U1-PR5",
        "title": "Find First and Last Position of Element in Sorted Array",
        "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR6",
        "title": "Find Minimum in Rotated Sorted Array",
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR7",
        "title": "Find Peak Element",
        "url": "https://leetcode.com/problems/find-peak-element/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TbbSJrY5GqQ",
          "AC019"
        ]
      },
      {
        "id": "P2-U1-PR8",
        "title": "Koko Eating Bananas (Binary Search on Answer)",
        "url": "https://leetcode.com/problems/koko-eating-bananas/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR9",
        "title": "Factory Machines (Binary Search on Answer)",
        "url": "https://cses.fi/problemset/task/1620",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "TbbSJrY5GqQ"
        ]
      },
      {
        "id": "P2-U1-PR12",
        "title": "Two Sum II – Sorted Input (O(n²) vs O(n))",
        "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "PwKv8fOcriM"
        ]
      },
      {
        "id": "P2-U1-PR13",
        "title": "Peak Index in a Mountain Array",
        "url": "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC019"
        ]
      },
      {
        "id": "P2-U1-PR14",
        "title": "Single Element in a Sorted Array",
        "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC020"
        ]
      },
      {
        "id": "P2-U1-PR15",
        "title": "Array Division (Book Allocation Pattern)",
        "url": "https://cses.fi/problemset/task/1085",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC021",
          "AC022"
        ]
      },
      {
        "id": "P2-U1-PR16",
        "title": "Capacity To Ship Packages Within D Days",
        "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC022"
        ]
      },
      {
        "id": "P2-U1-PR18",
        "title": "Magnetic Force Between Two Balls",
        "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC023"
        ]
      },
      {
        "id": "P2-U1-PR10",
        "title": "Split Array Largest Sum (Book Allocation Pattern)",
        "url": "https://leetcode.com/problems/split-array-largest-sum/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "TbbSJrY5GqQ",
          "AC021"
        ]
      },
      {
        "id": "P2-U1-PR17",
        "title": "Aggressive Cows",
        "url": "https://www.spoj.com/problems/AGGRCOW/",
        "platform": "SPOJ",
        "difficulty": "Hard",
        "videoIds": [
          "AC023"
        ]
      }
    ]
  },
  {
    "id": "P2-U2",
    "phase": 2,
    "phaseName": "Phase 2: Core Data Structures & Algorithms",
    "courseCode": "25CS201",
    "unitTitle": "Unit 2: Comparison & Linear-Time Sorting Algorithms",
    "hours": 8,
    "subtopics": [
      "Comparison Sorts: Bubble Sort, Selection Sort & Insertion Sort (Best/Avg/Worst Case)",
      "Dutch National Flag (DNF) 3-Way Partitioning Algorithm (Sort 0s, 1s & 2s)",
      "Linear-Time Non-Comparison Sorts: Counting Sort, Radix Sort & Bucket Sort"
    ],
    "videos": [
      {
        "id": "1jCFUv-Xlqo",
        "title": "Sorting Algorithms: Bubble, Selection & Insertion Sort",
        "url": "https://www.youtube.com/watch?v=1jCFUv-Xlqo",
        "type": "Playlist",
        "playlistIndex": 24,
        "minutes": 35
      },
      {
        "id": "J48aGjfjYTI",
        "title": "Sort 0s, 1s & 2s | DNF Sorting Algorithm",
        "url": "https://www.youtube.com/watch?v=J48aGjfjYTI",
        "type": "Playlist",
        "playlistIndex": 25,
        "minutes": 34
      },
      {
        "id": "AC026",
        "title": "Merge Sorted Arrays & Next Permutation",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=26",
        "type": "Playlist",
        "playlistIndex": 26,
        "minutes": 44,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P2-U2-PR3",
        "title": "Merge Sorted Array (Two-Pointer Merge)",
        "url": "https://leetcode.com/problems/merge-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "1jCFUv-Xlqo",
          "AC026"
        ]
      },
      {
        "id": "P2-U2-PR4",
        "title": "Height Checker (Counting Sort Idea)",
        "url": "https://leetcode.com/problems/height-checker/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR5",
        "title": "Relative Sort Array (Counting Sort)",
        "url": "https://leetcode.com/problems/relative-sort-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR6",
        "title": "Distinct Numbers (Sort & Count)",
        "url": "https://cses.fi/problemset/task/1621",
        "platform": "CSES",
        "difficulty": "Easy",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR7",
        "title": "Twins (Sorting + Greedy)",
        "url": "https://codeforces.com/problemset/problem/160/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR10",
        "title": "Sort Array By Parity (Two-Pointer Partition)",
        "url": "https://leetcode.com/problems/sort-array-by-parity/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "J48aGjfjYTI"
        ]
      },
      {
        "id": "P2-U2-PR1",
        "title": "Sort Colors (Dutch National Flag Algorithm)",
        "url": "https://leetcode.com/problems/sort-colors/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "J48aGjfjYTI"
        ]
      },
      {
        "id": "P2-U2-PR2",
        "title": "Maximum Gap (Radix / Bucket Sort Application)",
        "url": "https://leetcode.com/problems/maximum-gap/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR8",
        "title": "Insertion Sort List",
        "url": "https://leetcode.com/problems/insertion-sort-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR9",
        "title": "Sort Characters By Frequency (Bucket Sort)",
        "url": "https://leetcode.com/problems/sort-characters-by-frequency/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "1jCFUv-Xlqo"
        ]
      },
      {
        "id": "P2-U2-PR11",
        "title": "Partition Array According to Given Pivot (3-Way Partition)",
        "url": "https://leetcode.com/problems/partition-array-according-to-given-pivot/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "J48aGjfjYTI"
        ]
      },
      {
        "id": "P2-U2-PR12",
        "title": "Next Permutation",
        "url": "https://leetcode.com/problems/next-permutation/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC026"
        ]
      }
    ]
  },
  {
    "id": "P2-U3",
    "phase": 2,
    "phaseName": "Phase 2: Core Data Structures & Algorithms",
    "courseCode": "25CS201",
    "unitTitle": "Unit 3: Linked Lists & Polynomial Representation",
    "hours": 10,
    "subtopics": [
      "Singly Linked List: Dynamic Node Pointers, Insertion, Deletion, Reversal & Fast/Slow Pointers",
      "Doubly Linked List: Prev/Next Bidirectional Pointers & CRUD Operations",
      "Circular Linked List: Tail-to-Head Loop Management & Traversal",
      "Polynomial Representation: Single & Two-Variable Polynomial Addition, Subtraction & Multiplication"
    ],
    "videos": [
      {
        "id": "LyuuqCVkP5I",
        "title": "Introduction to Linked List (Singly LL)",
        "url": "https://www.youtube.com/watch?v=LyuuqCVkP5I",
        "type": "Playlist",
        "playlistIndex": 57,
        "minutes": 51
      },
      {
        "id": "AC058",
        "title": "Reverse a Linked List",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=58",
        "type": "Playlist",
        "playlistIndex": 58,
        "minutes": 10,
        "playlistOnly": true
      },
      {
        "id": "AC059",
        "title": "Middle of a Linked List",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=59",
        "type": "Playlist",
        "playlistIndex": 59,
        "minutes": 11,
        "playlistOnly": true
      },
      {
        "id": "AC060",
        "title": "Detect & Remove Cycle in a Linked List",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=60",
        "type": "Playlist",
        "playlistIndex": 60,
        "minutes": 30,
        "playlistOnly": true
      },
      {
        "id": "AC061",
        "title": "Merge Two Sorted Lists",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=61",
        "type": "Playlist",
        "playlistIndex": 61,
        "minutes": 13,
        "playlistOnly": true
      },
      {
        "id": "AC062",
        "title": "Copy List with Random Pointer",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=62",
        "type": "Playlist",
        "playlistIndex": 62,
        "minutes": 21,
        "playlistOnly": true
      },
      {
        "id": "bO5DasTsaRQ",
        "title": "Doubly Linked List Complete Tutorial",
        "url": "https://www.youtube.com/watch?v=bO5DasTsaRQ",
        "type": "Playlist",
        "playlistIndex": 63,
        "minutes": 32
      },
      {
        "id": "e6lZY5Yha8U",
        "title": "Circular Linked List in Data Structures",
        "url": "https://www.youtube.com/watch?v=e6lZY5Yha8U",
        "type": "Playlist",
        "playlistIndex": 64,
        "minutes": 34
      },
      {
        "id": "AC065",
        "title": "Flatten a Doubly Linked List",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=65",
        "type": "Playlist",
        "playlistIndex": 65,
        "minutes": 25,
        "playlistOnly": true
      },
      {
        "id": "AC066",
        "title": "Reverse Nodes in K-Group",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=66",
        "type": "Playlist",
        "playlistIndex": 66,
        "minutes": 21,
        "playlistOnly": true
      },
      {
        "id": "AC067",
        "title": "Swap Nodes in Pairs",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=67",
        "type": "Playlist",
        "playlistIndex": 67,
        "minutes": 20,
        "playlistOnly": true
      },
      {
        "id": "AC078",
        "title": "Implement LRU Cache",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=78",
        "type": "Playlist",
        "playlistIndex": 78,
        "minutes": 36,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P2-U3-PR1",
        "title": "Reverse Linked List",
        "url": "https://leetcode.com/problems/reverse-linked-list/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "LyuuqCVkP5I",
          "AC058"
        ]
      },
      {
        "id": "P2-U3-PR3",
        "title": "Merge Two Sorted Lists",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "LyuuqCVkP5I",
          "AC061"
        ]
      },
      {
        "id": "P2-U3-PR4",
        "title": "Linked List Cycle (Fast/Slow Pointers)",
        "url": "https://leetcode.com/problems/linked-list-cycle/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "LyuuqCVkP5I",
          "AC060"
        ]
      },
      {
        "id": "P2-U3-PR5",
        "title": "Middle of the Linked List (Fast/Slow Pointers)",
        "url": "https://leetcode.com/problems/middle-of-the-linked-list/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "LyuuqCVkP5I",
          "AC059"
        ]
      },
      {
        "id": "P2-U3-PR2",
        "title": "Linked List Cycle II (Floyd's Tortoise & Hare)",
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "LyuuqCVkP5I",
          "AC060"
        ]
      },
      {
        "id": "P2-U3-PR6",
        "title": "Remove Nth Node From End of List",
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "LyuuqCVkP5I"
        ]
      },
      {
        "id": "P2-U3-PR7",
        "title": "Design Linked List (Singly/Doubly CRUD)",
        "url": "https://leetcode.com/problems/design-linked-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "bO5DasTsaRQ"
        ]
      },
      {
        "id": "P2-U3-PR8",
        "title": "Add Two Numbers (Digit-wise List Addition)",
        "url": "https://leetcode.com/problems/add-two-numbers/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "LyuuqCVkP5I"
        ]
      },
      {
        "id": "P2-U3-PR9",
        "title": "LRU Cache (Doubly Linked List + Map)",
        "url": "https://leetcode.com/problems/lru-cache/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "bO5DasTsaRQ",
          "AC078"
        ]
      },
      {
        "id": "P2-U3-PR10",
        "title": "Adding Two Polynomials Using Linked List",
        "url": "https://www.geeksforgeeks.org/adding-two-polynomials-using-linked-list/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "LyuuqCVkP5I"
        ]
      },
      {
        "id": "P2-U3-PR11",
        "title": "Multiplication of Two Polynomials Using Linked List",
        "url": "https://www.geeksforgeeks.org/multiplication-of-two-polynomials-using-linked-list/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "LyuuqCVkP5I"
        ]
      },
      {
        "id": "P2-U3-PR12",
        "title": "Flatten a Multilevel Doubly Linked List",
        "url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "bO5DasTsaRQ",
          "AC065"
        ]
      },
      {
        "id": "P2-U3-PR13",
        "title": "Doubly Linked List – Insert, Delete & Reverse",
        "url": "https://www.geeksforgeeks.org/doubly-linked-list/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "bO5DasTsaRQ"
        ]
      },
      {
        "id": "P2-U3-PR14",
        "title": "Rotate List (Form a Ring & Cut)",
        "url": "https://leetcode.com/problems/rotate-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "e6lZY5Yha8U"
        ]
      },
      {
        "id": "P2-U3-PR15",
        "title": "Circular Linked List – Insert, Delete & Traverse",
        "url": "https://www.geeksforgeeks.org/circular-linked-list/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "e6lZY5Yha8U"
        ]
      },
      {
        "id": "P2-U3-PR16",
        "title": "Copy List with Random Pointer",
        "url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC062"
        ]
      },
      {
        "id": "P2-U3-PR18",
        "title": "Swap Nodes in Pairs",
        "url": "https://leetcode.com/problems/swap-nodes-in-pairs/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC067"
        ]
      },
      {
        "id": "P2-U3-PR17",
        "title": "Reverse Nodes in k-Group",
        "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "AC066"
        ]
      }
    ]
  },
  {
    "id": "P2-U4",
    "phase": 2,
    "phaseName": "Phase 2: Core Data Structures & Algorithms",
    "courseCode": "25CS201",
    "unitTitle": "Unit 4: Hashing Functions & Collision Resolution",
    "hours": 8,
    "subtopics": [
      "Hash Table Architecture & Hash Functions: Division Modulo, Digit Extraction, Mid-Square & Folding",
      "Open Hashing (Separate Chaining): Linked List Buckets & Load Factor (λ) Analysis",
      "Closed Hashing (Open Addressing): Linear Probing, Quadratic Probing & Double Hashing"
    ],
    "videos": [
      {
        "id": "0Fxc_jKj2vo",
        "title": "Two Sum, Find Duplicate | Hashing Problems",
        "url": "https://www.youtube.com/watch?v=0Fxc_jKj2vo",
        "type": "Playlist",
        "playlistIndex": 38,
        "minutes": 54
      },
      {
        "id": "0kfM_YEzR94",
        "title": "Hashing - Introduction & Collision Resolution",
        "url": "https://www.youtube.com/watch?v=0kfM_YEzR94",
        "type": "Archive",
        "minutes": 25
      },
      {
        "id": "AC039",
        "title": "3 Sum (Brute, Better & Optimal)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=39",
        "type": "Playlist",
        "playlistIndex": 39,
        "minutes": 44,
        "playlistOnly": true
      },
      {
        "id": "AC040",
        "title": "4 Sum (Optimal Approach)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=40",
        "type": "Playlist",
        "playlistIndex": 40,
        "minutes": 23,
        "playlistOnly": true
      },
      {
        "id": "AC041",
        "title": "Subarray Sum Equals K (Brute, Better & Optimal)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=41",
        "type": "Playlist",
        "playlistIndex": 41,
        "minutes": 35,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P2-U4-PR1",
        "title": "Two Sum (Hash Table Lookup)",
        "url": "https://leetcode.com/problems/two-sum/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR2",
        "title": "Design HashMap (Collision Handling)",
        "url": "https://leetcode.com/problems/design-hashmap/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0kfM_YEzR94"
        ]
      },
      {
        "id": "P2-U4-PR3",
        "title": "Contains Duplicate (Hash Set)",
        "url": "https://leetcode.com/problems/contains-duplicate/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR4",
        "title": "Design HashSet (Buckets & Collision Handling)",
        "url": "https://leetcode.com/problems/design-hashset/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0kfM_YEzR94"
        ]
      },
      {
        "id": "P2-U4-PR13",
        "title": "Find Missing and Repeated Values",
        "url": "https://leetcode.com/problems/find-missing-and-repeated-values/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR5",
        "title": "Sum of Two Values (Hash Map Lookup)",
        "url": "https://cses.fi/problemset/task/1640",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR6",
        "title": "Registration System (Hashing Names)",
        "url": "https://codeforces.com/problemset/problem/4/C",
        "platform": "Codeforces",
        "difficulty": "Medium",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR7",
        "title": "Subarray Sum Equals K (Prefix Sum + Hash Map)",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "0Fxc_jKj2vo",
          "AC041"
        ]
      },
      {
        "id": "P2-U4-PR8",
        "title": "Longest Consecutive Sequence (Hash Set)",
        "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR9",
        "title": "Valid Sudoku (Hash Set Validation)",
        "url": "https://leetcode.com/problems/valid-sudoku/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR10",
        "title": "Hashing - Separate Chaining (Open Hashing)",
        "url": "https://www.geeksforgeeks.org/hashing-set-2-separate-chaining/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "0kfM_YEzR94"
        ]
      },
      {
        "id": "P2-U4-PR11",
        "title": "Hashing - Open Addressing (Probing)",
        "url": "https://www.geeksforgeeks.org/hashing-set-3-open-addressing/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "0kfM_YEzR94"
        ]
      },
      {
        "id": "P2-U4-PR12",
        "title": "Find the Duplicate Number",
        "url": "https://leetcode.com/problems/find-the-duplicate-number/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "0Fxc_jKj2vo"
        ]
      },
      {
        "id": "P2-U4-PR14",
        "title": "3Sum",
        "url": "https://leetcode.com/problems/3sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC039"
        ]
      },
      {
        "id": "P2-U4-PR15",
        "title": "4Sum",
        "url": "https://leetcode.com/problems/4sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC040"
        ]
      }
    ]
  },
  {
    "id": "P2-U5",
    "phase": 2,
    "phaseName": "Phase 2: Core Data Structures & Algorithms",
    "courseCode": "25CS201",
    "unitTitle": "Unit 5: STL Ordered/Unordered Sets & Maps",
    "hours": 6,
    "subtopics": [
      "Ordered vs Unordered Containers: Red-Black Tree O(log N) vs Hash Table O(1) Internals",
      "STL Set & Multiset Operations: insert(), erase(), find(), count(), Union, Intersection & Difference",
      "STL Map & Unordered_Map: Frequency Counting, Key-Value Pairs & Custom Comparator Sorting"
    ],
    "videos": [
      {
        "id": "okhdtEk1iKk",
        "title": "C++ STL Complete Tutorial (One Shot)",
        "url": "https://www.youtube.com/watch?v=okhdtEk1iKk",
        "type": "Playlist",
        "playlistIndex": 27,
        "minutes": 87
      }
    ],
    "problems": [
      {
        "id": "P2-U5-PR1",
        "title": "Intersection of Two Arrays (STL Set)",
        "url": "https://leetcode.com/problems/intersection-of-two-arrays/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR3",
        "title": "Free Cash (Map Frequency Counting)",
        "url": "https://codeforces.com/problemset/problem/237/A",
        "platform": "Codeforces",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR4",
        "title": "Intersection of Two Arrays II (STL Map)",
        "url": "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR5",
        "title": "Contains Duplicate II (Unordered Map)",
        "url": "https://leetcode.com/problems/contains-duplicate-ii/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR6",
        "title": "Sort Array by Increasing Frequency (Custom Comparator)",
        "url": "https://leetcode.com/problems/sort-array-by-increasing-frequency/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR2",
        "title": "Group Anagrams (STL Map)",
        "url": "https://leetcode.com/problems/group-anagrams/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR7",
        "title": "Concert Tickets (Multiset lower_bound)",
        "url": "https://cses.fi/problemset/task/1091",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR8",
        "title": "Traffic Lights (STL Set)",
        "url": "https://cses.fi/problemset/task/1163",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR9",
        "title": "My Calendar I (Ordered Map / Set)",
        "url": "https://leetcode.com/problems/my-calendar-i/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P2-U5-PR10",
        "title": "Contains Duplicate III (Ordered Set)",
        "url": "https://leetcode.com/problems/contains-duplicate-iii/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      }
    ]
  },
  {
    "id": "P3-U1A",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 1A: Stacks & Expression Notations",
    "hours": 3,
    "subtopics": [
      "Stack LIFO ADT: Array & Linked List Representations, push(), pop(), peek() & STL std::stack",
      "Arithmetic Expression Notations: Infix, Prefix (Polish) & Postfix (Reverse Polish) Conversions",
      "Postfix/Prefix Stack Evaluation & Monotonic Stack Patterns (Next Greater Element, Stock Span)"
    ],
    "videos": [
      {
        "id": "0X-fV-1ir9c",
        "title": "Lec 66: Introduction to STACKS",
        "url": "https://www.youtube.com/watch?v=0X-fV-1ir9c",
        "type": "Playlist",
        "playlistIndex": 68,
        "minutes": 22
      },
      {
        "id": "AC069",
        "title": "Valid Parentheses (Stack)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=69",
        "type": "Playlist",
        "playlistIndex": 69,
        "minutes": 16,
        "playlistOnly": true
      },
      {
        "id": "AC070",
        "title": "Stock Span Problem",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=70",
        "type": "Playlist",
        "playlistIndex": 70,
        "minutes": 26,
        "playlistOnly": true
      },
      {
        "id": "NKbExYwvjb0",
        "title": "Next Greater Element (Monotonic Stack)",
        "url": "https://www.youtube.com/watch?v=NKbExYwvjb0",
        "type": "Playlist",
        "playlistIndex": 71,
        "minutes": 24
      },
      {
        "id": "6T3jMNUCRNU",
        "title": "Introduction to Prefix, Infix & Postfix Notations",
        "url": "https://www.youtube.com/watch?v=6T3jMNUCRNU",
        "type": "Archive",
        "minutes": 20
      },
      {
        "id": "mg9yi6YuAVk",
        "title": "Infix to Postfix Conversion using Stack",
        "url": "https://www.youtube.com/watch?v=mg9yi6YuAVk",
        "type": "Archive",
        "minutes": 20
      },
      {
        "id": "AC072",
        "title": "Previous Smaller Element",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=72",
        "type": "Playlist",
        "playlistIndex": 72,
        "minutes": 9,
        "playlistOnly": true
      },
      {
        "id": "AC073",
        "title": "Design a Min Stack",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=73",
        "type": "Playlist",
        "playlistIndex": 73,
        "minutes": 25,
        "playlistOnly": true
      },
      {
        "id": "AC074",
        "title": "Largest Rectangle in Histogram",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=74",
        "type": "Playlist",
        "playlistIndex": 74,
        "minutes": 33,
        "playlistOnly": true
      },
      {
        "id": "AC075",
        "title": "Next Greater Element II",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=75",
        "type": "Playlist",
        "playlistIndex": 75,
        "minutes": 20,
        "playlistOnly": true
      },
      {
        "id": "AC076",
        "title": "Trapping Rainwater Problem",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=76",
        "type": "Playlist",
        "playlistIndex": 76,
        "minutes": 31,
        "playlistOnly": true
      },
      {
        "id": "AC077",
        "title": "The Celebrity Problem",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=77",
        "type": "Playlist",
        "playlistIndex": 77,
        "minutes": 15,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P3-U1A-PR1",
        "title": "Valid Parentheses",
        "url": "https://leetcode.com/problems/valid-parentheses/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0X-fV-1ir9c",
          "AC069"
        ]
      },
      {
        "id": "P3-U1A-PR2",
        "title": "Next Greater Element I",
        "url": "https://leetcode.com/problems/next-greater-element-i/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "NKbExYwvjb0"
        ]
      },
      {
        "id": "P3-U1A-PR4",
        "title": "Baseball Game (Stack Simulation)",
        "url": "https://leetcode.com/problems/baseball-game/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0X-fV-1ir9c"
        ]
      },
      {
        "id": "P3-U1A-PR5",
        "title": "Remove All Adjacent Duplicates In String (Stack)",
        "url": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0X-fV-1ir9c"
        ]
      },
      {
        "id": "P3-U1A-PR3",
        "title": "Evaluate Reverse Polish Notation (Postfix)",
        "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "6T3jMNUCRNU"
        ]
      },
      {
        "id": "P3-U1A-PR6",
        "title": "Min Stack",
        "url": "https://leetcode.com/problems/min-stack/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "0X-fV-1ir9c",
          "AC073"
        ]
      },
      {
        "id": "P3-U1A-PR7",
        "title": "Daily Temperatures (Monotonic Stack)",
        "url": "https://leetcode.com/problems/daily-temperatures/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "NKbExYwvjb0"
        ]
      },
      {
        "id": "P3-U1A-PR8",
        "title": "Online Stock Span (Monotonic Stack)",
        "url": "https://leetcode.com/problems/online-stock-span/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "NKbExYwvjb0",
          "AC070"
        ]
      },
      {
        "id": "P3-U1A-PR9",
        "title": "Basic Calculator II (Infix Evaluation)",
        "url": "https://leetcode.com/problems/basic-calculator-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "mg9yi6YuAVk"
        ]
      },
      {
        "id": "P3-U1A-PR10",
        "title": "Nearest Smaller Values (Monotonic Stack)",
        "url": "https://cses.fi/problemset/task/1645",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "NKbExYwvjb0",
          "AC072"
        ]
      },
      {
        "id": "P3-U1A-PR11",
        "title": "Infix to Postfix Conversion (Stack)",
        "url": "https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "mg9yi6YuAVk"
        ]
      },
      {
        "id": "P3-U1A-PR13",
        "title": "Next Greater Element II (Circular Array)",
        "url": "https://leetcode.com/problems/next-greater-element-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC075"
        ]
      },
      {
        "id": "P3-U1A-PR15",
        "title": "The Celebrity Problem (Stack)",
        "url": "https://www.geeksforgeeks.org/the-celebrity-problem/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "AC077"
        ]
      },
      {
        "id": "P3-U1A-PR12",
        "title": "Largest Rectangle in Histogram (Monotonic Stack)",
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "NKbExYwvjb0",
          "AC074"
        ]
      },
      {
        "id": "P3-U1A-PR14",
        "title": "Trapping Rain Water",
        "url": "https://leetcode.com/problems/trapping-rain-water/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "AC076"
        ]
      }
    ]
  },
  {
    "id": "P3-U1B",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 1B: Queues & Circular/Deque Variations",
    "hours": 3,
    "subtopics": [
      "Queue FIFO ADT: Linear Queue Array & Linked List Implementation, Enqueue, Dequeue & Peek",
      "Circular Queue Modulo Indexing, Double-Ended Queue (Deque) & Priority Queue Overview",
      "STL std::queue and std::deque Applications (Sliding Window Maximum)"
    ],
    "videos": [
      {
        "id": "Khf9v67Ya30",
        "title": "Queue Data Structure in C++",
        "url": "https://www.youtube.com/watch?v=Khf9v67Ya30",
        "type": "Playlist",
        "playlistIndex": 79,
        "minutes": 19
      },
      {
        "id": "4mKKolshFD0",
        "title": "Lec 78: Circular Queue in Data Structure",
        "url": "https://www.youtube.com/watch?v=4mKKolshFD0",
        "type": "Playlist",
        "playlistIndex": 80,
        "minutes": 19
      },
      {
        "id": "AC081",
        "title": "Implement Queue using Stack & Stack using Queue",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=81",
        "type": "Playlist",
        "playlistIndex": 81,
        "minutes": 16,
        "playlistOnly": true
      },
      {
        "id": "AC082",
        "title": "First Unique Character in a String",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=82",
        "type": "Playlist",
        "playlistIndex": 82,
        "minutes": 13,
        "playlistOnly": true
      },
      {
        "id": "AC083",
        "title": "Sliding Window Maximum",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=83",
        "type": "Playlist",
        "playlistIndex": 83,
        "minutes": 31,
        "playlistOnly": true
      },
      {
        "id": "AC084",
        "title": "Gas Station (Greedy Approach)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=84",
        "type": "Playlist",
        "playlistIndex": 84,
        "minutes": 22,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P3-U1B-PR3",
        "title": "Implement Queue using Stacks",
        "url": "https://leetcode.com/problems/implement-queue-using-stacks/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "Khf9v67Ya30",
          "AC081"
        ]
      },
      {
        "id": "P3-U1B-PR4",
        "title": "Implement Stack using Queues",
        "url": "https://leetcode.com/problems/implement-stack-using-queues/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "Khf9v67Ya30",
          "AC081"
        ]
      },
      {
        "id": "P3-U1B-PR5",
        "title": "Number of Recent Calls (Queue Window)",
        "url": "https://leetcode.com/problems/number-of-recent-calls/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "Khf9v67Ya30"
        ]
      },
      {
        "id": "P3-U1B-PR6",
        "title": "Number of Students Unable to Eat Lunch (Queue Simulation)",
        "url": "https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "Khf9v67Ya30"
        ]
      },
      {
        "id": "P3-U1B-PR11",
        "title": "First Unique Character in a String",
        "url": "https://leetcode.com/problems/first-unique-character-in-a-string/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC082"
        ]
      },
      {
        "id": "P3-U1B-PR1",
        "title": "Design Circular Queue",
        "url": "https://leetcode.com/problems/design-circular-queue/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "4mKKolshFD0"
        ]
      },
      {
        "id": "P3-U1B-PR7",
        "title": "Josephus Problem I (Circular Queue Simulation)",
        "url": "https://cses.fi/problemset/task/2162",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "4mKKolshFD0"
        ]
      },
      {
        "id": "P3-U1B-PR8",
        "title": "Find the Winner of the Circular Game",
        "url": "https://leetcode.com/problems/find-the-winner-of-the-circular-game/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "4mKKolshFD0"
        ]
      },
      {
        "id": "P3-U1B-PR9",
        "title": "Design Circular Deque",
        "url": "https://leetcode.com/problems/design-circular-deque/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "4mKKolshFD0"
        ]
      },
      {
        "id": "P3-U1B-PR12",
        "title": "Gas Station",
        "url": "https://leetcode.com/problems/gas-station/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC084"
        ]
      },
      {
        "id": "P3-U1B-PR2",
        "title": "Sliding Window Maximum (Monotonic Deque)",
        "url": "https://leetcode.com/problems/sliding-window-maximum/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "Khf9v67Ya30",
          "AC083"
        ]
      },
      {
        "id": "P3-U1B-PR10",
        "title": "Shortest Subarray with Sum at Least K (Monotonic Deque)",
        "url": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "Khf9v67Ya30"
        ]
      }
    ]
  },
  {
    "id": "P3-U2A",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 2A: Recursion Mechanics & Recurrence Complexity",
    "hours": 3,
    "subtopics": [
      "Recursion Taxonomy: Direct, Indirect, Singly, Multiply, Tail, Non-Tail & Nested Recursion",
      "Iteration vs Recursion Trade-offs, Stack Overflow Prevention & Backtracking Search Trees",
      "Solving Recurrence Relations: Substitution/Iteration Method, Recursion Tree & Master Theorem"
    ],
    "videos": [
      {
        "id": "9OsMG4fI4OY",
        "title": "Recursion Part 1: Fundamentals",
        "url": "https://www.youtube.com/watch?v=9OsMG4fI4OY",
        "type": "Playlist",
        "playlistIndex": 42,
        "minutes": 46
      },
      {
        "id": "4iT-GhvSKzc",
        "title": "Recursion Part 2: Intermediate Problems",
        "url": "https://www.youtube.com/watch?v=4iT-GhvSKzc",
        "type": "Playlist",
        "playlistIndex": 43,
        "minutes": 42
      },
      {
        "id": "pNzljlzDCiI",
        "title": "Recursion Part 3: Backtracking in Detail",
        "url": "https://www.youtube.com/watch?v=pNzljlzDCiI",
        "type": "Playlist",
        "playlistIndex": 44,
        "minutes": 42
      },
      {
        "id": "oZ-ZIhJyy9o",
        "title": "Time Complexity using Master's Theorem & Recurrence",
        "url": "https://www.youtube.com/watch?v=oZ-ZIhJyy9o",
        "type": "Archive",
        "minutes": 30
      },
      {
        "id": "AC045",
        "title": "Permutations of an Array/String (Recursion & Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=45",
        "type": "Playlist",
        "playlistIndex": 45,
        "minutes": 23,
        "playlistOnly": true
      },
      {
        "id": "AC046",
        "title": "N-Queens Problem (Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=46",
        "type": "Playlist",
        "playlistIndex": 46,
        "minutes": 24,
        "playlistOnly": true
      },
      {
        "id": "AC047",
        "title": "Sudoku Solver (Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=47",
        "type": "Playlist",
        "playlistIndex": 47,
        "minutes": 27,
        "playlistOnly": true
      },
      {
        "id": "AC048",
        "title": "Rat in a Maze (Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=48",
        "type": "Playlist",
        "playlistIndex": 48,
        "minutes": 33,
        "playlistOnly": true
      },
      {
        "id": "AC049",
        "title": "Combination Sum (Recursion & Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=49",
        "type": "Playlist",
        "playlistIndex": 49,
        "minutes": 24,
        "playlistOnly": true
      },
      {
        "id": "AC050",
        "title": "Palindrome Partitioning (Recursion & Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=50",
        "type": "Playlist",
        "playlistIndex": 50,
        "minutes": 21,
        "playlistOnly": true
      },
      {
        "id": "AC055",
        "title": "Knight's Tour (Backtracking)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=55",
        "type": "Playlist",
        "playlistIndex": 55,
        "minutes": 23,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P3-U2A-PR11",
        "title": "Power of Three (Recursive Base Case)",
        "url": "https://leetcode.com/problems/power-of-three/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      },
      {
        "id": "P3-U2A-PR12",
        "title": "Power of Four (Recursion vs Iteration)",
        "url": "https://leetcode.com/problems/power-of-four/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "9OsMG4fI4OY"
        ]
      },
      {
        "id": "P3-U2A-PR1",
        "title": "Subsets (Backtracking Recursion Tree)",
        "url": "https://leetcode.com/problems/subsets/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "4iT-GhvSKzc"
        ]
      },
      {
        "id": "P3-U2A-PR2",
        "title": "Permutations",
        "url": "https://leetcode.com/problems/permutations/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "pNzljlzDCiI",
          "AC045"
        ]
      },
      {
        "id": "P3-U2A-PR3",
        "title": "Combinations (Backtracking)",
        "url": "https://leetcode.com/problems/combinations/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "pNzljlzDCiI"
        ]
      },
      {
        "id": "P3-U2A-PR4",
        "title": "Combination Sum",
        "url": "https://leetcode.com/problems/combination-sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "pNzljlzDCiI",
          "AC049"
        ]
      },
      {
        "id": "P3-U2A-PR5",
        "title": "Letter Combinations of a Phone Number",
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "4iT-GhvSKzc"
        ]
      },
      {
        "id": "P3-U2A-PR6",
        "title": "Generate Parentheses",
        "url": "https://leetcode.com/problems/generate-parentheses/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "pNzljlzDCiI"
        ]
      },
      {
        "id": "P3-U2A-PR7",
        "title": "Word Search (Backtracking on Grid)",
        "url": "https://leetcode.com/problems/word-search/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "pNzljlzDCiI"
        ]
      },
      {
        "id": "P3-U2A-PR8",
        "title": "Apple Division (Recursive Subset Split)",
        "url": "https://cses.fi/problemset/task/1623",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "4iT-GhvSKzc"
        ]
      },
      {
        "id": "P3-U2A-PR9",
        "title": "Chessboard and Queens (Backtracking)",
        "url": "https://cses.fi/problemset/task/1624",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "pNzljlzDCiI"
        ]
      },
      {
        "id": "P3-U2A-PR13",
        "title": "Count Good Numbers (Recurrence T(n) = T(n/2) + O(1))",
        "url": "https://leetcode.com/problems/count-good-numbers/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "oZ-ZIhJyy9o"
        ]
      },
      {
        "id": "P3-U2A-PR14",
        "title": "Tower of Hanoi (Recurrence T(n) = 2T(n−1) + 1)",
        "url": "https://cses.fi/problemset/task/2165",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "oZ-ZIhJyy9o"
        ]
      },
      {
        "id": "P3-U2A-PR17",
        "title": "Path with Maximum Gold",
        "url": "https://leetcode.com/problems/path-with-maximum-gold/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC048"
        ]
      },
      {
        "id": "P3-U2A-PR18",
        "title": "Palindrome Partitioning",
        "url": "https://leetcode.com/problems/palindrome-partitioning/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC050"
        ]
      },
      {
        "id": "P3-U2A-PR19",
        "title": "Check Knight Tour Configuration",
        "url": "https://leetcode.com/problems/check-knight-tour-configuration/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC055"
        ]
      },
      {
        "id": "P3-U2A-PR10",
        "title": "N-Queens (Backtracking)",
        "url": "https://leetcode.com/problems/n-queens/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "pNzljlzDCiI",
          "AC046"
        ]
      },
      {
        "id": "P3-U2A-PR15",
        "title": "Sudoku Solver",
        "url": "https://leetcode.com/problems/sudoku-solver/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "AC047"
        ]
      },
      {
        "id": "P3-U2A-PR16",
        "title": "Grid Paths (Backtracking on a Grid)",
        "url": "https://cses.fi/problemset/task/1625",
        "platform": "CSES",
        "difficulty": "Hard",
        "videoIds": [
          "AC048"
        ]
      }
    ]
  },
  {
    "id": "P3-U2B",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 2B: Divide & Conquer Sorting (Merge & Quick Sort)",
    "hours": 3,
    "subtopics": [
      "Divide and Conquer Paradigm: Break, Solve Subproblems & Combine Solutions",
      "Merge Sort: Recursive Halving, Two-Pointer Merge Routine & O(N log N) Stability Analysis",
      "Quick Sort: Pivot Partitioning Schemes, Best/Average O(N log N) vs Worst O(N²) Analysis"
    ],
    "videos": [
      {
        "id": "cQDtOBTy7_Y",
        "title": "Merge Sort Algorithm | Recursion & Backtracking",
        "url": "https://www.youtube.com/watch?v=cQDtOBTy7_Y",
        "type": "Playlist",
        "playlistIndex": 51,
        "minutes": 32
      },
      {
        "id": "8MNB0Mba_Dc",
        "title": "Lec 51: Quick Sort Algorithm",
        "url": "https://www.youtube.com/watch?v=8MNB0Mba_Dc",
        "type": "Playlist",
        "playlistIndex": 52,
        "minutes": 26
      },
      {
        "id": "AC053",
        "title": "Major Update & Reaching 1000M Views",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=53",
        "type": "Playlist",
        "playlistIndex": 53,
        "minutes": 4,
        "playlistOnly": true
      },
      {
        "id": "AC054",
        "title": "Count Inversions (Brute & Optimal)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=54",
        "type": "Playlist",
        "playlistIndex": 54,
        "minutes": 25,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P3-U2B-PR2",
        "title": "Majority Element (Divide & Conquer Approach)",
        "url": "https://leetcode.com/problems/majority-element/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "cQDtOBTy7_Y"
        ]
      },
      {
        "id": "P3-U2B-PR1",
        "title": "Sort an Array (Merge & Quick Sort Implementation)",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "8MNB0Mba_Dc"
        ]
      },
      {
        "id": "P3-U2B-PR3",
        "title": "Sort List (Merge Sort on Linked List)",
        "url": "https://leetcode.com/problems/sort-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "cQDtOBTy7_Y"
        ]
      },
      {
        "id": "P3-U2B-PR6",
        "title": "Minimum Moves to Equal Array Elements II (Quickselect Median)",
        "url": "https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "8MNB0Mba_Dc"
        ]
      },
      {
        "id": "P3-U2B-PR7",
        "title": "Counting Inversions (Merge Sort)",
        "url": "https://www.geeksforgeeks.org/counting-inversions/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "AC054"
        ]
      },
      {
        "id": "P3-U2B-PR4",
        "title": "Count of Smaller Numbers After Self (Merge Sort)",
        "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "cQDtOBTy7_Y",
          "AC054"
        ]
      },
      {
        "id": "P3-U2B-PR5",
        "title": "Reverse Pairs (Merge Sort Counting)",
        "url": "https://leetcode.com/problems/reverse-pairs/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "cQDtOBTy7_Y",
          "AC054"
        ]
      }
    ]
  },
  {
    "id": "P3-U3",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 3: Binary Trees, BSTs, Height-Balanced Trees & Tries",
    "hours": 8,
    "subtopics": [
      "Tree Terminology & Types: Complete, Strict, Skewed & Multi-way Trees; BFS & DFS (Pre/In/Post) Traversals",
      "Binary Search Trees (BST): Create, Search, Insert, Delete (Inorder Predecessor/Successor) & Expression Trees",
      "Height-Balanced Trees: AVL Rotations (LL, RR, LR, RL), Red-Black Trees, B-Trees, B+ Trees & Threaded BT",
      "Tries (Prefix Trees): Node Structure, Building a Trie, Word Insert, Search & Prefix Matching"
    ],
    "videos": [
      {
        "id": "eKJrXBCRuNQ",
        "title": "Binary Trees & Tree Traversal Complete Guide",
        "url": "https://www.youtube.com/watch?v=eKJrXBCRuNQ",
        "type": "Playlist",
        "playlistIndex": 85,
        "minutes": 74
      },
      {
        "id": "AC086",
        "title": "Height of a Binary Tree & Count of Nodes",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=86",
        "type": "Playlist",
        "playlistIndex": 86,
        "minutes": 23,
        "playlistOnly": true
      },
      {
        "id": "AC087",
        "title": "Identical Tree & Subtree of Another Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=87",
        "type": "Playlist",
        "playlistIndex": 87,
        "minutes": 23,
        "playlistOnly": true
      },
      {
        "id": "AC088",
        "title": "Diameter of a Binary Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=88",
        "type": "Playlist",
        "playlistIndex": 88,
        "minutes": 19,
        "playlistOnly": true
      },
      {
        "id": "AC089",
        "title": "Top View of a Binary Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=89",
        "type": "Playlist",
        "playlistIndex": 89,
        "minutes": 20,
        "playlistOnly": true
      },
      {
        "id": "AC090",
        "title": "Kth Level of a Binary Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=90",
        "type": "Playlist",
        "playlistIndex": 90,
        "minutes": 8,
        "playlistOnly": true
      },
      {
        "id": "AC091",
        "title": "Lowest Common Ancestor in a Binary Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=91",
        "type": "Playlist",
        "playlistIndex": 91,
        "minutes": 18,
        "playlistOnly": true
      },
      {
        "id": "AC092",
        "title": "Build Tree from Preorder & Inorder",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=92",
        "type": "Playlist",
        "playlistIndex": 92,
        "minutes": 21,
        "playlistOnly": true
      },
      {
        "id": "AC093",
        "title": "Transform to Sum Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=93",
        "type": "Playlist",
        "playlistIndex": 93,
        "minutes": 9,
        "playlistOnly": true
      },
      {
        "id": "AC094",
        "title": "Binary Tree Paths",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=94",
        "type": "Playlist",
        "playlistIndex": 94,
        "minutes": 10,
        "playlistOnly": true
      },
      {
        "id": "AC095",
        "title": "Maximum Width of a Binary Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=95",
        "type": "Playlist",
        "playlistIndex": 95,
        "minutes": 21,
        "playlistOnly": true
      },
      {
        "id": "AC096",
        "title": "Morris Inorder Traversal",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=96",
        "type": "Playlist",
        "playlistIndex": 96,
        "minutes": 18,
        "playlistOnly": true
      },
      {
        "id": "AC097",
        "title": "Flatten Binary Tree to Linked List",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=97",
        "type": "Playlist",
        "playlistIndex": 97,
        "minutes": 16,
        "playlistOnly": true
      },
      {
        "id": "RuF7dPfj27Q",
        "title": "Lec 96: Binary Search Trees (BSTs)",
        "url": "https://www.youtube.com/watch?v=RuF7dPfj27Q",
        "type": "Playlist",
        "playlistIndex": 98,
        "minutes": 43
      },
      {
        "id": "AC099",
        "title": "Sorted Array to Balanced BST",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=99",
        "type": "Playlist",
        "playlistIndex": 99,
        "minutes": 9,
        "playlistOnly": true
      },
      {
        "id": "AC100",
        "title": "Validate Binary Search Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=100",
        "type": "Playlist",
        "playlistIndex": 100,
        "minutes": 13,
        "playlistOnly": true
      },
      {
        "id": "AC101",
        "title": "Min Distance Between BST Nodes",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=101",
        "type": "Playlist",
        "playlistIndex": 101,
        "minutes": 14,
        "playlistOnly": true
      },
      {
        "id": "AC102",
        "title": "Lowest Common Ancestor in a BST",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=102",
        "type": "Playlist",
        "playlistIndex": 102,
        "minutes": 12,
        "playlistOnly": true
      },
      {
        "id": "AC103",
        "title": "Kth Smallest in a BST",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=103",
        "type": "Playlist",
        "playlistIndex": 103,
        "minutes": 13,
        "playlistOnly": true
      },
      {
        "id": "AC104",
        "title": "Construct BST from Preorder",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=104",
        "type": "Playlist",
        "playlistIndex": 104,
        "minutes": 19,
        "playlistOnly": true
      },
      {
        "id": "AC105",
        "title": "Merge Two Binary Search Trees",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=105",
        "type": "Playlist",
        "playlistIndex": 105,
        "minutes": 17,
        "playlistOnly": true
      },
      {
        "id": "AC106",
        "title": "Recover BST",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=106",
        "type": "Playlist",
        "playlistIndex": 106,
        "minutes": 24,
        "playlistOnly": true
      },
      {
        "id": "AC107",
        "title": "Largest BST in a Binary Tree",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=107",
        "type": "Playlist",
        "playlistIndex": 107,
        "minutes": 25,
        "playlistOnly": true
      },
      {
        "id": "AC108",
        "title": "Populate Next Right Pointers in Each Node",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=108",
        "type": "Playlist",
        "playlistIndex": 108,
        "minutes": 11,
        "playlistOnly": true
      },
      {
        "id": "AC109",
        "title": "BST Iterator",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=109",
        "type": "Playlist",
        "playlistIndex": 109,
        "minutes": 17,
        "playlistOnly": true
      },
      {
        "id": "IHNkql1tAnk",
        "title": "Lec 108: Inorder Predecessor & Successor in BST",
        "url": "https://www.youtube.com/watch?v=IHNkql1tAnk",
        "type": "Playlist",
        "playlistIndex": 110,
        "minutes": 20
      }
    ],
    "problems": [
      {
        "id": "P3-U3-PR4",
        "title": "Binary Tree Inorder Traversal (DFS)",
        "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "eKJrXBCRuNQ",
          "AC096"
        ]
      },
      {
        "id": "P3-U3-PR5",
        "title": "Binary Tree Preorder Traversal (DFS)",
        "url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "eKJrXBCRuNQ"
        ]
      },
      {
        "id": "P3-U3-PR6",
        "title": "Maximum Depth of Binary Tree",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "eKJrXBCRuNQ",
          "AC086"
        ]
      },
      {
        "id": "P3-U3-PR7",
        "title": "Balanced Binary Tree (Height-Balanced Check)",
        "url": "https://leetcode.com/problems/balanced-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "eKJrXBCRuNQ"
        ]
      },
      {
        "id": "P3-U3-PR8",
        "title": "Search in a Binary Search Tree",
        "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "RuF7dPfj27Q"
        ]
      },
      {
        "id": "P3-U3-PR18",
        "title": "Minimum Absolute Difference in BST (Inorder Neighbors)",
        "url": "https://leetcode.com/problems/minimum-absolute-difference-in-bst/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "IHNkql1tAnk",
          "AC101"
        ]
      },
      {
        "id": "P3-U3-PR20",
        "title": "Count Complete Tree Nodes",
        "url": "https://leetcode.com/problems/count-complete-tree-nodes/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC086"
        ]
      },
      {
        "id": "P3-U3-PR21",
        "title": "Same Tree",
        "url": "https://leetcode.com/problems/same-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC087"
        ]
      },
      {
        "id": "P3-U3-PR22",
        "title": "Subtree of Another Tree",
        "url": "https://leetcode.com/problems/subtree-of-another-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC087"
        ]
      },
      {
        "id": "P3-U3-PR23",
        "title": "Diameter of Binary Tree",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC088"
        ]
      },
      {
        "id": "P3-U3-PR25",
        "title": "Average of Levels in Binary Tree (Level by Level)",
        "url": "https://leetcode.com/problems/average-of-levels-in-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC090"
        ]
      },
      {
        "id": "P3-U3-PR29",
        "title": "Binary Tree Paths",
        "url": "https://leetcode.com/problems/binary-tree-paths/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC094"
        ]
      },
      {
        "id": "P3-U3-PR32",
        "title": "Convert Sorted Array to Binary Search Tree",
        "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC099"
        ]
      },
      {
        "id": "P3-U3-PR33",
        "title": "Minimum Distance Between BST Nodes",
        "url": "https://leetcode.com/problems/minimum-distance-between-bst-nodes/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC101"
        ]
      },
      {
        "id": "P3-U3-PR1",
        "title": "Binary Tree Level Order Traversal (BFS)",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "eKJrXBCRuNQ",
          "AC090"
        ]
      },
      {
        "id": "P3-U3-PR2",
        "title": "Validate Binary Search Tree",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "RuF7dPfj27Q",
          "AC100"
        ]
      },
      {
        "id": "P3-U3-PR3",
        "title": "Implement Trie (Prefix Tree)",
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "eKJrXBCRuNQ"
        ]
      },
      {
        "id": "P3-U3-PR9",
        "title": "Insert into a Binary Search Tree",
        "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "RuF7dPfj27Q"
        ]
      },
      {
        "id": "P3-U3-PR10",
        "title": "Delete Node in a BST",
        "url": "https://leetcode.com/problems/delete-node-in-a-bst/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "IHNkql1tAnk"
        ]
      },
      {
        "id": "P3-U3-PR11",
        "title": "Kth Smallest Element in a BST",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "RuF7dPfj27Q",
          "AC103"
        ]
      },
      {
        "id": "P3-U3-PR12",
        "title": "Design Add and Search Words Data Structure (Trie)",
        "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "eKJrXBCRuNQ"
        ]
      },
      {
        "id": "P3-U3-PR13",
        "title": "Tree Diameter",
        "url": "https://cses.fi/problemset/task/1131",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "eKJrXBCRuNQ",
          "AC088"
        ]
      },
      {
        "id": "P3-U3-PR14",
        "title": "AVL Tree Insertion (LL, RR, LR, RL Rotations)",
        "url": "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "RuF7dPfj27Q"
        ]
      },
      {
        "id": "P3-U3-PR15",
        "title": "B-Tree Introduction & Insertion",
        "url": "https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "RuF7dPfj27Q"
        ]
      },
      {
        "id": "P3-U3-PR16",
        "title": "Threaded Binary Tree (Traversal & Insertion)",
        "url": "https://www.geeksforgeeks.org/threaded-binary-tree/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "eKJrXBCRuNQ"
        ]
      },
      {
        "id": "P3-U3-PR19",
        "title": "Lowest Common Ancestor of a Binary Search Tree",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "IHNkql1tAnk",
          "AC102"
        ]
      },
      {
        "id": "P3-U3-PR24",
        "title": "Top View of Binary Tree",
        "url": "https://www.geeksforgeeks.org/print-nodes-in-top-view-of-binary-tree/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "AC089"
        ]
      },
      {
        "id": "P3-U3-PR26",
        "title": "Lowest Common Ancestor of a Binary Tree",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC091"
        ]
      },
      {
        "id": "P3-U3-PR27",
        "title": "Construct Binary Tree from Preorder and Inorder Traversal",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC092"
        ]
      },
      {
        "id": "P3-U3-PR28",
        "title": "Most Frequent Subtree Sum (Subtree Sums)",
        "url": "https://leetcode.com/problems/most-frequent-subtree-sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC093"
        ]
      },
      {
        "id": "P3-U3-PR30",
        "title": "Maximum Width of Binary Tree",
        "url": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC095"
        ]
      },
      {
        "id": "P3-U3-PR31",
        "title": "Flatten Binary Tree to Linked List",
        "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC097"
        ]
      },
      {
        "id": "P3-U3-PR34",
        "title": "Construct Binary Search Tree from Preorder Traversal",
        "url": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC104"
        ]
      },
      {
        "id": "P3-U3-PR35",
        "title": "All Elements in Two Binary Search Trees",
        "url": "https://leetcode.com/problems/all-elements-in-two-binary-search-trees/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC105"
        ]
      },
      {
        "id": "P3-U3-PR36",
        "title": "Recover Binary Search Tree",
        "url": "https://leetcode.com/problems/recover-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC106"
        ]
      },
      {
        "id": "P3-U3-PR38",
        "title": "Populating Next Right Pointers in Each Node",
        "url": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC108"
        ]
      },
      {
        "id": "P3-U3-PR39",
        "title": "Binary Search Tree Iterator",
        "url": "https://leetcode.com/problems/binary-search-tree-iterator/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC109"
        ]
      },
      {
        "id": "P3-U3-PR17",
        "title": "Word Search II (Trie + Backtracking)",
        "url": "https://leetcode.com/problems/word-search-ii/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "eKJrXBCRuNQ"
        ]
      },
      {
        "id": "P3-U3-PR37",
        "title": "Maximum Sum BST in Binary Tree (Largest-BST Pattern)",
        "url": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "AC107"
        ]
      }
    ]
  },
  {
    "id": "P3-U4",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 4: Heaps, Heap Sort & STL Priority Queues",
    "hours": 8,
    "subtopics": [
      "Heap Fundamentals: Complete Binary Tree Array Representation, Min-Heap & Max-Heap Properties",
      "Heap Operations: Bottom-up Build-Heap O(N), Sift-Up / Sift-Down (Heapify) & In-Place Heap Sort",
      "Heap as Priority Queue: Use Cases vs Stack/Queue, STL std::priority_queue & Custom Struct Comparators"
    ],
    "videos": [
      {
        "id": "okhdtEk1iKk",
        "title": "STL Priority Queue & Custom Comparators (STL One Shot)",
        "url": "https://www.youtube.com/watch?v=okhdtEk1iKk",
        "type": "Playlist",
        "playlistIndex": 27,
        "minutes": 87
      },
      {
        "id": "YlmU4gBgePA",
        "title": "DSA Series Update: Heaps & Tries Roadmap",
        "url": "https://www.youtube.com/watch?v=YlmU4gBgePA",
        "type": "Playlist",
        "playlistIndex": 126,
        "minutes": 6
      }
    ],
    "problems": [
      {
        "id": "P3-U4-PR3",
        "title": "Kth Largest Element in a Stream (Min-Heap)",
        "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR4",
        "title": "Last Stone Weight (Max-Heap)",
        "url": "https://leetcode.com/problems/last-stone-weight/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR1",
        "title": "Kth Largest Element in an Array (Min-Heap)",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR2",
        "title": "Top K Frequent Elements (Priority Queue)",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR5",
        "title": "K Closest Points to Origin (Heap / Custom Comparator)",
        "url": "https://leetcode.com/problems/k-closest-points-to-origin/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR6",
        "title": "Top K Frequent Words (Heap + Comparator)",
        "url": "https://leetcode.com/problems/top-k-frequent-words/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR7",
        "title": "Task Scheduler (Max-Heap)",
        "url": "https://leetcode.com/problems/task-scheduler/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR8",
        "title": "Reorganize String (Max-Heap)",
        "url": "https://leetcode.com/problems/reorganize-string/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      },
      {
        "id": "P3-U4-PR9",
        "title": "Heap Sort (Build-Heap & Heapify)",
        "url": "https://www.geeksforgeeks.org/heap-sort/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "YlmU4gBgePA"
        ]
      },
      {
        "id": "P3-U4-PR10",
        "title": "Find Median from Data Stream (Two Heaps)",
        "url": "https://leetcode.com/problems/find-median-from-data-stream/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "YlmU4gBgePA"
        ]
      },
      {
        "id": "P3-U4-PR11",
        "title": "Merge k Sorted Lists (Min-Heap)",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "okhdtEk1iKk"
        ]
      }
    ]
  },
  {
    "id": "P3-U5A",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 5A: Graph Representations & BFS/DFS Traversals",
    "hours": 4,
    "subtopics": [
      "Graph Terminology & Types: Directed, Undirected, Weighted, Cyclic, Acyclic, Bipartite & Complete Graphs",
      "Graph Memory Representations: Adjacency Matrix vs Adjacency List Space/Time Trade-offs",
      "Graph Traversal Algorithms: Breadth-First Search (BFS) & Depth-First Search (DFS) Across Components"
    ],
    "videos": [
      {
        "id": "RpgyCJBbl5E",
        "title": "Introduction to Graphs | Representations",
        "url": "https://www.youtube.com/watch?v=RpgyCJBbl5E",
        "type": "Playlist",
        "playlistIndex": 111,
        "minutes": 26
      },
      {
        "id": "3czYbhac160",
        "title": "DFS Traversal in Graphs",
        "url": "https://www.youtube.com/watch?v=3czYbhac160",
        "type": "Playlist",
        "playlistIndex": 112,
        "minutes": 14
      },
      {
        "id": "scQITTLgFJo",
        "title": "BFS Traversal in Graphs",
        "url": "https://www.youtube.com/watch?v=scQITTLgFJo",
        "type": "Playlist",
        "playlistIndex": 113,
        "minutes": 19
      },
      {
        "id": "AC116",
        "title": "Number of Islands (Connected Components in a Matrix)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=116",
        "type": "Playlist",
        "playlistIndex": 116,
        "minutes": 17,
        "playlistOnly": true
      },
      {
        "id": "AC117",
        "title": "Rotting Oranges (Multi-Source BFS)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=117",
        "type": "Playlist",
        "playlistIndex": 117,
        "minutes": 26,
        "playlistOnly": true
      },
      {
        "id": "AC122",
        "title": "Flood Fill Algorithm",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=122",
        "type": "Playlist",
        "playlistIndex": 122,
        "minutes": 15,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P3-U5A-PR3",
        "title": "Find the Town Judge (Graph Degrees)",
        "url": "https://leetcode.com/problems/find-the-town-judge/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "RpgyCJBbl5E"
        ]
      },
      {
        "id": "P3-U5A-PR4",
        "title": "Find if Path Exists in Graph (BFS/DFS)",
        "url": "https://leetcode.com/problems/find-if-path-exists-in-graph/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "RpgyCJBbl5E"
        ]
      },
      {
        "id": "P3-U5A-PR5",
        "title": "Flood Fill (Grid DFS/BFS)",
        "url": "https://leetcode.com/problems/flood-fill/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "3czYbhac160",
          "AC122"
        ]
      },
      {
        "id": "P3-U5A-PR1",
        "title": "Number of Islands (Grid BFS/DFS)",
        "url": "https://leetcode.com/problems/number-of-islands/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "3czYbhac160",
          "AC116"
        ]
      },
      {
        "id": "P3-U5A-PR2",
        "title": "Is Graph Bipartite?",
        "url": "https://leetcode.com/problems/is-graph-bipartite/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "scQITTLgFJo"
        ]
      },
      {
        "id": "P3-U5A-PR6",
        "title": "Counting Rooms (Grid DFS/BFS Components)",
        "url": "https://cses.fi/problemset/task/1192",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "3czYbhac160"
        ]
      },
      {
        "id": "P3-U5A-PR7",
        "title": "Message Route (BFS Shortest Path)",
        "url": "https://cses.fi/problemset/task/1667",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "scQITTLgFJo"
        ]
      },
      {
        "id": "P3-U5A-PR8",
        "title": "Building Roads (Connected Components)",
        "url": "https://cses.fi/problemset/task/1666",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "3czYbhac160"
        ]
      },
      {
        "id": "P3-U5A-PR9",
        "title": "Max Area of Island (Grid DFS)",
        "url": "https://leetcode.com/problems/max-area-of-island/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "3czYbhac160"
        ]
      },
      {
        "id": "P3-U5A-PR10",
        "title": "Clone Graph (Adjacency List + DFS/BFS)",
        "url": "https://leetcode.com/problems/clone-graph/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "RpgyCJBbl5E"
        ]
      },
      {
        "id": "P3-U5A-PR11",
        "title": "Rotting Oranges (Multi-Source BFS)",
        "url": "https://leetcode.com/problems/rotting-oranges/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "scQITTLgFJo",
          "AC117"
        ]
      },
      {
        "id": "P3-U5A-PR12",
        "title": "All Paths From Source to Target (DFS)",
        "url": "https://leetcode.com/problems/all-paths-from-source-to-target/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "3czYbhac160"
        ]
      },
      {
        "id": "P3-U5A-PR13",
        "title": "Shortest Path in Binary Matrix (BFS)",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "scQITTLgFJo"
        ]
      }
    ]
  },
  {
    "id": "P3-U5B",
    "phase": 3,
    "phaseName": "Phase 3: Advanced Data Structures & Algorithms",
    "courseCode": "25CS303",
    "unitTitle": "Unit 5B: Advanced Graph Algorithms & Applications",
    "hours": 4,
    "subtopics": [
      "Cycle Detection in Undirected Graphs (BFS & DFS) and Directed Graphs (DFS Recursion Stack)",
      "Directed Acyclic Graphs (DAG) & Topological Sorting: DFS Post-Order Stack & Kahn's BFS Indegree Algorithm",
      "Strongly Connected Components (Kosaraju's/Tarjan's), Articulation Points, Bridges & Bi-connected Components"
    ],
    "videos": [
      {
        "id": "OZClCpPQDR4",
        "title": "Undirected Cycle Detection using DFS",
        "url": "https://www.youtube.com/watch?v=OZClCpPQDR4",
        "type": "Playlist",
        "playlistIndex": 114,
        "minutes": 20
      },
      {
        "id": "MIjOkApZ39g",
        "title": "Undirected Cycle Detection using BFS",
        "url": "https://www.youtube.com/watch?v=MIjOkApZ39g",
        "type": "Playlist",
        "playlistIndex": 115,
        "minutes": 18
      },
      {
        "id": "AcppN5XFt24",
        "title": "Lec 116: Directed Graph Cycle Detection (DFS)",
        "url": "https://www.youtube.com/watch?v=AcppN5XFt24",
        "type": "Playlist",
        "playlistIndex": 118,
        "minutes": 16
      },
      {
        "id": "0WIINUY12Yg",
        "title": "Lec 117: Topological Sort (DFS)",
        "url": "https://www.youtube.com/watch?v=0WIINUY12Yg",
        "type": "Playlist",
        "playlistIndex": 119,
        "minutes": 16
      },
      {
        "id": "AC120",
        "title": "Course Schedule (Graph & Topological Sort)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=120",
        "type": "Playlist",
        "playlistIndex": 120,
        "minutes": 18,
        "playlistOnly": true
      },
      {
        "id": "AC121",
        "title": "Course Schedule II (Topological Sort)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=121",
        "type": "Playlist",
        "playlistIndex": 121,
        "minutes": 20,
        "playlistOnly": true
      },
      {
        "id": "BnQpaTZg6Sc",
        "title": "Lec 121: Topological Sort (Kahn's BFS Algorithm)",
        "url": "https://www.youtube.com/watch?v=BnQpaTZg6Sc",
        "type": "Playlist",
        "playlistIndex": 123,
        "minutes": 19
      },
      {
        "id": "59fUtYYz7ZU",
        "title": "Complete Graph One-Shot (SCC, Bridges & Articulation Points)",
        "url": "https://www.youtube.com/watch?v=59fUtYYz7ZU",
        "type": "Archive",
        "minutes": 60
      },
      {
        "id": "AC133",
        "title": "Bridges in a Graph using Tarjan's Algorithm",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=133",
        "type": "Playlist",
        "playlistIndex": 133,
        "minutes": 33,
        "playlistOnly": true
      },
      {
        "id": "AC134",
        "title": "Articulation Points using Tarjan's Algorithm",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=134",
        "type": "Playlist",
        "playlistIndex": 134,
        "minutes": 37,
        "playlistOnly": true
      },
      {
        "id": "AC135",
        "title": "Strongly Connected Components - Kosaraju's Algorithm",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=135",
        "type": "Playlist",
        "playlistIndex": 135,
        "minutes": 26,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P3-U5B-PR1",
        "title": "Course Schedule II (Topological Sort / Kahn's)",
        "url": "https://leetcode.com/problems/course-schedule-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "BnQpaTZg6Sc",
          "AC121"
        ]
      },
      {
        "id": "P3-U5B-PR3",
        "title": "Course Schedule (Directed Cycle Detection)",
        "url": "https://leetcode.com/problems/course-schedule/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AcppN5XFt24",
          "AC120"
        ]
      },
      {
        "id": "P3-U5B-PR4",
        "title": "Redundant Connection (Undirected Cycle)",
        "url": "https://leetcode.com/problems/redundant-connection/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "OZClCpPQDR4"
        ]
      },
      {
        "id": "P3-U5B-PR5",
        "title": "Find Eventual Safe States (Directed Cycle / Topo)",
        "url": "https://leetcode.com/problems/find-eventual-safe-states/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AcppN5XFt24"
        ]
      },
      {
        "id": "P3-U5B-PR6",
        "title": "Round Trip (Undirected Cycle Detection)",
        "url": "https://cses.fi/problemset/task/1669",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "OZClCpPQDR4"
        ]
      },
      {
        "id": "P3-U5B-PR7",
        "title": "Round Trip II (Directed Cycle Detection)",
        "url": "https://cses.fi/problemset/task/1678",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AcppN5XFt24"
        ]
      },
      {
        "id": "P3-U5B-PR8",
        "title": "Course Schedule (Topological Sort)",
        "url": "https://cses.fi/problemset/task/1679",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "0WIINUY12Yg",
          "AC120"
        ]
      },
      {
        "id": "P3-U5B-PR9",
        "title": "Flight Routes Check (Strongly Connected Components)",
        "url": "https://cses.fi/problemset/task/1682",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "59fUtYYz7ZU",
          "AC135"
        ]
      },
      {
        "id": "P3-U5B-PR13",
        "title": "Detect Cycle in an Undirected Graph (BFS)",
        "url": "https://www.geeksforgeeks.org/detect-cycle-in-an-undirected-graph/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "MIjOkApZ39g"
        ]
      },
      {
        "id": "P3-U5B-PR14",
        "title": "Course Schedule IV (Topological Order / Reachability)",
        "url": "https://leetcode.com/problems/course-schedule-iv/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "BnQpaTZg6Sc"
        ]
      },
      {
        "id": "P3-U5B-PR2",
        "title": "Critical Connections in a Network (Tarjan's Bridges)",
        "url": "https://leetcode.com/problems/critical-connections-in-a-network/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "59fUtYYz7ZU",
          "AC133"
        ]
      },
      {
        "id": "P3-U5B-PR11",
        "title": "Strongly Connected Components (Kosaraju’s Algorithm)",
        "url": "https://www.geeksforgeeks.org/strongly-connected-components/",
        "platform": "GFG",
        "difficulty": "Hard",
        "videoIds": [
          "59fUtYYz7ZU",
          "AC135"
        ]
      },
      {
        "id": "P3-U5B-PR12",
        "title": "Articulation Points in a Graph",
        "url": "https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/",
        "platform": "GFG",
        "difficulty": "Hard",
        "videoIds": [
          "59fUtYYz7ZU",
          "AC134"
        ]
      },
      {
        "id": "P3-U5B-PR15",
        "title": "Longest Increasing Path in a Matrix (DFS / Topo)",
        "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "0WIINUY12Yg"
        ]
      }
    ]
  },
  {
    "id": "P4-U1",
    "phase": 4,
    "phaseName": "Phase 4: Beyond the Syllabus (Playlist Extras)",
    "courseCode": "EXTRA-1",
    "unitTitle": "Unit 1: Shortest Paths, Spanning Trees & Union-Find",
    "hours": 8,
    "subtopics": [
      "Single-source shortest paths: Dijkstra's algorithm (greedy) and Bellman-Ford (DP / negative edges)",
      "Minimum spanning trees: Prim's and Kruskal's algorithms",
      "Disjoint Set Union (Union-Find): union by rank/size and path compression",
      "Graph applications: provinces, constrained shortest paths (K stops) and MST problems",
      "All-pairs shortest paths: Floyd-Warshall algorithm"
    ],
    "videos": [
      {
        "id": "AC124",
        "title": "Dijkstra's Algorithm (Single-Source Shortest Path)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=124",
        "type": "Playlist",
        "playlistIndex": 124,
        "minutes": 35,
        "playlistOnly": true
      },
      {
        "id": "AC125",
        "title": "Bellman-Ford Algorithm",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=125",
        "type": "Playlist",
        "playlistIndex": 125,
        "minutes": 24,
        "playlistOnly": true
      },
      {
        "id": "AC127",
        "title": "Prim's Algorithm (Minimum Spanning Tree)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=127",
        "type": "Playlist",
        "playlistIndex": 127,
        "minutes": 26,
        "playlistOnly": true
      },
      {
        "id": "AC128",
        "title": "Disjoint Set Union (Rank/Size & Path Compression)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=128",
        "type": "Playlist",
        "playlistIndex": 128,
        "minutes": 34,
        "playlistOnly": true
      },
      {
        "id": "AC129",
        "title": "Kruskal's Algorithm (Minimum Spanning Tree)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=129",
        "type": "Playlist",
        "playlistIndex": 129,
        "minutes": 29,
        "playlistOnly": true
      },
      {
        "id": "AC130",
        "title": "Number of Provinces",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=130",
        "type": "Playlist",
        "playlistIndex": 130,
        "minutes": 13,
        "playlistOnly": true
      },
      {
        "id": "AC131",
        "title": "Min Cost to Connect All Points",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=131",
        "type": "Playlist",
        "playlistIndex": 131,
        "minutes": 21,
        "playlistOnly": true
      },
      {
        "id": "AC132",
        "title": "Cheapest Flights Within K Stops",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=132",
        "type": "Playlist",
        "playlistIndex": 132,
        "minutes": 30,
        "playlistOnly": true
      },
      {
        "id": "AC136",
        "title": "Floyd-Warshall (All-Pairs Shortest Path)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=136",
        "type": "Playlist",
        "playlistIndex": 136,
        "minutes": 28,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P4-U1-PR1",
        "title": "Network Delay Time (Dijkstra)",
        "url": "https://leetcode.com/problems/network-delay-time/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC124"
        ]
      },
      {
        "id": "P4-U1-PR2",
        "title": "Shortest Routes I (Dijkstra)",
        "url": "https://cses.fi/problemset/task/1671",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC124"
        ]
      },
      {
        "id": "P4-U1-PR3",
        "title": "Cycle Finding (Bellman-Ford)",
        "url": "https://cses.fi/problemset/task/1197",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC125"
        ]
      },
      {
        "id": "P4-U1-PR4",
        "title": "Min Cost to Connect All Points (MST)",
        "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC127",
          "AC129",
          "AC131"
        ]
      },
      {
        "id": "P4-U1-PR5",
        "title": "Road Reparation (MST)",
        "url": "https://cses.fi/problemset/task/1675",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC127",
          "AC129"
        ]
      },
      {
        "id": "P4-U1-PR6",
        "title": "Road Construction (Union-Find)",
        "url": "https://cses.fi/problemset/task/1676",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC128"
        ]
      },
      {
        "id": "P4-U1-PR7",
        "title": "Number of Operations to Make Network Connected",
        "url": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC128"
        ]
      },
      {
        "id": "P4-U1-PR8",
        "title": "Number of Provinces (Union-Find / DFS)",
        "url": "https://leetcode.com/problems/number-of-provinces/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC130"
        ]
      },
      {
        "id": "P4-U1-PR9",
        "title": "Cheapest Flights Within K Stops",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC132"
        ]
      },
      {
        "id": "P4-U1-PR10",
        "title": "Shortest Routes II (Floyd-Warshall)",
        "url": "https://cses.fi/problemset/task/1672",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC136"
        ]
      },
      {
        "id": "P4-U1-PR11",
        "title": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
        "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC136"
        ]
      }
    ]
  },
  {
    "id": "P4-U2",
    "phase": 4,
    "phaseName": "Phase 4: Beyond the Syllabus (Playlist Extras)",
    "courseCode": "EXTRA-2",
    "unitTitle": "Unit 2: Dynamic Programming & Knapsack Basics",
    "hours": 6,
    "subtopics": [
      "DP intuition: overlapping subproblems, memoization vs tabulation",
      "1D DP: Climbing Stairs, House Robber I & II, Frog Jump, Min Cost Climbing Stairs",
      "Greedy method: Fractional Knapsack",
      "0/1 Knapsack: from recursion to DP to space-optimized DP"
    ],
    "videos": [
      {
        "id": "AC137",
        "title": "Complete Dynamic Programming (DP Series Lecture 1)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=137",
        "type": "Playlist",
        "playlistIndex": 137,
        "minutes": 42,
        "playlistOnly": true
      },
      {
        "id": "AC138",
        "title": "DP 2: Climbing Stairs (1D DP)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=138",
        "type": "Playlist",
        "playlistIndex": 138,
        "minutes": 26,
        "playlistOnly": true
      },
      {
        "id": "AC139",
        "title": "DP 3: House Robber (1D DP)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=139",
        "type": "Playlist",
        "playlistIndex": 139,
        "minutes": 26,
        "playlistOnly": true
      },
      {
        "id": "AC140",
        "title": "DP 4: House Robber II (1D DP)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=140",
        "type": "Playlist",
        "playlistIndex": 140,
        "minutes": 23,
        "playlistOnly": true
      },
      {
        "id": "AC141",
        "title": "DP 5: Frog Jump (1D DP)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=141",
        "type": "Playlist",
        "playlistIndex": 141,
        "minutes": 29,
        "playlistOnly": true
      },
      {
        "id": "AC142",
        "title": "DP 6: Min Cost Climbing Stairs (1D DP)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=142",
        "type": "Playlist",
        "playlistIndex": 142,
        "minutes": 26,
        "playlistOnly": true
      },
      {
        "id": "AC143",
        "title": "Fractional Knapsack (Greedy Method)",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=143",
        "type": "Playlist",
        "playlistIndex": 143,
        "minutes": 17,
        "playlistOnly": true
      },
      {
        "id": "AC144",
        "title": "0/1 Knapsack: Recursion to DP to Space Optimized",
        "url": "https://www.youtube.com/watch?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=144",
        "type": "Playlist",
        "playlistIndex": 144,
        "minutes": 45,
        "playlistOnly": true
      }
    ],
    "problems": [
      {
        "id": "P4-U2-PR5",
        "title": "Frog 1 (AtCoder DP Contest A)",
        "url": "https://atcoder.jp/contests/dp/tasks/dp_a",
        "platform": "AtCoder",
        "difficulty": "Easy",
        "videoIds": [
          "AC141"
        ]
      },
      {
        "id": "P4-U2-PR7",
        "title": "Min Cost Climbing Stairs",
        "url": "https://leetcode.com/problems/min-cost-climbing-stairs/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AC142"
        ]
      },
      {
        "id": "P4-U2-PR1",
        "title": "Dice Combinations (Intro DP)",
        "url": "https://cses.fi/problemset/task/1633",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC137"
        ]
      },
      {
        "id": "P4-U2-PR2",
        "title": "Decode Ways (1D DP)",
        "url": "https://leetcode.com/problems/decode-ways/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC138"
        ]
      },
      {
        "id": "P4-U2-PR3",
        "title": "House Robber",
        "url": "https://leetcode.com/problems/house-robber/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC139"
        ]
      },
      {
        "id": "P4-U2-PR4",
        "title": "House Robber II",
        "url": "https://leetcode.com/problems/house-robber-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC140"
        ]
      },
      {
        "id": "P4-U2-PR6",
        "title": "Frog 2 (AtCoder DP Contest B)",
        "url": "https://atcoder.jp/contests/dp/tasks/dp_b",
        "platform": "AtCoder",
        "difficulty": "Medium",
        "videoIds": [
          "AC141"
        ]
      },
      {
        "id": "P4-U2-PR8",
        "title": "Fractional Knapsack",
        "url": "https://www.geeksforgeeks.org/fractional-knapsack-problem/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "AC143"
        ]
      },
      {
        "id": "P4-U2-PR9",
        "title": "Book Shop (0/1 Knapsack)",
        "url": "https://cses.fi/problemset/task/1158",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "AC144"
        ]
      },
      {
        "id": "P4-U2-PR10",
        "title": "Partition Equal Subset Sum",
        "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AC144"
        ]
      }
    ]
  }
];


// ==========================================
// 2. DYNAMIC DAY-BY-DAY SCHEDULE GENERATOR
// ==========================================
const PLAYLIST_LECTURE_COUNT = new Set(
  SYLLABUS_DATA.flatMap((u) => u.videos)
    .map((v) => v.playlistIndex)
    .filter(Boolean)
).size;

// A day is identified by its first lecture (or first subtopic), so notes survive pace/date changes
const dayAnchor = (dayObj) =>
  dayObj.videos.length > 0 ? dayObj.videos[0].key : dayObj.subtopics[0].key;

const unitVideoMinutes = (u) => u.videos.reduce((sum, v) => sum + (v.minutes || 30), 0);
const difficultyRank = { Easy: 0, Medium: 1, Hard: 2 };

function buildDailyTargetSchedule(paceDays, startDateStr) {
  const totalDays = [60, 90, 120].includes(Number(paceDays)) ? Number(paceDays) : 90;

  // Days per unit are proportional to the real lecture time in that unit (at least 2 days per unit)
  const weights = SYLLABUS_DATA.map((u) => Math.max(60, unitVideoMinutes(u)));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const allocations = weights.map((w) => Math.max(2, Math.round((w / totalWeight) * totalDays)));
  let allocatedSum = allocations.reduce((a, b) => a + b, 0);

  // Balance exact day count to match totalDays (60, 90, or 120)
  while (allocatedSum !== totalDays) {
    if (allocatedSum < totalDays) {
      let bestIdx = 0;
      let bestRatio = -1;
      weights.forEach((w, idx) => {
        const ratio = w / allocations[idx];
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIdx = idx;
        }
      });
      allocations[bestIdx] += 1;
      allocatedSum += 1;
    } else {
      let minIdx = -1;
      let minRatio = Infinity;
      weights.forEach((w, idx) => {
        if (allocations[idx] > 2) {
          const ratio = w / allocations[idx];
          if (ratio < minRatio) {
            minRatio = ratio;
            minIdx = idx;
          }
        }
      });
      if (minIdx === -1) break;
      allocations[minIdx] -= 1;
      allocatedSum -= 1;
    }
  }

  // Parse startDate safely
  let baseDate = new Date();
  if (startDateStr && /^\d{4}-\d{2}-\d{2}$/.test(startDateStr)) {
    const [yyyy, mm, dd] = startDateStr.split('-').map(Number);
    baseDate = new Date(yyyy, mm - 1, dd);
  }

  const schedule = [];
  let currentDayNumber = 1;

  SYLLABUS_DATA.forEach((unit, uIdx) => {
    const unitDays = allocations[uIdx];
    const subs = unit.subtopics;
    const vids = unit.videos;
    const probs = [...unit.problems].sort(
      (a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]
    );

    // Split the unit's lectures into consecutive days, balanced by running time.
    // Every lecture lands on exactly one day, so nothing in the playlist is skipped.
    const dayVideoLists = Array.from({ length: unitDays }, () => []);
    if (vids.length <= unitDays) {
      vids.forEach((v, i) => dayVideoLists[Math.floor((i * unitDays) / vids.length)].push(v));
    } else {
      const target = unitVideoMinutes(unit) / unitDays;
      let day = 0;
      let acc = 0;
      vids.forEach((v, i) => {
        dayVideoLists[day].push(v);
        acc += v.minutes || 30;
        const remainingVids = vids.length - i - 1;
        const remainingDays = unitDays - day - 1;
        if (
          day < unitDays - 1 &&
          remainingVids > 0 &&
          (remainingVids === remainingDays || (acc >= target && remainingVids >= remainingDays))
        ) {
          day++;
          acc = 0;
        }
      });
    }

    // A problem's ORIGINAL key is used only the first time it is planned; repeats get a
    // day-specific key so ticking one day never silently ticks/unticks another.
    const usedProblems = new Set();

    for (let d = 0; d < unitDays; d++) {
      // Map subtopics for this day
      const daySubtopics = [];
      subs.forEach((subText, sIdx) => {
        if (Math.floor((sIdx * unitDays) / subs.length) === d) {
          daySubtopics.push({
            idx: sIdx,
            key: `${unit.id}_sub_${sIdx}`,
            text: subText
          });
        }
      });

      // Fallback if this day is a consolidation/revision day
      if (daySubtopics.length === 0) {
        const fallbackIdx = Math.min(subs.length - 1, Math.floor((d * subs.length) / unitDays));
        daySubtopics.push({
          idx: fallbackIdx,
          key: `${unit.id}_sub_${fallbackIdx}_rev${d}`,
          text: `Revise and re-solve: ${subs[fallbackIdx]}`
        });
      }

      // Lectures for this day
      const dayVids = dayVideoLists[d];
      const dayVideos = dayVids.map((v) => ({ video: v, key: `${unit.id}_vid_${v.id}` }));

      // Practice problem: prefer one that follows up on today's lectures (Easy -> Hard)
      const candidates = [];
      dayVids.forEach((v) =>
        probs.forEach((p) => {
          if ((p.videoIds || []).includes(v.id) && !candidates.includes(p)) candidates.push(p);
        })
      );
      const dayProblem =
        candidates.find((p) => !usedProblems.has(p.id)) ||
        probs.find((p) => !usedProblems.has(p.id)) ||
        candidates[0] ||
        probs[d % probs.length];
      const problemKey = usedProblems.has(dayProblem.id) ? `${dayProblem.id}_rev${d}` : dayProblem.id;
      usedProblems.add(dayProblem.id);

      // Compute calendar date
      const targetDate = new Date(baseDate);
      targetDate.setDate(baseDate.getDate() + (currentDayNumber - 1));
      const yyyy = targetDate.getFullYear();
      const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
      const dd = String(targetDate.getDate()).padStart(2, '0');
      const dateISO = `${yyyy}-${mm}-${dd}`;
      const formattedDate = targetDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      const lectureMinutes = dayVids.reduce((sum, v) => sum + (v.minutes || 30), 0);
      const estMinutes = lectureMinutes + 25; // lectures + about 25 min for the practice problem
      const cleanUnitName = unit.unitTitle.replace(/^Unit\s+\d+[A-Z]?:\s*/i, '');

      schedule.push({
        dayNumber: currentDayNumber,
        weekNumber: Math.ceil(currentDayNumber / 7),
        dateISO,
        formattedDate,
        unit,
        unitDayIndex: d + 1,
        unitTotalDays: unitDays,
        title: `${cleanUnitName} (Day ${d + 1}/${unitDays})`,
        estMinutes,
        subtopics: daySubtopics,
        videos: dayVideos,
        problem: dayProblem,
        problemKey
      });

      currentDayNumber++;
    }
  });

  return schedule;
}

// ==========================================
// 3. LOCALSTORAGE PERSISTENCE ENGINE
// ==========================================
const STORAGE_KEY = 'cpp_dsa_master_tracker_v3';

function getTodayISO() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const DEFAULT_STATE = {
  completedSubtopics: {},
  watchedVideos: {},
  solvedProblems: {},
  unitNotes: {},
  customProblems: {},
  paceDays: 90,
  startDate: getTodayISO(),
  selectedDayNumber: 1,
  streakCount: 0,
  lastActiveDate: getTodayISO(),
  userName: '',
  dayNotes: {},
  fuzzyDays: {}
};

// Carry saved ticks/notes over when a lecture's temporary id (ACnnn) is replaced by its real YouTube id
const migrateVideoAliases = (obj) => {
  if (!obj || typeof obj !== 'object') return obj || {};
  const pairs = Object.entries(VIDEO_ID_ALIASES);
  if (pairs.length === 0) return obj;
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    let nk = k;
    pairs.forEach(([oldId, newId]) => {
      nk = nk.split(`_vid_${oldId}`).join(`_vid_${newId}`);
    });
    out[nk] = v;
  });
  return out;
};

function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return DEFAULT_STATE;
    const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      completedSubtopics: isObj(parsed.completedSubtopics) ? parsed.completedSubtopics : {},
      watchedVideos: migrateVideoAliases(isObj(parsed.watchedVideos) ? parsed.watchedVideos : {}),
      solvedProblems: isObj(parsed.solvedProblems) ? parsed.solvedProblems : {},
      unitNotes: migrateVideoAliases(isObj(parsed.unitNotes) ? parsed.unitNotes : {}),
      customProblems: isObj(parsed.customProblems) ? parsed.customProblems : {},
      dayNotes: migrateVideoAliases(isObj(parsed.dayNotes) ? parsed.dayNotes : {}),
      fuzzyDays: migrateVideoAliases(isObj(parsed.fuzzyDays) ? parsed.fuzzyDays : {}),
      userName: typeof parsed.userName === 'string' ? parsed.userName : '',
      paceDays: [60, 90, 120].includes(Number(parsed.paceDays)) ? Number(parsed.paceDays) : 90,
      startDate: (typeof parsed.startDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.startDate)) ? parsed.startDate : getTodayISO(),
      selectedDayNumber: Number(parsed.selectedDayNumber) > 0 ? Number(parsed.selectedDayNumber) : 1
    };
  } catch (err) {
    console.warn('localStorage load fallback:', err);
    return DEFAULT_STATE;
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Crash caught by ErrorBoundary:", error, errorInfo);
  }

  handleDownloadEmergencyBackup = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) || '{}';
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cpp_dsa_emergency_backup_${getTodayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Could not export backup: " + e);
    }
  };

  handleReset = () => {
    if (window.confirm("Reset tracker to default state? Your current data will be cleared.")) {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center font-bold text-xl border border-rose-500/30">
              !
            </div>
            <h2 className="text-lg font-bold text-white">Something went wrong</h2>
            <p className="text-xs text-stone-400 leading-relaxed">
              An unexpected display error occurred. Your study progress and notes are safely preserved in your browser storage.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition"
              >
                Reload App
              </button>
              <button
                type="button"
                onClick={this.handleDownloadEmergencyBackup}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Emergency Backup</span>
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2 text-rose-400 hover:underline text-xs"
              >
                Reset Data &amp; Start Fresh
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function TrackerApp() {
  const [state, setState] = useState(loadPersistedState);
  const [activeTab, setActiveTab] = useState('DAILY_PLAN'); // 'DAILY_PLAN' | 'SYLLABUS' | 'PRACTICE_NOTES'
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('ALL');
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: true });
  const [expandedUnits, setExpandedUnits] = useState({});
  const [activeVideoModal, setActiveVideoModal] = useState(null); // { unit, video }
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [newProblemDrafts, setNewProblemDrafts] = useState({});
  const selectedDayPillRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll selected day into view on day change or tab switch
  useEffect(() => {
    if (activeTab === 'DAILY_PLAN' && selectedDayPillRef.current) {
      selectedDayPillRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [state.selectedDayNumber, activeTab]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ESC key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeVideoModal) setActiveVideoModal(null);
        if (backupModalOpen) {
          setBackupModalOpen(false);
          setConfirmResetOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoModal, backupModalOpen]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (activeVideoModal || backupModalOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [activeVideoModal, backupModalOpen]);

  // Save to localStorage safely on every state update
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('localStorage write warning:', err);
    }
  }, [state]);

  // Helper to update state. Pass { streak: false } for non-study actions
  // (navigating days, changing pace/start date) so they don't count as activity.
  const updateTracker = (updater, opts = {}) => {
    const today = getTodayISO();
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (opts.streak === false) return next;

      let streak = prev.streakCount || 0;
      if (prev.lastActiveDate === today) {
        streak = Math.max(streak, 1);
      } else {
        const yest = new Date();
        yest.setDate(yest.getDate() - 1);
        const yestISO = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(
          yest.getDate()
        ).padStart(2, '0')}`;
        streak = prev.lastActiveDate === yestISO ? streak + 1 : 1;
      }
      return { ...next, streakCount: streak, lastActiveDate: today };
    });
  };

  // Streak shown in the UI: reset to 0 if you haven't studied today or yesterday
  const displayStreak = (() => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yestISO = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(
      yest.getDate()
    ).padStart(2, '0')}`;
    const t = getTodayISO();
    return state.lastActiveDate === t || state.lastActiveDate === yestISO ? state.streakCount || 0 : 0;
  })();

  // Build dynamic schedule
  const dailySchedule = useMemo(() => {
    return buildDailyTargetSchedule(state.paceDays, state.startDate);
  }, [state.paceDays, state.startDate]);

  // Evaluate day completion status
  const getDayProgress = (dayObj) => {
    if (!dayObj) return { doneCount: 0, totalCount: 1, pct: 0, status: 'UPCOMING' };
    const subCount = dayObj.subtopics.length;
    const subDone = dayObj.subtopics.filter((s) => !!state.completedSubtopics[s.key]).length;
    const vidCount = dayObj.videos.length;
    const vidDoneCount = dayObj.videos.filter((v) => !!state.watchedVideos[v.key]).length;
    const vidDone = vidCount === 0 || vidDoneCount === vidCount ? 1 : 0;
    const probDone = state.solvedProblems[dayObj.problemKey] ? 1 : 0;

    const totalCount = subCount + vidCount + 1; // subtopics + today's lectures + 1 practice problem
    const doneCount = subDone + vidDoneCount + probDone;
    const pct = Math.round((doneCount / totalCount) * 100);

    let status = 'UPCOMING';
    if (doneCount === totalCount) status = 'COMPLETED';
    else if (doneCount > 0) status = 'IN_PROGRESS';

    return { doneCount, totalCount, pct, status, subDone, subCount, vidDone: !!vidDone, vidDoneCount, vidCount, probDone: !!probDone };
  };

  // Global & Phase statistics
  const globalStats = useMemo(() => {
    let totalSubs = 0;
    let doneSubs = 0;
    let totalVids = 0;
    let doneVids = 0;
    let totalProbs = 0;
    let doneProbs = 0;

    const phaseBreakdown = {
      1: { done: 0, total: 0, pct: 0, title: 'Phase 1: C++ Basics', code: '25CS101', hours: 50 },
      2: { done: 0, total: 0, pct: 0, title: 'Phase 2: Core DSA', code: '25CS201', hours: 40 },
      3: { done: 0, total: 0, pct: 0, title: 'Phase 3: Advanced DSA', code: '25CS303', hours: 36 },
      4: { done: 0, total: 0, pct: 0, title: 'Phase 4: Beyond the Syllabus', code: 'EXTRA', hours: 14 }
    };

    SYLLABUS_DATA.forEach((unit) => {
      const uSubs = unit.subtopics.length;
      const uSubsDone = unit.subtopics.filter((_, idx) => !!state.completedSubtopics[`${unit.id}_sub_${idx}`]).length;

      const uVids = unit.videos.length;
      const uVidsDone = unit.videos.filter((v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]).length;

      const customList = state.customProblems[unit.id] || [];
      const allUnitProbs = [...unit.problems, ...customList];
      const uProbs = allUnitProbs.length;
      const uProbsDone = allUnitProbs.filter((p) => !!state.solvedProblems[p.id]).length;

      totalSubs += uSubs;
      doneSubs += uSubsDone;
      totalVids += uVids;
      doneVids += uVidsDone;
      totalProbs += uProbs;
      doneProbs += uProbsDone;

      const pTotal = uSubs + uVids + uProbs;
      const pDone = uSubsDone + uVidsDone + uProbsDone;
      phaseBreakdown[unit.phase].total += pTotal;
      phaseBreakdown[unit.phase].done += pDone;
    });

    [1, 2, 3, 4].forEach((p) => {
      const pb = phaseBreakdown[p];
      pb.pct = pb.total > 0 ? Math.round((pb.done / pb.total) * 100) : 0;
    });

    const grandTotal = totalSubs + totalVids + totalProbs;
    const grandDone = doneSubs + doneVids + doneProbs;
    const overallPct = grandTotal > 0 ? Math.round((grandDone / grandTotal) * 100) : 0;

    return {
      totalSubs,
      doneSubs,
      totalVids,
      doneVids,
      totalProbs,
      doneProbs,
      grandTotal,
      grandDone,
      overallPct,
      phaseBreakdown
    };
  }, [state.completedSubtopics, state.watchedVideos, state.solvedProblems, state.customProblems]);

  // Schedule meta (Active target day, calendar day, ahead/behind status)
  const scheduleMeta = useMemo(() => {
    const todayISO = getTodayISO();
    const startISO = state.startDate || todayISO;
    let diffDays = 0;
    try {
      const [sy, sm, sd] = startISO.split('-').map(Number);
      const [ty, tm, td] = todayISO.split('-').map(Number);
      const startUtc = Date.UTC(sy, sm - 1, sd);
      const todayUtc = Date.UTC(ty, tm - 1, td);
      diffDays = Math.round((todayUtc - startUtc) / 86400000);
    } catch {
      diffDays = 0;
    }
    const calendarDayNumber = Math.max(1, Math.min(dailySchedule.length, diffDays + 1));

    const firstIncomplete = dailySchedule.find((d) => getDayProgress(d).status !== 'COMPLETED');
    const activeTargetDayNumber = firstIncomplete ? firstIncomplete.dayNumber : dailySchedule.length;

    const completedDaysCount = dailySchedule.filter((d) => getDayProgress(d).status === 'COMPLETED').length;
    const expectedByYesterday = Math.max(0, calendarDayNumber - 1);
    const delta = completedDaysCount - expectedByYesterday;

    let badgeText = 'On schedule';
    let badgeTone = 'blue';
    if (delta > 0) {
      badgeText = `${delta} ${delta === 1 ? 'day' : 'days'} ahead`;
      badgeTone = 'emerald';
    } else if (delta < 0) {
      badgeText = `${Math.abs(delta)} ${Math.abs(delta) === 1 ? 'day' : 'days'} behind`;
      badgeTone = 'amber';
    }

    return {
      todayISO,
      calendarDayNumber,
      activeTargetDayNumber,
      completedDaysCount,
      delta,
      badgeText,
      badgeTone
    };
  }, [dailySchedule, state]);

  // Greeting, an honest one-line status, and the days marked "still fuzzy"
  const greeting = (() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 17) return 'Good afternoon';
    if (h >= 17 && h < 22) return 'Good evening';
    return 'Late night';
  })();

  const statusLine = (() => {
    const total = dailySchedule.length;
    const calDay = dailySchedule[scheduleMeta.calendarDayNumber - 1];
    const todayDone = calDay && getDayProgress(calDay).status === 'COMPLETED';
    const { delta, completedDaysCount } = scheduleMeta;
    if (completedDaysCount >= total) return 'You have finished the whole plan. That is a lot of hours. Well done.';
    if (completedDaysCount === 0) return 'Day 1 is a gentle start: setup and the first lecture. No need to rush it.';
    if (todayDone) return "Today's work is done. Anything extra is a bonus, and resting is fine too.";
    if (delta < 0) {
      const n = Math.abs(delta);
      return `You are ${n} ${n === 1 ? 'day' : 'days'} behind, which happens to everyone. You do not have to catch up all at once. Add one extra lecture a day this week, or press "Recalibrate to today" to reset the calendar.`;
    }
    if (delta > 0) return `You are ${delta} ${delta === 1 ? 'day' : 'days'} ahead. That is a nice cushion; spend some of it revisiting the fuzzy bits.`;
    return 'Right on schedule. One day at a time.';
  })();

  const fuzzyList = dailySchedule.filter((d) => !!state.fuzzyDays[dayAnchor(d)]);

  const saveName = () => {
    updateTracker((prev) => ({ ...prev, userName: nameDraft.trim().slice(0, 24) }), { streak: false });
    setEditingName(false);
  };

  const toggleFuzzy = (dayObj) => {
    const k = dayAnchor(dayObj);
    const was = !!state.fuzzyDays[k];
    updateTracker((prev) => ({ ...prev, fuzzyDays: { ...prev.fuzzyDays, [k]: !was } }), { streak: false });
    showToast(was ? 'Cleared. Glad it clicked.' : 'Marked as fuzzy. It will show up at the top so you can revisit it.');
  };

  const handleDayNoteChange = (dayObj, value) => {
    updateTracker((prev) => ({ ...prev, dayNotes: { ...prev.dayNotes, [dayAnchor(dayObj)]: value } }));
  };

  // Rough hours per day for each pace, from the real lecture lengths
  const paceHours = useMemo(() => {
    const out = {};
    [60, 90, 120].forEach((p) => {
      const sc = buildDailyTargetSchedule(p, '2026-01-01');
      const avg = sc.reduce((a, d) => a + d.estMinutes, 0) / sc.length;
      out[p] = `~${(Math.round(avg / 6) / 10).toFixed(1)} hrs/day`;
    });
    return out;
  }, []);

  // Ensure selectedDayNumber is always valid
  const safeSelectedDayNumber = Math.max(
    1,
    Math.min(dailySchedule.length, state.selectedDayNumber || scheduleMeta.activeTargetDayNumber)
  );
  const selectedDayObj =
    dailySchedule.find((d) => d.dayNumber === safeSelectedDayNumber) || dailySchedule[0];

  // Problems that follow up on a specific lecture video
  const getLinkedProblems = (unit, video) =>
    unit.problems.filter((p) => (p.videoIds || []).includes(video.id));

  // "After this video - practice" panel (used on the daily card, in the player and in the syllabus)
  const renderLinkedProblems = (unit, video, videoKey) => {
    const linked = getLinkedProblems(unit, video);
    if (linked.length === 0) return null;
    const watched = !!state.watchedVideos[videoKey];
    const solvedCount = linked.filter((p) => !!state.solvedProblems[p.id]).length;
    return (
      <div
        className={`rounded-xl border p-3 space-y-2 ${
          watched ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-stone-800 bg-stone-950/60'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>{watched ? 'Now practice this video' : 'After watching, practice'}</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">
            {solvedCount}/{linked.length} solved
          </span>
        </div>
        <div className="space-y-2">
          {linked.map((p) => {
            const done = !!state.solvedProblems[p.id];
            return (
              <div key={p.id} className="flex items-start justify-between gap-2 py-0.5">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleProblem(p.id)}
                    aria-label={done ? 'Mark unsolved' : 'Mark solved'}
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition ${
                      done ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-600 bg-stone-900'
                    }`}
                  >
                    {done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs leading-snug hover:underline block break-words ${
                        done ? 'line-through text-stone-500' : 'text-stone-200 hover:text-emerald-300'
                      }`}
                    >
                      {p.title}
                    </a>
                    <div className="text-[10px] font-mono text-stone-500 sm:hidden">
                      {p.platform} &bull; {p.difficulty}
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-mono text-stone-500 shrink-0">
                  {p.platform} &bull; {p.difficulty}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ==========================================
  // 4. USER ACTION HANDLERS
  // ==========================================
  const selectDay = (dayNum) => {
    const clamped = Math.max(1, Math.min(dailySchedule.length, dayNum));
    const weekNum = Math.ceil(clamped / 7);
    setExpandedWeeks((prev) => ({ ...prev, [weekNum]: true }));
    updateTracker((prev) => ({ ...prev, selectedDayNumber: clamped }), { streak: false });
  };

  const toggleSubtopic = (subKey) => {
    updateTracker((prev) => ({
      ...prev,
      completedSubtopics: {
        ...prev.completedSubtopics,
        [subKey]: !prev.completedSubtopics[subKey]
      }
    }));
  };

  const toggleVideo = (videoKey, linkedCount = 0) => {
    if (!state.watchedVideos[videoKey] && linkedCount > 0) {
      showToast(
        `Video done! Now solve ${linkedCount === 1 ? 'the practice problem' : `the ${linkedCount} practice problems`} for it to lock it in.`
      );
    }
    updateTracker((prev) => ({
      ...prev,
      watchedVideos: {
        ...prev.watchedVideos,
        [videoKey]: !prev.watchedVideos[videoKey]
      }
    }));
  };

  const toggleProblem = (probId) => {
    updateTracker((prev) => ({
      ...prev,
      solvedProblems: {
        ...prev.solvedProblems,
        [probId]: !prev.solvedProblems[probId]
      }
    }));
  };

  const toggleCompleteEntireDay = (dayObj) => {
    const prog = getDayProgress(dayObj);
    const shouldComplete = prog.status !== 'COMPLETED';

    updateTracker((prev) => {
      const nextSubs = { ...prev.completedSubtopics };
      dayObj.subtopics.forEach((s) => {
        nextSubs[s.key] = shouldComplete;
      });
      const nextVids = { ...prev.watchedVideos };
      dayObj.videos.forEach((v) => {
        nextVids[v.key] = shouldComplete;
      });
      const nextProbs = {
        ...prev.solvedProblems,
        [dayObj.problemKey]: shouldComplete
      };

      const nextSelected =
        shouldComplete && dayObj.dayNumber < dailySchedule.length
          ? dayObj.dayNumber + 1
          : prev.selectedDayNumber;

      return {
        ...prev,
        completedSubtopics: nextSubs,
        watchedVideos: nextVids,
        solvedProblems: nextProbs,
        selectedDayNumber: nextSelected
      };
    });

    if (shouldComplete) {
      const lines = [
        `Day ${dayObj.dayNumber} done. Nice work.`,
        `Day ${dayObj.dayNumber} done. One more behind you.`,
        `Day ${dayObj.dayNumber} wrapped up. Go rest your eyes.`,
        `Day ${dayObj.dayNumber} done. Steady wins.`
      ];
      showToast(
        dayObj.unitDayIndex === dayObj.unitTotalDays
          ? `Day ${dayObj.dayNumber} done, and that wraps up this unit.`
          : lines[dayObj.dayNumber % lines.length]
      );
    } else {
      showToast(`Day ${dayObj.dayNumber} reopened.`);
    }
  };

  const toggleCompleteEntireUnit = (unit) => {
    const allSubsDone = unit.subtopics.every((_, i) => !!state.completedSubtopics[`${unit.id}_sub_${i}`]);
    const allVidsDone = unit.videos.every((v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]);
    const customList = state.customProblems[unit.id] || [];
    const allProbs = [...unit.problems, ...customList];
    const allProbsDone = allProbs.every((p) => !!state.solvedProblems[p.id]);
    const targetVal = !(allSubsDone && allVidsDone && allProbsDone);

    updateTracker((prev) => {
      const nextSubs = { ...prev.completedSubtopics };
      unit.subtopics.forEach((_, i) => {
        nextSubs[`${unit.id}_sub_${i}`] = targetVal;
      });
      const nextVids = { ...prev.watchedVideos };
      unit.videos.forEach((v) => {
        nextVids[`${unit.id}_vid_${v.id}`] = targetVal;
      });
      const nextProbs = { ...prev.solvedProblems };
      allProbs.forEach((p) => {
        nextProbs[p.id] = targetVal;
      });

      return {
        ...prev,
        completedSubtopics: nextSubs,
        watchedVideos: nextVids,
        solvedProblems: nextProbs
      };
    });

    showToast(targetVal ? `${unit.unitTitle} marked 100% complete!` : `${unit.unitTitle} reset.`);
  };

  const handleRecalibrateToToday = () => {
    const firstIncompleteIdx = dailySchedule.findIndex((d) => getDayProgress(d).status !== 'COMPLETED');
    const offset = firstIncompleteIdx >= 0 ? firstIncompleteIdx : 0;
    const d = new Date();
    d.setDate(d.getDate() - offset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const newStartISO = `${yyyy}-${mm}-${dd}`;

    updateTracker((prev) => ({
      ...prev,
      startDate: newStartISO,
      selectedDayNumber: offset + 1
    }), { streak: false });
    showToast(`Done. Day ${offset + 1} is now today.`);
  };

  const handleNoteChange = (unitId, text) => {
    updateTracker((prev) => ({
      ...prev,
      unitNotes: {
        ...prev.unitNotes,
        [unitId]: text
      }
    }));
  };

  const handleAddCustomProblem = (unitId) => {
    const draft = newProblemDrafts[unitId];
    if (!draft || !draft.title || !draft.title.trim()) {
      showToast('Please enter a problem title.');
      return;
    }
    const newProb = {
      id: `${unitId}_CUST_${Date.now()}`,
      title: draft.title.trim(),
      url: draft.url && draft.url.trim() ? draft.url.trim() : 'https://leetcode.com/problemset/',
      platform: draft.platform || 'LeetCode',
      difficulty: draft.difficulty || 'Medium',
      isCustom: true
    };

    updateTracker((prev) => ({
      ...prev,
      customProblems: {
        ...prev.customProblems,
        [unitId]: [...(prev.customProblems[unitId] || []), newProb]
      },
      solvedProblems: {
        ...prev.solvedProblems,
        [newProb.id]: true
      }
    }));

    setNewProblemDrafts((prev) => ({
      ...prev,
      [unitId]: { title: '', url: '', platform: 'LeetCode', difficulty: 'Medium' }
    }));
    showToast('Added to your list and marked solved.');
  };

  const handleDeleteCustomProblem = (unitId, probId) => {
    updateTracker((prev) => {
      const updatedList = (prev.customProblems[unitId] || []).filter((p) => p.id !== probId);
      const nextSolved = { ...prev.solvedProblems };
      delete nextSolved[probId];
      return {
        ...prev,
        customProblems: {
          ...prev.customProblems,
          [unitId]: updatedList
        },
        solvedProblems: nextSolved
      };
    });
    showToast('Custom problem removed.');
  };

  const handleExportJson = () => {
    try {
      const dataStr = JSON.stringify(state, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cpp_dsa_backup_${getTodayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Backup downloaded. Keep it somewhere safe.');
    } catch (e) {
      showToast('Failed to export JSON.');
    }
  };

  const handleCopyJson = async () => {
    try {
      const dataStr = JSON.stringify(state, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(dataStr);
        showToast('Backup JSON copied to clipboard!');
      } else {
        const ta = document.createElement('textarea');
        ta.value = dataStr;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Backup JSON copied to clipboard!');
      }
    } catch (err) {
      showToast('Failed to copy. Try downloading the backup file instead.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (typeof content !== 'string') throw new Error('File read error');
        const parsed = JSON.parse(content);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          showToast('Invalid backup file: expected a JSON object.');
          return;
        }
        setState((prev) => ({
          ...DEFAULT_STATE,
          ...prev,
          ...parsed,
          completedSubtopics: parsed.completedSubtopics || prev.completedSubtopics,
          watchedVideos: migrateVideoAliases(parsed.watchedVideos || prev.watchedVideos),
          solvedProblems: parsed.solvedProblems || prev.solvedProblems,
          unitNotes: migrateVideoAliases(parsed.unitNotes || prev.unitNotes),
          customProblems: parsed.customProblems || prev.customProblems,
          dayNotes: migrateVideoAliases(parsed.dayNotes || prev.dayNotes),
          fuzzyDays: migrateVideoAliases(parsed.fuzzyDays || prev.fuzzyDays)
        }));
        setImportJsonText('');
        setBackupModalOpen(false);
        showToast(`Progress restored from ${file.name}`);
      } catch (err) {
        showToast("Could not read backup file. Make sure it's valid JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        showToast("Invalid backup: expected a valid JSON backup object.");
        return;
      }
      setState((prev) => ({
        ...DEFAULT_STATE,
        ...prev,
        ...parsed,
        completedSubtopics: parsed.completedSubtopics || prev.completedSubtopics,
        watchedVideos: migrateVideoAliases(parsed.watchedVideos || prev.watchedVideos),
        solvedProblems: parsed.solvedProblems || prev.solvedProblems,
        unitNotes: migrateVideoAliases(parsed.unitNotes || prev.unitNotes),
        customProblems: parsed.customProblems || prev.customProblems,
        dayNotes: migrateVideoAliases(parsed.dayNotes || prev.dayNotes),
        fuzzyDays: migrateVideoAliases(parsed.fuzzyDays || prev.fuzzyDays)
      }));
      setImportJsonText('');
      setBackupModalOpen(false);
      showToast('Progress restored from your backup.');
    } catch (e) {
      showToast("That doesn't look like a valid backup. Check the text and try again.");
    }
  };

  const handleResetAllProgress = () => {
    const fresh = {
      ...DEFAULT_STATE,
      startDate: getTodayISO()
    };
    setState(fresh);
    setConfirmResetOpen(false);
    setBackupModalOpen(false);
    showToast('Everything has been reset. Fresh start.');
  };

  // Filtered units for Syllabus Explorer & Practice/Notes views
  const filteredUnits = useMemo(() => {
    return SYLLABUS_DATA.filter((u) => {
      if (selectedPhaseFilter !== 'ALL' && u.phase !== Number(selectedPhaseFilter)) return false;

      const uSubsDone = u.subtopics.filter((_, idx) => !!state.completedSubtopics[`${u.id}_sub_${idx}`]).length;
      const uVidsDone = u.videos.filter((v) => !!state.watchedVideos[`${u.id}_vid_${v.id}`]).length;
      const isComplete = uSubsDone === u.subtopics.length && uVidsDone === u.videos.length;

      if (statusFilter === 'COMPLETED' && !isComplete) return false;
      if (statusFilter === 'REMAINING' && isComplete) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = u.unitTitle.toLowerCase().includes(q) || u.courseCode.toLowerCase().includes(q);
        const inSubs = u.subtopics.some((s) => s.toLowerCase().includes(q));
        const inVids = u.videos.some((v) => v.title.toLowerCase().includes(q));
        const inProbs = u.problems.some((p) => p.title.toLowerCase().includes(q));
        if (!inTitle && !inSubs && !inVids && !inProbs) return false;
      }

      return true;
    });
  }, [selectedPhaseFilter, statusFilter, searchQuery, state.completedSubtopics, state.watchedVideos]);

  const getPhaseBadgeStyle = (phase) => {
    if (phase === 1) return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    if (phase === 2) return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
    if (phase === 4) return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-14 selection:bg-emerald-500/30 selection:text-emerald-200">
      <style>{`
        .font-display { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif; letter-spacing: -0.01em; }
        textarea::placeholder, input::placeholder { font-style: italic; }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-stone-900 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-medium">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-stone-950/95 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-stone-700 bg-stone-900 flex items-center justify-center font-display text-sm sm:text-base text-emerald-300 shrink-0">
              C++
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-base sm:text-xl text-white leading-tight truncate">My DSA Notebook</h1>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {SYLLABUS_DATA.length} units &middot; {globalStats.totalSubs} topics &middot; {PLAYLIST_LECTURE_COUNT} playlist lectures &middot; {globalStats.totalProbs} problems
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs (Desktop) */}
          <div className="hidden md:flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => setActiveTab('DAILY_PLAN')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'DAILY_PLAN'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily plan</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SYLLABUS')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'SYLLABUS'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All units</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('PRACTICE_NOTES')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'PRACTICE_NOTES'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Practice &amp; Notes ({globalStats.doneProbs}/{globalStats.totalProbs})</span>
            </button>
          </div>

          {/* Right Controls: Streak + Backup + Playlist */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5 bg-stone-900 border border-stone-800 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-white text-[11px] sm:text-xs">{displayStreak}d</span>
              <span className="text-stone-700">|</span>
              <span className="text-emerald-400 font-mono font-semibold text-[11px] sm:text-xs">
                {globalStats.overallPct}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => setBackupModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 p-1.5 sm:px-3 sm:py-1.5 rounded-xl transition"
              title="Backup or Restore Progress"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <a
              href="https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white p-1.5 sm:px-3 sm:py-1.5 rounded-xl transition"
              title="Open Apna College Playlist on YouTube"
            >
              <Youtube className="w-3.5 h-3.5 fill-white" />
              <span className="hidden lg:inline">Playlist</span>
              <ExternalLink className="w-3 h-3 hidden sm:inline" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
        {/* TOP KPI OVERVIEW STRIP */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Overall Mastery Card */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  Overall progress
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {globalStats.overallPct}%
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    ({globalStats.grandDone} of {globalStats.grandTotal} things done)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl text-xs text-emerald-300 font-semibold">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>
                  {scheduleMeta.completedDaysCount}/{dailySchedule.length} Days
                </span>
              </div>
            </div>

            <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${globalStats.overallPct}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
                <div className="text-[10px] text-stone-400 font-semibold">Subtopics</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
                  {globalStats.doneSubs}/{globalStats.totalSubs}
                </div>
              </div>
              <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
                <div className="text-[10px] text-stone-400 font-semibold">Lectures</div>
                <div className="text-xs sm:text-sm font-bold text-rose-300 font-mono mt-0.5">
                  {globalStats.doneVids}/{globalStats.totalVids}
                </div>
              </div>
              <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
                <div className="text-[10px] text-stone-400 font-semibold">Problems</div>
                <div className="text-xs sm:text-sm font-bold text-indigo-300 font-mono mt-0.5">
                  {globalStats.doneProbs}/{globalStats.totalProbs}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Progress Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((phaseNum) => {
              const pInfo = globalStats.phaseBreakdown[phaseNum];
              const accentBar =
                phaseNum === 1
                  ? 'bg-blue-400'
                  : phaseNum === 2
                  ? 'bg-teal-400'
                  : phaseNum === 4
                  ? 'bg-amber-400'
                  : 'bg-purple-400';

              return (
                <button
                  key={phaseNum}
                  type="button"
                  onClick={() => {
                    setSelectedPhaseFilter(phaseNum);
                    setActiveTab('SYLLABUS');
                  }}
                  className="text-left bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 flex flex-col justify-between transition group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getPhaseBadgeStyle(phaseNum)}`}>
                        {pInfo.code}
                      </span>
                      <span className="text-xs font-mono text-stone-400">{pInfo.hours} Hrs</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-2.5 group-hover:text-emerald-300 transition">
                      {pInfo.title}
                    </h3>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-semibold text-white">{pInfo.pct}%</span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {pInfo.done}/{pInfo.total} done
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                      <div
                        className={`h-full ${accentBar} transition-all duration-500`}
                        style={{ width: `${pInfo.pct}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            TAB 1: DAY-BY-DAY TARGET SYSTEM
           ========================================================= */}
        {activeTab === 'DAILY_PLAN' && (
          <div className="space-y-6">
            {/* PACE & START DATE CONTROL BAR */}
            <section className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h2 className="font-display text-xl sm:text-2xl text-white">
                    {greeting}
                    {state.userName ? `, ${state.userName}` : ''}.
                  </h2>
                  <span
                    className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      scheduleMeta.badgeTone === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : scheduleMeta.badgeTone === 'amber'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    {scheduleMeta.badgeText}
                  </span>
                  {editingName ? (
                    <input
                      autoFocus
                      value={nameDraft}
                      onChange={(e) => setNameDraft(e.target.value)}
                      onBlur={saveName}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveName();
                        if (e.key === 'Escape') setEditingName(false);
                      }}
                      maxLength={24}
                      placeholder="your name"
                      className="w-32 bg-stone-950 border border-stone-700 rounded-md px-2 py-0.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setNameDraft(state.userName || '');
                        setEditingName(true);
                      }}
                      className="text-[11px] text-stone-500 hover:text-stone-300 underline underline-offset-2"
                    >
                      {state.userName ? 'change name' : 'add your name'}
                    </button>
                  )}
                </div>
                <p className="text-sm text-stone-400 leading-relaxed max-w-2xl">{statusLine}</p>
                {fuzzyList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-stone-400">
                    <span>Still fuzzy, revisit:</span>
                    {fuzzyList.slice(0, 8).map((d) => (
                      <button
                        key={d.dayNumber}
                        type="button"
                        onClick={() => selectDay(d.dayNumber)}
                        className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20"
                      >
                        Day {d.dayNumber}
                      </button>
                    ))}
                    {fuzzyList.length > 8 && <span>+{fuzzyList.length - 8} more</span>}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Pace Selector Buttons */}
                <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
                  {[
                    { days: 60, label: '60-day sprint', sub: paceHours[60] },
                    { days: 90, label: '90 days, balanced', sub: paceHours[90] },
                    { days: 120, label: '120 days, steady', sub: paceHours[120] }
                  ].map((opt) => {
                    const active = state.paceDays === opt.days;
                    return (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => {
                          updateTracker((prev) => ({
                            ...prev,
                            paceDays: opt.days,
                            selectedDayNumber: 1
                          }), { streak: false });
                          showToast(`Switched to ${opt.days} days.`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-left transition ${
                          active
                            ? 'bg-emerald-500 text-stone-950 font-bold shadow'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <div className="text-xs leading-tight">{opt.label}</div>
                        <div className={`text-[10px] ${active ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Start Date Picker */}
                <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <div className="text-[11px]">
                    <span className="text-stone-400 block leading-none">Start Date</span>
                    <input
                      type="date"
                      value={state.startDate}
                      onChange={(e) => {
                        if (e.target.value) {
                          updateTracker((prev) => ({ ...prev, startDate: e.target.value }), { streak: false });
                          showToast('Start date updated.');
                        }
                      }}
                      className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Recalibrate Schedule to Today */}
                <button
                  type="button"
                  onClick={handleRecalibrateToToday}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition"
                  title="Align your first incomplete day with Today's date"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recalibrate to today</span>
                </button>
              </div>
            </section>

            {/* TODAY'S HERO CARD */}
            {selectedDayObj && (() => {
              const dayProg = getDayProgress(selectedDayObj);
              const isCalendarToday = selectedDayObj.dayNumber === scheduleMeta.calendarDayNumber;

              return (
                <section className="bg-stone-900 border border-stone-700/80 rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {isCalendarToday ? 'Today' : `Day ${selectedDayObj.dayNumber}`}
                        </span>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                          Day {selectedDayObj.dayNumber} of {dailySchedule.length} &bull; {selectedDayObj.formattedDate}
                        </span>
                        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${getPhaseBadgeStyle(selectedDayObj.unit.phase)}`}>
                          {selectedDayObj.unit.courseCode}
                        </span>
                        <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded-md border border-stone-800 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-indigo-400" /> ~{selectedDayObj.estMinutes} mins
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-white leading-snug">
                        {selectedDayObj.title}
                      </h3>
                      <p className="text-xs text-stone-400">
                        {selectedDayObj.unit.phaseName} &bull; Week {selectedDayObj.weekNumber} &bull; {dayProg.doneCount} of {dayProg.totalCount} things done today
                      </p>
                    </div>

                    {/* Day Navigation & Complete All Day Targets Button */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center bg-stone-950 rounded-xl border border-stone-800 p-1">
                        <button
                          type="button"
                          onClick={() => selectDay(selectedDayObj.dayNumber - 1)}
                          disabled={selectedDayObj.dayNumber <= 1}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => selectDay(scheduleMeta.activeTargetDayNumber)}
                          className="px-2.5 py-1 text-xs font-bold text-emerald-400 hover:underline border-x border-stone-800"
                        >
                          Where I left off (D{scheduleMeta.activeTargetDayNumber})
                        </button>
                        <button
                          type="button"
                          onClick={() => selectDay(selectedDayObj.dayNumber + 1)}
                          disabled={selectedDayObj.dayNumber >= dailySchedule.length}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30"
                        >
                          Next
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCompleteEntireDay(selectedDayObj)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                          dayProg.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {dayProg.status === 'COMPLETED'
                            ? `Day ${selectedDayObj.dayNumber} done`
                            : `Mark day ${selectedDayObj.dayNumber} done`}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 3-COLUMN DAILY BREAKDOWN */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5">
                    {/* Column 1: Subtopics to Master */}
                    <div className="lg:col-span-5 space-y-2.5">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <ListChecks className="w-4 h-4" />
                        <span>What to learn ({dayProg.subDone}/{dayProg.subCount})</span>
                      </div>
                      <div className="space-y-2">
                        {selectedDayObj.subtopics.map((s) => {
                          const checked = !!state.completedSubtopics[s.key];
                          return (
                            <div
                              key={s.key}
                              onClick={() => toggleSubtopic(s.key)}
                              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                                checked
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-400 line-through'
                                  : 'bg-stone-950/80 border-stone-800 hover:border-emerald-500/50 text-stone-100'
                              }`}
                            >
                              <div
                                className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                  checked
                                    ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                    : 'border-stone-600'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-xs sm:text-sm font-medium leading-snug">{s.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 2: Assigned Video Lectures */}
                    <div className="lg:col-span-4 space-y-2.5">
                      <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <Youtube className="w-4 h-4" />
                        <span>
                          Watch
                          {selectedDayObj.videos.length > 0 ? ` (${dayProg.vidDoneCount}/${selectedDayObj.videos.length})` : ''}
                        </span>
                      </div>
                      {selectedDayObj.videos.length === 0 ? (
                        <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 text-xs text-stone-400 leading-relaxed">
                          No new lecture today: this is a practice and revision day. Re-watch a lecture from
                          this unit if something is unclear, then solve today&apos;s problem.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedDayObj.videos.map(({ video, key }) => {
                            const watched = !!state.watchedVideos[key];
                            return (
                              <div key={key} className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3">
                                <div
                                  onClick={() =>
                                    toggleVideo(key, getLinkedProblems(selectedDayObj.unit, video).length)
                                  }
                                  className="flex items-start gap-3 cursor-pointer"
                                >
                                  <div
                                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                      watched
                                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                        : 'border-stone-600'
                                    }`}
                                  >
                                    {watched && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <div className="space-y-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                        {video.type}
                                      </span>
                                      {video.playlistIndex ? (
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                                          #{video.playlistIndex}
                                        </span>
                                      ) : null}
                                      {video.minutes ? (
                                        <span className="text-[10px] font-mono text-stone-500">~{video.minutes} min</span>
                                      ) : null}
                                    </div>
                                    <div
                                      className={`text-sm font-semibold leading-snug ${
                                        watched ? 'line-through text-stone-500' : 'text-white'
                                      }`}
                                    >
                                      {video.title}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setActiveVideoModal({ unit: selectedDayObj.unit, video })}
                                    className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center justify-center gap-1.5"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-indigo-300" />
                                    <span>Watch in App</span>
                                  </button>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-rose-300 border border-stone-800 text-xs font-medium flex items-center gap-1.5"
                                  >
                                    <span>YouTube</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>

                                {renderLinkedProblems(selectedDayObj.unit, video, key)}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Column 3: Daily Coding Practice Target */}
                    <div className="lg:col-span-3 space-y-2.5">
                      <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4" />
                        <span>Practice</span>
                      </div>
                      <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                            {selectedDayObj.problem.platform} &bull; {selectedDayObj.problem.difficulty}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleProblem(selectedDayObj.problemKey)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded border transition ${
                              dayProg.probDone
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-white'
                            }`}
                          >
                            {dayProg.probDone ? '✓ Solved' : 'Mark Solved'}
                          </button>
                        </div>

                        <a
                          href={selectedDayObj.problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs sm:text-sm font-bold hover:underline flex items-center justify-between gap-1.5 ${
                            dayProg.probDone ? 'line-through text-stone-500' : 'text-indigo-300'
                          }`}
                        >
                          <span>{selectedDayObj.problem.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>

                        <div className="pt-1">
                          <textarea
                            rows={2}
                            value={state.unitNotes[selectedDayObj.unit.id] || ''}
                            onChange={(e) => handleNoteChange(selectedDayObj.unit.id, e.target.value)}
                            placeholder={`Notes for ${selectedDayObj.unit.courseCode} ${selectedDayObj.unit.unitTitle.split(':')[0]}...`}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note to self + fuzzy flag */}
                  <div className="mt-5 pt-5 border-t border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-9 space-y-1.5">
                      <label className="text-xs font-semibold text-stone-300">Note to self</label>
                      <textarea
                        rows={3}
                        value={state.dayNotes[dayAnchor(selectedDayObj)] || ''}
                        onChange={(e) => handleDayNoteChange(selectedDayObj, e.target.value)}
                        placeholder="What clicked today? What is still fuzzy? How would you explain it to a friend?"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 resize-y leading-relaxed"
                      />
                    </div>
                    <div className="lg:col-span-3 flex flex-col justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFuzzy(selectedDayObj)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                          state.fuzzyDays[dayAnchor(selectedDayObj)]
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                            : 'bg-stone-950 text-stone-300 border-stone-700 hover:border-stone-600'
                        }`}
                      >
                        {state.fuzzyDays[dayAnchor(selectedDayObj)] ? 'Marked as still fuzzy' : 'Still fuzzy? Mark to revisit'}
                      </button>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        Marked days are listed at the top so you can come back to them.
                      </p>
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* HORIZONTAL SCROLLABLE DAY STRIP */}
            <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-stone-300">
                    All days (tap to jump)
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Done
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Started
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Today
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" /> Upcoming
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
                {dailySchedule.map((d) => {
                  const prog = getDayProgress(d);
                  const isSelected = d.dayNumber === safeSelectedDayNumber;
                  const isToday = d.dayNumber === scheduleMeta.calendarDayNumber;

                  let pillClasses = 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700';
                  let dotColor = 'bg-stone-700';

                  if (prog.status === 'COMPLETED') {
                    pillClasses = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
                    dotColor = 'bg-emerald-400';
                  } else if (prog.status === 'IN_PROGRESS') {
                    pillClasses = 'bg-amber-500/15 border-amber-500/40 text-amber-300';
                    dotColor = 'bg-amber-400';
                  } else if (isToday) {
                    pillClasses = 'bg-blue-500/20 border-blue-400 text-blue-200 font-bold';
                    dotColor = 'bg-blue-400';
                  }

                  if (isSelected) {
                    pillClasses = 'ring-2 ring-white border-transparent bg-indigo-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={d.dayNumber}
                      ref={isSelected ? selectedDayPillRef : null}
                      type="button"
                      onClick={() => selectDay(d.dayNumber)}
                      className={`shrink-0 w-12 py-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${pillClasses}`}
                      title={`Day ${d.dayNumber} (${d.formattedDate}): ${d.title}`}
                    >
                      <span className="text-[10px]">D{d.dayNumber}</span>
                      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    </button>
                  );
                })}
              </div>
            </section>

            {/* WEEKLY ACCORDION DAY CARDS */}
            <section className="space-y-4">
              {Array.from({ length: Math.ceil(dailySchedule.length / 7) }, (_, i) => i + 1).map((weekNum) => {
                const weekDays = dailySchedule.filter((d) => d.weekNumber === weekNum);
                const weekCompleted = weekDays.filter((d) => getDayProgress(d).status === 'COMPLETED').length;
                const isExpanded = !!expandedWeeks[weekNum];

                return (
                  <div
                    key={weekNum}
                    className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedWeeks((prev) => ({ ...prev, [weekNum]: !prev[weekNum] }))
                      }
                      className="w-full px-3.5 sm:px-5 py-3 flex items-center justify-between gap-2 bg-stone-900 hover:bg-stone-800/70 transition text-left"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                        <div className="min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="text-sm font-semibold text-white whitespace-nowrap">
                            Week {weekNum}
                          </span>
                          <span className="text-[11px] sm:text-xs font-mono text-stone-400">
                            (Days {weekDays[0]?.dayNumber}–{weekDays[weekDays.length - 1]?.dayNumber} &bull;{' '}
                            {weekDays[0]?.formattedDate} to {weekDays[weekDays.length - 1]?.formattedDate})
                          </span>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 text-[10px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 rounded-full border ${
                          weekCompleted === weekDays.length
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-stone-950 text-stone-400 border-stone-800'
                        }`}
                      >
                        {weekCompleted}/{weekDays.length} Done
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 border-t border-stone-800/80">
                        {weekDays.map((dayObj) => {
                          const prog = getDayProgress(dayObj);
                          const isToday = dayObj.dayNumber === scheduleMeta.calendarDayNumber;

                          return (
                            <div
                              key={dayObj.dayNumber}
                              className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition ${
                                prog.status === 'COMPLETED'
                                  ? 'bg-stone-900 border-emerald-500/40'
                                  : prog.status === 'IN_PROGRESS'
                                  ? 'bg-stone-900 border-amber-500/40'
                                  : isToday
                                  ? 'bg-stone-900 border-blue-500 ring-1 ring-blue-500/30'
                                  : 'bg-stone-950/70 border-stone-800/90 hover:border-stone-700'
                              }`}
                            >
                              <div className="space-y-2.5">
                                {/* Top Badges */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                        prog.status === 'COMPLETED'
                                          ? 'bg-emerald-500 text-stone-950'
                                          : prog.status === 'IN_PROGRESS'
                                          ? 'bg-amber-400 text-stone-950'
                                          : isToday
                                          ? 'bg-blue-500 text-white'
                                          : 'bg-stone-800 text-stone-200'
                                      }`}
                                    >
                                      Day {dayObj.dayNumber}
                                    </span>
                                    <span className="text-[11px] font-mono text-stone-400">
                                      {dayObj.formattedDate}
                                    </span>
                                  </div>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPhaseBadgeStyle(dayObj.unit.phase)}`}>
                                    {dayObj.unit.courseCode}
                                  </span>
                                </div>

                                <h4 className="text-sm font-bold text-white leading-snug">
                                  {dayObj.title}
                                </h4>

                                {/* Subtopics */}
                                <div className="space-y-1.5">
                                  {dayObj.subtopics.map((s) => {
                                    const subChecked = !!state.completedSubtopics[s.key];
                                    return (
                                      <div
                                        key={s.key}
                                        onClick={() => toggleSubtopic(s.key)}
                                        className={`p-2 rounded-lg border text-xs flex items-start gap-2 cursor-pointer transition ${
                                          subChecked
                                            ? 'bg-emerald-950/20 border-emerald-500/30 text-stone-500 line-through'
                                            : 'bg-stone-900/90 border-stone-800 text-stone-200 hover:border-stone-700'
                                        }`}
                                      >
                                        <div
                                          className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                                            subChecked
                                              ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                              : 'border-stone-600'
                                          }`}
                                        >
                                          {subChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                        </div>
                                        <span className="leading-tight">{s.text}</span>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Video & Problem Row */}
                                <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                                  {dayObj.videos.length === 0 ? (
                                    <div className="text-[11px] text-stone-500">Revision day: no new lecture</div>
                                  ) : (
                                    dayObj.videos.map(({ video, key }) => {
                                      const watched = !!state.watchedVideos[key];
                                      return (
                                        <div key={key} className="flex items-start gap-2">
                                          <div
                                            onClick={() =>
                                              toggleVideo(key, getLinkedProblems(dayObj.unit, video).length)
                                            }
                                            className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 cursor-pointer ${
                                              watched
                                                ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                                : 'border-stone-600'
                                            }`}
                                          >
                                            {watched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                          </div>
                                          <span
                                            className={`flex-1 text-xs font-medium leading-tight ${
                                              watched ? 'line-through text-stone-500' : 'text-rose-200'
                                            }`}
                                          >
                                            {video.playlistIndex ? `#${video.playlistIndex} ` : ''}
                                            {video.title}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => setActiveVideoModal({ unit: dayObj.unit, video })}
                                            className="shrink-0 p-1 rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
                                            aria-label="Watch"
                                          >
                                            <Play className="w-3 h-3 fill-indigo-300" />
                                          </button>
                                        </div>
                                      );
                                    })
                                  )}

                                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                      <button
                                        type="button"
                                        onClick={() => toggleProblem(dayObj.problemKey)}
                                        aria-label={prog.probDone ? 'Mark unsolved' : 'Mark solved'}
                                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                                          prog.probDone
                                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                            : 'border-stone-600 bg-stone-950'
                                        }`}
                                      >
                                        {prog.probDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                      </button>
                                      <div className="min-w-0 flex-1">
                                        <span className={`text-xs block truncate ${prog.probDone ? 'line-through text-stone-500' : 'text-stone-200'}`}>
                                          {dayObj.problem.title}
                                        </span>
                                        <span className="text-[10px] font-mono text-stone-500 block">
                                          {dayObj.problem.platform} &bull; {dayObj.problem.difficulty}
                                        </span>
                                      </div>
                                    </div>
                                    <a
                                      href={dayObj.problem.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="shrink-0 py-1 px-2.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-emerald-400 border border-stone-800 text-xs font-semibold flex items-center gap-1"
                                    >
                                      <span>Solve</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Card Footer */}
                              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleCompleteEntireDay(dayObj)}
                                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                                    prog.status === 'COMPLETED'
                                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                                      : 'bg-stone-800 hover:bg-emerald-500 hover:text-stone-950 text-stone-200'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>
                                    {prog.status === 'COMPLETED'
                                      ? 'Day Completed'
                                      : `Complete Day ${dayObj.dayNumber}`}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 2: FULL SYLLABUS EXPLORER (21 UNITS)
           ========================================================= */}
        {activeTab === 'SYLLABUS' && (
          <div className="space-y-5">
            {/* FILTER & SEARCH BAR */}
            <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: 'ALL', label: 'Everything (23 units)' },
                  { id: 1, label: 'Phase 1: C++ (25CS101)' },
                  { id: 2, label: 'Phase 2: Core DSA (25CS201)' },
                  { id: 3, label: 'Phase 3: Advanced (25CS303)' },
                  { id: 4, label: 'Phase 4: Extras (Playlist)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedPhaseFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      selectedPhaseFilter === tab.id
                        ? 'bg-emerald-500 text-stone-950 shadow'
                        : 'bg-stone-950 text-stone-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'REMAINING', label: 'In Progress' },
                    { id: 'COMPLETED', label: 'Completed' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatusFilter(st.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                        statusFilter === st.id
                          ? 'bg-stone-800 text-white'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Pointers, Kahn's, AVL, Trie..."
                    className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl pl-9 pr-8 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* UNITS LIST */}
            <section className="space-y-4">
              {filteredUnits.length === 0 ? (
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-10 text-center space-y-2">
                  <Filter className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-sm font-bold text-stone-300">No matching syllabus units found.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhaseFilter('ALL');
                      setStatusFilter('ALL');
                      setSearchQuery('');
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredUnits.map((unit) => {
                  const subDone = unit.subtopics.filter(
                    (_, i) => !!state.completedSubtopics[`${unit.id}_sub_${i}`]
                  ).length;
                  const vidDone = unit.videos.filter(
                    (v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]
                  ).length;
                  const customList = state.customProblems[unit.id] || [];
                  const allProbs = [...unit.problems, ...customList];
                  const probDone = allProbs.filter((p) => !!state.solvedProblems[p.id]).length;

                  const totalItems = unit.subtopics.length + unit.videos.length + allProbs.length;
                  const doneItems = subDone + vidDone + probDone;
                  const unitPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

                  return (
                    <div
                      key={unit.id}
                      className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4"
                    >
                      {/* Unit Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}>
                              {unit.courseCode}
                            </span>
                            <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800">
                              {unit.hours} CI Hours
                            </span>
                            <span className="text-xs font-mono text-emerald-400 font-bold">
                              {unitPct}% Complete
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">
                            {unit.unitTitle}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCompleteEntireUnit(unit)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                              unitPct === 100
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-stone-800 hover:bg-emerald-500 hover:text-stone-950 text-stone-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{unitPct === 100 ? 'Unit Completed' : 'Mark Unit Complete'}</span>
                          </button>
                        </div>
                      </div>

                      {/* 2-Column Content: Subtopics & Videos */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        {/* Left: Subtopics */}
                        <div className="lg:col-span-7 space-y-2">
                          <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                            <span>
                              Syllabus Subtopics ({subDone}/{unit.subtopics.length})
                            </span>
                          </div>
                          <div className="space-y-2">
                            {unit.subtopics.map((subText, idx) => {
                              const sKey = `${unit.id}_sub_${idx}`;
                              const checked = !!state.completedSubtopics[sKey];
                              return (
                                <div
                                  key={sKey}
                                  onClick={() => toggleSubtopic(sKey)}
                                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                                    checked
                                      ? 'bg-emerald-950/25 border-emerald-500/35 text-stone-400 line-through'
                                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-200'
                                  }`}
                                >
                                  <div
                                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                      checked
                                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                        : 'border-stone-600'
                                    }`}
                                  >
                                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span className="text-xs sm:text-sm leading-snug">{subText}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: Mapped Video Lectures & Practice Problems */}
                        <div className="lg:col-span-5 space-y-4">
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                              <Youtube className="w-3.5 h-3.5 text-rose-400" />
                              <span>
                                Playlist Lectures ({vidDone}/{unit.videos.length})
                              </span>
                            </div>
                            <div className="space-y-2">
                              {unit.videos.map((vid) => {
                                const vKey = `${unit.id}_vid_${vid.id}`;
                                const watched = !!state.watchedVideos[vKey];
                                return (
                                  <div
                                    key={vKey}
                                    className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5"
                                  >
                                    <div
                                      onClick={() => toggleVideo(vKey, getLinkedProblems(unit, vid).length)}
                                      className="flex items-start gap-2.5 cursor-pointer"
                                    >
                                      <div
                                        className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                          watched
                                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                            : 'border-stone-600'
                                        }`}
                                      >
                                        {watched && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                            {vid.type}
                                          </span>
                                          {vid.playlistIndex ? (
                                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                                              #{vid.playlistIndex}
                                            </span>
                                          ) : null}
                                          {vid.minutes ? (
                                            <span className="text-[10px] font-mono text-stone-400">~{vid.minutes}m</span>
                                          ) : null}
                                        </div>
                                        <div
                                          className={`text-xs sm:text-sm font-semibold leading-snug break-words ${
                                            watched ? 'line-through text-stone-500' : 'text-white'
                                          }`}
                                        >
                                          {vid.title}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 pl-6">
                                      <button
                                        type="button"
                                        onClick={() => setActiveVideoModal({ unit, video: vid })}
                                        className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                                      >
                                        <Play className="w-3 h-3 fill-white" />
                                        <span>Watch in App</span>
                                      </button>
                                      <a
                                        href={vid.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-1.5 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-semibold flex items-center gap-1"
                                      >
                                        <span>YT</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                    <div className="pl-6">
                                      {renderLinkedProblems(unit, vid, `${unit.id}_vid_${vid.id}`)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Curated Practice Problems for this Unit */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                              <span>
                                Practice Problems ({probDone}/{allProbs.length})
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {allProbs.map((prob) => {
                                const solved = !!state.solvedProblems[prob.id];
                                return (
                                  <div
                                    key={prob.id}
                                    className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-2"
                                  >
                                    <div
                                      onClick={() => toggleProblem(prob.id)}
                                      className="flex items-center gap-2.5 cursor-pointer truncate"
                                    >
                                      <div
                                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                          solved
                                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                            : 'border-stone-600'
                                        }`}
                                      >
                                        {solved && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <span
                                        className={`text-xs font-semibold truncate ${
                                          solved ? 'line-through text-stone-500' : 'text-indigo-200'
                                        }`}
                                      >
                                        {prob.title}
                                      </span>
                                    </div>
                                    <a
                                      href={prob.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[11px] font-mono text-emerald-400 hover:underline shrink-0 flex items-center gap-1"
                                    >
                                      <span>{prob.platform}</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 3: PRACTICE PROBLEMS & LECTURE NOTES HUB
           ========================================================= */}
        {activeTab === 'PRACTICE_NOTES' && (
          <div className="space-y-5">
            <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span>Practice Problem Logger &amp; Unit Notes</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Log custom LeetCode, CodeChef, or GeeksforGeeks problems and write persistent revision notes for every unit.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-stone-950 border border-stone-800 px-3.5 py-2 rounded-xl">
                <span className="text-stone-400">Solved Problems:</span>
                <span className="text-emerald-400 font-bold">
                  {globalStats.doneProbs} / {globalStats.totalProbs}
                </span>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-5">
              {SYLLABUS_DATA.map((unit) => {
                const customList = state.customProblems[unit.id] || [];
                const allProbs = [...unit.problems, ...customList];
                const draft = newProblemDrafts[unit.id] || {
                  title: '',
                  url: '',
                  platform: 'LeetCode',
                  difficulty: 'Medium'
                };

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}>
                          {unit.courseCode}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {unit.unitTitle}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-stone-400">
                        {allProbs.filter((p) => !!state.solvedProblems[p.id]).length}/{allProbs.length} Solved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Left: Problems List + Add Custom Problem Form */}
                      <div className="lg:col-span-6 space-y-3">
                        <div className="text-xs font-bold text-indigo-400">
                          Curated &amp; Custom Coding Problems
                        </div>

                        <div className="space-y-2">
                          {allProbs.map((prob) => {
                            const solved = !!state.solvedProblems[prob.id];
                            return (
                              <div
                                key={prob.id}
                                className="p-2.5 sm:p-3 rounded-xl bg-stone-950 border border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition hover:border-stone-700"
                              >
                                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                  <button
                                    type="button"
                                    onClick={() => toggleProblem(prob.id)}
                                    aria-label={solved ? 'Mark unsolved' : 'Mark solved'}
                                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition ${
                                      solved
                                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                        : 'border-stone-600 bg-stone-900'
                                    }`}
                                  >
                                    {solved && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </button>
                                  <div className="min-w-0 flex-1">
                                    <div
                                      onClick={() => toggleProblem(prob.id)}
                                      className={`text-xs sm:text-sm font-semibold cursor-pointer break-words ${
                                        solved ? 'line-through text-stone-500' : 'text-stone-100 hover:text-emerald-300'
                                      }`}
                                    >
                                      {prob.title}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                                        {prob.platform}
                                      </span>
                                      <span
                                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                                          prob.difficulty === 'Easy'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : prob.difficulty === 'Medium'
                                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                        }`}
                                      >
                                        {prob.difficulty}
                                      </span>
                                      {(prob.videoIds || []).length > 0 && unit.videos.find((v) => v.id === prob.videoIds[0]) ? (
                                        <span className="text-[10px] font-mono text-stone-500 truncate max-w-[200px]">
                                          &bull; after: {unit.videos.find((v) => v.id === prob.videoIds[0]).title.replace(/^Lec \d+:\s*/i, '')}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-1 sm:pt-0">
                                  <a
                                    href={prob.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-1 px-2.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1 transition"
                                  >
                                    <span>Solve</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  {prob.isCustom && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCustomProblem(unit.id, prob.id)}
                                      className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                                      title="Delete Custom Problem"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Add Custom Problem Inputs */}
                        <div className="p-3 rounded-xl bg-stone-950/90 border border-stone-800/90 space-y-2">
                          <div className="text-[11px] font-bold text-stone-400">
                            + Log Custom Solved Problem
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={draft.title}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, title: e.target.value }
                                }))
                              }
                              placeholder="Problem Title (e.g. LRU Cache)"
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="url"
                              value={draft.url}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, url: e.target.value }
                                }))
                              }
                              placeholder="URL (https://leetcode.com/...)"
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={draft.platform}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, platform: e.target.value }
                                }))
                              }
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                            >
                              <option value="LeetCode">LeetCode</option>
                              <option value="CodeChef">CodeChef</option>
                              <option value="GFG">GeeksforGeeks</option>
                              <option value="Codeforces">Codeforces</option>
                              <option value="CSES">CSES</option>
                            </select>
                            <select
                              value={draft.difficulty}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, difficulty: e.target.value }
                                }))
                              }
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => handleAddCustomProblem(unit.id)}
                              className="ml-auto px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Persistent Unit Revision Scratchpad */}
                      <div className="lg:col-span-6 flex flex-col space-y-2">
                        <div className="text-xs font-bold text-purple-400">
                          Key Formulas, Complexity &amp; Revision Notes
                        </div>
                        <textarea
                          rows={6}
                          value={state.unitNotes[unit.id] || ''}
                          onChange={(e) => handleNoteChange(unit.id, e.target.value)}
                          placeholder={`Write key C++ templates, recurrence relations, or corner cases for ${unit.unitTitle}...`}
                          className="w-full flex-1 bg-stone-950 border border-stone-800 focus:border-purple-500 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none resize-y font-mono"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('DAILY_PLAN')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
            activeTab === 'DAILY_PLAN' ? 'text-emerald-400' : 'text-stone-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px]">Daily Plan</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('DAILY_PLAN');
            selectDay(scheduleMeta.activeTargetDayNumber);
          }}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold text-indigo-400"
        >
          <Target className="w-4 h-4" />
          <span className="text-[10px]">Active (D{scheduleMeta.activeTargetDayNumber})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('SYLLABUS')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
            activeTab === 'SYLLABUS' ? 'text-emerald-400' : 'text-stone-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px]">Syllabus</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('PRACTICE_NOTES')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
            activeTab === 'PRACTICE_NOTES' ? 'text-purple-400' : 'text-stone-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px]">Notes</span>
        </button>
      </nav>

      {/* =========================================================
          IN-APP YOUTUBE LECTURE THEATRE MODAL
         ========================================================= */}
      {activeVideoModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideoModal(null);
          }}
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
        >
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-6xl w-full overflow-hidden shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2 sm:gap-3">
              <div className="min-w-0 flex-1 truncate">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getPhaseBadgeStyle(activeVideoModal.unit.phase)}`}>
                    {activeVideoModal.unit.courseCode}
                  </span>
                  <span className="text-xs font-bold text-stone-400 truncate">
                    {activeVideoModal.unit.unitTitle}
                  </span>
                </div>
                <h3 className="text-xs sm:text-base font-semibold text-white truncate mt-0.5">
                  {activeVideoModal.video.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    toggleVideo(
                      `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`,
                      getLinkedProblems(activeVideoModal.unit, activeVideoModal.video).length
                    )
                  }
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                    state.watchedVideos[
                      `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`
                    ]
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-emerald-500 hover:text-stone-950'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline sm:inline">
                    {state.watchedVideos[
                      `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`
                    ]
                      ? 'Watched'
                      : 'Mark Watched'}
                  </span>
                </button>

                <a
                  href={activeVideoModal.video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <span>YT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Video Player + Side-by-Side Checklist & Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Responsive 16:9 YouTube Embed */}
              <div className="lg:col-span-8 bg-black flex items-center justify-center">
                <div className="w-full aspect-video">
                  <iframe
                    src={
                      activeVideoModal.video.playlistOnly
                        ? `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&index=${activeVideoModal.video.playlistIndex - 1}&rel=0`
                        : `https://www.youtube.com/embed/${activeVideoModal.video.id}?rel=0`
                    }
                    title={activeVideoModal.video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Side-by-Side Unit Subtopics & Live Scratchpad */}
              <div className="lg:col-span-4 p-4 sm:p-5 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col justify-between gap-4 max-h-[75vh] overflow-y-auto">
                {activeVideoModal.video.playlistOnly && (
                  <div className="text-[11px] leading-relaxed text-stone-400 bg-stone-950 border border-stone-800 rounded-lg p-2.5">
                    This is lecture <span className="text-white font-bold">#{activeVideoModal.video.playlistIndex}</span> of the{' '}
                    {PLAYLIST_NAME} playlist. If the player starts on a different lecture, pick #
                    {activeVideoModal.video.playlistIndex} from the playlist menu inside the player, or{' '}
                    <a
                      href={activeVideoModal.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 underline"
                    >
                      open it on YouTube
                    </a>
                    .
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-xs font-bold text-emerald-400">
                    Unit Subtopics Checklist
                  </div>
                  <div className="space-y-1.5">
                    {activeVideoModal.unit.subtopics.map((sub, idx) => {
                      const sKey = `${activeVideoModal.unit.id}_sub_${idx}`;
                      const checked = !!state.completedSubtopics[sKey];
                      return (
                        <div
                          key={sKey}
                          onClick={() => toggleSubtopic(sKey)}
                          className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 cursor-pointer transition ${
                            checked
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-400 line-through'
                              : 'bg-stone-950 border-stone-800 text-stone-200'
                          }`}
                        >
                          <div
                            className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                              checked
                                ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                : 'border-stone-600'
                            }`}
                          >
                            {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="leading-snug">{sub}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {renderLinkedProblems(
                  activeVideoModal.unit,
                  activeVideoModal.video,
                  `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`
                )}

                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <div className="text-xs font-bold text-indigo-400">
                    Live Lecture Notes (Auto-Saved)
                  </div>
                  <textarea
                    rows={6}
                    value={state.unitNotes[activeVideoModal.unit.id] || ''}
                    onChange={(e) => handleNoteChange(activeVideoModal.unit.id, e.target.value)}
                    placeholder="Jot down C++ dry-runs, time complexity proofs, or pointers while watching..."
                    className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          BACKUP (EXPORT / IMPORT JSON) & RESET MODAL
         ========================================================= */}
      {backupModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setBackupModalOpen(false);
              setConfirmResetOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-5 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Backup, Sync &amp; Restore Progress</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setBackupModalOpen(false);
                  setConfirmResetOpen(false);
                }}
                className="p-1 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-300">
                Your progress is automatically saved in your browser&apos;s <code className="text-emerald-400">localStorage</code>. Export a JSON file or copy to clipboard anytime to seamlessly transfer your progress between your laptop and phone.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download Backup</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs flex items-center justify-center gap-2 shadow transition"
                >
                  <Copy className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-800">
              <label className="text-xs font-bold text-stone-300 block">
                Restore Progress:
              </label>

              {/* Upload JSON file option */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow transition cursor-pointer"
              >
                <Upload className="w-4 h-4 shrink-0" />
                <span>Upload JSON Backup File</span>
              </button>

              <div className="relative flex items-center justify-center py-1">
                <div className="border-t border-stone-800 w-full" />
                <span className="bg-stone-900 px-2.5 text-[10px] text-stone-500 font-mono absolute">OR PASTE JSON</span>
              </div>

              {/* Paste JSON text option */}
              <textarea
                rows={3}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste exported JSON content here...'
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleImportJson}
                disabled={!importJsonText.trim()}
                className="w-full py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Restore from Pasted JSON</span>
              </button>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              {!confirmResetOpen ? (
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(true)}
                  className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Progress</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full justify-between bg-rose-950/30 border border-rose-500/40 px-3 py-2 rounded-xl">
                  <span className="text-xs text-rose-200 font-semibold">Are you sure?</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetAllProgress}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                    >
                      Yes, Reset Everything
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <TrackerApp />
    </ErrorBoundary>
  );
}
