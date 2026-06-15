// ============================================================
//  DSA QUEST — Data Layer
//  All static game data: chapters, subtopics, badges, levels
// ============================================================

const DSA_DATA = {
  chapters: [
    {
      id: 'arrays',
      name: 'Arrays',
      icon: '🛡️',
      color: '#00d4ff',
      days: '1–3',
      badge: 'array_ace',
      days_data: [
        {
          day: 1,
          label: 'Day 1 — Core Patterns',
          subtopics: [
            { id: 'arr_1', name: '[LC 167] Two pointer technique (opposite ends)', difficulty: 'easy', xp: 50 },
            { id: 'arr_2', name: '[LC 283] Two pointer (same direction / fast-slow)', difficulty: 'easy', xp: 50 },
            { id: 'arr_3', name: '[LC 643] Sliding window (fixed size)', difficulty: 'medium', xp: 90 },
            { id: 'arr_4', name: '[LC 3] Sliding window (variable size)', difficulty: 'medium', xp: 100 },
          ]
        },
        {
          day: 2,
          label: 'Day 2 — Array Algorithms',
          subtopics: [
            { id: 'arr_5', name: '[LC 303] Prefix sum array', difficulty: 'easy', xp: 50 },
            { id: 'arr_6', name: "[LC 53] Kadane's algorithm (max subarray)", difficulty: 'medium', xp: 90 },
            { id: 'arr_7', name: '[LC 75] Dutch National Flag (3-way partition)', difficulty: 'medium', xp: 100 },
            { id: 'arr_8', name: "[LC 169] Moore's voting algorithm (majority element)", difficulty: 'medium', xp: 90 },
          ]
        },
        {
          day: 3,
          label: 'Day 3 — Advanced Array',
          subtopics: [
            { id: 'arr_9', name: '[LC 496] Next greater element (stack-based)', difficulty: 'medium', xp: 100 },
            { id: 'arr_10', name: '[LC 42] Trapping rainwater', difficulty: 'hard', xp: 160 },
            { id: 'arr_11', name: '[LC 121] Stock buy-sell problems', difficulty: 'medium', xp: 90 },
            { id: 'arr_12', name: '[LC 56] Merge intervals / overlapping intervals', difficulty: 'medium', xp: 100 },
          ]
        }
      ]
    },
    {
      id: 'strings',
      name: 'Strings',
      icon: '🔤',
      color: '#a855f7',
      days: '4–5',
      badge: 'string_slayer',
      days_data: [
        {
          day: 4,
          label: 'Day 4 — String Basics',
          subtopics: [
            { id: 'str_1', name: '[LC 151] Reverse words / rotate string', difficulty: 'easy', xp: 45 },
            { id: 'str_2', name: '[LC 242] Anagram detection', difficulty: 'easy', xp: 50 },
            { id: 'str_3', name: '[LC 5] Palindrome check & longest palindrome', difficulty: 'medium', xp: 90 },
            { id: 'str_4', name: '[LC 387] Character frequency maps', difficulty: 'easy', xp: 50 },
          ]
        },
        {
          day: 5,
          label: 'Day 5 — String Algorithms',
          subtopics: [
            { id: 'str_5', name: '[LC 28] KMP algorithm (pattern matching)', difficulty: 'hard', xp: 170 },
            { id: 'str_6', name: '[LC 187] Rabin-Karp (rolling hash)', difficulty: 'hard', xp: 160 },
            { id: 'str_7', name: '[LC 2223] Z-algorithm', difficulty: 'hard', xp: 160 },
            { id: 'str_8', name: '[LC 14] Longest common prefix', difficulty: 'medium', xp: 90 },
          ]
        }
      ]
    },
    {
      id: 'searching_sorting',
      name: 'Searching & Sorting',
      icon: '🔍',
      color: '#00ff88',
      days: '6–7',
      badge: null,
      days_data: [
        {
          day: 6,
          label: 'Day 6 — Binary Search',
          subtopics: [
            { id: 'ss_1', name: '[LC 704] Classic binary search', difficulty: 'easy', xp: 50 },
            { id: 'ss_2', name: '[LC 1011] Binary search on answer (search space)', difficulty: 'medium', xp: 100 },
            { id: 'ss_3', name: '[LC 34] First/last occurrence', difficulty: 'easy', xp: 55 },
            { id: 'ss_4', name: '[LC 33] Peak element, rotated array search', difficulty: 'medium', xp: 100 },
          ]
        },
        {
          day: 7,
          label: 'Day 7 — Sorting',
          subtopics: [
            { id: 'ss_5', name: '[LC 912] Merge sort (divide and conquer)', difficulty: 'medium', xp: 90 },
            { id: 'ss_6', name: '[LC 215] Quick sort (pivot strategies)', difficulty: 'medium', xp: 90 },
            { id: 'ss_7', name: '[LC 912] Heap sort', difficulty: 'medium', xp: 90 },
            { id: 'ss_8', name: '[LC 75] Counting / Radix sort', difficulty: 'medium', xp: 80 },
            { id: 'ss_9', name: '[LC 56] Sorting custom objects (comparator)', difficulty: 'easy', xp: 50 },
          ]
        }
      ]
    },
    {
      id: 'hashing',
      name: 'Hashing',
      icon: '#️⃣',
      color: '#fbbf24',
      days: '8',
      badge: null,
      days_data: [
        {
          day: 8,
          label: 'Day 8 — Hashing Patterns',
          subtopics: [
            { id: 'hash_1', name: '[LC 1] HashMap vs HashSet patterns', difficulty: 'easy', xp: 50 },
            { id: 'hash_2', name: '[LC 347] Frequency counting', difficulty: 'easy', xp: 45 },
            { id: 'hash_3', name: '[LC 18] Two-sum / four-sum pattern', difficulty: 'medium', xp: 90 },
            { id: 'hash_4', name: '[LC 560] Subarray with given sum (hashing)', difficulty: 'medium', xp: 100 },
            { id: 'hash_5', name: '[LC 128] Longest consecutive sequence', difficulty: 'medium', xp: 110 },
          ]
        }
      ]
    },
    {
      id: 'stack_queue',
      name: 'Stack & Queue',
      icon: '📚',
      color: '#f97316',
      days: '9–10',
      badge: null,
      days_data: [
        {
          day: 9,
          label: 'Day 9 — Stack',
          subtopics: [
            { id: 'sq_1', name: '[LC 225] Stack using array / linked list', difficulty: 'easy', xp: 45 },
            { id: 'sq_2', name: '[LC 20] Balanced parentheses', difficulty: 'easy', xp: 50 },
            { id: 'sq_3', name: '[LC 739] Monotonic stack patterns', difficulty: 'medium', xp: 100 },
            { id: 'sq_4', name: '[LC 84] Largest rectangle in histogram', difficulty: 'hard', xp: 170 },
          ]
        },
        {
          day: 10,
          label: 'Day 10 — Queue & Deque',
          subtopics: [
            { id: 'sq_5', name: '[LC 232] Queue using two stacks', difficulty: 'easy', xp: 50 },
            { id: 'sq_6', name: '[LC 622] Circular queue', difficulty: 'easy', xp: 50 },
            { id: 'sq_7', name: '[LC 239] Deque (sliding window maximum)', difficulty: 'medium', xp: 110 },
            { id: 'sq_8', name: '[LC 703] Priority queue basics', difficulty: 'medium', xp: 90 },
          ]
        }
      ]
    },
    {
      id: 'linked_list',
      name: 'Linked List',
      icon: '🔗',
      color: '#06b6d4',
      days: '11–12',
      badge: null,
      days_data: [
        {
          day: 11,
          label: 'Day 11 — Core Linked List',
          subtopics: [
            { id: 'll_1', name: '[LC 206] Reverse linked list (iterative + recursive)', difficulty: 'easy', xp: 55 },
            { id: 'll_2', name: "[LC 142] Detect & remove cycle (Floyd's)", difficulty: 'medium', xp: 100 },
            { id: 'll_3', name: '[LC 876] Find middle node', difficulty: 'easy', xp: 45 },
            { id: 'll_4', name: '[LC 21] Merge two sorted lists', difficulty: 'easy', xp: 55 },
          ]
        },
        {
          day: 12,
          label: 'Day 12 — Advanced Linked List',
          subtopics: [
            { id: 'll_5', name: '[LC 23] Merge K sorted lists', difficulty: 'hard', xp: 160 },
            { id: 'll_6', name: '[LC 146] LRU Cache design', difficulty: 'hard', xp: 180 },
            { id: 'll_7', name: '[LC 138] Clone list with random pointers', difficulty: 'hard', xp: 160 },
            { id: 'll_8', name: '[LC 430] Flatten a multilevel linked list', difficulty: 'hard', xp: 160 },
          ]
        }
      ]
    },
    {
      id: 'recursion_backtracking',
      name: 'Recursion & Backtracking',
      icon: '🔄',
      color: '#ec4899',
      days: '13–14',
      badge: null,
      days_data: [
        {
          day: 13,
          label: 'Day 13 — Recursion',
          subtopics: [
            { id: 'rb_1', name: '[LC 509] Recursion tree visualization', difficulty: 'easy', xp: 50 },
            { id: 'rb_2', name: '[LC 78] Subset generation', difficulty: 'medium', xp: 90 },
            { id: 'rb_3', name: '[LC 46] Permutation generation', difficulty: 'medium', xp: 100 },
            { id: 'rb_4', name: '[LC 90] Power set', difficulty: 'medium', xp: 90 },
          ]
        },
        {
          day: 14,
          label: 'Day 14 — Backtracking',
          subtopics: [
            { id: 'rb_5', name: '[LC 51] N-Queens problem', difficulty: 'hard', xp: 180 },
            { id: 'rb_6', name: '[LC 37] Sudoku solver', difficulty: 'hard', xp: 190 },
            { id: 'rb_7', name: '[LC 79] Word search on grid', difficulty: 'hard', xp: 160 },
            { id: 'rb_8', name: '[LC 980] Rat in a maze', difficulty: 'medium', xp: 110 },
          ]
        }
      ]
    },
    {
      id: 'trees',
      name: 'Trees',
      icon: '🌲',
      color: '#22c55e',
      days: '15–17',
      badge: 'tree_tamer',
      days_data: [
        {
          day: 15,
          label: 'Day 15 — Tree Traversals',
          subtopics: [
            { id: 'tr_1', name: '[LC 102] Inorder / preorder / postorder (recursive + iterative)', difficulty: 'easy', xp: 55 },
            { id: 'tr_2', name: '[LC 102] Level order BFS', difficulty: 'easy', xp: 55 },
            { id: 'tr_3', name: '[LC 987] Vertical order traversal', difficulty: 'medium', xp: 110 },
            { id: 'tr_4', name: '[LC 545] Boundary traversal', difficulty: 'medium', xp: 100 },
          ]
        },
        {
          day: 16,
          label: 'Day 16 — Binary Search Tree',
          subtopics: [
            { id: 'tr_5', name: '[LC 700] BST insert / delete / search', difficulty: 'easy', xp: 55 },
            { id: 'tr_6', name: '[LC 98] Validate BST', difficulty: 'medium', xp: 90 },
            { id: 'tr_7', name: '[LC 236] LCA in BST and binary tree', difficulty: 'medium', xp: 100 },
            { id: 'tr_8', name: '[LC 230] Kth smallest/largest in BST', difficulty: 'medium', xp: 90 },
          ]
        },
        {
          day: 17,
          label: 'Day 17 — Tree DP & Advanced',
          subtopics: [
            { id: 'tr_9', name: '[LC 543] Diameter of tree', difficulty: 'medium', xp: 100 },
            { id: 'tr_10', name: '[LC 124] Max path sum', difficulty: 'hard', xp: 160 },
            { id: 'tr_11', name: '[LC 110] Balanced tree check', difficulty: 'medium', xp: 90 },
            { id: 'tr_12', name: '[LC 297] Serialize and deserialize tree', difficulty: 'hard', xp: 170 },
          ]
        }
      ]
    },
    {
      id: 'heaps',
      name: 'Heaps',
      icon: '⛰️',
      color: '#f59e0b',
      days: '18',
      badge: null,
      days_data: [
        {
          day: 18,
          label: 'Day 18 — Heaps',
          subtopics: [
            { id: 'hp_1', name: '[LC 215] Min heap / max heap construction', difficulty: 'medium', xp: 90 },
            { id: 'hp_2', name: '[LC 347] K largest / K smallest elements', difficulty: 'medium', xp: 100 },
            { id: 'hp_3', name: '[LC 23] Merge K sorted arrays', difficulty: 'hard', xp: 160 },
            { id: 'hp_4', name: '[LC 295] Median of data stream', difficulty: 'hard', xp: 180 },
            { id: 'hp_5', name: '[LC 621] Task scheduler pattern', difficulty: 'medium', xp: 110 },
          ]
        }
      ]
    },
    {
      id: 'greedy',
      name: 'Greedy',
      icon: '💰',
      color: '#84cc16',
      days: '19',
      badge: null,
      days_data: [
        {
          day: 19,
          label: 'Day 19 — Greedy Algorithms',
          subtopics: [
            { id: 'gr_1', name: '[LC 435] Activity selection', difficulty: 'medium', xp: 90 },
            { id: 'gr_2', name: '[LC 1235] Job sequencing with deadlines', difficulty: 'medium', xp: 100 },
            { id: 'gr_3', name: '[LC 1167] Huffman encoding (concept)', difficulty: 'medium', xp: 90 },
            { id: 'gr_4', name: '[LC 45] Jump game I & II', difficulty: 'medium', xp: 100 },
            { id: 'gr_5', name: '[LC 253] Minimum platforms', difficulty: 'medium', xp: 90 },
          ]
        }
      ]
    },
    {
      id: 'graphs',
      name: 'Graphs',
      icon: '🕸️',
      color: '#8b5cf6',
      days: '20–22',
      badge: 'graph_god',
      isBoss: true,
      days_data: [
        {
          day: 20,
          label: 'Day 20 — Graph Basics',
          subtopics: [
            { id: 'gph_1', name: '[LC 997] Graph representations (adjacency list/matrix)', difficulty: 'easy', xp: 55 },
            { id: 'gph_2', name: '[LC 133] BFS traversal', difficulty: 'easy', xp: 55 },
            { id: 'gph_3', name: '[LC 200] DFS traversal', difficulty: 'easy', xp: 55 },
            { id: 'gph_4', name: '[LC 207] Detect cycle (directed + undirected)', difficulty: 'medium', xp: 110 },
          ]
        },
        {
          day: 21,
          label: 'Day 21 — Graph Algorithms',
          subtopics: [
            { id: 'gph_5', name: "[LC 210] Topological sort (DFS + Kahn's BFS)", difficulty: 'medium', xp: 120 },
            { id: 'gph_6', name: "[LC 743] Dijkstra's algorithm", difficulty: 'hard', xp: 200 },
            { id: 'gph_7', name: '[LC 787] Bellman-Ford', difficulty: 'hard', xp: 200 },
            { id: 'gph_8', name: '[LC 1334] Floyd-Warshall', difficulty: 'hard', xp: 200 },
          ]
        },
        {
          day: 22,
          label: 'Day 22 — Advanced Graphs',
          subtopics: [
            { id: 'gph_9', name: "[LC 1584] Prim's / Kruskal's (MST)", difficulty: 'hard', xp: 220 },
            { id: 'gph_10', name: '[LC 684] Disjoint set / Union-Find', difficulty: 'hard', xp: 200 },
            { id: 'gph_11', name: '[LC 1192] Bridges and articulation points', difficulty: 'hard', xp: 220 },
            { id: 'gph_12', name: '[LC 785] Bipartite graph check', difficulty: 'medium', xp: 120 },
          ]
        }
      ]
    },
    {
      id: 'dynamic_programming',
      name: 'Dynamic Programming',
      icon: '🧠',
      color: '#ef4444',
      days: '23–27',
      badge: 'dp_destroyer',
      isBoss: true,
      days_data: [
        {
          day: 23,
          label: 'Day 23 — 1D DP',
          subtopics: [
            { id: 'dp_1', name: '[LC 70] Fibonacci / climbing stairs', difficulty: 'easy', xp: 60 },
            { id: 'dp_2', name: '[LC 198] House robber I & II', difficulty: 'medium', xp: 100 },
            { id: 'dp_3', name: '[LC 322] Coin change', difficulty: 'medium', xp: 110 },
            { id: 'dp_4', name: '[LC 746] Min cost climbing stairs', difficulty: 'easy', xp: 60 },
          ]
        },
        {
          day: 24,
          label: 'Day 24 — Knapsack Patterns',
          subtopics: [
            { id: 'dp_5', name: '[LC 416] 0/1 Knapsack', difficulty: 'medium', xp: 120 },
            { id: 'dp_6', name: '[LC 518] Unbounded knapsack', difficulty: 'medium', xp: 120 },
            { id: 'dp_7', name: '[LC 494] Subset sum', difficulty: 'medium', xp: 110 },
            { id: 'dp_8', name: '[LC 416] Partition equal subset sum', difficulty: 'hard', xp: 170 },
          ]
        },
        {
          day: 25,
          label: 'Day 25 — 2D DP',
          subtopics: [
            { id: 'dp_9', name: '[LC 62] Unique paths (grid)', difficulty: 'medium', xp: 100 },
            { id: 'dp_10', name: '[LC 64] Minimum path sum', difficulty: 'medium', xp: 100 },
            { id: 'dp_11', name: '[LC 72] Edit distance', difficulty: 'hard', xp: 200 },
            { id: 'dp_12', name: '[LC 44] Wildcard matching', difficulty: 'hard', xp: 200 },
          ]
        },
        {
          day: 26,
          label: 'Day 26 — Sequence DP',
          subtopics: [
            { id: 'dp_13', name: '[LC 1143] Longest common subsequence (LCS)', difficulty: 'medium', xp: 120 },
            { id: 'dp_14', name: '[LC 300] Longest increasing subsequence (LIS)', difficulty: 'medium', xp: 120 },
            { id: 'dp_15', name: '[LC 516] Longest palindromic subsequence', difficulty: 'hard', xp: 170 },
            { id: 'dp_16', name: '[LC 1092] Print LCS / LIS', difficulty: 'hard', xp: 180 },
          ]
        },
        {
          day: 27,
          label: 'Day 27 — Interval & Partition DP',
          subtopics: [
            { id: 'dp_17', name: '[LC 312] Matrix chain multiplication', difficulty: 'hard', xp: 220 },
            { id: 'dp_18', name: '[LC 312] Burst balloons', difficulty: 'hard', xp: 220 },
            { id: 'dp_19', name: '[LC 131] Palindrome partitioning', difficulty: 'hard', xp: 200 },
            { id: 'dp_20', name: '[LC 343] Rod cutting', difficulty: 'medium', xp: 120 },
          ]
        }
      ]
    },
    {
      id: 'bit_manipulation',
      name: 'Bit Manipulation',
      icon: '⚡',
      color: '#eab308',
      days: '28',
      badge: null,
      days_data: [
        {
          day: 28,
          label: 'Day 28 — Bit Manipulation',
          subtopics: [
            { id: 'bit_1', name: '[LC 136] AND / OR / XOR / NOT basics', difficulty: 'easy', xp: 50 },
            { id: 'bit_2', name: '[LC 190] Left shift / right shift tricks', difficulty: 'easy', xp: 50 },
            { id: 'bit_3', name: '[LC 338] Count set bits (Brian Kernighan)', difficulty: 'easy', xp: 55 },
            { id: 'bit_4', name: '[LC 540] Find single non-duplicate', difficulty: 'medium', xp: 90 },
            { id: 'bit_5', name: '[LC 268] XOR problems (missing number, two singles)', difficulty: 'medium', xp: 100 },
            { id: 'bit_6', name: '[LC 698] Bitmask DP (intro)', difficulty: 'hard', xp: 170 },
          ]
        }
      ]
    },
    {
      id: 'advanced_ds',
      name: 'Advanced Data Structures',
      icon: '🔮',
      color: '#00bcd4',
      days: '29',
      badge: null,
      days_data: [
        {
          day: 29,
          label: 'Day 29 — Advanced Structures',
          subtopics: [
            { id: 'ads_1', name: '[LC 208] Trie (insert, search, prefix count)', difficulty: 'hard', xp: 180 },
            { id: 'ads_2', name: '[LC 307] Segment tree (range sum, range min)', difficulty: 'hard', xp: 200 },
            { id: 'ads_3', name: '[LC 307] Fenwick tree / BIT', difficulty: 'hard', xp: 200 },
            { id: 'ads_4', name: '[LC 1521] Sparse table (range queries)', difficulty: 'hard', xp: 180 },
          ]
        }
      ]
    },
    {
      id: 'final_boss',
      name: 'Final Boss — Day 30',
      icon: '👑',
      color: '#fbbf24',
      days: '30',
      badge: 'dsa_king',
      isBoss: true,
      days_data: [
        {
          day: 30,
          label: 'Day 30 — Final Boss',
          subtopics: [
            { id: 'fb_1', name: '[LC Mix] 5 mixed medium LeetCode problems (timed)', difficulty: 'boss', xp: 300 },
            { id: 'fb_2', name: '[Sys Design] 1 system design question (intro level)', difficulty: 'boss', xp: 250 },
            { id: 'fb_3', name: '[Interview] Mock interview simulation', difficulty: 'boss', xp: 300 },
            { id: 'fb_4', name: '[Review] Full progress review', difficulty: 'medium', xp: 100 },
          ]
        }
      ]
    }
  ],

  // =================== BADGES ===================
  badges: [
    { id: 'first_blood',  name: 'First Blood',        icon: '🗡️',  desc: 'Complete your first subtopic',              condition: (s, xp, streak) => s >= 1 },
    { id: 'on_fire',      name: 'On Fire',             icon: '🔥',  desc: '3-day learning streak',                    condition: (s, xp, streak) => streak >= 3 },
    { id: 'week_warrior', name: 'Week Warrior',        icon: '⚔️',  desc: '7-day learning streak',                    condition: (s, xp, streak) => streak >= 7 },
    { id: 'month_master', name: 'Month Master',        icon: '🏅',  desc: '30-day learning streak',                   condition: (s, xp, streak) => streak >= 30 },
    { id: 'speed_runner', name: 'Speed Runner',        icon: '⚡',  desc: '500 XP earned in 3 days',                  condition: (s, xp, streak, extra) => extra?.speed_runner || false },
    { id: 'array_ace',    name: 'Array Ace',           icon: '🛡️',  desc: 'Finish entire Arrays chapter',             condition: (s, xp, streak, extra) => extra?.arrays_done || false },
    { id: 'string_slayer',name: 'String Slayer',       icon: '🔤',  desc: 'Finish entire Strings chapter',            condition: (s, xp, streak, extra) => extra?.strings_done || false },
    { id: 'graph_god',    name: 'Graph God',           icon: '🕸️',  desc: 'Finish entire Graphs chapter',             condition: (s, xp, streak, extra) => extra?.graphs_done || false },
    { id: 'dp_destroyer', name: 'DP Destroyer',        icon: '🧠',  desc: 'Finish Dynamic Programming chapter',       condition: (s, xp, streak, extra) => extra?.dp_done || false },
    { id: 'tree_tamer',   name: 'Tree Tamer',          icon: '🌲',  desc: 'Finish entire Trees chapter',              condition: (s, xp, streak, extra) => extra?.trees_done || false },
    { id: 'halfway_hero', name: 'Half Way Hero',       icon: '🏆',  desc: '50% of all topics completed',              condition: (s, xp, streak, extra) => extra?.half_done || false },
    { id: 'dsa_king',     name: 'DSA King',            icon: '👑',  desc: '100% topics completed',                    condition: (s, xp, streak, extra) => extra?.all_done || false },
    { id: 'xp_hoarder',   name: 'XP Hoarder',         icon: '💎',  desc: '2000+ total XP',                           condition: (s, xp) => xp >= 2000 },
    { id: 'lb_crusher',   name: 'Leaderboard Crusher', icon: '📊', desc: 'Reach top 3 in squad leaderboard',         condition: (s, xp, streak, extra) => extra?.top3 || false },
    { id: 'night_owl',    name: 'Night Owl',           icon: '🦉',  desc: 'Complete a topic after midnight',          condition: (s, xp, streak, extra) => extra?.night_owl || false },
    { id: 'early_bird',   name: 'Early Bird',          icon: '🐦',  desc: 'Complete a topic before 7 AM',             condition: (s, xp, streak, extra) => extra?.early_bird || false },
    { id: 'comeback_kid', name: 'Comeback Kid',        icon: '💪',  desc: 'Resume after a 3-day break',              condition: (s, xp, streak, extra) => extra?.comeback_kid || false },
    { id: 'mock_slayer',  name: 'Mock Slayer',         icon: '🎯',  desc: 'Complete mock interview day',              condition: (s, xp, streak, extra) => extra?.mock_slayer || false },
    { id: 'perfect_week', name: 'Perfect Week',        icon: '🌟',  desc: '7 subtopics in 7 days',                   condition: (s, xp, streak, extra) => extra?.perfect_week || false },
    { id: 'legend',       name: 'Legend',              icon: '🌠',  desc: 'All other badges unlocked',               condition: (s, xp, streak, extra) => extra?.all_badges || false },
  ],

  // =================== LEVEL SYSTEM ===================
  levels: [
    { level: 1, title: 'Apprentice',    minXp: 0,     color: '#94a3b8' },
    { level: 2, title: 'Coder',         minXp: 300,   color: '#22c55e' },
    { level: 3, title: 'Developer',     minXp: 800,   color: '#00d4ff' },
    { level: 4, title: 'Problem Solver',minXp: 1800,  color: '#f59e0b' },
    { level: 5, title: 'Engineer',      minXp: 3500,  color: '#f97316' },
    { level: 6, title: 'Sensei',        minXp: 6000,  color: '#a855f7' },
    { level: 7, title: 'DSA Legend',    minXp: 10000, color: '#fbbf24' },
  ],

  // =================== DEMO SQUAD MEMBERS ===================
  demoMembers: [
    { name: 'Arjun Sharma',   avatar: '⚔️', xp: 3420, streak: 12, completed: 48, total: 95, isYou: false },
    { name: 'Priya Patel',    avatar: '🔮', xp: 2980, streak: 8,  completed: 41, total: 95, isYou: false },
    { name: 'Rohit Kumar',    avatar: '🛡️', xp: 2100, streak: 5,  completed: 30, total: 95, isYou: false },
    { name: 'Sneha Nair',     avatar: '🌟', xp: 1650, streak: 3,  completed: 22, total: 95, isYou: false },
    { name: 'Vikram Singh',   avatar: '🧠', xp: 980,  streak: 1,  completed: 14, total: 95, isYou: false },
    { name: 'Ananya Reddy',   avatar: '🔥', xp: 540,  streak: 0,  completed: 8,  total: 95, isYou: false },
  ],
};

// Flatten all subtopics for easy lookup
// Flatten all subtopics for easy lookup
DSA_DATA.allSubtopics = DSA_DATA.chapters.flatMap(ch =>
  ch.days_data.flatMap(d => d.subtopics.map(s => ({ ...s, chapter: ch.id })))
);

DSA_DATA.totalSubtopics = DSA_DATA.allSubtopics.length;
DSA_DATA.totalXP = DSA_DATA.allSubtopics.reduce((acc, s) => acc + s.xp, 0);
