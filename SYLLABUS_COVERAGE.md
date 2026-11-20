# Syllabus coverage report

Every topic listed in the three syllabus documents is now its own tickable subtopic in the app. A subtopic does **not** need a video; videos and problems are linked at unit level.

Legend: **NEW** = topic that was missing from the app before - **SPLIT** = used to be bundled with others in one line, now separate - **KEPT** = already existed (text sometimes clarified).

**Totals:** 118 subtopics across the three syllabi - 21 NEW, 48 SPLIT out of bundled lines, 49 KEPT.

Phase 4 units (`P4-U1`, `P4-U2`: shortest paths, spanning trees, union-find, DP, knapsack) are **extras from the playlist**, not in any syllabus, and were not changed.

Two items are marked as extras inside syllabus units because the playlist teaches them even though the syllabus text does not name them: pointers (`P1-U4`) and Kadane/subarrays (`P1-U3B`). Heap variants (binomial/Fibonacci) appear only in Course Outcome CO4 of 25CS303, so that subtopic is labelled *Optional*.

---

## Semester I - 25CS101 Data Structure (Unit 1-5)

### Unit 1 -> app unit `P1-U1`: Unit 1: System Basics, Flowcharts & First C++ Program

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Components of a Computer System: Memory, Processor, I/O Devices, Storage & the Role of the Operating System | Sem I U1: components of a computer system (memory, processor, I/O devices, storage, operating system) | KEPT |
| 2 | Language Translators: Assembler, Compiler, Interpreter, Loader & Linker | Sem I U1: assembler, compiler, interpreter, loader, linker | KEPT |
| 3 | Idea of a Program/Algorithm: Representing Algorithms with Flowcharts & Pseudocode, Visualization & Dry-Run Tracing | Sem I U1: idea of program/algorithm; flowchart and algorithm representation; visualization | KEPT |
| 4 | From Algorithm to Program: Writing Source Code, Object Code & Executable Code | Sem I U1: from algorithms to programs, and source code; object and executable code | NEW |
| 5 | Your First C++ Program: Structure, main(), Header Files, Standard Input/Output & Comments | Sem I U1: writing and executing the first C++ program; structure, main function, header files, standard output/input, comments | SPLIT |
| 6 | Compilation Errors: Syntax Errors vs Logical Errors, with Examples | Sem I U1: syntax and logical errors in compilation with examples | SPLIT |

### Unit 2 -> app unit `P1-U2A`: Unit 2A: Tokens, Data Types & Operators

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | C++ Tokens: Keywords, Identifiers, Constants, Punctuators & Operators | Sem I U2: tokens in C++ (keywords, identifiers/variables, constants, punctuators, operators) | SPLIT |
| 2 | Variables: Naming Conventions, Scope & Lifetime | Sem I U2: variable naming convention, scope and lifetime | SPLIT |
| 3 | Data Types Classification: Basic, Derived & User-Defined, with Storage Requirements (sizeof) | Sem I U2: data types classification (basic, derived, user-defined); storage requirements | SPLIT |
| 4 | Typecasting: Implicit & Explicit Type Conversion | Sem I U2: typecasting | SPLIT |
| 5 | Arithmetic & Miscellaneous Operators (sizeof, comma), Relational, Logical & Conditional (Ternary) Operators | Sem I U2: arithmetic and miscellaneous, relational, logical, conditional operators | KEPT |
| 6 | Bitwise Operators: &, |, ^, ~, <<, >> | Sem I U2: bitwise operators | SPLIT |
| 7 | Operator Associativity & Precedence; Expressions and Their Evaluation | Sem I U2: associativity and precedence; expressions and their evaluation | SPLIT |
| 8 | Math Library Functions (<cmath>): pow, sqrt, abs, ceil, floor & More | Sem I U2: introduction and usage of Math library functions | SPLIT |

