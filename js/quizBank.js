const QUIZ_BANK = {

  // ============ ARRAYS ============
  two_pointer: [
    {
      q: "What is the time complexity of the two pointer technique?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      answer: 2,
      explanation: "Two pointers traverse the array once → O(n)"
    },
    {
      q: "Two pointer technique requires the input to be?",
      options: ["Unsorted", "Sorted or logically ordered", "Only integers", "Only positive numbers"],
      answer: 1,
      explanation: "Pointers move based on order, so array must be sorted"
    },
    {
      q: "Which of these is NOT a two pointer problem?",
      options: ["Container with most water", "3Sum", "Merge sort", "Trapping rainwater"],
      answer: 2,
      explanation: "Merge sort uses divide & conquer, not two pointers"
    }
  ],

  sliding_window: [
    {
      q: "Sliding window optimizes problems involving?",
      options: ["Binary trees", "Contiguous subarrays/substrings", "Graph traversal", "Sorting"],
      answer: 1,
      explanation: "Sliding window works on contiguous ranges"
    },
    {
      q: "In variable size sliding window, when do you shrink the window?",
      options: ["When window size exceeds n", "When constraint is violated", "Every iteration", "When sum is zero"],
      answer: 1,
      explanation: "Shrink from left whenever the window breaks the condition"
    },
    {
      q: "Sliding window reduces brute force O(n²) to?",
      options: ["O(n³)", "O(n log n)", "O(n)", "O(log n)"],
      answer: 2,
      explanation: "Each element is added and removed at most once → O(n)"
    }
  ],

  prefix_sum: [
    {
      q: "What does prefix[i] store?",
      options: ["arr[i] alone", "Sum from index 0 to i", "Max up to i", "Difference of adjacent"],
      answer: 1,
      explanation: "prefix[i] = prefix[i-1] + arr[i], cumulative sum"
    },
    {
      q: "Kadane's algorithm solves which problem?",
      options: ["Maximum product subarray", "Maximum sum subarray", "Minimum subarray length", "Sorted subarray"],
      answer: 1,
      explanation: "Kadane's finds max contiguous subarray sum in O(n)"
    },
    {
      q: "Range sum query [l, r] using prefix sum takes?",
      options: ["O(n)", "O(log n)", "O(1)", "O(r - l)"],
      answer: 2,
      explanation: "ans = prefix[r] - prefix[l-1] → constant time"
    }
  ],

  advanced_arrays: [
    {
      q: "Dutch National Flag algorithm sorts an array containing?",
      options: ["Negative numbers", "0s, 1s and 2s", "Duplicates", "Strings"],
      answer: 1,
      explanation: "DNF does single pass 3-way partition in O(n)"
    },
    {
      q: "Moore's voting algorithm finds?",
      options: ["Median", "Mode", "Majority element (appears > n/2)", "Minimum"],
      answer: 2,
      explanation: "Majority element appears more than n/2 times"
    },
    {
      q: "Merge intervals problem: first step is always?",
      options: ["Sort by end time", "Sort by start time", "Remove duplicates", "Reverse array"],
      answer: 1,
      explanation: "Sort by start so overlapping intervals are adjacent"
    }
  ],

  // ============ STRINGS ============

  string_basics: [
    {
      q: "Two strings are anagrams if they have?",
      options: ["Same length only", "Same characters with same frequency", "Same prefix", "Same suffix"],
      answer: 1,
      explanation: "Anagrams are rearrangements of same characters"
    },
    {
      q: "Best way to check if string is palindrome?",
      options: ["Reverse and compare O(n)", "Two pointers from ends O(n)", "Hashing O(1)", "Both A and B"],
      answer: 3,
      explanation: "Both work, two pointer is more space efficient"
    },
    {
      q: "Character frequency map uses which data structure?",
      options: ["Stack", "Queue", "HashMap", "Tree"],
      answer: 2,
      explanation: "HashMap stores char → count mapping in O(1) per op"
    }
  ],

  string_algorithms: [
    {
      q: "KMP algorithm improves pattern matching from O(nm) to?",
      options: ["O(n + m)", "O(n log m)", "O(n)", "O(m)"],
      answer: 0,
      explanation: "KMP builds failure function in O(m) then searches in O(n)"
    },
    {
      q: "The failure function in KMP stores?",
      options: ["Character frequencies", "Longest proper prefix which is also suffix", "Match positions", "Hash values"],
      answer: 1,
      explanation: "LPS array helps skip redundant comparisons"
    },
    {
      q: "Rabin-Karp uses which technique to compare patterns?",
      options: ["Sorting", "Rolling hash", "Two pointers", "DP"],
      answer: 1,
      explanation: "Rolling hash avoids recomputing hash from scratch each time"
    }
  ],

  // ============ SEARCHING ============

  binary_search: [
    {
      q: "Binary search time complexity?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 2,
      explanation: "Search space halves each step → log n"
    },
    {
      q: "mid = left + (right - left) / 2 is preferred over (left + right)/2 to avoid?",
      options: ["Wrong answer", "Stack overflow", "Integer overflow", "Infinite loop"],
      answer: 2,
      explanation: "left + right can overflow int range in some languages"
    },
    {
      q: "Binary search on answer means?",
      options: ["Search in sorted array", "Guess answer and verify with condition", "Two binary searches", "Recursive only"],
      answer: 1,
      explanation: "Define search space, check feasibility mid, narrow range"
    }
  ],

  sorting: [
    {
      q: "Which sorting algorithm has worst case O(n²) but best average?",
      options: ["Merge sort", "Bubble sort", "Quick sort", "Heap sort"],
      answer: 2,
      explanation: "Quick sort avg O(n log n) but worst O(n²) with bad pivot"
    },
    {
      q: "Merge sort is preferred over quick sort when?",
      options: ["Array is small", "Stability is required", "Memory is limited", "Array is sorted"],
      answer: 1,
      explanation: "Merge sort is stable, quicksort is not by default"
    },
    {
      q: "Counting sort works only when?",
      options: ["Array is sorted", "Elements are in known limited range", "Array has no duplicates", "Array is large"],
      answer: 1,
      explanation: "Counting sort needs bounded integer range to work"
    }
  ],

  // ============ HASHING ============

  hashing: [
    {
      q: "Average time complexity of HashMap lookup?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: 2,
      explanation: "Hash function gives direct index → O(1) average"
    },
    {
      q: "Two Sum problem is solved optimally using?",
      options: ["Sorting", "HashMap", "Two pointers", "Binary search"],
      answer: 1,
      explanation: "Store complement in map, lookup in O(1) per element"
    },
    {
      q: "Longest consecutive sequence has O(n) solution using?",
      options: ["Sorting", "DP", "HashSet", "Queue"],
      answer: 2,
      explanation: "HashSet allows O(1) lookup to check consecutive chain"
    }
  ],

  // ============ STACK & QUEUE ============

  stack: [
    {
      q: "Stack follows which principle?",
      options: ["FIFO", "LIFO", "Priority based", "Random access"],
      answer: 1,
      explanation: "Last In First Out — push and pop from same end"
    },
    {
      q: "Monotonic stack maintains elements in?",
      options: ["Random order", "Strictly increasing or decreasing order", "Sorted order always", "Insertion order"],
      answer: 1,
      explanation: "Monotonic = elements always increasing or always decreasing"
    },
    {
      q: "Next Greater Element problem time complexity using monotonic stack?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      answer: 2,
      explanation: "Each element pushed and popped at most once → O(n)"
    }
  ],

  queue_deque: [
    {
      q: "Queue follows which principle?",
      options: ["LIFO", "FIFO", "Priority", "Random"],
      answer: 1,
      explanation: "First In First Out — enqueue at back, dequeue from front"
    },
    {
      q: "Sliding window maximum problem uses?",
      options: ["Stack", "Deque (monotonic)", "Heap", "Queue"],
      answer: 1,
      explanation: "Deque stores indices of useful elements in decreasing order"
    },
    {
      q: "Implementing queue using two stacks gives amortized?",
      options: ["O(n) per operation", "O(1) per operation", "O(log n)", "O(n²)"],
      answer: 1,
      explanation: "Each element moved at most twice across both stacks"
    }
  ],

  // ============ LINKED LIST ============

  linked_list_basic: [
    {
      q: "Floyd's cycle detection uses?",
      options: ["One pointer", "Fast and slow pointer", "Three pointers", "Stack"],
      answer: 1,
      explanation: "Fast moves 2 steps, slow moves 1 — they meet if cycle exists"
    },
    {
      q: "Time complexity to find middle of linked list?",
      options: ["O(n²)", "O(n/2) = O(n)", "O(1)", "O(log n)"],
      answer: 1,
      explanation: "Traverse once with fast/slow pointer → O(n)"
    },
    {
      q: "To reverse a linked list iteratively you need?",
      options: ["Stack", "3 pointers (prev, curr, next)", "2 pointers", "Recursion only"],
      answer: 1,
      explanation: "prev=null, curr=head, next stores next before relinking"
    }
  ],

  linked_list_advanced: [
    {
      q: "LRU Cache is implemented using?",
      options: ["Array + Stack", "HashMap + Doubly Linked List", "Queue only", "BST"],
      answer: 1,
      explanation: "HashMap for O(1) lookup, DLL for O(1) insert/delete"
    },
    {
      q: "Merge K sorted lists optimal solution uses?",
      options: ["K nested loops", "Min Heap of size K", "Merge sort tree", "Stack"],
      answer: 1,
      explanation: "Min heap gives next smallest in O(log K), total O(n log K)"
    },
    {
      q: "Cloning a linked list with random pointers in O(n) space uses?",
      options: ["Stack", "HashMap of original → clone nodes", "Two passes only", "Recursion"],
      answer: 1,
      explanation: "Map each node to its clone, then set next and random"
    }
  ],

  // ============ RECURSION ============

  recursion: [
    {
      q: "Every recursive function must have?",
      options: ["Loop inside", "Base case", "Return type void", "Global variable"],
      answer: 1,
      explanation: "Base case stops infinite recursion"
    },
    {
      q: "Number of subsets of a set with n elements?",
      options: ["n!", "n²", "2^n", "n log n"],
      answer: 2,
      explanation: "Each element has 2 choices: include or exclude → 2^n"
    },
    {
      q: "Time complexity of generating all permutations of n elements?",
      options: ["O(n²)", "O(2^n)", "O(n!)", "O(n log n)"],
      answer: 2,
      explanation: "n! permutations exist, each takes O(n) to build"
    }
  ],

  backtracking: [
    {
      q: "Backtracking is essentially?",
      options: ["Greedy + DP", "Recursion + Undo", "BFS + memoization", "Sorting + searching"],
      answer: 1,
      explanation: "Try a choice, recurse, undo if it leads to dead end"
    },
    {
      q: "N-Queens problem places N queens on N×N board such that?",
      options: ["All same row", "No two attack each other", "All same column", "Diagonal only"],
      answer: 1,
      explanation: "No two queens share same row, column or diagonal"
    },
    {
      q: "Pruning in backtracking means?",
      options: ["Removing array elements", "Skipping branches that can't lead to solution", "Sorting choices", "Memoizing results"],
      answer: 1,
      explanation: "Early termination of invalid paths saves computation"
    }
  ],

  // ============ TREES ============

  tree_traversals: [
    {
      q: "Inorder traversal of a BST gives elements in?",
      options: ["Random order", "Reverse sorted", "Sorted (ascending)", "Level order"],
      answer: 2,
      explanation: "Left → Root → Right on BST always gives sorted output"
    },
    {
      q: "BFS on a tree uses which data structure?",
      options: ["Stack", "Queue", "Heap", "LinkedList"],
      answer: 1,
      explanation: "Process level by level using queue (FIFO)"
    },
    {
      q: "Iterative inorder traversal uses?",
      options: ["Queue", "Two stacks", "Explicit stack", "Heap"],
      answer: 2,
      explanation: "Push left nodes to stack, process, then go right"
    }
  ],

  bst: [
    {
      q: "In a valid BST, for every node X?",
      options: [
        "Left child > X, Right child < X",
        "Left subtree < X, Right subtree > X",
        "All nodes equal",
        "Left = Right always"
      ],
      answer: 1,
      explanation: "BST property: left < node < right for every node"
    },
    {
      q: "LCA (Lowest Common Ancestor) in BST found by?",
      options: ["BFS from root", "Comparing values to navigate left/right", "Inorder traversal", "Postorder only"],
      answer: 1,
      explanation: "If both nodes < root → go left, both > root → go right, else root is LCA"
    },
    {
      q: "Average time to search in a balanced BST?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      answer: 2,
      explanation: "Height of balanced BST is log n → search is O(log n)"
    }
  ],

  tree_dp: [
    {
      q: "Diameter of a binary tree is?",
      options: ["Height × 2", "Longest path between any two nodes", "Number of leaves", "Root to deepest leaf"],
      answer: 1,
      explanation: "Diameter can pass through root or stay in a subtree"
    },
    {
      q: "Maximum path sum in tree — path must?",
      options: ["Start from root", "End at leaf", "Be any path between two nodes", "Be left to right"],
      answer: 2,
      explanation: "Path can start and end at any node in the tree"
    },
    {
      q: "Serializing a tree means?",
      options: ["Sorting nodes", "Converting tree to string/array", "Balancing tree", "Removing duplicates"],
      answer: 1,
      explanation: "Serialize = encode tree structure, deserialize = rebuild"
    }
  ],

  // ============ HEAPS ============

  heaps: [
    {
      q: "Min heap property: every parent is?",
      options: ["Greater than children", "Less than or equal to children", "Equal to children", "Unrelated to children"],
      answer: 1,
      explanation: "In min heap, root is always the minimum element"
    },
    {
      q: "Time complexity of inserting into a heap?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: 2,
      explanation: "Insert at end, bubble up → at most log n comparisons"
    },
    {
      q: "Finding median of a data stream uses?",
      options: ["One max heap", "One min heap", "Max heap + min heap", "BST"],
      answer: 2,
      explanation: "Max heap for lower half, min heap for upper half"
    }
  ],

  // ============ GREEDY ============

  greedy: [
    {
      q: "Greedy algorithm makes choices that are?",
      options: ["Globally optimal always", "Locally optimal at each step", "Randomized", "Based on future states"],
      answer: 1,
      explanation: "Greedy picks best option now, doesn't reconsider"
    },
    {
      q: "Activity selection problem sorts activities by?",
      options: ["Start time", "Duration", "End time", "Priority"],
      answer: 2,
      explanation: "Sort by end time to maximize non-overlapping activities"
    },
    {
      q: "Jump Game II finds?",
      options: ["If you can reach end", "Minimum jumps to reach end", "Maximum jumps", "Shortest path"],
      answer: 1,
      explanation: "Greedy: always extend farthest reachable position"
    }
  ],

  // ============ GRAPHS ============

  graph_basics: [
    {
      q: "Adjacency list is preferred over matrix when graph is?",
      options: ["Dense", "Sparse", "Complete", "Weighted"],
      answer: 1,
      explanation: "Sparse graph: adjacency list saves O(V²) → O(V + E) space"
    },
    {
      q: "BFS gives shortest path in?",
      options: ["Weighted graphs", "Unweighted graphs", "Negative weight graphs", "DAGs only"],
      answer: 1,
      explanation: "BFS explores level by level → shortest in unweighted"
    },
    {
      q: "Cycle detection in undirected graph uses?",
      options: ["Topological sort", "DFS with parent tracking", "BFS only", "Dijkstra's"],
      answer: 1,
      explanation: "If visited neighbor != parent → cycle exists"
    }
  ],

  graph_algorithms: [
    {
      q: "Dijkstra's algorithm fails with?",
      options: ["Large graphs", "Negative weight edges", "Disconnected graphs", "Dense graphs"],
      answer: 1,
      explanation: "Negative edges break greedy assumption of Dijkstra's"
    },
    {
      q: "Topological sort is only valid for?",
      options: ["Undirected graphs", "Directed Acyclic Graph (DAG)", "Weighted graphs", "Complete graphs"],
      answer: 1,
      explanation: "Cyclic graph has no valid topological ordering"
    },
    {
      q: "Bellman-Ford can handle negative edges and runs in?",
      options: ["O(V + E)", "O(V × E)", "O(V log E)", "O(E²)"],
      answer: 1,
      explanation: "Relaxes all edges V-1 times → O(VE)"
    }
  ],

  advanced_graphs: [
    {
      q: "Union-Find data structure is used for?",
      options: ["Shortest path", "Detecting connected components / cycle", "Topological sort", "BFS"],
      answer: 1,
      explanation: "Union-Find efficiently merges sets and checks connectivity"
    },
    {
      q: "Kruskal's algorithm builds MST by?",
      options: ["Starting from a vertex", "Sorting edges by weight and adding if no cycle", "BFS traversal", "Greedy from heaviest edge"],
      answer: 1,
      explanation: "Sort edges ascending, add edge if it doesn't form cycle"
    },
    {
      q: "A bipartite graph can be colored with?",
      options: ["1 color", "2 colors", "3 colors", "n colors"],
      answer: 1,
      explanation: "Bipartite = 2-colorable, no odd-length cycles"
    }
  ],

  // ============ DYNAMIC PROGRAMMING ============

  dp_1d: [
    {
      q: "DP is applicable when problem has?",
      options: ["Greedy substructure", "Overlapping subproblems + optimal substructure", "Sorted input", "Graph structure"],
      answer: 1,
      explanation: "Both conditions must hold for DP to be valid"
    },
    {
      q: "Memoization is?",
      options: ["Bottom-up DP", "Top-down DP with caching", "Greedy with memory", "BFS with visited"],
      answer: 1,
      explanation: "Recurse + store results to avoid recomputation"
    },
    {
      q: "House Robber problem constraint is?",
      options: ["Rob every house", "Can't rob adjacent houses", "Rob max 3 houses", "Rob only even index"],
      answer: 1,
      explanation: "Adjacent houses have connected alarm → can't rob both"
    }
  ],

  dp_knapsack: [
    {
      q: "0/1 Knapsack differs from unbounded knapsack because?",
      options: ["Different weights", "Item can only be used once vs unlimited times", "Different capacity", "Sorted items"],
      answer: 1,
      explanation: "0/1 = each item used once, unbounded = unlimited copies"
    },
    {
      q: "Subset sum problem asks?",
      options: ["Maximum sum", "Does a subset with given sum exist?", "Minimum subset", "All subsets"],
      answer: 1,
      explanation: "Boolean DP: can we form target sum using array elements?"
    },
    {
      q: "Partition equal subset sum reduces to?",
      options: ["LCS", "Subset sum with target = totalSum/2", "Knapsack with n items", "Coin change"],
      answer: 1,
      explanation: "If total is odd → impossible. Else find subset = total/2"
    }
  ],

  dp_2d: [
    {
      q: "LCS of 'ABCBDAB' and 'BDCAB' has length?",
      options: ["3", "4", "5", "2"],
      answer: 1,
      explanation: "LCS = BCAB or BDAB → length 4"
    },
    {
      q: "Edit distance between 'cat' and 'cut'?",
      options: ["0", "1", "2", "3"],
      answer: 1,
      explanation: "One substitution: a → u"
    },
    {
      q: "Unique paths in m×n grid (only right/down moves)?",
      options: ["m+n", "m×n", "C(m+n-2, m-1)", "2^(m+n)"],
      answer: 2,
      explanation: "Combinatorics: choose m-1 downs from m+n-2 total moves"
    }
  ],

  dp_sequence: [
    {
      q: "LIS stands for?",
      options: [
        "Longest Integer Sequence",
        "Longest Increasing Subsequence",
        "Least Integer Sum",
        "Linked Index Search"
      ],
      answer: 1,
      explanation: "Strictly increasing subsequence of maximum length"
    },
    {
      q: "LIS optimal solution runs in?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(2^n)"],
      answer: 1,
      explanation: "Patience sorting with binary search gives O(n log n)"
    },
    {
      q: "Longest palindromic subsequence of 'BBABCBCAB'?",
      options: ["5", "6", "7", "8"],
      answer: 2,
      explanation: "BABCBAB → length 7"
    }
  ],

  dp_interval: [
    {
      q: "Matrix chain multiplication finds?",
      options: ["Product of matrices", "Minimum scalar multiplications", "Maximum product", "Matrix inverse"],
      answer: 1,
      explanation: "Optimal parenthesization to minimize operations"
    },
    {
      q: "Burst Balloons problem uses which DP approach?",
      options: ["1D DP", "Interval DP", "Bitmask DP", "Tree DP"],
      answer: 1,
      explanation: "dp[i][j] = max coins from bursting all balloons between i and j"
    },
    {
      q: "Palindrome partitioning minimum cuts for 'aab'?",
      options: ["0", "1", "2", "3"],
      answer: 1,
      explanation: "Cut once: 'a' | 'ab' — wait, 'a' | 'a' | 'b' = 2 cuts... actually min = 1: 'aa'|'b'"
    }
  ],

  // ============ BIT MANIPULATION ============

  bit_manipulation: [
    {
      q: "n & (n-1) does what?",
      options: ["Sets last bit", "Clears last set bit", "Flips all bits", "Counts bits"],
      answer: 1,
      explanation: "n & (n-1) removes the rightmost set bit from n"
    },
    {
      q: "XOR of a number with itself is?",
      options: ["1", "The number itself", "0", "-1"],
      answer: 2,
      explanation: "a XOR a = 0 always, used to find single non-duplicate"
    },
    {
      q: "Left shift by k (n << k) is equivalent to?",
      options: ["n / 2^k", "n × 2^k", "n + k", "n - k"],
      answer: 1,
      explanation: "Each left shift multiplies by 2"
    }
  ],

  // ============ ADVANCED DS ============

  trie: [
    {
      q: "Trie is optimal for?",
      options: ["Range queries", "Prefix search and autocomplete", "Graph traversal", "Sorting"],
      answer: 1,
      explanation: "Each node represents a character, path = word/prefix"
    },
    {
      q: "Time to search a word of length L in a Trie?",
      options: ["O(n)", "O(L)", "O(log n)", "O(1)"],
      answer: 1,
      explanation: "Traverse L nodes → O(L) regardless of total words"
    },
    {
      q: "Space complexity of Trie with n words of avg length L?",
      options: ["O(n)", "O(L)", "O(n × L)", "O(n²)"],
      answer: 2,
      explanation: "Each character stored once per unique path → O(n×L) worst case"
    }
  ],

  segment_tree: [
    {
      q: "Segment tree supports range queries in?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      answer: 1,
      explanation: "Query traverses height of tree = log n"
    },
    {
      q: "Segment tree is built in?",
      options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
      answer: 1,
      explanation: "Build visits each node once → O(n) time, O(4n) space"
    },
    {
      q: "Fenwick tree (BIT) is simpler than segment tree and supports?",
      options: ["Range min queries", "Only prefix sum queries", "2D queries only", "String queries"],
      answer: 1,
      explanation: "BIT handles prefix sums and point updates in O(log n)"
    }
  ],

  mock_interview: [
    {
      q: "Time complexity of quick select (finding kth smallest)?",
      options: ["O(n log n)", "O(n²)", "O(n) average", "O(log n)"],
      answer: 2,
      explanation: "Average O(n), worst O(n²) — similar to quicksort"
    },
    {
      q: "Which data structure gives O(1) insert, delete and search?",
      options: ["Array", "BST", "Hash Table (average)", "Linked List"],
      answer: 2,
      explanation: "Hash table gives O(1) average for all three operations"
    },
    {
      q: "Two's complement representation is used for?",
      options: ["Floating point", "Negative integers in binary", "Unsigned integers", "ASCII encoding"],
      answer: 1,
      explanation: "Two's complement allows subtraction using addition circuits"
    }
  ]
};

