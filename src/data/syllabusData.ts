import { Unit } from '../types';

export const PLAYLIST_ID = 'PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';
export const PLAYLIST_NAME = 'Apna College - Complete C++ DSA Course';
export const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt';

// When a playlist-only lecture (id ACnnn) is later replaced by its real YouTube id,
// the old -> new pair is recorded here so saved progress and notes are carried over.
export const VIDEO_ID_ALIASES: Record<string, string> = {
  "AC028": "varXreLWPRo",
  "AC006": "xpy5NXiBFvA",
  "AC034": "Y4KdgqV1IqA",
  "AC010": "9IZYqostl2M",
  "AC011": "_xqIp2rj8bo",
  "AC013": "WBzZCm46mFo",
  "AC014": "EbkMABpP52U",
  "AC015": "TW2m8m_FNJE",
  "AC036": "LEFFjgt5i6w",
  "AC037": "XMpdvwUObho",
  "AC030": "dSRFgEs3a6A",
  "AC031": "VXewy91P0S4",
  "AC033": "cAB15h6-sWA",
  "AC018": "6WNZQBHWQJs",
  "AC019": "RjxD6UXGlhc",
  "AC020": "qsbCBduIs40",
  "AC021": "JRAByolWqhw",
  "AC022": "srsFN5OHBgw",
  "AC023": "7wOzDqsfXy0",
  "AC026": "-1cLK6PaLsQ",
  "AC058": "R-CKBYnOv1U",
  "AC059": "nzaHG0dme4g",
  "AC060": "-1E8ZMS0gSs",
  "AC061": "f8RPIb-0DDE",
  "AC062": "8ze7Zopdsaw",
  "AC065": "I8b0rff5F9M",
  "AC066": "-swgIiMIlJo",
  "AC067": "wwbTMNVlFHQ",
  "AC078": "GsY6y0iPaHw",
  "AC039": "K-RsltkN63w",
  "AC040": "X6sL8JTROLY",
  "AC041": "KDH4mhFVvHw",
  "AC069": "NlHupEeDXzY",
  "AC070": "01vBuZyMfqk",
  "AC072": "WnjUfBn9nZM",
  "AC073": "wHDm-N2m2XY",
  "AC074": "ysy1o-QEj3k",
  "AC075": "If--3pm9K3U",
  "AC076": "UHHp8USwx4M",
  "AC077": "OZPmEA_8FM8",
  "AC081": "sFvP5Ois0CE",
  "AC082": "sqyCBvEQN9c",
  "AC083": "XwG5cozqfaM",
  "AC084": "SmTow5Ht4iU",
  "AC045": "N4gJDGdhpLw",
  "AC046": "BdSJnIdR-4s",
  "AC047": "70cP3qtJp-s",
  "AC048": "D8Yze9CDDAw",
  "AC049": "jkgZw2WEaqA",
  "AC050": "aZ0B1eWkSVU",
  "AC055": "Sp1jzttFVdE",
  "AC053": "SBQfXK7q5K4",
  "AC054": "ynnWDBTdVi0",
  "AC086": "7tzHzN_Ehus",
  "AC087": "tumW7jsjv68",
  "AC088": "aPyDPImR5UM",
  "AC089": "FGr-syrhvOA",
  "AC090": "ze4JO_ODl3w",
  "AC091": "oX5D0uKOMck",
  "AC092": "33b1M980cCA",
  "AC093": "TY6kEejJEM0",
  "AC094": "AWJD__CfM6A",
  "AC095": "rhz-csskg_A",
  "AC096": "PUfADhkq1LI",
  "AC097": "dU2Z5HWSGM0",
  "AC099": "0s6sCjs_4g0",
  "AC100": "dSBcCynP1nA",
  "AC101": "WZmjRXF_Zi4",
  "AC102": "ORxkZ12FrU4",
  "AC103": "Kq4BbvIhj44",
  "AC104": "-n5Ur1wE5Jc",
  "AC105": "AiKZjCuy2k4",
  "AC106": "0KGzfij_SCk",
  "AC107": "Pr-HFxp7npk",
  "AC108": "a8VKpW1DsD8",
  "AC109": "dS1bKglre3A",
  "AC116": "AME6baBpswY",
  "AC117": "RmXo5SWkhCs",
  "AC122": "JI_e2RzARbM",
  "AC120": "37cJ38HadM4",
  "AC121": "rZsgWxodGmM",
  "AC133": "6h1SucBNxgc",
  "AC134": "cn7pov3BEmg",
  "AC135": "lqY8TE0P1S8",
  "AC124": "8gYBHjtjWBI",
  "AC125": "3rFHlbJ7qKc",
  "AC127": "Sflh1z6cIMk",
  "AC128": "nnrjWxWMo3E",
  "AC129": "inoM6jwj1CA",
  "AC130": "J1yCPIP-K8s",
  "AC131": "mEx8JJQJUs8",
  "AC132": "CLmykzpeCCs",
  "AC136": "iZBXd-vjHUA",
  "AC137": "uBA8DkCBdco",
  "AC138": "3GzA0mz6wp0",
  "AC139": "BRmLlJA6ncI",
  "AC140": "hSMJj9AdNBo",
  "AC141": "AKqlgskrZwI",
  "AC142": "KwItlcfF9vE",
  "AC143": "yggezlvUN2w",
  "AC144": "tEW-zDckvFw"
};