### Unit 2 -> app unit `P1-U2B`: Unit 2B: Control Flow & Platform Input Handling

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Taking Input on Coding Platforms - 1: Single Value, Multiple Known Values in One Line & Across Multiple Lines | Sem I U2: taking input on coding platforms - 1 | KEPT |
| 2 | Program Flow Control: if, if-else, Nested if-else & else-if Ladder | Sem I U2: if, if-else, nested if-else, else-if ladder | KEPT |
| 3 | switch-case Statements, Fall-through Behavior & Menu-Driven Programs | Sem I U2: switch-case | KEPT |

### Unit 3 -> app unit `P1-U3A`: Unit 3A: Iteration, Loops & Pattern Building

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Iteration: while, do-while & for Loops with Multiple Loop Variables | Sem I U3: while, do-while and for loops; multiple loop variables | KEPT |
| 2 | Jump Statements: break & continue | Sem I U3: break and continue | KEPT |
| 3 | Nested Iteration & 2D Star/Number/Character Pattern Building | Sem I U3: nested iteration | KEPT |
| 4 | Taking Input on Coding Platforms - 2: Single Value & Multiple Known Values in a Line, and Other Formats | Sem I U3: taking input on coding platforms - 2 | NEW |
| 5 | Taking Input on Coding Platforms - 3: Multiple Unknown Values in One Line or Across Lines (EOF Handling) | Sem I U3: taking inputs on coding platforms - 3 | KEPT |

### Unit 3 -> app unit `P1-U3B`: Unit 3B: 1D/2D Arrays & Dynamic Vectors

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Arrays: Notation, Representation (Contiguous Memory) & Indexing | Sem I U3: array notation and representation | KEPT |
| 2 | Manipulating Array Elements: Traversal, Insertion, Deletion, Searching, Reversal & Rotation | Sem I U3: manipulating array elements | NEW |
| 3 | Subarray Fundamentals & Kadane's Maximum Subarray Sum Algorithm | extra (playlist lectures 10-15): subarrays and Kadane | KEPT |
| 4 | Multi-dimensional (2D) Arrays: Row/Column-Major Storage, Matrix Traversal & Spiral Order | Sem I U3: using multi-dimensional arrays | KEPT |
| 5 | Dynamically Growable Arrays: STL Vectors (push_back, pop_back, size vs capacity) | Sem I U3: introduction to dynamically growable arrays (vectors in STL) | KEPT |

### Unit 4 -> app unit `P1-U4`: Unit 4: Modular Functions, Pointers & Intro to Recursion

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Functions: Introduction & Types (Library vs User-Defined; With/Without Arguments & Return Values) | Sem I U4: functions - introduction, types of functions | NEW |
| 2 | Modular Functions: Prototypes, Definitions, Call Stack Frames, Default Arguments & Overloading | Sem I U4: functions and the modular approach | KEPT |
| 3 | Pointers & Memory Addresses: Dereferencing (*), Address-of (&) & Pointer Arithmetic | extra (playlist lecture 16): pointers, needed for call by reference | KEPT |
| 4 | Passing Parameters: Call by Value vs Call by Reference (Pointers & C++ References) | Sem I U4: passing parameters to functions, call by value, call by reference | KEPT |
| 5 | Introduction to Recursive Functions: Base Case, Call Stack, Factorial & Fibonacci | Sem I U4: introduction to recursive functions | KEPT |

### Unit 5 -> app unit `P1-U5A`: Unit 5A: C++ Strings & Manipulation Operations

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | String Representation in C++: Character Arrays vs std::string & Null-termination | Sem I U5: string representation in C++ | KEPT |
| 2 | string.h / <cstring> Library Functions: strlen, strcpy, strcat, strcmp & std::string Equivalents | Sem I U5: string manipulation with functions from the string.h library | NEW |
| 3 | Modifying Strings: Replacing, Inserting & Erasing Characters; Concatenating Two or More Strings | Sem I U5: replacing, inserting and erasing characters; concatenating two or more strings | KEPT |
| 4 | Searching in Strings: Finding Characters or Substrings, Counting Characters or Substrings & Finding Length | Sem I U5: finding character or substrings, counting characters or substrings, finding length | SPLIT |
| 5 | Comparing Two Strings, Case Conversion & Dealing with Alphanumeric Strings | Sem I U5: comparing two strings, case conversion, alphanumeric strings | SPLIT |