const QUIZ_MAPPING = {
  arr_1: 'two_pointer',
  arr_2: 'two_pointer',
  arr_3: 'sliding_window',
  arr_4: 'sliding_window',
  arr_5: 'prefix_sum',
  arr_6: 'prefix_sum',
  arr_7: 'advanced_arrays',
  arr_8: 'advanced_arrays',
  arr_9: 'advanced_arrays',
  arr_10: 'advanced_arrays',
  arr_11: 'advanced_arrays',
  arr_12: 'advanced_arrays',

  str_1: 'string_basics',
  str_2: 'string_basics',
  str_3: 'string_basics',
  str_4: 'string_basics',
  str_5: 'string_algorithms',
  str_6: 'string_algorithms',
  str_7: 'string_algorithms',
  str_8: 'string_algorithms',

  ss_1: 'binary_search',
  ss_2: 'binary_search',
  ss_3: 'binary_search',
  ss_4: 'binary_search',
  ss_5: 'sorting',
  ss_6: 'sorting',
  ss_7: 'sorting',
  ss_8: 'sorting',
  ss_9: 'sorting',

  hash_1: 'hashing',
  hash_2: 'hashing',
  hash_3: 'hashing',
  hash_4: 'hashing',
  hash_5: 'hashing',

  sq_1: 'stack',
  sq_2: 'stack',
  sq_3: 'stack',
  sq_4: 'stack',
  sq_5: 'queue_deque',
  sq_6: 'queue_deque',
  sq_7: 'queue_deque',
  sq_8: 'queue_deque',

  ll_1: 'linked_list_basic',
  ll_2: 'linked_list_basic',
  ll_3: 'linked_list_basic',
  ll_4: 'linked_list_basic',
  ll_5: 'linked_list_advanced',
  ll_6: 'linked_list_advanced',
  ll_7: 'linked_list_advanced',
  ll_8: 'linked_list_advanced',

  rb_1: 'recursion',
  rb_2: 'recursion',
  rb_3: 'recursion',
  rb_4: 'recursion',
  rb_5: 'backtracking',
  rb_6: 'backtracking',
  rb_7: 'backtracking',
  rb_8: 'backtracking',

  tr_1: 'tree_traversals',
  tr_2: 'tree_traversals',
  tr_3: 'tree_traversals',
  tr_4: 'tree_traversals',
  tr_5: 'bst',
  tr_6: 'bst',
  tr_7: 'bst',
  tr_8: 'bst',
  tr_9: 'tree_dp',
  tr_10: 'tree_dp',
  tr_11: 'tree_dp',
  tr_12: 'tree_dp',

  hp_1: 'heaps',
  hp_2: 'heaps',
  hp_3: 'heaps',
  hp_4: 'heaps',
  hp_5: 'heaps',

  gr_1: 'greedy',
  gr_2: 'greedy',
  gr_3: 'greedy',
  gr_4: 'greedy',
  gr_5: 'greedy',

  gph_1: 'graph_basics',
  gph_2: 'graph_basics',
  gph_3: 'graph_basics',
  gph_4: 'graph_basics',
  gph_5: 'graph_algorithms',
  gph_6: 'graph_algorithms',
  gph_7: 'graph_algorithms',
  gph_8: 'graph_algorithms',
  gph_9: 'advanced_graphs',
  gph_10: 'advanced_graphs',
  gph_11: 'advanced_graphs',
  gph_12: 'advanced_graphs',

  dp_1: 'dp_1d',
  dp_2: 'dp_1d',
  dp_3: 'dp_1d',
  dp_4: 'dp_1d',
  dp_5: 'dp_knapsack',
  dp_6: 'dp_knapsack',
  dp_7: 'dp_knapsack',
  dp_8: 'dp_knapsack',
  dp_9: 'dp_2d',
  dp_10: 'dp_2d',
  dp_11: 'dp_2d',
  dp_12: 'dp_2d',
  dp_13: 'dp_sequence',
  dp_14: 'dp_sequence',
  dp_15: 'dp_sequence',
  dp_16: 'dp_sequence',
  dp_17: 'dp_interval',
  dp_18: 'dp_interval',
  dp_19: 'dp_interval',
  dp_20: 'dp_interval',

  bit_1: 'bit_manipulation',
  bit_2: 'bit_manipulation',
  bit_3: 'bit_manipulation',
  bit_4: 'bit_manipulation',
  bit_5: 'bit_manipulation',
  bit_6: 'bit_manipulation',

  ads_1: 'trie',
  ads_2: 'segment_tree',
  ads_3: 'segment_tree',
  ads_4: 'segment_tree',

  fb_1: 'mock_interview',
  fb_2: 'mock_interview',
  fb_3: 'mock_interview',
  fb_4: 'mock_interview'
};
