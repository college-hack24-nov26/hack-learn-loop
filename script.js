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