### Unit 5 -> app unit `P1-U5B`: Unit 5B: Object-Oriented Programming (OOP) Fundamentals

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Core OOP Pillars: Encapsulation, Abstraction, Inheritance & Polymorphism | Sem I U5: characteristics of OOP (encapsulation, abstraction, inheritance, polymorphism) | KEPT |
| 2 | Classes & Objects: Access Specifiers (public, private, protected), Attributes & Member Methods | Sem I U5: class and objects, properties and methods, basic structure of a class | KEPT |
| 3 | Constructors (Default, Parameterized, Copy), Destructors & the this Pointer | extra: constructors, destructors, this pointer (used in the playlist OOP lecture) | KEPT |

## Semester II - 25CS201 Data Structure Using C++ (Unit 1-5)

### Unit 1 -> app unit `P2-U1`: Unit 1: Asymptotic Complexity & Searching Techniques

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Introduction: Data Structures, Their Types & Importance; Primitive Operations on Data Structures | Sem II U1: data structures and their types, importance, primitive operations | NEW |
| 2 | Basic Terminology, Elementary Data Organization & Built-in Data Types in C++ | Sem II U1: basic terminology, elementary data organization, built-in data types in C++ | NEW |
| 3 | Data Structure Classification (Linear/Non-Linear) & Abstract Data Types (ADTs) | Sem II U1: abstract data types (ADT); types of data structures | KEPT |
| 4 | Algorithm & Its Efficiency: Time Complexity and Space Complexity | Sem II U1: algorithm, efficiency of an algorithm, time and space complexity | NEW |
| 5 | Asymptotic Notations: Big-Oh (O), Big-Theta (Θ), Big-Omega (Ω) & Time-Space Trade-off | Sem II U1: asymptotic notations, time-space trade-off | KEPT |
| 6 | Searching: Concept of Searching & Sequential (Linear) Search | Sem II U1: concept of searching, sequential search | SPLIT |
| 7 | Binary Search (Iterative & Recursive): Time and Space Complexity Computation | Sem II U1: binary search; computation of time and space complexity | SPLIT |
| 8 | Binary Search on Answer Space: Rotated Arrays, Peak Element & Book Allocation | extra (playlist lectures 18-23): binary search variations | KEPT |

### Unit 2 -> app unit `P2-U2`: Unit 2: Comparison & Linear-Time Sorting Algorithms

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Bubble Sort, Selection Sort & Insertion Sort: C++ Implementation & Time Complexity (Best/Avg/Worst) | Sem II U2: bubble, insertion, selection sort, C++ implementation, time complexity analysis | KEPT |
| 2 | Dutch National Flag (DNF) 3-Way Partitioning (Sort 0s, 1s & 2s) | extra (playlist lecture 25): DNF partitioning | KEPT |
| 3 | Sorting in Linear Time: Counting Sort - Key Characteristics, Algorithm, C++ Implementation & Complexity | Sem II U2: counting sort, key characteristics, C++ implementation, time complexity | SPLIT |
| 4 | Radix Sort & Bucket Sort | Sem II U2: radix sort, bucket sort | SPLIT |
| 5 | Comparison of Sorting Techniques: Best, Average & Worst-Case Time Complexity | Sem II U2: comparison of sorting techniques in terms of best, average and worst time complexity | NEW |

