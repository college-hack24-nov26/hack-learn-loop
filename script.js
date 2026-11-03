/* SkillPath — front-end demo. Progress is stored locally in this browser. */
"use strict";

const COURSES = {
  python: {
    name: "Python",
    short: "PY",
    color: "#3778e5",
    tint: "blue",
    category: "AI · Data · Automation",
    level: "Beginner",
    duration: "6 milestones",
    description:
      "A friendly first language for automation, data, AI, and building useful tools.",
    longDescription:
      "Build a strong foundation in Python, from your first program to a small project you can show.",
    outcomes: [
      "Write simple Python programs",
      "Work with data and functions",
      "Build a beginner project"
    ],
steps: [
      [
        "Setup & Hello World",
        "Install Python and VS Code, then run your first print() statement.",
        "python install and hello world",
        "Set up your editor and run a program that prints a message."
      ],
      [
        "Variables & Data Types",
        "Understand strings, integers, floats, input, and output.",
        "python variables data types",
        "Create a small program that asks for a name and age."
      ],
      [
        "Conditions & Loops",
        "Use if/else, for loops, and while loops to control program flow.",
        "python if else loops",
        "Build a number guessing game or a simple menu."
      ],
      [
        "Functions",
        "Organise reusable code with parameters and return values.",
        "python functions beginner",
        "Write and call at least three small functions."
      ],
      [
        "Lists & Dictionaries",
        "Store, access, and update collections of data.",
        "python lists dictionaries beginner",
        "Store a list of tasks or student records."
      ],
      [
        "OOP + Mini Project",
        "Explore classes and objects, then build a quiz or calculator app.",
        "python oop beginner project",
        "Finish a small project and explain how it works."
      ]
    ],
    next: [
      "Practise data structures and algorithms",
      "Build a web app with Flask or Django",
      "Explore data analysis with Pandas",
      "Publish a project and write a README"
    ]
  },
cpp: {
    name: "C++",
    short: "C++",
    color: "#d94c4c",
    tint: "red",
    category: "DSA · Systems · Games",
    level: "Beginner",
    duration: "6 milestones",
    description:
      "Learn core programming concepts and build a foundation for problem-solving and DSA.",
    longDescription:
      "Move from your first C++ program to core language concepts and a small project.",
    outcomes: [
      "Understand core syntax",
      "Work with functions and arrays",
      "Use the STL in a mini project"
    ],
    steps: [
      [
        "Setup & First Program",
        "Install a compiler or IDE and run your first C++ program.",
        "c++ install compiler hello world",
        "Compile and run a program that prints a message."
      ],
      [
        "Variables, I/O & Operators",
        "Learn data types, cin, cout, and arithmetic operators.",
        "c++ variables input output operators",
        "Build a program that accepts input and calculates a result."
      ],
      [
        "Control Flow & Loops",
        "Use if, switch, for, and while statements.",
        "c++ if else loops beginner",
        "Create a menu-driven calculator."
      ],
      [
        "Functions, Arrays & Strings",
        "Split problems into functions and work with collections of values.",
        "c++ functions arrays strings beginner",
        "Write a function that searches an array."
      ],
      [
        "Pointers & OOP",
        "Understand pointers, classes, objects, and constructors.",
        "c++ pointers classes objects beginner",
        "Model a simple real-world object using a class."
      ],
      [
        "STL + Mini Project",
        "Use vector, map, and sort in a small application.",
        "c++ stl vector map beginner project",
        "Build a small score tracker or console game."
      ]
    ],
    next: [
      "Practise DSA: arrays, trees, and graphs",
      "Solve problems on coding practice platforms",
      "Join beginner programming contests",
      "Build a C++ project and document it"
    ]
  },
java: {
    name: "Java",
    short: "J",
    color: "#d99022",
    tint: "amber",
    category: "Backend · Android · OOP",
    level: "Beginner",
    duration: "6 milestones",
    description:
      "Build programming fundamentals with a language widely used for backend and Android development.",
    longDescription:
      "Learn Java syntax, object-oriented programming, collections, and how to create a small app.",
    outcomes: [
      "Write Java programs",
      "Apply OOP fundamentals",
      "Use collections in a project"
    ],
    steps: [
      [
        "Setup JDK & Hello World",
        "Install a JDK and editor, then run your first Java program.",
        "java install jdk hello world beginner",
        "Compile and run a program that prints a message."
      ],
      [
        "Variables, Types & Operators",
        "Learn data types, Scanner input, and common operators.",
        "java variables data types scanner",
        "Write a program that takes input and calculates a result."
      ],
      [
        "Conditions & Loops",
        "Use if, switch, for, and while statements.",
        "java if else loops beginner",
        "Build a number guessing game."
      ],