// ==========================================
// COMPLETE SYLLABUS DATASET (21 core units + 2 Phase-4 extension units)
// Every lecture of the playlist (144) is attached to a unit, with follow-up problems.
// ==========================================
export const SYLLABUS_DATA: Unit[] = [
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
        "id": "varXreLWPRo",
        "title": "How to Set Up a C++ Compiler on Mac",
        "url": "https://www.youtube.com/watch?v=varXreLWPRo",
        "type": "Playlist",
        "playlistIndex": 28,
        "minutes": 2
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
        "id": "xpy5NXiBFvA",
        "title": "Binary Number System",
        "url": "https://www.youtube.com/watch?v=xpy5NXiBFvA",
        "type": "Playlist",
        "playlistIndex": 6,
        "minutes": 37
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
        "id": "Y4KdgqV1IqA",
        "title": "Maths for DSA: Euclid's Algorithm, Sieve & Modular Arithmetic",
        "url": "https://www.youtube.com/watch?v=Y4KdgqV1IqA",
        "type": "Playlist",
        "playlistIndex": 34,
        "minutes": 56
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
          "xpy5NXiBFvA"
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
          "xpy5NXiBFvA"
        ]
      },
      {
        "id": "P1-U2A-PR11",
        "title": "Complement of Base 10 Integer (Binary Representation)",
        "url": "https://leetcode.com/problems/complement-of-base-10-integer/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "xpy5NXiBFvA"
        ]
      },
      {
        "id": "P1-U2A-PR12",
        "title": "Find Greatest Common Divisor of Array (Euclid’s Algorithm)",
        "url": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "Y4KdgqV1IqA"
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
          "Y4KdgqV1IqA"
        ]
      },
      {
        "id": "P1-U2A-PR14",
        "title": "Exponentiation (Modular Arithmetic)",
        "url": "https://cses.fi/problemset/task/1095",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "Y4KdgqV1IqA"
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
        "id": "9IZYqostl2M",
        "title": "Kadane's Algorithm | Maximum Subarray Sum",
        "url": "https://www.youtube.com/watch?v=9IZYqostl2M",
        "type": "Playlist",
        "playlistIndex": 10,
        "minutes": 23
      },
      {
        "id": "_xqIp2rj8bo",
        "title": "Majority Element (Moore's Voting) & Pair Sum",
        "url": "https://www.youtube.com/watch?v=_xqIp2rj8bo",
        "type": "Playlist",
        "playlistIndex": 11,
        "minutes": 39
      },
      {
        "id": "WBzZCm46mFo",
        "title": "Buy & Sell Stock and Pow(x, n)",
        "url": "https://www.youtube.com/watch?v=WBzZCm46mFo",
        "type": "Playlist",
        "playlistIndex": 13,
        "minutes": 29
      },
      {
        "id": "EbkMABpP52U",
        "title": "Container With Most Water (Two Pointers)",
        "url": "https://www.youtube.com/watch?v=EbkMABpP52U",
        "type": "Playlist",
        "playlistIndex": 14,
        "minutes": 32
      },
      {
        "id": "TW2m8m_FNJE",
        "title": "Product of Array Except Self",
        "url": "https://www.youtube.com/watch?v=TW2m8m_FNJE",
        "type": "Playlist",
        "playlistIndex": 15,
        "minutes": 30
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
        "id": "LEFFjgt5i6w",
        "title": "Search a 2D Matrix - Variations I & II (2D Arrays Part 2)",
        "url": "https://www.youtube.com/watch?v=LEFFjgt5i6w",
        "type": "Playlist",
        "playlistIndex": 36,
        "minutes": 38
      },
      {
        "id": "XMpdvwUObho",
        "title": "Spiral Matrix (2D Arrays Part 3)",
        "url": "https://www.youtube.com/watch?v=XMpdvwUObho",
        "type": "Playlist",
        "playlistIndex": 37,
        "minutes": 25
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
          "WBzZCm46mFo"
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
          "9IZYqostl2M"
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
          "XMpdvwUObho"
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
          "_xqIp2rj8bo"
        ]
      },
      {
        "id": "P1-U3B-PR11",
        "title": "Container With Most Water (Two Pointers)",
        "url": "https://leetcode.com/problems/container-with-most-water/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "EbkMABpP52U"
        ]
      },
      {
        "id": "P1-U3B-PR12",
        "title": "Product of Array Except Self (Prefix/Suffix)",
        "url": "https://leetcode.com/problems/product-of-array-except-self/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TW2m8m_FNJE"
        ]
      },
      {
        "id": "P1-U3B-PR13",
        "title": "Search a 2D Matrix (Binary Search on Matrix)",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "LEFFjgt5i6w"
        ]
      },
      {
        "id": "P1-U3B-PR14",
        "title": "Search a 2D Matrix II (Staircase Search)",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "LEFFjgt5i6w"
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
        "id": "dSRFgEs3a6A",
        "title": "Valid Palindrome & Remove All Occurrences (Strings Part 2)",
        "url": "https://www.youtube.com/watch?v=dSRFgEs3a6A",
        "type": "Playlist",
        "playlistIndex": 30,
        "minutes": 24
      },
      {
        "id": "VXewy91P0S4",
        "title": "Permutation in String (Strings Part 3)",
        "url": "https://www.youtube.com/watch?v=VXewy91P0S4",
        "type": "Playlist",
        "playlistIndex": 31,
        "minutes": 22
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
        "id": "cAB15h6-sWA",
        "title": "String Compression",
        "url": "https://www.youtube.com/watch?v=cAB15h6-sWA",
        "type": "Playlist",
        "playlistIndex": 33,
        "minutes": 19
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
          "dSRFgEs3a6A"
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
          "dSRFgEs3a6A"
        ]
      },
      {
        "id": "P1-U5A-PR12",
        "title": "Permutation in String (Sliding Window)",
        "url": "https://leetcode.com/problems/permutation-in-string/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "VXewy91P0S4"
        ]
      },
      {
        "id": "P1-U5A-PR13",
        "title": "String Compression (In-Place Two Pointers)",
        "url": "https://leetcode.com/problems/string-compression/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "cAB15h6-sWA"
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
        "id": "6WNZQBHWQJs",
        "title": "Search in Rotated Sorted Array",
        "url": "https://www.youtube.com/watch?v=6WNZQBHWQJs",
        "type": "Playlist",
        "playlistIndex": 18,
        "minutes": 20
      },
      {
        "id": "RjxD6UXGlhc",
        "title": "Peak Index in Mountain Array",
        "url": "https://www.youtube.com/watch?v=RjxD6UXGlhc",
        "type": "Playlist",
        "playlistIndex": 19,
        "minutes": 24
      },
      {
        "id": "qsbCBduIs40",
        "title": "Single Element in Sorted Array",
        "url": "https://www.youtube.com/watch?v=qsbCBduIs40",
        "type": "Playlist",
        "playlistIndex": 20,
        "minutes": 28
      },
      {
        "id": "JRAByolWqhw",
        "title": "Book Allocation Problem (Binary Search on Answer)",
        "url": "https://www.youtube.com/watch?v=JRAByolWqhw",
        "type": "Playlist",
        "playlistIndex": 21,
        "minutes": 33
      },
      {
        "id": "srsFN5OHBgw",
        "title": "Painter's Partition Problem (Binary Search on Answer)",
        "url": "https://www.youtube.com/watch?v=srsFN5OHBgw",
        "type": "Playlist",
        "playlistIndex": 22,
        "minutes": 28
      },
      {
        "id": "7wOzDqsfXy0",
        "title": "Aggressive Cows (Binary Search on Answer)",
        "url": "https://www.youtube.com/watch?v=7wOzDqsfXy0",
        "type": "Playlist",
        "playlistIndex": 23,
        "minutes": 30
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
          "6WNZQBHWQJs"
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
          "RjxD6UXGlhc"
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
          "RjxD6UXGlhc"
        ]
      },
      {
        "id": "P2-U1-PR14",
        "title": "Single Element in a Sorted Array",
        "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "qsbCBduIs40"
        ]
      },
      {
        "id": "P2-U1-PR15",
        "title": "Array Division (Book Allocation Pattern)",
        "url": "https://cses.fi/problemset/task/1085",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "JRAByolWqhw",
          "srsFN5OHBgw"
        ]
      },
      {
        "id": "P2-U1-PR16",
        "title": "Capacity To Ship Packages Within D Days",
        "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "srsFN5OHBgw"
        ]
      },
      {
        "id": "P2-U1-PR18",
        "title": "Magnetic Force Between Two Balls",
        "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "7wOzDqsfXy0"
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
          "JRAByolWqhw"
        ]
      },
      {
        "id": "P2-U1-PR17",
        "title": "Aggressive Cows",
        "url": "https://www.spoj.com/problems/AGGRCOW/",
        "platform": "SPOJ",
        "difficulty": "Hard",
        "videoIds": [
          "7wOzDqsfXy0"
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
        "id": "-1cLK6PaLsQ",
        "title": "Merge Sorted Arrays & Next Permutation",
        "url": "https://www.youtube.com/watch?v=-1cLK6PaLsQ",
        "type": "Playlist",
        "playlistIndex": 26,
        "minutes": 44
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
          "-1cLK6PaLsQ"
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
          "-1cLK6PaLsQ"
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
        "id": "R-CKBYnOv1U",
        "title": "Reverse a Linked List",
        "url": "https://www.youtube.com/watch?v=R-CKBYnOv1U",
        "type": "Playlist",
        "playlistIndex": 58,
        "minutes": 10
      },
      {
        "id": "nzaHG0dme4g",
        "title": "Middle of a Linked List",
        "url": "https://www.youtube.com/watch?v=nzaHG0dme4g",
        "type": "Playlist",
        "playlistIndex": 59,
        "minutes": 11
      },
      {
        "id": "-1E8ZMS0gSs",
        "title": "Detect & Remove Cycle in a Linked List",
        "url": "https://www.youtube.com/watch?v=-1E8ZMS0gSs",
        "type": "Playlist",
        "playlistIndex": 60,
        "minutes": 30
      },
      {
        "id": "f8RPIb-0DDE",
        "title": "Merge Two Sorted Lists",
        "url": "https://www.youtube.com/watch?v=f8RPIb-0DDE",
        "type": "Playlist",
        "playlistIndex": 61,
        "minutes": 13
      },
      {
        "id": "8ze7Zopdsaw",
        "title": "Copy List with Random Pointer",
        "url": "https://www.youtube.com/watch?v=8ze7Zopdsaw",
        "type": "Playlist",
        "playlistIndex": 62,
        "minutes": 21
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
        "id": "I8b0rff5F9M",
        "title": "Flatten a Doubly Linked List",
        "url": "https://www.youtube.com/watch?v=I8b0rff5F9M",
        "type": "Playlist",
        "playlistIndex": 65,
        "minutes": 25
      },
      {
        "id": "-swgIiMIlJo",
        "title": "Reverse Nodes in K-Group",
        "url": "https://www.youtube.com/watch?v=-swgIiMIlJo",
        "type": "Playlist",
        "playlistIndex": 66,
        "minutes": 21
      },
      {
        "id": "wwbTMNVlFHQ",
        "title": "Swap Nodes in Pairs",
        "url": "https://www.youtube.com/watch?v=wwbTMNVlFHQ",
        "type": "Playlist",
        "playlistIndex": 67,
        "minutes": 20
      },
      {
        "id": "GsY6y0iPaHw",
        "title": "Implement LRU Cache",
        "url": "https://www.youtube.com/watch?v=GsY6y0iPaHw",
        "type": "Playlist",
        "playlistIndex": 78,
        "minutes": 36
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
          "R-CKBYnOv1U"
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
          "f8RPIb-0DDE"
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
          "-1E8ZMS0gSs"
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
          "nzaHG0dme4g"
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
          "-1E8ZMS0gSs"
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
          "GsY6y0iPaHw"
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
          "I8b0rff5F9M"
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
          "8ze7Zopdsaw"
        ]
      },
      {
        "id": "P2-U3-PR18",
        "title": "Swap Nodes in Pairs",
        "url": "https://leetcode.com/problems/swap-nodes-in-pairs/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "wwbTMNVlFHQ"
        ]
      },
      {
        "id": "P2-U3-PR17",
        "title": "Reverse Nodes in k-Group",
        "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "-swgIiMIlJo"
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
        "id": "K-RsltkN63w",
        "title": "3 Sum (Brute, Better & Optimal)",
        "url": "https://www.youtube.com/watch?v=K-RsltkN63w",
        "type": "Playlist",
        "playlistIndex": 39,
        "minutes": 44
      },
      {
        "id": "X6sL8JTROLY",
        "title": "4 Sum (Optimal Approach)",
        "url": "https://www.youtube.com/watch?v=X6sL8JTROLY",
        "type": "Playlist",
        "playlistIndex": 40,
        "minutes": 23
      },
      {
        "id": "KDH4mhFVvHw",
        "title": "Subarray Sum Equals K (Brute, Better & Optimal)",
        "url": "https://www.youtube.com/watch?v=KDH4mhFVvHw",
        "type": "Playlist",
        "playlistIndex": 41,
        "minutes": 35
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
          "KDH4mhFVvHw"
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
          "K-RsltkN63w"
        ]
      },
      {
        "id": "P2-U4-PR15",
        "title": "4Sum",
        "url": "https://leetcode.com/problems/4sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "X6sL8JTROLY"
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
        "id": "NlHupEeDXzY",
        "title": "Valid Parentheses (Stack)",
        "url": "https://www.youtube.com/watch?v=NlHupEeDXzY",
        "type": "Playlist",
        "playlistIndex": 69,
        "minutes": 16
      },
      {
        "id": "01vBuZyMfqk",
        "title": "Stock Span Problem",
        "url": "https://www.youtube.com/watch?v=01vBuZyMfqk",
        "type": "Playlist",
        "playlistIndex": 70,
        "minutes": 26
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
        "id": "WnjUfBn9nZM",
        "title": "Previous Smaller Element",
        "url": "https://www.youtube.com/watch?v=WnjUfBn9nZM",
        "type": "Playlist",
        "playlistIndex": 72,
        "minutes": 9
      },
      {
        "id": "wHDm-N2m2XY",
        "title": "Design a Min Stack",
        "url": "https://www.youtube.com/watch?v=wHDm-N2m2XY",
        "type": "Playlist",
        "playlistIndex": 73,
        "minutes": 25
      },
      {
        "id": "ysy1o-QEj3k",
        "title": "Largest Rectangle in Histogram",
        "url": "https://www.youtube.com/watch?v=ysy1o-QEj3k",
        "type": "Playlist",
        "playlistIndex": 74,
        "minutes": 33
      },
      {
        "id": "If--3pm9K3U",
        "title": "Next Greater Element II",
        "url": "https://www.youtube.com/watch?v=If--3pm9K3U",
        "type": "Playlist",
        "playlistIndex": 75,
        "minutes": 20
      },
      {
        "id": "UHHp8USwx4M",
        "title": "Trapping Rainwater Problem",
        "url": "https://www.youtube.com/watch?v=UHHp8USwx4M",
        "type": "Playlist",
        "playlistIndex": 76,
        "minutes": 31
      },
      {
        "id": "OZPmEA_8FM8",
        "title": "The Celebrity Problem",
        "url": "https://www.youtube.com/watch?v=OZPmEA_8FM8",
        "type": "Playlist",
        "playlistIndex": 77,
        "minutes": 15
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
          "NlHupEeDXzY"
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
          "wHDm-N2m2XY"
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
          "01vBuZyMfqk"
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
          "WnjUfBn9nZM"
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
          "If--3pm9K3U"
        ]
      },
      {
        "id": "P3-U1A-PR15",
        "title": "The Celebrity Problem (Stack)",
        "url": "https://www.geeksforgeeks.org/the-celebrity-problem/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "OZPmEA_8FM8"
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
          "ysy1o-QEj3k"
        ]
      },
      {
        "id": "P3-U1A-PR14",
        "title": "Trapping Rain Water",
        "url": "https://leetcode.com/problems/trapping-rain-water/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "UHHp8USwx4M"
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
        "id": "sFvP5Ois0CE",
        "title": "Implement Queue using Stack & Stack using Queue",
        "url": "https://www.youtube.com/watch?v=sFvP5Ois0CE",
        "type": "Playlist",
        "playlistIndex": 81,
        "minutes": 16
      },
      {
        "id": "sqyCBvEQN9c",
        "title": "First Unique Character in a String",
        "url": "https://www.youtube.com/watch?v=sqyCBvEQN9c",
        "type": "Playlist",
        "playlistIndex": 82,
        "minutes": 13
      },
      {
        "id": "XwG5cozqfaM",
        "title": "Sliding Window Maximum",
        "url": "https://www.youtube.com/watch?v=XwG5cozqfaM",
        "type": "Playlist",
        "playlistIndex": 83,
        "minutes": 31
      },
      {
        "id": "SmTow5Ht4iU",
        "title": "Gas Station (Greedy Approach)",
        "url": "https://www.youtube.com/watch?v=SmTow5Ht4iU",
        "type": "Playlist",
        "playlistIndex": 84,
        "minutes": 22
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
          "sFvP5Ois0CE"
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
          "sFvP5Ois0CE"
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
          "sqyCBvEQN9c"
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
          "SmTow5Ht4iU"
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
          "XwG5cozqfaM"
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
        "id": "N4gJDGdhpLw",
        "title": "Permutations of an Array/String (Recursion & Backtracking)",
        "url": "https://www.youtube.com/watch?v=N4gJDGdhpLw",
        "type": "Playlist",
        "playlistIndex": 45,
        "minutes": 23
      },
      {
        "id": "BdSJnIdR-4s",
        "title": "N-Queens Problem (Backtracking)",
        "url": "https://www.youtube.com/watch?v=BdSJnIdR-4s",
        "type": "Playlist",
        "playlistIndex": 46,
        "minutes": 24
      },
      {
        "id": "70cP3qtJp-s",
        "title": "Sudoku Solver (Backtracking)",
        "url": "https://www.youtube.com/watch?v=70cP3qtJp-s",
        "type": "Playlist",
        "playlistIndex": 47,
        "minutes": 27
      },
      {
        "id": "D8Yze9CDDAw",
        "title": "Rat in a Maze (Backtracking)",
        "url": "https://www.youtube.com/watch?v=D8Yze9CDDAw",
        "type": "Playlist",
        "playlistIndex": 48,
        "minutes": 33
      },
      {
        "id": "jkgZw2WEaqA",
        "title": "Combination Sum (Recursion & Backtracking)",
        "url": "https://www.youtube.com/watch?v=jkgZw2WEaqA",
        "type": "Playlist",
        "playlistIndex": 49,
        "minutes": 24
      },
      {
        "id": "aZ0B1eWkSVU",
        "title": "Palindrome Partitioning (Recursion & Backtracking)",
        "url": "https://www.youtube.com/watch?v=aZ0B1eWkSVU",
        "type": "Playlist",
        "playlistIndex": 50,
        "minutes": 21
      },
      {
        "id": "Sp1jzttFVdE",
        "title": "Knight's Tour (Backtracking)",
        "url": "https://www.youtube.com/watch?v=Sp1jzttFVdE",
        "type": "Playlist",
        "playlistIndex": 55,
        "minutes": 23
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
          "N4gJDGdhpLw"
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
          "jkgZw2WEaqA"
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
          "D8Yze9CDDAw"
        ]
      },
      {
        "id": "P3-U2A-PR18",
        "title": "Palindrome Partitioning",
        "url": "https://leetcode.com/problems/palindrome-partitioning/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "aZ0B1eWkSVU"
        ]
      },
      {
        "id": "P3-U2A-PR19",
        "title": "Check Knight Tour Configuration",
        "url": "https://leetcode.com/problems/check-knight-tour-configuration/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "Sp1jzttFVdE"
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
          "BdSJnIdR-4s"
        ]
      },
      {
        "id": "P3-U2A-PR15",
        "title": "Sudoku Solver",
        "url": "https://leetcode.com/problems/sudoku-solver/",
        "platform": "LeetCode",
        "difficulty": "Hard",
        "videoIds": [
          "70cP3qtJp-s"
        ]
      },
      {
        "id": "P3-U2A-PR16",
        "title": "Grid Paths (Backtracking on a Grid)",
        "url": "https://cses.fi/problemset/task/1625",
        "platform": "CSES",
        "difficulty": "Hard",
        "videoIds": [
          "D8Yze9CDDAw"
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
        "id": "SBQfXK7q5K4",
        "title": "Major Update & Reaching 1000M Views",
        "url": "https://www.youtube.com/watch?v=SBQfXK7q5K4",
        "type": "Playlist",
        "playlistIndex": 52,
        "minutes": 4
      },
      {
        "id": "8MNB0Mba_Dc",
        "title": "Lec 51: Quick Sort Algorithm",
        "url": "https://www.youtube.com/watch?v=8MNB0Mba_Dc",
        "type": "Playlist",
        "playlistIndex": 53,
        "minutes": 26
      },
      {
        "id": "ynnWDBTdVi0",
        "title": "Count Inversions (Brute & Optimal)",
        "url": "https://www.youtube.com/watch?v=ynnWDBTdVi0",
        "type": "Playlist",
        "playlistIndex": 54,
        "minutes": 25
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
          "ynnWDBTdVi0"
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
          "ynnWDBTdVi0"
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
          "ynnWDBTdVi0"
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
        "id": "7tzHzN_Ehus",
        "title": "Height of a Binary Tree & Count of Nodes",
        "url": "https://www.youtube.com/watch?v=7tzHzN_Ehus",
        "type": "Playlist",
        "playlistIndex": 86,
        "minutes": 23
      },
      {
        "id": "tumW7jsjv68",
        "title": "Identical Tree & Subtree of Another Tree",
        "url": "https://www.youtube.com/watch?v=tumW7jsjv68",
        "type": "Playlist",
        "playlistIndex": 87,
        "minutes": 23
      },
      {
        "id": "aPyDPImR5UM",
        "title": "Diameter of a Binary Tree",
        "url": "https://www.youtube.com/watch?v=aPyDPImR5UM",
        "type": "Playlist",
        "playlistIndex": 88,
        "minutes": 19
      },
      {
        "id": "FGr-syrhvOA",
        "title": "Top View of a Binary Tree",
        "url": "https://www.youtube.com/watch?v=FGr-syrhvOA",
        "type": "Playlist",
        "playlistIndex": 89,
        "minutes": 20
      },
      {
        "id": "ze4JO_ODl3w",
        "title": "Kth Level of a Binary Tree",
        "url": "https://www.youtube.com/watch?v=ze4JO_ODl3w",
        "type": "Playlist",
        "playlistIndex": 90,
        "minutes": 8
      },
      {
        "id": "oX5D0uKOMck",
        "title": "Lowest Common Ancestor in a Binary Tree",
        "url": "https://www.youtube.com/watch?v=oX5D0uKOMck",
        "type": "Playlist",
        "playlistIndex": 91,
        "minutes": 18
      },
      {
        "id": "33b1M980cCA",
        "title": "Build Tree from Preorder & Inorder",
        "url": "https://www.youtube.com/watch?v=33b1M980cCA",
        "type": "Playlist",
        "playlistIndex": 92,
        "minutes": 21
      },
      {
        "id": "TY6kEejJEM0",
        "title": "Transform to Sum Tree",
        "url": "https://www.youtube.com/watch?v=TY6kEejJEM0",
        "type": "Playlist",
        "playlistIndex": 93,
        "minutes": 9
      },
      {
        "id": "AWJD__CfM6A",
        "title": "Binary Tree Paths",
        "url": "https://www.youtube.com/watch?v=AWJD__CfM6A",
        "type": "Playlist",
        "playlistIndex": 94,
        "minutes": 10
      },
      {
        "id": "rhz-csskg_A",
        "title": "Maximum Width of a Binary Tree",
        "url": "https://www.youtube.com/watch?v=rhz-csskg_A",
        "type": "Playlist",
        "playlistIndex": 95,
        "minutes": 21
      },
      {
        "id": "PUfADhkq1LI",
        "title": "Morris Inorder Traversal",
        "url": "https://www.youtube.com/watch?v=PUfADhkq1LI",
        "type": "Playlist",
        "playlistIndex": 96,
        "minutes": 18
      },
      {
        "id": "dU2Z5HWSGM0",
        "title": "Flatten Binary Tree to Linked List",
        "url": "https://www.youtube.com/watch?v=dU2Z5HWSGM0",
        "type": "Playlist",
        "playlistIndex": 97,
        "minutes": 16
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
        "id": "0s6sCjs_4g0",
        "title": "Sorted Array to Balanced BST",
        "url": "https://www.youtube.com/watch?v=0s6sCjs_4g0",
        "type": "Playlist",
        "playlistIndex": 99,
        "minutes": 9
      },
      {
        "id": "dSBcCynP1nA",
        "title": "Validate Binary Search Tree",
        "url": "https://www.youtube.com/watch?v=dSBcCynP1nA",
        "type": "Playlist",
        "playlistIndex": 100,
        "minutes": 13
      },
      {
        "id": "WZmjRXF_Zi4",
        "title": "Min Distance Between BST Nodes",
        "url": "https://www.youtube.com/watch?v=WZmjRXF_Zi4",
        "type": "Playlist",
        "playlistIndex": 101,
        "minutes": 14
      },
      {
        "id": "Kq4BbvIhj44",
        "title": "Kth Smallest in a BST",
        "url": "https://www.youtube.com/watch?v=Kq4BbvIhj44",
        "type": "Playlist",
        "playlistIndex": 102,
        "minutes": 13
      },
      {
        "id": "ORxkZ12FrU4",
        "title": "Lowest Common Ancestor in a BST",
        "url": "https://www.youtube.com/watch?v=ORxkZ12FrU4",
        "type": "Playlist",
        "playlistIndex": 103,
        "minutes": 12
      },
      {
        "id": "-n5Ur1wE5Jc",
        "title": "Construct BST from Preorder",
        "url": "https://www.youtube.com/watch?v=-n5Ur1wE5Jc",
        "type": "Playlist",
        "playlistIndex": 104,
        "minutes": 19
      },
      {
        "id": "AiKZjCuy2k4",
        "title": "Merge Two Binary Search Trees",
        "url": "https://www.youtube.com/watch?v=AiKZjCuy2k4",
        "type": "Playlist",
        "playlistIndex": 105,
        "minutes": 17
      },
      {
        "id": "0KGzfij_SCk",
        "title": "Recover BST",
        "url": "https://www.youtube.com/watch?v=0KGzfij_SCk",
        "type": "Playlist",
        "playlistIndex": 106,
        "minutes": 24
      },
      {
        "id": "Pr-HFxp7npk",
        "title": "Largest BST in a Binary Tree",
        "url": "https://www.youtube.com/watch?v=Pr-HFxp7npk",
        "type": "Playlist",
        "playlistIndex": 107,
        "minutes": 25
      },
      {
        "id": "a8VKpW1DsD8",
        "title": "Populate Next Right Pointers in Each Node",
        "url": "https://www.youtube.com/watch?v=a8VKpW1DsD8",
        "type": "Playlist",
        "playlistIndex": 108,
        "minutes": 11
      },
      {
        "id": "dS1bKglre3A",
        "title": "BST Iterator",
        "url": "https://www.youtube.com/watch?v=dS1bKglre3A",
        "type": "Playlist",
        "playlistIndex": 109,
        "minutes": 17
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
          "PUfADhkq1LI"
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
          "7tzHzN_Ehus"
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
          "WZmjRXF_Zi4"
        ]
      },
      {
        "id": "P3-U3-PR20",
        "title": "Count Complete Tree Nodes",
        "url": "https://leetcode.com/problems/count-complete-tree-nodes/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "7tzHzN_Ehus"
        ]
      },
      {
        "id": "P3-U3-PR21",
        "title": "Same Tree",
        "url": "https://leetcode.com/problems/same-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "tumW7jsjv68"
        ]
      },
      {
        "id": "P3-U3-PR22",
        "title": "Subtree of Another Tree",
        "url": "https://leetcode.com/problems/subtree-of-another-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "tumW7jsjv68"
        ]
      },
      {
        "id": "P3-U3-PR23",
        "title": "Diameter of Binary Tree",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "aPyDPImR5UM"
        ]
      },
      {
        "id": "P3-U3-PR25",
        "title": "Average of Levels in Binary Tree (Level by Level)",
        "url": "https://leetcode.com/problems/average-of-levels-in-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "ze4JO_ODl3w"
        ]
      },
      {
        "id": "P3-U3-PR29",
        "title": "Binary Tree Paths",
        "url": "https://leetcode.com/problems/binary-tree-paths/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "AWJD__CfM6A"
        ]
      },
      {
        "id": "P3-U3-PR32",
        "title": "Convert Sorted Array to Binary Search Tree",
        "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "0s6sCjs_4g0"
        ]
      },
      {
        "id": "P3-U3-PR33",
        "title": "Minimum Distance Between BST Nodes",
        "url": "https://leetcode.com/problems/minimum-distance-between-bst-nodes/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "WZmjRXF_Zi4"
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
          "ze4JO_ODl3w"
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
          "dSBcCynP1nA"
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
          "Kq4BbvIhj44"
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
          "aPyDPImR5UM"
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
          "ORxkZ12FrU4"
        ]
      },
      {
        "id": "P3-U3-PR24",
        "title": "Top View of Binary Tree",
        "url": "https://www.geeksforgeeks.org/print-nodes-in-top-view-of-binary-tree/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "FGr-syrhvOA"
        ]
      },
      {
        "id": "P3-U3-PR26",
        "title": "Lowest Common Ancestor of a Binary Tree",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "oX5D0uKOMck"
        ]
      },
      {
        "id": "P3-U3-PR27",
        "title": "Construct Binary Tree from Preorder and Inorder Traversal",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "33b1M980cCA"
        ]
      },
      {
        "id": "P3-U3-PR28",
        "title": "Most Frequent Subtree Sum (Subtree Sums)",
        "url": "https://leetcode.com/problems/most-frequent-subtree-sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "TY6kEejJEM0"
        ]
      },
      {
        "id": "P3-U3-PR30",
        "title": "Maximum Width of Binary Tree",
        "url": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "rhz-csskg_A"
        ]
      },
      {
        "id": "P3-U3-PR31",
        "title": "Flatten Binary Tree to Linked List",
        "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "dU2Z5HWSGM0"
        ]
      },
      {
        "id": "P3-U3-PR34",
        "title": "Construct Binary Search Tree from Preorder Traversal",
        "url": "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "-n5Ur1wE5Jc"
        ]
      },
      {
        "id": "P3-U3-PR35",
        "title": "All Elements in Two Binary Search Trees",
        "url": "https://leetcode.com/problems/all-elements-in-two-binary-search-trees/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "AiKZjCuy2k4"
        ]
      },
      {
        "id": "P3-U3-PR36",
        "title": "Recover Binary Search Tree",
        "url": "https://leetcode.com/problems/recover-binary-search-tree/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "0KGzfij_SCk"
        ]
      },
      {
        "id": "P3-U3-PR38",
        "title": "Populating Next Right Pointers in Each Node",
        "url": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "a8VKpW1DsD8"
        ]
      },
      {
        "id": "P3-U3-PR39",
        "title": "Binary Search Tree Iterator",
        "url": "https://leetcode.com/problems/binary-search-tree-iterator/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "dS1bKglre3A"
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
          "Pr-HFxp7npk"
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
        "id": "scQITTLgFJo",
        "title": "BFS Traversal in Graphs",
        "url": "https://www.youtube.com/watch?v=scQITTLgFJo",
        "type": "Playlist",
        "playlistIndex": 112,
        "minutes": 19
      },
      {
        "id": "3czYbhac160",
        "title": "DFS Traversal in Graphs",
        "url": "https://www.youtube.com/watch?v=3czYbhac160",
        "type": "Playlist",
        "playlistIndex": 113,
        "minutes": 14
      },
      {
        "id": "AME6baBpswY",
        "title": "Number of Islands (Connected Components in a Matrix)",
        "url": "https://www.youtube.com/watch?v=AME6baBpswY",
        "type": "Playlist",
        "playlistIndex": 116,
        "minutes": 17
      },
      {
        "id": "RmXo5SWkhCs",
        "title": "Rotting Oranges (Multi-Source BFS)",
        "url": "https://www.youtube.com/watch?v=RmXo5SWkhCs",
        "type": "Playlist",
        "playlistIndex": 117,
        "minutes": 26
      },
      {
        "id": "JI_e2RzARbM",
        "title": "Flood Fill Algorithm",
        "url": "https://www.youtube.com/watch?v=JI_e2RzARbM",
        "type": "Playlist",
        "playlistIndex": 122,
        "minutes": 15
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
          "JI_e2RzARbM"
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
          "AME6baBpswY"
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
          "RmXo5SWkhCs"
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
        "id": "37cJ38HadM4",
        "title": "Course Schedule (Graph & Topological Sort)",
        "url": "https://www.youtube.com/watch?v=37cJ38HadM4",
        "type": "Playlist",
        "playlistIndex": 120,
        "minutes": 18
      },
      {
        "id": "rZsgWxodGmM",
        "title": "Course Schedule II (Topological Sort)",
        "url": "https://www.youtube.com/watch?v=rZsgWxodGmM",
        "type": "Playlist",
        "playlistIndex": 121,
        "minutes": 20
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
        "id": "6h1SucBNxgc",
        "title": "Bridges in a Graph using Tarjan's Algorithm",
        "url": "https://www.youtube.com/watch?v=6h1SucBNxgc",
        "type": "Playlist",
        "playlistIndex": 133,
        "minutes": 33
      },
      {
        "id": "cn7pov3BEmg",
        "title": "Articulation Points using Tarjan's Algorithm",
        "url": "https://www.youtube.com/watch?v=cn7pov3BEmg",
        "type": "Playlist",
        "playlistIndex": 134,
        "minutes": 37
      },
      {
        "id": "lqY8TE0P1S8",
        "title": "Strongly Connected Components - Kosaraju's Algorithm",
        "url": "https://www.youtube.com/watch?v=lqY8TE0P1S8",
        "type": "Playlist",
        "playlistIndex": 135,
        "minutes": 26
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
          "rZsgWxodGmM"
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
          "37cJ38HadM4"
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
          "37cJ38HadM4"
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
          "lqY8TE0P1S8"
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
          "6h1SucBNxgc"
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
          "lqY8TE0P1S8"
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
          "cn7pov3BEmg"
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
        "id": "8gYBHjtjWBI",
        "title": "Dijkstra's Algorithm (Single-Source Shortest Path)",
        "url": "https://www.youtube.com/watch?v=8gYBHjtjWBI",
        "type": "Playlist",
        "playlistIndex": 124,
        "minutes": 35
      },
      {
        "id": "3rFHlbJ7qKc",
        "title": "Bellman-Ford Algorithm",
        "url": "https://www.youtube.com/watch?v=3rFHlbJ7qKc",
        "type": "Playlist",
        "playlistIndex": 125,
        "minutes": 24
      },
      {
        "id": "Sflh1z6cIMk",
        "title": "Prim's Algorithm (Minimum Spanning Tree)",
        "url": "https://www.youtube.com/watch?v=Sflh1z6cIMk",
        "type": "Playlist",
        "playlistIndex": 127,
        "minutes": 26
      },
      {
        "id": "nnrjWxWMo3E",
        "title": "Disjoint Set Union (Rank/Size & Path Compression)",
        "url": "https://www.youtube.com/watch?v=nnrjWxWMo3E",
        "type": "Playlist",
        "playlistIndex": 128,
        "minutes": 34
      },
      {
        "id": "inoM6jwj1CA",
        "title": "Kruskal's Algorithm (Minimum Spanning Tree)",
        "url": "https://www.youtube.com/watch?v=inoM6jwj1CA",
        "type": "Playlist",
        "playlistIndex": 129,
        "minutes": 29
      },
      {
        "id": "J1yCPIP-K8s",
        "title": "Number of Provinces",
        "url": "https://www.youtube.com/watch?v=J1yCPIP-K8s",
        "type": "Playlist",
        "playlistIndex": 130,
        "minutes": 13
      },
      {
        "id": "mEx8JJQJUs8",
        "title": "Min Cost to Connect All Points",
        "url": "https://www.youtube.com/watch?v=mEx8JJQJUs8",
        "type": "Playlist",
        "playlistIndex": 131,
        "minutes": 21
      },
      {
        "id": "CLmykzpeCCs",
        "title": "Cheapest Flights Within K Stops",
        "url": "https://www.youtube.com/watch?v=CLmykzpeCCs",
        "type": "Playlist",
        "playlistIndex": 132,
        "minutes": 30
      },
      {
        "id": "iZBXd-vjHUA",
        "title": "Floyd-Warshall (All-Pairs Shortest Path)",
        "url": "https://www.youtube.com/watch?v=iZBXd-vjHUA",
        "type": "Playlist",
        "playlistIndex": 136,
        "minutes": 28
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
          "8gYBHjtjWBI"
        ]
      },
      {
        "id": "P4-U1-PR2",
        "title": "Shortest Routes I (Dijkstra)",
        "url": "https://cses.fi/problemset/task/1671",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "8gYBHjtjWBI"
        ]
      },
      {
        "id": "P4-U1-PR3",
        "title": "Cycle Finding (Bellman-Ford)",
        "url": "https://cses.fi/problemset/task/1197",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "3rFHlbJ7qKc"
        ]
      },
      {
        "id": "P4-U1-PR4",
        "title": "Min Cost to Connect All Points (MST)",
        "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "Sflh1z6cIMk",
          "inoM6jwj1CA",
          "mEx8JJQJUs8"
        ]
      },
      {
        "id": "P4-U1-PR5",
        "title": "Road Reparation (MST)",
        "url": "https://cses.fi/problemset/task/1675",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "Sflh1z6cIMk",
          "inoM6jwj1CA"
        ]
      },
      {
        "id": "P4-U1-PR6",
        "title": "Road Construction (Union-Find)",
        "url": "https://cses.fi/problemset/task/1676",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "nnrjWxWMo3E"
        ]
      },
      {
        "id": "P4-U1-PR7",
        "title": "Number of Operations to Make Network Connected",
        "url": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "nnrjWxWMo3E"
        ]
      },
      {
        "id": "P4-U1-PR8",
        "title": "Number of Provinces (Union-Find / DFS)",
        "url": "https://leetcode.com/problems/number-of-provinces/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "J1yCPIP-K8s"
        ]
      },
      {
        "id": "P4-U1-PR9",
        "title": "Cheapest Flights Within K Stops",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "CLmykzpeCCs"
        ]
      },
      {
        "id": "P4-U1-PR10",
        "title": "Shortest Routes II (Floyd-Warshall)",
        "url": "https://cses.fi/problemset/task/1672",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "iZBXd-vjHUA"
        ]
      },
      {
        "id": "P4-U1-PR11",
        "title": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
        "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "iZBXd-vjHUA"
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
        "id": "uBA8DkCBdco",
        "title": "Complete Dynamic Programming (DP Series Lecture 1)",
        "url": "https://www.youtube.com/watch?v=uBA8DkCBdco",
        "type": "Playlist",
        "playlistIndex": 137,
        "minutes": 42
      },
      {
        "id": "3GzA0mz6wp0",
        "title": "DP 2: Climbing Stairs (1D DP)",
        "url": "https://www.youtube.com/watch?v=3GzA0mz6wp0",
        "type": "Playlist",
        "playlistIndex": 138,
        "minutes": 26
      },
      {
        "id": "BRmLlJA6ncI",
        "title": "DP 3: House Robber (1D DP)",
        "url": "https://www.youtube.com/watch?v=BRmLlJA6ncI",
        "type": "Playlist",
        "playlistIndex": 139,
        "minutes": 26
      },
      {
        "id": "hSMJj9AdNBo",
        "title": "DP 4: House Robber II (1D DP)",
        "url": "https://www.youtube.com/watch?v=hSMJj9AdNBo",
        "type": "Playlist",
        "playlistIndex": 140,
        "minutes": 23
      },
      {
        "id": "AKqlgskrZwI",
        "title": "DP 5: Frog Jump (1D DP)",
        "url": "https://www.youtube.com/watch?v=AKqlgskrZwI",
        "type": "Playlist",
        "playlistIndex": 141,
        "minutes": 29
      },
      {
        "id": "KwItlcfF9vE",
        "title": "DP 6: Min Cost Climbing Stairs (1D DP)",
        "url": "https://www.youtube.com/watch?v=KwItlcfF9vE",
        "type": "Playlist",
        "playlistIndex": 142,
        "minutes": 26
      },
      {
        "id": "yggezlvUN2w",
        "title": "Fractional Knapsack (Greedy Method)",
        "url": "https://www.youtube.com/watch?v=yggezlvUN2w",
        "type": "Playlist",
        "playlistIndex": 143,
        "minutes": 17
      },
      {
        "id": "tEW-zDckvFw",
        "title": "0/1 Knapsack: Recursion to DP to Space Optimized",
        "url": "https://www.youtube.com/watch?v=tEW-zDckvFw",
        "type": "Playlist",
        "playlistIndex": 144,
        "minutes": 45
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
          "AKqlgskrZwI"
        ]
      },
      {
        "id": "P4-U2-PR7",
        "title": "Min Cost Climbing Stairs",
        "url": "https://leetcode.com/problems/min-cost-climbing-stairs/",
        "platform": "LeetCode",
        "difficulty": "Easy",
        "videoIds": [
          "KwItlcfF9vE"
        ]
      },
      {
        "id": "P4-U2-PR1",
        "title": "Dice Combinations (Intro DP)",
        "url": "https://cses.fi/problemset/task/1633",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "uBA8DkCBdco"
        ]
      },
      {
        "id": "P4-U2-PR2",
        "title": "Decode Ways (1D DP)",
        "url": "https://leetcode.com/problems/decode-ways/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "3GzA0mz6wp0"
        ]
      },
      {
        "id": "P4-U2-PR3",
        "title": "House Robber",
        "url": "https://leetcode.com/problems/house-robber/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "BRmLlJA6ncI"
        ]
      },
      {
        "id": "P4-U2-PR4",
        "title": "House Robber II",
        "url": "https://leetcode.com/problems/house-robber-ii/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "hSMJj9AdNBo"
        ]
      },
      {
        "id": "P4-U2-PR6",
        "title": "Frog 2 (AtCoder DP Contest B)",
        "url": "https://atcoder.jp/contests/dp/tasks/dp_b",
        "platform": "AtCoder",
        "difficulty": "Medium",
        "videoIds": [
          "AKqlgskrZwI"
        ]
      },
      {
        "id": "P4-U2-PR8",
        "title": "Fractional Knapsack",
        "url": "https://www.geeksforgeeks.org/fractional-knapsack-problem/",
        "platform": "GFG",
        "difficulty": "Medium",
        "videoIds": [
          "yggezlvUN2w"
        ]
      },
      {
        "id": "P4-U2-PR9",
        "title": "Book Shop (0/1 Knapsack)",
        "url": "https://cses.fi/problemset/task/1158",
        "platform": "CSES",
        "difficulty": "Medium",
        "videoIds": [
          "tEW-zDckvFw"
        ]
      },
      {
        "id": "P4-U2-PR10",
        "title": "Partition Equal Subset Sum",
        "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
        "platform": "LeetCode",
        "difficulty": "Medium",
        "videoIds": [
          "tEW-zDckvFw"
        ]
      }
    ]
  }
];

export const PLAYLIST_LECTURE_COUNT = new Set(
  SYLLABUS_DATA.flatMap((u) => u.videos)
    .map((v) => v.playlistIndex)
    .filter(Boolean)
).size;