### Unit 3 -> app unit `P2-U3`: Unit 3: Linked Lists & Polynomial Representation

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Singly Linked List: Array Implementation vs Pointer Implementation | Sem II U3: array implementation and pointer implementation of singly linked lists | SPLIT |
| 2 | Linked List Operations: Insertion, Deletion, Traversal, Reversal & Fast/Slow Pointers | Sem II U3: operations on a linked list - insertion, deletion, traversal | SPLIT |
| 3 | Doubly Linked List: Prev/Next Pointers & Operations | Sem II U3: doubly linked list | KEPT |
| 4 | Circular Linked List: Tail-to-Head Loop & Operations | Sem II U3: circularly linked list | KEPT |
| 5 | Time Complexity of Linked List Operations: Worst, Average & Best Case | Sem II U3: time complexity analysis (worst, average, best) | NEW |
| 6 | Polynomial Representation Using Linked Lists: Single-Variable & Two-Variable Polynomials | Sem II U3: polynomial representation (single and two variables) | SPLIT |
| 7 | Polynomial Addition, Subtraction & Multiplication | Sem II U3: addition, subtraction and multiplication of polynomials | SPLIT |

### Unit 4 -> app unit `P2-U4`: Unit 4: Hashing Functions & Collision Resolution

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Introduction to Hashing & Its Need: Definition and Hash Table | Sem II U4: introduction of hashing and its need; definition; hash table | NEW |
| 2 | Hash Functions: Division Modulo, Digit Extraction, Mid-Square, Folding & Custom Hash Functions | Sem II U4: division modulo, digit extraction, mid square, folding, custom hash function | KEPT |
| 3 | Operations over a Hash Table: Search, Insertion & Deletion | Sem II U4: operations over hash table - search, insertion, deletion | NEW |
| 4 | Collisions: Illustration of Collision & Overview of Resolution Techniques | Sem II U4: illustration of collision; collision resolution techniques | NEW |
| 5 | Open Hashing (Separate Chaining): Linked List Buckets & Load Factor (λ) Analysis | Sem II U4: open hashing or separate chaining | KEPT |
| 6 | Closed Hashing (Open Addressing): Linear Probing, Quadratic Probing & Double Hashing | Sem II U4: closed hashing or open addressing - linear probing, quadratic probing, double hashing | KEPT |
| 7 | Programming-Based Hashing Techniques: Frequency Counting, Two Sum, Subarray Sums | Sem II U4: programming based hashing technique | NEW |

### Unit 5 -> app unit `P2-U5`: Unit 5: STL Ordered/Unordered Sets & Maps

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Ordered vs Unordered Sets: Definition, Differences & Internals (Red-Black Tree vs Hash Table) | Sem II U5: set - ordered and unordered set, definition and their difference | KEPT |
| 2 | Set Operations (STL): insert(), erase(), size(), find(), count() & Equality Check of Two Sets | Sem II U5: operations on set - insert(), erase(), size(), equality check, find(), count() | SPLIT |
| 3 | Set Algorithms: includes(), accumulate(), Union, Intersection & Difference of Sets | Sem II U5: includes(), accumulate(), union, intersection, difference of sets | SPLIT |
| 4 | Sorting a Set & Time-Complexity Comparison of Operations: Ordered vs Unordered Sets | Sem II U5: sorting a set; time complexity comparison for ordered and unordered sets | NEW |
| 5 | Ordered and Unordered Maps: Definition & the Key-Value Concept | Sem II U5: map - ordered and unordered map, definition, key-value concept | SPLIT |
| 6 | Map Operations: insert(), erase(), size() & Looping in a Map | Sem II U5: operations on map - insert(), erase(), size(), looping in map | SPLIT |
| 7 | Sorting Using Maps: By Key, By Value & Custom Comparators | Sem II U5: sorting by value, by key, custom sorting | SPLIT |

## Semester III - 25CS303 Advanced Data Structure (Unit 1-5)

