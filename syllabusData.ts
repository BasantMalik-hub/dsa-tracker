export interface Video {
  id: string;
  title: string;
  url: string;
  type: string;
}

export interface Problem {
  id: string;
  title: string;
  url: string;
  platform: string;
  difficulty: string;
  isCustom?: boolean;
}

export interface Unit {
  id: string;
  phase: 1 | 2 | 3;
  phaseName: string;
  courseCode: string;
  unitTitle: string;
  hours: number;
  subtopics: string[];
  videos: Video[];
  problems: Problem[];
}

// ==========================================
// 1. COMPLETE 3-PHASE SYLLABUS DATASET (21 UNITS)
// ==========================================
export const SYLLABUS_DATA: Unit[] = [
  // ---------------- PHASE 1: 25CS101 ----------------
  {
    id: 'P1-U1',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 1: System Basics, Flowcharts & First C++ Program',
    hours: 8,
    subtopics: [
      'Computer System Architecture: Memory, Processor, I/O Devices & OS Role',
      'Language Translators: Assembler, Compiler, Interpreter, Loader & Linker',
      'Algorithm Representation: Flowcharts, Pseudocode & Dry-Run Tracing',
      'C++ Program Structure: Headers, Namespaces, main(), std::cin / std::cout & Compilation Errors'
    ],
    videos: [
      {
        id: 'VTLCoHnyACE',
        title: 'Lec 1: Flowchart & Pseudocode + Installation',
        url: 'https://www.youtube.com/watch?v=VTLCoHnyACE',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U1-PR1',
        title: 'Sum of Two Numbers & Basic C++ I/O',
        url: 'https://www.codechef.com/practice/cpp',
        platform: 'CodeChef',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U1-PR2',
        title: 'Flowchart & Pseudocode Logic Tracing',
        url: 'https://www.geeksforgeeks.org/an-introduction-to-flowcharts/',
        platform: 'GFG',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U1-PR3',
        title: 'Watermelon (Basic I/O & Conditions)',
        url: 'https://codeforces.com/problemset/problem/4/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U1-PR4',
        title: 'Weird Algorithm (Loop + Simple Math)',
        url: 'https://cses.fi/problemset/task/1068',
        platform: 'CSES',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U1-PR5',
        title: 'Add Two Integers (Basic Functions & I/O)',
        url: 'https://leetcode.com/problems/add-two-integers/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U1-PR6',
        title: 'Number of Steps to Reduce a Number to Zero (Dry-Run Tracing)',
        url: 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'P1-U2A',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 2A: Tokens, Data Types & Operators',
    hours: 6,
    subtopics: [
      'C++ Tokens: Keywords, Identifiers, Constants, Variable Scope & Lifetime',
      'Data Types & Modifiers: Primitive, Derived, User-Defined & Explicit/Implicit Typecasting',
      'Arithmetic, Relational, Logical & Ternary Conditional Operators',
      'Bitwise Operators (&, |, ^, ~, <<, >>), Operator Precedence & <cmath> Library'
    ],
    videos: [
      {
        id: 'Dxu7GKtdbnA',
        title: 'Lec 2: Variables, Data Types & Operators',
        url: 'https://www.youtube.com/watch?v=Dxu7GKtdbnA',
        type: 'Playlist'
      },
      {
        id: 'r-u4uh3QvsQ',
        title: 'Lec 7: Bitwise Operators & Data Type Modifiers',
        url: 'https://www.youtube.com/watch?v=r-u4uh3QvsQ',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U2A-PR1',
        title: 'Single Number (Bitwise XOR Trick)',
        url: 'https://leetcode.com/problems/single-number/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR2',
        title: 'Number of 1 Bits (Hamming Weight)',
        url: 'https://leetcode.com/problems/number-of-1-bits/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR3',
        title: 'Power of Two (Bitwise AND Trick)',
        url: 'https://leetcode.com/problems/power-of-two/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR4',
        title: 'Missing Number (XOR / Arithmetic Operators)',
        url: 'https://leetcode.com/problems/missing-number/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR5',
        title: 'Counting Bits (Bit Manipulation)',
        url: 'https://leetcode.com/problems/counting-bits/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR6',
        title: 'Hamming Distance (XOR & Bit Count)',
        url: 'https://leetcode.com/problems/hamming-distance/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR8',
        title: 'Soldier and Bananas (Arithmetic Operators)',
        url: 'https://codeforces.com/problemset/problem/546/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR9',
        title: 'Bit Strings (Powers & Modulo Arithmetic)',
        url: 'https://cses.fi/problemset/task/1617',
        platform: 'CSES',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2A-PR7',
        title: 'Sum of Two Integers (Add Without + Operator)',
        url: 'https://leetcode.com/problems/sum-of-two-integers/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P1-U2B',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 2B: Control Flow & Platform Input Handling',
    hours: 6,
    subtopics: [
      'Conditional Branching: if, if-else, nested if-else & else-if ladders',
      'Switch-Case Statements, Fall-through Behavior & Menu-Driven Logic',
      'Competitive Programming I/O: Handling single & multiple known test-case inputs'
    ],
    videos: [
      {
        id: 'qR9U6bKxJ7g',
        title: 'Lec 3: Conditional Statements & Loops (Part 1)',
        url: 'https://www.youtube.com/watch?v=qR9U6bKxJ7g',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U2B-PR1',
        title: 'Fizz Buzz Conditional Branching',
        url: 'https://leetcode.com/problems/fizz-buzz/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2B-PR2',
        title: 'Team (Conditional Branching)',
        url: 'https://codeforces.com/problemset/problem/231/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2B-PR3',
        title: 'Next Round (If-Else Logic)',
        url: 'https://codeforces.com/problemset/problem/158/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2B-PR4',
        title: 'Domino Piling (Simple Decision Logic)',
        url: 'https://codeforces.com/problemset/problem/50/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2B-PR5',
        title: 'Robot Return to Origin (Switch-Case Style Moves)',
        url: 'https://leetcode.com/problems/robot-return-to-origin/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U2B-PR6',
        title: 'Day of the Week (Conditional Logic)',
        url: 'https://leetcode.com/problems/day-of-the-week/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'P1-U3A',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 3A: Iteration, Loops & Pattern Building',
    hours: 6,
    subtopics: [
      'Iterative Loops: while, do-while, and for loops with multiple control variables',
      'Jump Statements: break & continue execution management',
      'Nested Loops & 2D Star/Number/Character Pattern Engineering',
      'EOF Input Handling: Reading unknown-count inputs across lines'
    ],
    videos: [
      {
        id: 'qR9U6bKxJ7g',
        title: 'Lec 3: Conditional Statements & Loops',
        url: 'https://www.youtube.com/watch?v=qR9U6bKxJ7g',
        type: 'Playlist'
      },
      {
        id: 'rga_q2N7vU8',
        title: 'Lec 4: Patterns in C++ (Nested Loops)',
        url: 'https://www.youtube.com/watch?v=rga_q2N7vU8',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U3A-PR1',
        title: 'Palindrome Number',
        url: 'https://leetcode.com/problems/palindrome-number/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3A-PR3',
        title: 'Pascal’s Triangle (Nested Loop Pattern)',
        url: 'https://leetcode.com/problems/pascals-triangle/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3A-PR4',
        title: 'Happy Number (While Loop & Digit Extraction)',
        url: 'https://leetcode.com/problems/happy-number/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3A-PR5',
        title: 'Add Digits (Loops & Digit Sum)',
        url: 'https://leetcode.com/problems/add-digits/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3A-PR6',
        title: 'Stones on the Table (Loop Scanning)',
        url: 'https://codeforces.com/problemset/problem/266/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3A-PR7',
        title: 'Repetitions (Single-Pass Loop)',
        url: 'https://cses.fi/problemset/task/1069',
        platform: 'CSES',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3A-PR2',
        title: 'Reverse Integer (Overflow Safe)',
        url: 'https://leetcode.com/problems/reverse-integer/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U3A-PR8',
        title: 'Count Primes (Nested Loops / Sieve)',
        url: 'https://leetcode.com/problems/count-primes/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P1-U3B',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 3B: 1D/2D Arrays & Dynamic Vectors',
    hours: 6,
    subtopics: [
      '1D Arrays: Contiguous Memory Representation, Indexing & Element Manipulation',
      'Subarray Fundamentals & Kadane’s Maximum Subarray Sum Algorithm',
      'Multi-dimensional (2D) Matrices: Row/Column Major Storage & Spiral Traversal',
      'STL Dynamic Vectors: push_back, pop_back, size vs capacity & resizing'
    ],
    videos: [
      {
        id: '8wmn7k1TTcI',
        title: 'Lec 8: Array Data Structure - Part 1',
        url: 'https://www.youtube.com/watch?v=8wmn7k1TTcI',
        type: 'Playlist'
      },
      {
        id: 'NWg38xWYzEg',
        title: 'Lec 9: Vectors in C++ (Arrays Part 2)',
        url: 'https://www.youtube.com/watch?v=NWg38xWYzEg',
        type: 'Playlist'
      },
      {
        id: 'lBL8327gq8I',
        title: '2D Arrays in C++ | Part 1',
        url: 'https://www.youtube.com/watch?v=lBL8327gq8I',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U3B-PR3',
        title: 'Running Sum of 1d Array',
        url: 'https://leetcode.com/problems/running-sum-of-1d-array/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3B-PR4',
        title: 'Move Zeroes (In-Place Array Manipulation)',
        url: 'https://leetcode.com/problems/move-zeroes/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3B-PR5',
        title: 'Best Time to Buy and Sell Stock (Single Pass)',
        url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3B-PR6',
        title: 'Beautiful Matrix (2D Matrix Indexing)',
        url: 'https://codeforces.com/problemset/problem/263/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3B-PR7',
        title: 'Increasing Array (Array Traversal)',
        url: 'https://cses.fi/problemset/task/1094',
        platform: 'CSES',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U3B-PR1',
        title: "Maximum Subarray (Kadane's Algorithm)",
        url: 'https://leetcode.com/problems/maximum-subarray/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U3B-PR2',
        title: 'Spiral Matrix (2D Array Traversal)',
        url: 'https://leetcode.com/problems/spiral-matrix/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U3B-PR8',
        title: 'Rotate Array (Vector Rotation)',
        url: 'https://leetcode.com/problems/rotate-array/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U3B-PR9',
        title: 'Rotate Image (2D Matrix Transform)',
        url: 'https://leetcode.com/problems/rotate-image/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P1-U4',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 4: Modular Functions, Pointers & Intro to Recursion',
    hours: 8,
    subtopics: [
      'Modular Functions: Prototypes, Call Stack Frame, Default Arguments & Overloading',
      'Pointers & Memory Addresses: Dereferencing (*), Address-of (&) & Pointer Arithmetic',
      'Parameter Passing: Call by Value vs Call by Reference (Pointers & C++ References)',
      'Introductory Recursion: Base Case, Recursive Call Stack & Factorial/Fibonacci'
    ],
    videos: [
      {
        id: 'P08Z_NC8GuY',
        title: 'Lec 5: Functions in C++',
        url: 'https://www.youtube.com/watch?v=P08Z_NC8GuY',
        type: 'Playlist'
      },
      {
        id: 'qYEjR6M0wSk',
        title: 'Pointers in C++ (In Detail)',
        url: 'https://www.youtube.com/watch?v=qYEjR6M0wSk',
        type: 'Playlist'
      },
      {
        id: '9OsMG4fI4OY',
        title: 'Recursion Tutorial - Basics to Advanced (Part 1)',
        url: 'https://www.youtube.com/watch?v=9OsMG4fI4OY',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U4-PR2',
        title: 'Fibonacci Number (Recursive & Iterative)',
        url: 'https://leetcode.com/problems/fibonacci-number/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U4-PR3',
        title: 'Climbing Stairs (Intro Recursion / Memoization)',
        url: 'https://leetcode.com/problems/climbing-stairs/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U4-PR4',
        title: 'N-th Tribonacci Number (Recursion vs Iteration)',
        url: 'https://leetcode.com/problems/n-th-tribonacci-number/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U4-PR1',
        title: 'Pow(x, n) Binary Exponentiation',
        url: 'https://leetcode.com/problems/powx-n/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U4-PR5',
        title: 'Factorial Trailing Zeroes',
        url: 'https://leetcode.com/problems/factorial-trailing-zeroes/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U4-PR6',
        title: 'Trailing Zeros (Factorial Function Logic)',
        url: 'https://cses.fi/problemset/task/1618',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U4-PR7',
        title: 'K-th Symbol in Grammar (Recursion Tree)',
        url: 'https://leetcode.com/problems/k-th-symbol-in-grammar/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P1-U5A',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 5A: C++ Strings & Manipulation Operations',
    hours: 5,
    subtopics: [
      'Character Arrays vs std::string Class: Null-termination & Dynamic Allocation',
      'String Modification: insert(), erase(), replace(), append() & concatenation',
      'Substring & Search Operations: substr(), find(), length(), case conversion & alphanumeric parsing'
    ],
    videos: [
      {
        id: 'MOSjYaVymcU',
        title: 'Strings & Character Arrays in C++ - Part 1',
        url: 'https://www.youtube.com/watch?v=MOSjYaVymcU',
        type: 'Playlist'
      },
      {
        id: 'RitppzIdMCo',
        title: 'Strings - Part 4 (Reverse Words in String)',
        url: 'https://www.youtube.com/watch?v=RitppzIdMCo',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U5A-PR1',
        title: 'Valid Palindrome (Two-Pointer String)',
        url: 'https://leetcode.com/problems/valid-palindrome/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR3',
        title: 'Reverse String (Two-Pointer, In-Place)',
        url: 'https://leetcode.com/problems/reverse-string/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR4',
        title: 'Way Too Long Words (String Manipulation)',
        url: 'https://codeforces.com/problemset/problem/71/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR5',
        title: 'String Task (Char Parsing & Case)',
        url: 'https://codeforces.com/problemset/problem/118/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR6',
        title: 'Petya and Strings (Case-Insensitive Compare)',
        url: 'https://codeforces.com/problemset/problem/112/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR7',
        title: 'Valid Anagram (Character Counting)',
        url: 'https://leetcode.com/problems/valid-anagram/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR8',
        title: 'Longest Common Prefix',
        url: 'https://leetcode.com/problems/longest-common-prefix/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR9',
        title: 'Find the Index of the First Occurrence in a String (find())',
        url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5A-PR2',
        title: 'Reverse Words in a String',
        url: 'https://leetcode.com/problems/reverse-words-in-a-string/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U5A-PR10',
        title: 'Longest Palindromic Substring',
        url: 'https://leetcode.com/problems/longest-palindromic-substring/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P1-U5B',
    phase: 1,
    phaseName: 'Phase 1: C++ Programming Fundamentals',
    courseCode: '25CS101',
    unitTitle: 'Unit 5B: Object-Oriented Programming (OOP) Fundamentals',
    hours: 5,
    subtopics: [
      'Core OOP Pillars: Encapsulation, Abstraction, Inheritance & Polymorphism',
      'Classes & Objects: Access Specifiers (public, private, protected), Attributes & Member Methods',
      'Constructors (Default, Parameterized, Copy), Destructors & the this Pointer'
    ],
    videos: [
      {
        id: 'mlIUKyZIUUU',
        title: 'OOPs Tutorial in One Shot (C++ Language)',
        url: 'https://www.youtube.com/watch?v=mlIUKyZIUUU',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P1-U5B-PR1',
        title: 'Design Parking System (OOP Class State)',
        url: 'https://leetcode.com/problems/design-parking-system/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5B-PR2',
        title: 'Design an Ordered Stream (Class State)',
        url: 'https://leetcode.com/problems/design-an-ordered-stream/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P1-U5B-PR3',
        title: 'Simple Bank System (Encapsulation & Methods)',
        url: 'https://leetcode.com/problems/simple-bank-system/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U5B-PR4',
        title: 'Design Browser History (Class Design)',
        url: 'https://leetcode.com/problems/design-browser-history/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P1-U5B-PR5',
        title: 'Design Underground System (Classes & Maps)',
        url: 'https://leetcode.com/problems/design-underground-system/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },

  // ---------------- PHASE 2: 25CS201 ----------------
  {
    id: 'P2-U1',
    phase: 2,
    phaseName: 'Phase 2: Core Data Structures & Algorithms',
    courseCode: '25CS201',
    unitTitle: 'Unit 1: Asymptotic Complexity & Searching Techniques',
    hours: 8,
    subtopics: [
      'Data Structure Classification (Linear/Non-Linear) & Abstract Data Types (ADTs)',
      'Asymptotic Notations: Big-Oh (O), Big-Theta (Θ), Big-Omega (Ω) & Time-Space Trade-off',
      'Sequential (Linear) Search vs Binary Search (Iterative & Recursive Complexity Analysis)',
      'Binary Search on Answer Space: Rotated Arrays, Peak Element & Book Allocation'
    ],
    videos: [
      {
        id: 'PwKv8fOcriM',
        title: 'Time & Space Complexity Complete Guide',
        url: 'https://www.youtube.com/watch?v=PwKv8fOcriM',
        type: 'Playlist'
      },
      {
        id: 'TbbSJrY5GqQ',
        title: 'Binary Search Algorithm (Iterative & Recursive)',
        url: 'https://www.youtube.com/watch?v=TbbSJrY5GqQ',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P2-U1-PR1',
        title: 'Binary Search (Standard O(log N))',
        url: 'https://leetcode.com/problems/binary-search/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U1-PR3',
        title: 'Search Insert Position (Binary Search Boundary)',
        url: 'https://leetcode.com/problems/search-insert-position/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U1-PR4',
        title: 'Sqrt(x) (Binary Search on Answer)',
        url: 'https://leetcode.com/problems/sqrtx/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U1-PR2',
        title: 'Search in Rotated Sorted Array',
        url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U1-PR5',
        title: 'Find First and Last Position of Element in Sorted Array',
        url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U1-PR6',
        title: 'Find Minimum in Rotated Sorted Array',
        url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U1-PR7',
        title: 'Find Peak Element',
        url: 'https://leetcode.com/problems/find-peak-element/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U1-PR8',
        title: 'Koko Eating Bananas (Binary Search on Answer)',
        url: 'https://leetcode.com/problems/koko-eating-bananas/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U1-PR9',
        title: 'Factory Machines (Binary Search on Answer)',
        url: 'https://cses.fi/problemset/task/1620',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U1-PR10',
        title: 'Split Array Largest Sum (Book Allocation Pattern)',
        url: 'https://leetcode.com/problems/split-array-largest-sum/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P2-U2',
    phase: 2,
    phaseName: 'Phase 2: Core Data Structures & Algorithms',
    courseCode: '25CS201',
    unitTitle: 'Unit 2: Comparison & Linear-Time Sorting Algorithms',
    hours: 8,
    subtopics: [
      'Comparison Sorts: Bubble Sort, Selection Sort & Insertion Sort (Best/Avg/Worst Case)',
      'Dutch National Flag (DNF) 3-Way Partitioning Algorithm (Sort 0s, 1s & 2s)',
      'Linear-Time Non-Comparison Sorts: Counting Sort, Radix Sort & Bucket Sort'
    ],
    videos: [
      {
        id: '1jCFUv-Xlqo',
        title: 'Sorting Algorithms: Bubble, Selection & Insertion Sort',
        url: 'https://www.youtube.com/watch?v=1jCFUv-Xlqo',
        type: 'Playlist'
      },
      {
        id: 'J48aGjfjYTI',
        title: 'Sort 0s, 1s & 2s | DNF Sorting Algorithm',
        url: 'https://www.youtube.com/watch?v=J48aGjfjYTI',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P2-U2-PR3',
        title: 'Merge Sorted Array (Two-Pointer Merge)',
        url: 'https://leetcode.com/problems/merge-sorted-array/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U2-PR4',
        title: 'Height Checker (Counting Sort Idea)',
        url: 'https://leetcode.com/problems/height-checker/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U2-PR5',
        title: 'Relative Sort Array (Counting Sort)',
        url: 'https://leetcode.com/problems/relative-sort-array/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U2-PR6',
        title: 'Distinct Numbers (Sort & Count)',
        url: 'https://cses.fi/problemset/task/1621',
        platform: 'CSES',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U2-PR7',
        title: 'Twins (Sorting + Greedy)',
        url: 'https://codeforces.com/problemset/problem/160/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U2-PR1',
        title: 'Sort Colors (Dutch National Flag Algorithm)',
        url: 'https://leetcode.com/problems/sort-colors/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U2-PR2',
        title: 'Maximum Gap (Radix / Bucket Sort Application)',
        url: 'https://leetcode.com/problems/maximum-gap/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U2-PR8',
        title: 'Insertion Sort List',
        url: 'https://leetcode.com/problems/insertion-sort-list/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U2-PR9',
        title: 'Sort Characters By Frequency (Bucket Sort)',
        url: 'https://leetcode.com/problems/sort-characters-by-frequency/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P2-U3',
    phase: 2,
    phaseName: 'Phase 2: Core Data Structures & Algorithms',
    courseCode: '25CS201',
    unitTitle: 'Unit 3: Linked Lists & Polynomial Representation',
    hours: 10,
    subtopics: [
      'Singly Linked List: Dynamic Node Pointers, Insertion, Deletion, Reversal & Fast/Slow Pointers',
      'Doubly Linked List: Prev/Next Bidirectional Pointers & CRUD Operations',
      'Circular Linked List: Tail-to-Head Loop Management & Traversal',
      'Polynomial Representation: Single & Two-Variable Polynomial Addition, Subtraction & Multiplication'
    ],
    videos: [
      {
        id: 'LyuuqCVkP5I',
        title: 'Introduction to Linked List (Singly LL)',
        url: 'https://www.youtube.com/watch?v=LyuuqCVkP5I',
        type: 'Playlist'
      },
      {
        id: 'bO5DasTsaRQ',
        title: 'Doubly Linked List Complete Tutorial',
        url: 'https://www.youtube.com/watch?v=bO5DasTsaRQ',
        type: 'Playlist'
      },
      {
        id: 'e6lZY5Yha8U',
        title: 'Circular Linked List in Data Structures',
        url: 'https://www.youtube.com/watch?v=e6lZY5Yha8U',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P2-U3-PR1',
        title: 'Reverse Linked List',
        url: 'https://leetcode.com/problems/reverse-linked-list/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U3-PR3',
        title: 'Merge Two Sorted Lists',
        url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U3-PR4',
        title: 'Linked List Cycle (Fast/Slow Pointers)',
        url: 'https://leetcode.com/problems/linked-list-cycle/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U3-PR5',
        title: 'Middle of the Linked List (Fast/Slow Pointers)',
        url: 'https://leetcode.com/problems/middle-of-the-linked-list/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U3-PR2',
        title: "Linked List Cycle II (Floyd's Tortoise & Hare)",
        url: 'https://leetcode.com/problems/linked-list-cycle-ii/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U3-PR6',
        title: 'Remove Nth Node From End of List',
        url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U3-PR7',
        title: 'Design Linked List (Singly/Doubly CRUD)',
        url: 'https://leetcode.com/problems/design-linked-list/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U3-PR8',
        title: 'Add Two Numbers (Digit-wise List Addition)',
        url: 'https://leetcode.com/problems/add-two-numbers/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U3-PR9',
        title: 'LRU Cache (Doubly Linked List + Map)',
        url: 'https://leetcode.com/problems/lru-cache/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U3-PR10',
        title: 'Adding Two Polynomials Using Linked List',
        url: 'https://www.geeksforgeeks.org/adding-two-polynomials-using-linked-list/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U3-PR11',
        title: 'Multiplication of Two Polynomials Using Linked List',
        url: 'https://www.geeksforgeeks.org/multiplication-of-two-polynomials-using-linked-list/',
        platform: 'GFG',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P2-U4',
    phase: 2,
    phaseName: 'Phase 2: Core Data Structures & Algorithms',
    courseCode: '25CS201',
    unitTitle: 'Unit 4: Hashing Functions & Collision Resolution',
    hours: 8,
    subtopics: [
      'Hash Table Architecture & Hash Functions: Division Modulo, Digit Extraction, Mid-Square & Folding',
      'Open Hashing (Separate Chaining): Linked List Buckets & Load Factor (λ) Analysis',
      'Closed Hashing (Open Addressing): Linear Probing, Quadratic Probing & Double Hashing'
    ],
    videos: [
      {
        id: '0Fxc_jKj2vo',
        title: 'Two Sum, Find Duplicate | Hashing Problems',
        url: 'https://www.youtube.com/watch?v=0Fxc_jKj2vo',
        type: 'Playlist'
      },
      {
        id: '0kfM_YEzR94',
        title: 'Hashing - Introduction & Collision Resolution',
        url: 'https://www.youtube.com/watch?v=0kfM_YEzR94',
        type: 'Archive'
      }
    ],
    problems: [
      {
        id: 'P2-U4-PR1',
        title: 'Two Sum (Hash Table Lookup)',
        url: 'https://leetcode.com/problems/two-sum/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U4-PR2',
        title: 'Design HashMap (Collision Handling)',
        url: 'https://leetcode.com/problems/design-hashmap/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U4-PR3',
        title: 'Contains Duplicate (Hash Set)',
        url: 'https://leetcode.com/problems/contains-duplicate/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U4-PR4',
        title: 'Design HashSet (Buckets & Collision Handling)',
        url: 'https://leetcode.com/problems/design-hashset/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U4-PR5',
        title: 'Sum of Two Values (Hash Map Lookup)',
        url: 'https://cses.fi/problemset/task/1640',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U4-PR6',
        title: 'Registration System (Hashing Names)',
        url: 'https://codeforces.com/problemset/problem/4/C',
        platform: 'Codeforces',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U4-PR7',
        title: 'Subarray Sum Equals K (Prefix Sum + Hash Map)',
        url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U4-PR8',
        title: 'Longest Consecutive Sequence (Hash Set)',
        url: 'https://leetcode.com/problems/longest-consecutive-sequence/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U4-PR9',
        title: 'Valid Sudoku (Hash Set Validation)',
        url: 'https://leetcode.com/problems/valid-sudoku/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U4-PR10',
        title: 'Hashing - Separate Chaining (Open Hashing)',
        url: 'https://www.geeksforgeeks.org/hashing-set-2-separate-chaining/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U4-PR11',
        title: 'Hashing - Open Addressing (Probing)',
        url: 'https://www.geeksforgeeks.org/hashing-set-3-open-addressing/',
        platform: 'GFG',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P2-U5',
    phase: 2,
    phaseName: 'Phase 2: Core Data Structures & Algorithms',
    courseCode: '25CS201',
    unitTitle: 'Unit 5: STL Ordered/Unordered Sets & Maps',
    hours: 6,
    subtopics: [
      'Ordered vs Unordered Containers: Red-Black Tree O(log N) vs Hash Table O(1) Internals',
      'STL Set & Multiset Operations: insert(), erase(), find(), count(), Union, Intersection & Difference',
      'STL Map & Unordered_Map: Frequency Counting, Key-Value Pairs & Custom Comparator Sorting'
    ],
    videos: [
      {
        id: 'okhdtEk1iKk',
        title: 'C++ STL Complete Tutorial (One Shot)',
        url: 'https://www.youtube.com/watch?v=okhdtEk1iKk',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P2-U5-PR1',
        title: 'Intersection of Two Arrays (STL Set)',
        url: 'https://leetcode.com/problems/intersection-of-two-arrays/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U5-PR3',
        title: 'Free Cash (Map Frequency Counting)',
        url: 'https://codeforces.com/problemset/problem/237/A',
        platform: 'Codeforces',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U5-PR4',
        title: 'Intersection of Two Arrays II (STL Map)',
        url: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U5-PR5',
        title: 'Contains Duplicate II (Unordered Map)',
        url: 'https://leetcode.com/problems/contains-duplicate-ii/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U5-PR6',
        title: 'Sort Array by Increasing Frequency (Custom Comparator)',
        url: 'https://leetcode.com/problems/sort-array-by-increasing-frequency/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P2-U5-PR2',
        title: 'Group Anagrams (STL Map)',
        url: 'https://leetcode.com/problems/group-anagrams/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U5-PR7',
        title: 'Concert Tickets (Multiset lower_bound)',
        url: 'https://cses.fi/problemset/task/1091',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U5-PR8',
        title: 'Traffic Lights (STL Set)',
        url: 'https://cses.fi/problemset/task/1163',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U5-PR9',
        title: 'My Calendar I (Ordered Map / Set)',
        url: 'https://leetcode.com/problems/my-calendar-i/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P2-U5-PR10',
        title: 'Contains Duplicate III (Ordered Set)',
        url: 'https://leetcode.com/problems/contains-duplicate-iii/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },

  // ---------------- PHASE 3: 25CS303 ----------------
  {
    id: 'P3-U1A',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 1A: Stacks & Expression Notations',
    hours: 3,
    subtopics: [
      'Stack LIFO ADT: Array & Linked List Representations, push(), pop(), peek() & STL std::stack',
      'Arithmetic Expression Notations: Infix, Prefix (Polish) & Postfix (Reverse Polish) Conversions',
      'Postfix/Prefix Stack Evaluation & Monotonic Stack Patterns (Next Greater Element, Stock Span)'
    ],
    videos: [
      {
        id: '0X-fV-1ir9c',
        title: 'Lec 66: Introduction to STACKS',
        url: 'https://www.youtube.com/watch?v=0X-fV-1ir9c',
        type: 'Playlist'
      },
      {
        id: 'NKbExYwvjb0',
        title: 'Next Greater Element (Monotonic Stack)',
        url: 'https://www.youtube.com/watch?v=NKbExYwvjb0',
        type: 'Playlist'
      },
      {
        id: '6T3jMNUCRNU',
        title: 'Introduction to Prefix, Infix & Postfix Notations',
        url: 'https://www.youtube.com/watch?v=6T3jMNUCRNU',
        type: 'Archive'
      },
      {
        id: 'mg9yi6YuAVk',
        title: 'Infix to Postfix Conversion using Stack',
        url: 'https://www.youtube.com/watch?v=mg9yi6YuAVk',
        type: 'Archive'
      }
    ],
    problems: [
      {
        id: 'P3-U1A-PR1',
        title: 'Valid Parentheses',
        url: 'https://leetcode.com/problems/valid-parentheses/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1A-PR2',
        title: 'Next Greater Element I',
        url: 'https://leetcode.com/problems/next-greater-element-i/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1A-PR4',
        title: 'Baseball Game (Stack Simulation)',
        url: 'https://leetcode.com/problems/baseball-game/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1A-PR5',
        title: 'Remove All Adjacent Duplicates In String (Stack)',
        url: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1A-PR3',
        title: 'Evaluate Reverse Polish Notation (Postfix)',
        url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR6',
        title: 'Min Stack',
        url: 'https://leetcode.com/problems/min-stack/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR7',
        title: 'Daily Temperatures (Monotonic Stack)',
        url: 'https://leetcode.com/problems/daily-temperatures/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR8',
        title: 'Online Stock Span (Monotonic Stack)',
        url: 'https://leetcode.com/problems/online-stock-span/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR9',
        title: 'Basic Calculator II (Infix Evaluation)',
        url: 'https://leetcode.com/problems/basic-calculator-ii/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR10',
        title: 'Nearest Smaller Values (Monotonic Stack)',
        url: 'https://cses.fi/problemset/task/1645',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR11',
        title: 'Infix to Postfix Conversion (Stack)',
        url: 'https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1A-PR12',
        title: 'Largest Rectangle in Histogram (Monotonic Stack)',
        url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P3-U1B',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 1B: Queues & Circular/Deque Variations',
    hours: 3,
    subtopics: [
      'Queue FIFO ADT: Linear Queue Array & Linked List Implementation, Enqueue, Dequeue & Peek',
      'Circular Queue Modulo Indexing, Double-Ended Queue (Deque) & Priority Queue Overview',
      'STL std::queue and std::deque Applications (Sliding Window Maximum)'
    ],
    videos: [
      {
        id: 'Khf9v67Ya30',
        title: 'Queue Data Structure in C++',
        url: 'https://www.youtube.com/watch?v=Khf9v67Ya30',
        type: 'Playlist'
      },
      {
        id: '4mKKolshFD0',
        title: 'Lec 78: Circular Queue in Data Structure',
        url: 'https://www.youtube.com/watch?v=4mKKolshFD0',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P3-U1B-PR3',
        title: 'Implement Queue using Stacks',
        url: 'https://leetcode.com/problems/implement-queue-using-stacks/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1B-PR4',
        title: 'Implement Stack using Queues',
        url: 'https://leetcode.com/problems/implement-stack-using-queues/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1B-PR5',
        title: 'Number of Recent Calls (Queue Window)',
        url: 'https://leetcode.com/problems/number-of-recent-calls/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1B-PR6',
        title: 'Number of Students Unable to Eat Lunch (Queue Simulation)',
        url: 'https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U1B-PR1',
        title: 'Design Circular Queue',
        url: 'https://leetcode.com/problems/design-circular-queue/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1B-PR7',
        title: 'Josephus Problem I (Circular Queue Simulation)',
        url: 'https://cses.fi/problemset/task/2162',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1B-PR8',
        title: 'Find the Winner of the Circular Game',
        url: 'https://leetcode.com/problems/find-the-winner-of-the-circular-game/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1B-PR9',
        title: 'Design Circular Deque',
        url: 'https://leetcode.com/problems/design-circular-deque/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U1B-PR2',
        title: 'Sliding Window Maximum (Monotonic Deque)',
        url: 'https://leetcode.com/problems/sliding-window-maximum/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      },
      {
        id: 'P3-U1B-PR10',
        title: 'Shortest Subarray with Sum at Least K (Monotonic Deque)',
        url: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P3-U2A',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 2A: Recursion Mechanics & Recurrence Complexity',
    hours: 3,
    subtopics: [
      'Recursion Taxonomy: Direct, Indirect, Singly, Multiply, Tail, Non-Tail & Nested Recursion',
      'Iteration vs Recursion Trade-offs, Stack Overflow Prevention & Backtracking Search Trees',
      'Solving Recurrence Relations: Substitution/Iteration Method, Recursion Tree & Master Theorem'
    ],
    videos: [
      {
        id: '9OsMG4fI4OY',
        title: 'Recursion Part 1: Fundamentals',
        url: 'https://www.youtube.com/watch?v=9OsMG4fI4OY',
        type: 'Playlist'
      },
      {
        id: '4iT-GhvSKzc',
        title: 'Recursion Part 2: Intermediate Problems',
        url: 'https://www.youtube.com/watch?v=4iT-GhvSKzc',
        type: 'Playlist'
      },
      {
        id: 'pNzljlzDCiI',
        title: 'Recursion Part 3: Backtracking in Detail',
        url: 'https://www.youtube.com/watch?v=pNzljlzDCiI',
        type: 'Playlist'
      },
      {
        id: 'oZ-ZIhJyy9o',
        title: "Time Complexity using Master's Theorem & Recurrence",
        url: 'https://www.youtube.com/watch?v=oZ-ZIhJyy9o',
        type: 'Archive'
      }
    ],
    problems: [
      {
        id: 'P3-U2A-PR1',
        title: 'Subsets (Backtracking Recursion Tree)',
        url: 'https://leetcode.com/problems/subsets/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR2',
        title: 'Permutations',
        url: 'https://leetcode.com/problems/permutations/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR3',
        title: 'Combinations (Backtracking)',
        url: 'https://leetcode.com/problems/combinations/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR4',
        title: 'Combination Sum',
        url: 'https://leetcode.com/problems/combination-sum/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR5',
        title: 'Letter Combinations of a Phone Number',
        url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR6',
        title: 'Generate Parentheses',
        url: 'https://leetcode.com/problems/generate-parentheses/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR7',
        title: 'Word Search (Backtracking on Grid)',
        url: 'https://leetcode.com/problems/word-search/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR8',
        title: 'Apple Division (Recursive Subset Split)',
        url: 'https://cses.fi/problemset/task/1623',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR9',
        title: 'Chessboard and Queens (Backtracking)',
        url: 'https://cses.fi/problemset/task/1624',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2A-PR10',
        title: 'N-Queens (Backtracking)',
        url: 'https://leetcode.com/problems/n-queens/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P3-U2B',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 2B: Divide & Conquer Sorting (Merge & Quick Sort)',
    hours: 3,
    subtopics: [
      'Divide and Conquer Paradigm: Break, Solve Subproblems & Combine Solutions',
      'Merge Sort: Recursive Halving, Two-Pointer Merge Routine & O(N log N) Stability Analysis',
      'Quick Sort: Pivot Partitioning Schemes, Best/Average O(N log N) vs Worst O(N²) Analysis'
    ],
    videos: [
      {
        id: 'cQDtOBTy7_Y',
        title: 'Merge Sort Algorithm | Recursion & Backtracking',
        url: 'https://www.youtube.com/watch?v=cQDtOBTy7_Y',
        type: 'Playlist'
      },
      {
        id: '8MNB0Mba_Dc',
        title: 'Lec 51: Quick Sort Algorithm',
        url: 'https://www.youtube.com/watch?v=8MNB0Mba_Dc',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P3-U2B-PR2',
        title: 'Majority Element (Divide & Conquer Approach)',
        url: 'https://leetcode.com/problems/majority-element/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U2B-PR1',
        title: 'Sort an Array (Merge & Quick Sort Implementation)',
        url: 'https://leetcode.com/problems/sort-an-array/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2B-PR3',
        title: 'Sort List (Merge Sort on Linked List)',
        url: 'https://leetcode.com/problems/sort-list/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U2B-PR4',
        title: 'Count of Smaller Numbers After Self (Merge Sort)',
        url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      },
      {
        id: 'P3-U2B-PR5',
        title: 'Reverse Pairs (Merge Sort Counting)',
        url: 'https://leetcode.com/problems/reverse-pairs/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P3-U3',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 3: Binary Trees, BSTs, Height-Balanced Trees & Tries',
    hours: 8,
    subtopics: [
      'Tree Terminology & Types: Complete, Strict, Skewed & Multi-way Trees; BFS & DFS (Pre/In/Post) Traversals',
      'Binary Search Trees (BST): Create, Search, Insert, Delete (Inorder Predecessor/Successor) & Expression Trees',
      'Height-Balanced Trees: AVL Rotations (LL, RR, LR, RL), Red-Black Trees, B-Trees, B+ Trees & Threaded BT',
      'Tries (Prefix Trees): Node Structure, Building a Trie, Word Insert, Search & Prefix Matching'
    ],
    videos: [
      {
        id: 'eKJrXBCRuNQ',
        title: 'Binary Trees & Tree Traversal Complete Guide',
        url: 'https://www.youtube.com/watch?v=eKJrXBCRuNQ',
        type: 'Playlist'
      },
      {
        id: 'RuF7dPfj27Q',
        title: 'Lec 96: Binary Search Trees (BSTs)',
        url: 'https://www.youtube.com/watch?v=RuF7dPfj27Q',
        type: 'Playlist'
      },
      {
        id: 'IHNkql1tAnk',
        title: 'Lec 108: Inorder Predecessor & Successor in BST',
        url: 'https://www.youtube.com/watch?v=IHNkql1tAnk',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P3-U3-PR4',
        title: 'Binary Tree Inorder Traversal (DFS)',
        url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U3-PR5',
        title: 'Binary Tree Preorder Traversal (DFS)',
        url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U3-PR6',
        title: 'Maximum Depth of Binary Tree',
        url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U3-PR7',
        title: 'Balanced Binary Tree (Height-Balanced Check)',
        url: 'https://leetcode.com/problems/balanced-binary-tree/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U3-PR8',
        title: 'Search in a Binary Search Tree',
        url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U3-PR1',
        title: 'Binary Tree Level Order Traversal (BFS)',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR2',
        title: 'Validate Binary Search Tree',
        url: 'https://leetcode.com/problems/validate-binary-search-tree/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR3',
        title: 'Implement Trie (Prefix Tree)',
        url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR9',
        title: 'Insert into a Binary Search Tree',
        url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR10',
        title: 'Delete Node in a BST',
        url: 'https://leetcode.com/problems/delete-node-in-a-bst/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR11',
        title: 'Kth Smallest Element in a BST',
        url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR12',
        title: 'Design Add and Search Words Data Structure (Trie)',
        url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR13',
        title: 'Tree Diameter',
        url: 'https://cses.fi/problemset/task/1131',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR14',
        title: 'AVL Tree Insertion (LL, RR, LR, RL Rotations)',
        url: 'https://www.geeksforgeeks.org/avl-tree-set-1-insertion/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR15',
        title: 'B-Tree Introduction & Insertion',
        url: 'https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR16',
        title: 'Threaded Binary Tree (Traversal & Insertion)',
        url: 'https://www.geeksforgeeks.org/threaded-binary-tree/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U3-PR17',
        title: 'Word Search II (Trie + Backtracking)',
        url: 'https://leetcode.com/problems/word-search-ii/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P3-U4',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 4: Heaps, Heap Sort & STL Priority Queues',
    hours: 8,
    subtopics: [
      'Heap Fundamentals: Complete Binary Tree Array Representation, Min-Heap & Max-Heap Properties',
      'Heap Operations: Bottom-up Build-Heap O(N), Sift-Up / Sift-Down (Heapify) & In-Place Heap Sort',
      'Heap as Priority Queue: Use Cases vs Stack/Queue, STL std::priority_queue & Custom Struct Comparators'
    ],
    videos: [
      {
        id: 'okhdtEk1iKk',
        title: 'STL Priority Queue & Custom Comparators (STL One Shot)',
        url: 'https://www.youtube.com/watch?v=okhdtEk1iKk',
        type: 'Playlist'
      },
      {
        id: 'YlmU4gBgePA',
        title: 'DSA Series Update: Heaps & Tries Roadmap',
        url: 'https://www.youtube.com/watch?v=YlmU4gBgePA',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P3-U4-PR3',
        title: 'Kth Largest Element in a Stream (Min-Heap)',
        url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U4-PR4',
        title: 'Last Stone Weight (Max-Heap)',
        url: 'https://leetcode.com/problems/last-stone-weight/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U4-PR1',
        title: 'Kth Largest Element in an Array (Min-Heap)',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR2',
        title: 'Top K Frequent Elements (Priority Queue)',
        url: 'https://leetcode.com/problems/top-k-frequent-elements/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR5',
        title: 'K Closest Points to Origin (Heap / Custom Comparator)',
        url: 'https://leetcode.com/problems/k-closest-points-to-origin/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR6',
        title: 'Top K Frequent Words (Heap + Comparator)',
        url: 'https://leetcode.com/problems/top-k-frequent-words/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR7',
        title: 'Task Scheduler (Max-Heap)',
        url: 'https://leetcode.com/problems/task-scheduler/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR8',
        title: 'Reorganize String (Max-Heap)',
        url: 'https://leetcode.com/problems/reorganize-string/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR9',
        title: 'Heap Sort (Build-Heap & Heapify)',
        url: 'https://www.geeksforgeeks.org/heap-sort/',
        platform: 'GFG',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U4-PR10',
        title: 'Find Median from Data Stream (Two Heaps)',
        url: 'https://leetcode.com/problems/find-median-from-data-stream/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      },
      {
        id: 'P3-U4-PR11',
        title: 'Merge k Sorted Lists (Min-Heap)',
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'P3-U5A',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 5A: Graph Representations & BFS/DFS Traversals',
    hours: 4,
    subtopics: [
      'Graph Terminology & Types: Directed, Undirected, Weighted, Cyclic, Acyclic, Bipartite & Complete Graphs',
      'Graph Memory Representations: Adjacency Matrix vs Adjacency List Space/Time Trade-offs',
      'Graph Traversal Algorithms: Breadth-First Search (BFS) & Depth-First Search (DFS) Across Components'
    ],
    videos: [
      {
        id: 'RpgyCJBbl5E',
        title: 'Introduction to Graphs | Representations',
        url: 'https://www.youtube.com/watch?v=RpgyCJBbl5E',
        type: 'Playlist'
      },
      {
        id: 'scQITTLgFJo',
        title: 'BFS Traversal in Graphs',
        url: 'https://www.youtube.com/watch?v=scQITTLgFJo',
        type: 'Playlist'
      },
      {
        id: '3czYbhac160',
        title: 'DFS Traversal in Graphs',
        url: 'https://www.youtube.com/watch?v=3czYbhac160',
        type: 'Playlist'
      }
    ],
    problems: [
      {
        id: 'P3-U5A-PR3',
        title: 'Find the Town Judge (Graph Degrees)',
        url: 'https://leetcode.com/problems/find-the-town-judge/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U5A-PR4',
        title: 'Find if Path Exists in Graph (BFS/DFS)',
        url: 'https://leetcode.com/problems/find-if-path-exists-in-graph/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U5A-PR5',
        title: 'Flood Fill (Grid DFS/BFS)',
        url: 'https://leetcode.com/problems/flood-fill/',
        platform: 'LeetCode',
        difficulty: 'Easy'
      },
      {
        id: 'P3-U5A-PR1',
        title: 'Number of Islands (Grid BFS/DFS)',
        url: 'https://leetcode.com/problems/number-of-islands/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR2',
        title: 'Is Graph Bipartite?',
        url: 'https://leetcode.com/problems/is-graph-bipartite/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR6',
        title: 'Counting Rooms (Grid DFS/BFS Components)',
        url: 'https://cses.fi/problemset/task/1192',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR7',
        title: 'Message Route (BFS Shortest Path)',
        url: 'https://cses.fi/problemset/task/1667',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR8',
        title: 'Building Roads (Connected Components)',
        url: 'https://cses.fi/problemset/task/1666',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR9',
        title: 'Max Area of Island (Grid DFS)',
        url: 'https://leetcode.com/problems/max-area-of-island/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR10',
        title: 'Clone Graph (Adjacency List + DFS/BFS)',
        url: 'https://leetcode.com/problems/clone-graph/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR11',
        title: 'Rotting Oranges (Multi-Source BFS)',
        url: 'https://leetcode.com/problems/rotting-oranges/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR12',
        title: 'All Paths From Source to Target (DFS)',
        url: 'https://leetcode.com/problems/all-paths-from-source-to-target/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5A-PR13',
        title: 'Shortest Path in Binary Matrix (BFS)',
        url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'P3-U5B',
    phase: 3,
    phaseName: 'Phase 3: Advanced Data Structures & Algorithms',
    courseCode: '25CS303',
    unitTitle: 'Unit 5B: Advanced Graph Algorithms & Applications',
    hours: 4,
    subtopics: [
      'Cycle Detection in Undirected Graphs (BFS & DFS) and Directed Graphs (DFS Recursion Stack)',
      "Directed Acyclic Graphs (DAG) & Topological Sorting: DFS Post-Order Stack & Kahn's BFS Indegree Algorithm",
      "Strongly Connected Components (Kosaraju's/Tarjan's), Articulation Points, Bridges & Bi-connected Components"
    ],
    videos: [
      {
        id: 'OZClCpPQDR4',
        title: 'Undirected Cycle Detection using DFS',
        url: 'https://www.youtube.com/watch?v=OZClCpPQDR4',
        type: 'Playlist'
      },
      {
        id: 'MIjOkApZ39g',
        title: 'Undirected Cycle Detection using BFS',
        url: 'https://www.youtube.com/watch?v=MIjOkApZ39g',
        type: 'Playlist'
      },
      {
        id: 'AcppN5XFt24',
        title: 'Lec 116: Directed Graph Cycle Detection (DFS)',
        url: 'https://www.youtube.com/watch?v=AcppN5XFt24',
        type: 'Playlist'
      },
      {
        id: '0WIINUY12Yg',
        title: 'Lec 117: Topological Sort (DFS)',
        url: 'https://www.youtube.com/watch?v=0WIINUY12Yg',
        type: 'Playlist'
      },
      {
        id: 'BnQpaTZg6Sc',
        title: "Lec 121: Topological Sort (Kahn's BFS Algorithm)",
        url: 'https://www.youtube.com/watch?v=BnQpaTZg6Sc',
        type: 'Playlist'
      },
      {
        id: '59fUtYYz7ZU',
        title: 'Complete Graph One-Shot (SCC, Bridges & Articulation Points)',
        url: 'https://www.youtube.com/watch?v=59fUtYYz7ZU',
        type: 'Archive'
      }
    ],
    problems: [
      {
        id: 'P3-U5B-PR1',
        title: "Course Schedule II (Topological Sort / Kahn's)",
        url: 'https://leetcode.com/problems/course-schedule-ii/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR3',
        title: 'Course Schedule (Directed Cycle Detection)',
        url: 'https://leetcode.com/problems/course-schedule/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR4',
        title: 'Redundant Connection (Undirected Cycle)',
        url: 'https://leetcode.com/problems/redundant-connection/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR5',
        title: 'Find Eventual Safe States (Directed Cycle / Topo)',
        url: 'https://leetcode.com/problems/find-eventual-safe-states/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR6',
        title: 'Round Trip (Undirected Cycle Detection)',
        url: 'https://cses.fi/problemset/task/1669',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR7',
        title: 'Round Trip II (Directed Cycle Detection)',
        url: 'https://cses.fi/problemset/task/1678',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR8',
        title: 'Course Schedule (Topological Sort)',
        url: 'https://cses.fi/problemset/task/1679',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR9',
        title: 'Flight Routes Check (Strongly Connected Components)',
        url: 'https://cses.fi/problemset/task/1682',
        platform: 'CSES',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR10',
        title: 'Network Delay Time (Graph Application)',
        url: 'https://leetcode.com/problems/network-delay-time/',
        platform: 'LeetCode',
        difficulty: 'Medium'
      },
      {
        id: 'P3-U5B-PR2',
        title: "Critical Connections in a Network (Tarjan's Bridges)",
        url: 'https://leetcode.com/problems/critical-connections-in-a-network/',
        platform: 'LeetCode',
        difficulty: 'Hard'
      },
      {
        id: 'P3-U5B-PR11',
        title: 'Strongly Connected Components (Kosaraju’s Algorithm)',
        url: 'https://www.geeksforgeeks.org/strongly-connected-components/',
        platform: 'GFG',
        difficulty: 'Hard'
      },
      {
        id: 'P3-U5B-PR12',
        title: 'Articulation Points in a Graph',
        url: 'https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/',
        platform: 'GFG',
        difficulty: 'Hard'
      }
    ]
  }
];
