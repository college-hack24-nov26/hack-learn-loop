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
[
        "Methods, Arrays & Strings",
        "Organise code into methods and work with arrays and strings.",
        "java methods arrays strings beginner",
        "Write a method that processes a list of values."
      ],
      [
        "Object-Oriented Programming",
        "Understand classes, inheritance, polymorphism, and interfaces.",
        "java oop classes inheritance beginner",
        "Create two related classes and demonstrate inheritance."
      ],
      [
        "Collections + Mini Project",
        "Use ArrayList and HashMap to build a small application.",
        "java collections arraylist hashmap beginner project",
        "Build a library, expense, or student record app."
      ]
    ],
    next: [
      "Practise DSA in Java",
      "Explore Spring Boot for backend development",
      "Try Android app development",
      "Build a project for your portfolio"
    ]
  }
};
const STORAGE_KEY = "skillpath_accounts_v2";
const LEGACY_STORAGE_KEY = "skillpath_pro_v1";
const $ = (id) => document.getElementById(id);

const state = {
  user: null,
  done: {},
  quizPassed: {},
  attempts: {},
  currentCourse: null,
  currentStep: null,
  lastCompletedCourse: null,
  theme: "light",
  accounts: {},
  authMode: "register"
};
let toastTimer;

// Ten-question banks are grouped by the six milestone topics. Each milestone
// draws its test from the matching topic bank; every question is worth 1 point.
const QUIZ_BANKS = {
  setup: [
    {q:"What is the main purpose of a programming language?",o:["To give instructions to a computer","To increase screen brightness","To store only pictures","To replace the operating system"],a:0},
    {q:"What is a common first program used to test a language setup?",o:["Hello World","Delete Everything","Power Off","Format Disk"],a:0},
    {q:"What does a compiler generally do?",o:["Translates source code into a form the computer can execute","Designs a website layout","Creates internet access","Repairs hardware"],a:0},
    {q:"What is an IDE?",o:["An environment with tools for writing and running code","A type of loop","A database record","A network cable"],a:0},
    {q:"If a program does not run, what is a sensible first step?",o:["Read the error message and check the code/setup","Delete all project files","Change every line at once","Ignore the error"],a:0},
    {q:"Which is an example of source code?",o:["Instructions written in Python, C++ or Java","A monitor cable","A computer fan","A desk lamp"],a:0},
    {q:"What does debugging mean?",o:["Finding and fixing problems in a program","Making a screen larger","Installing a printer","Renaming the computer"],a:0},
    {q:"Why should code be saved in a project file?",o:["So it can be reopened, edited and run later","So it runs without a computer","So it cannot contain errors","So the internet becomes faster"],a:0},
    {q:"Which habit helps beginners learn programming?",o:["Run small examples and change them gradually","Copy code without reading it","Avoid testing code","Learn every language at once"],a:0},
    {q:"What is program output?",o:["The result produced when a program runs","The keyboard layout","The editor theme","The file extension only"],a:0}
  ],
 variables: [
    {q:"What is a variable used for?",o:["Naming a value that a program can use","Cooling the CPU","Connecting to Wi-Fi","Drawing a window"],a:0},
    {q:"Which value is an integer?",o:["42","3.14","\"hello\"","true/false only"],a:0},
    {q:"Which value is a string?",o:["\"SkillPath\"","27","2.5","false"],a:0},
    {q:"What is the purpose of input in a program?",o:["To receive data from a user or another source","To erase all variables","To close the compiler","To guarantee the answer is correct"],a:0},
    {q:"What is an assignment statement generally used for?",o:["Giving a value to a variable","Repeating a loop forever","Declaring the computer broken","Opening a browser tab"],a:0},
    {q:"Which is a floating-point number?",o:["6.25","6 as an integer only","\"6.25\" as text","a variable name"],a:0},
    {q:"Why are meaningful variable names useful?",o:["They make code easier to understand","They make every program faster automatically","They remove the need for testing","They prevent all syntax errors"],a:0},
    {q:"What is a Boolean value used to represent?",o:["True or false","A paragraph of text only","A decimal number only","A folder path only"],a:0},
    {q:"If age stores 19, what kind of information is age most likely holding?",o:["A numeric value","An image","A sound file","A loop"],a:0},
    {q:"What can happen when a program tries to combine incompatible data types?",o:["It may produce an error or an unintended result","The computer must shut down","The code becomes encrypted","The monitor changes size"],a:0}
  ],
  control: [
    {q:"What does an if statement do?",o:["Runs code when a condition is true","Always repeats code ten times","Stores a list","Defines a class"],a:0},
    {q:"What is the purpose of else?",o:["Provides an alternative branch when the if condition is false","Declares a string","Ends every program","Creates a variable automatically"],a:0},
    {q:"Which operator commonly checks equality in conditions?",o:["==","= only","++","//"],a:0},
    {q:"What is a loop used for?",o:["Repeating a block of code","Naming a class","Storing one value only","Importing a font"],a:0},
    {q:"When is a for loop often useful?",o:["When iterating over a sequence or a known range","Only when creating a website","Only for declaring variables","When no code should run"],a:0},
    {q:"What is a while loop commonly based on?",o:["A condition that is checked repeatedly","The colour of the editor","The size of the monitor","A file name"],a:0},
    {q:"What is an infinite loop?",o:["A loop that does not reach its stopping condition","A loop that runs exactly once","A function with no name","A list with no values"],a:0},
    {q:"Why use conditions in a number guessing game?",o:["To decide whether a guess is too high, too low, or correct","To install the programming language","To save the monitor settings","To turn every number into text"],a:0},
    {q:"What does a logical AND generally require?",o:["Both conditions to be true","At least one condition to be false","No conditions at all","A loop to finish first"],a:0},
    {q:"What is a good way to test a conditional program?",o:["Try inputs that exercise each branch","Test only one input forever","Remove all conditions","Never check the output"],a:0}
  ],