### Unit 1 -> app unit `P3-U1A`: Unit 1A: Stacks & Expression Notations

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Stack Introduction: Terminology & Representation (Arrays & Linked List) | Sem III U1: stack introduction, terminology, representation (arrays and linked list) | SPLIT |
| 2 | Stack Operations: push(), pop(), peek() & Others (isEmpty, size) | Sem III U1: stack operations - push, pop, peek and others | SPLIT |
| 3 | Infix, Prefix & Postfix Notations and Converting One into Another | Sem III U1: infix, prefix, postfix notations, converting one into another | KEPT |
| 4 | Expression Evaluation Using a Stack (Prefix & Postfix) | Sem III U1: expression evaluation | SPLIT |
| 5 | Stack Applications & Monotonic Stack Patterns (Next Greater Element, Stock Span) | Sem III U1: stack standard applications | SPLIT |

### Unit 1 -> app unit `P3-U1B`: Unit 1B: Queues & Circular/Deque Variations

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Queue Introduction: Terminology & Representation (Arrays & Linked List) | Sem III U1: queue introduction, terminology, representation (arrays and linked list) | SPLIT |
| 2 | Queue Operations: Enqueue, Dequeue, Peek & Others | Sem III U1: queue operations - enqueue, dequeue, peek and others | SPLIT |
| 3 | Types of Queues: Linear, Circular, Double-Ended (Deque) & Priority Queue | Sem III U1: queue types (linear, circular, dequeue, priority queue) | KEPT |
| 4 | Stack and Queue in STL: std::stack, std::queue & std::deque (e.g. Sliding Window Maximum) | Sem III U1: stack and queue in STL | KEPT |

### Unit 2 -> app unit `P3-U2A`: Unit 2A: Recursion Mechanics & Recurrence Complexity

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Recursion Introduction: Terminology & Key Components (Base Case, Recursive Case, Call Stack) | Sem III U2: recursion introduction, terminology, key components | NEW |
| 2 | Types of Recursion: Direct, Indirect, Singly, Multiply, Tail, Non-Tail & Nested | Sem III U2: types of recursion | KEPT |
| 3 | Optimization of Recursion (Memoization, Tail Calls) & Iteration vs Recursion Trade-offs | Sem III U2: optimization, iteration and recursion trade-off | SPLIT |
| 4 | Understanding Recursion Through Problems (Subsets, Permutations, Combinations) | Sem III U2: recursion through problems | NEW |
| 5 | Backtracking Search Trees & Stack Overflow Prevention | extra (playlist lectures 44-50, 55): backtracking | SPLIT |
| 6 | Time Complexity of Recursive Algorithms: Recurrence Relations - Substitution/Iteration, Recursion Tree & Master Theorem | Sem III U2: recurrence relation and time complexity of recursive algorithms | KEPT |

### Unit 2 -> app unit `P3-U2B`: Unit 2B: Divide & Conquer Sorting (Merge & Quick Sort)

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Divide and Conquer Paradigm: Break, Solve Subproblems & Combine Solutions | Sem III U2: introduction to the divide and conquer approach | KEPT |
| 2 | Merge Sort: Recursive Halving, Two-Pointer Merge Routine & O(N log N) Stability Analysis | Sem III U2: recursive sorting - merge sort | KEPT |
| 3 | Quick Sort: Pivot Partitioning Schemes, Best/Average O(N log N) vs Worst O(N²) Analysis | Sem III U2: recursive sorting - quick sort | KEPT |

### Unit 3 -> app unit `P3-U3`: Unit 3: Binary Trees, BSTs, Height-Balanced Trees & Tries

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Tree Introduction: Terminology & Representation (Array and Linked) | Sem III U3: tree introduction, terminology and representation | NEW |
| 2 | Tree Types: Complete, Strict (Full), Skewed Binary Trees & Multi-way Trees | Sem III U3: tree types (complete, strict, skewed binary tree, multi-way tree) | SPLIT |
| 3 | Binary Tree Traversals: Breadth-First (Level Order) & Depth-First (Pre/In/Post-order) | Sem III U3: traversal - breadth first and depth first (pre, post, in) | SPLIT |
| 4 | Binary Search Trees: Definition, Terminology, Create, Search & Insert | Sem III U3: BT and BST definitions, terminology, representations; create, search, insert | SPLIT |
| 5 | BST Deletion (Inorder Predecessor/Successor) & Expression Trees | Sem III U3: delete operation; expression trees | SPLIT |
| 6 | Height-Balanced Trees: Introduction, Terminology & Representation | Sem III U3: height balanced trees - introduction, terminology and representation | NEW |
| 7 | AVL Trees: Rotations (LL, RR, LR, RL), Insert & Delete | Sem III U3: AVL tree - create, search, insert, delete | SPLIT |
| 8 | Red-Black Trees: Properties, Insert & Delete | Sem III U3: red-black tree operations | SPLIT |
| 9 | B-Trees & B+ Trees: Structure, Search, Insert & Delete | Sem III U3: B-tree and B+ tree operations | SPLIT |
| 10 | Threaded Binary Trees: Representation & Traversal | Sem III U3: threaded binary tree | SPLIT |
| 11 | Tries: Introduction & Building a Trie (Node Structure) | Sem III U3: tries - introduction, building a trie data structure | SPLIT |
| 12 | Trie Operations: Insert, Search & Prefix Search | Sem III U3: basic trie operations (insert, search, prefix search) | SPLIT |

### Unit 4 -> app unit `P3-U4`: Unit 4: Heaps, Heap Sort & STL Priority Queues

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Heap Introduction: Terminology, Array Representation, Heap Property & Types (Max and Min Heap) | Sem III U4: heap introduction, terminology, representation, heap property, heap types | KEPT |
| 2 | Heap Operations: Building a Heap (Bottom-up), Insert, Delete & Maintaining the Heap (Heapify) | Sem III U4: building a heap, operations over a heap, maintaining a heap | SPLIT |
| 3 | Heap Sort (In-Place) | Sem III U4: heap sort | SPLIT |
| 4 | Heap as Priority Queue: Use Cases of Stack, Queue & Priority Queue | Sem III U4: heap as priority queue; use case of stack, queue and priority queue | SPLIT |
| 5 | Priority Queue in STL: std::priority_queue & Custom Comparators | Sem III U4: priority queue in STL; writing custom comparators | SPLIT |
| 6 | Optional: Binomial & Fibonacci Heaps - Overview (named in Course Outcome CO4) | Sem III CO4: binary, binomial and Fibonacci heaps | NEW |

### Unit 5 -> app unit `P3-U5A`: Unit 5A: Graph Representations & BFS/DFS Traversals

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Graph Terminology & Types: Directed, Undirected, Weighted, Unweighted, Cyclic, Acyclic, Bipartite & Complete Graphs | Sem III U5: graph introduction, terminology and types of graphs | KEPT |
| 2 | Graph Memory Representations: Adjacency Matrix vs Adjacency List Space/Time Trade-offs | Sem III U5: representation (adjacency matrix, adjacency list) | KEPT |
| 3 | Graph Traversal Algorithms: Breadth-First Search (BFS) & Depth-First Search (DFS) Across Components | Sem III U5: graph traversal - DFS, BFS | KEPT |

### Unit 5 -> app unit `P3-U5B`: Unit 5B: Advanced Graph Algorithms & Applications

| # | Subtopic in the app | Syllabus topic(s) it covers | Status |
|---|---|---|---|
| 1 | Applications of BFS & DFS: Connected Components | Sem III U5: applications of BFS and DFS - connected components | NEW |
| 2 | Cycle Detection in Undirected Graphs (BFS & DFS) and Directed Graphs (DFS Recursion Stack) | Sem III U5: cycle detection | KEPT |
| 3 | Directed Acyclic Graphs (DAG) & Topological Sorting: DFS Post-Order Stack & Kahn's BFS Indegree Algorithm | Sem III U5: topological sorting, directed acyclic graph (DAG) | KEPT |
| 4 | Strongly Connected Components (Kosaraju's / Tarjan's Algorithm) | Sem III U5: strongly connected components | SPLIT |
| 5 | Articulation Points, Bridges & Bi-connected Components | Sem III U5: articulation points, bridges, bi-connected components | SPLIT |
