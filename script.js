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
   functions: [
    {q:"What is a function?",o:["A reusable block of code that performs a task","A computer part","A kind of comment only","A folder on the desktop"],a:0},
    {q:"Why use functions?",o:["To organise code and avoid repeating logic","To make variables impossible","To remove all program output","To replace all data types"],a:0},
    {q:"What is a parameter?",o:["A named input accepted by a function","The colour of the editor","The final output screen","A type of operating system"],a:0},
    {q:"What does a return value do?",o:["Sends a result back to the caller","Repeats the function forever","Deletes the function","Opens a new file"],a:0},
    {q:"What is an array or list typically used for?",o:["Keeping multiple values in one collection","Storing only one function name","Changing the CPU speed","Compiling code"],a:0},
    {q:"What is an index commonly used for?",o:["Accessing an item by its position in a collection","Checking internet speed","Naming the computer","Opening a compiler"],a:0},
    {q:"In many languages, what is the first index of an array/list?",o:["0","1 in every language","-10","100"],a:0},
    {q:"What is a string method or operation often used for?",o:["Working with text","Controlling the monitor","Installing a compiler","Creating a network cable"],a:0},
    {q:"Why split a large task into functions?",o:["Each smaller part is easier to test and maintain","It guarantees zero bugs","It removes the need for names","It makes all code identical"],a:0},
    {q:"What should you do if a function returns an unexpected result?",o:["Check its inputs, logic and return statement","Delete the entire project immediately","Ignore the result","Change the computer clock"],a:0}
  ],
structures: [
    {q:"What is object-oriented programming centred around?",o:["Objects that combine data and behaviour","Only repeating loops","Only numeric calculations","Web page colours"],a:0},
    {q:"What is a class?",o:["A blueprint for creating objects","A single loop iteration","A compiler error","A text file extension"],a:0},
    {q:"What is an object?",o:["An instance created from a class","A comment in source code","A condition that is false","A file download"],a:0},
    {q:"What is encapsulation?",o:["Keeping data and related operations together and controlling access","Repeating a loop","Sorting numbers only","Installing an IDE"],a:0},
    {q:"What is inheritance in OOP?",o:["A class can derive features from another class","A variable changes its name randomly","A loop runs twice","A list becomes a string"],a:0},
    {q:"What is a dictionary/map commonly used for?",o:["Storing key-value pairs","Drawing a flowchart only","Repeating code","Compiling Java"],a:0},
    {q:"What is a pointer in languages such as C++?",o:["A value that refers to a memory address","A loop condition","A string character","A Java package"],a:0},
    {q:"What is a constructor commonly used for?",o:["Initialising a newly created object","Ending the operating system","Sorting every array","Creating an internet connection"],a:0},
    {q:"Why choose a suitable data structure?",o:["It affects how data is stored and accessed","It changes the language into another language","It guarantees the app has no bugs","It replaces testing"],a:0},
    {q:"What is a useful first step when learning a complex concept like OOP?",o:["Build a small example and observe how it works","Memorise code without running it","Skip the basics","Write the whole operating system"],a:0}
  ],
project: [
    {q:"What is the purpose of a mini project?",o:["Apply concepts to solve a small, practical problem","Avoid using what you learned","Replace every lesson with theory","Test the keyboard"],a:0},
    {q:"What should a program do before being considered finished?",o:["Be tested with normal and edge-case inputs","Be judged only by its file name","Never be run","Contain as many lines as possible"],a:0},
    {q:"What is a bug?",o:["A flaw that causes incorrect or unexpected behaviour","A required programming language","A project title","A data type"],a:0},
    {q:"Why use version control such as Git?",o:["Track changes and collaborate on code","Make a password secure automatically","Replace the programming language","Run code without a computer"],a:0},
    {q:"What is a README commonly for?",o:["Explaining what a project does and how to run it","Storing the computer's RAM","Replacing all source files","Hiding errors"],a:0},
    {q:"What is a test case?",o:["An input and expected behaviour used to check a program","A type of keyboard","A variable name only","A project logo"],a:0},
    {q:"What is a collection/library useful for in a project?",o:["Providing reusable functionality or data structures","Making the code impossible to read","Deleting source code","Removing the need for a goal"],a:0},
    {q:"What is a good way to approach a project that feels too large?",o:["Break it into small features and build them step by step","Write everything at once without testing","Stop planning","Add random features"],a:0},
    {q:"Why document important decisions in a project?",o:["So other people and your future self can understand it","So code cannot be changed","So tests are unnecessary","To increase file size"],a:0},
    {q:"Which is a useful sign of a successful beginner project?",o:["It works for its intended task and you can explain the code","It has the most lines","It uses every language at once","It has no documentation"],a:0}
  ]
};
function quizBankForStep(index) {
  return ["setup", "variables", "control", "functions", "structures", "project"][index] || "setup";
}

// Extra questions so every test is drawn at random from a pool larger than 10.
const EXTRA_QUESTIONS = {
  setup: [
    {q:"What is syntax in programming?",o:["The rules for how code must be written","The speed of the processor","The size of a file","The brand of the laptop"],a:0},
    {q:"What is a terminal or command line used for?",o:["Typing commands to interact with the computer","Drawing pictures only","Charging the battery","Changing the keyboard colour"],a:0},
    {q:"Why are code comments useful?",o:["They explain code to human readers","They make the code run faster","They fix errors automatically","They delete unused files"],a:0},
    {q:"What is an interpreter generally responsible for?",o:["Running code line by line or statement by statement","Building computer hardware","Designing logos","Creating Wi-Fi networks"],a:0},
    {q:"Why is it good to install the language from its official website?",o:["It is more likely to be safe and up to date","It makes the computer faster","It removes the need to learn","It works without a computer"],a:0}
  ],
  variables: [
    {q:"What does it mean to declare a variable?",o:["To create it so it can hold a value","To delete it permanently","To print it on paper","To turn it into a loop"],a:0},
    {q:"What is type conversion (casting)?",o:["Changing a value from one data type to another","Changing the keyboard layout","Renaming a file","Restarting the program"],a:0},
    {q:"What happens to a variable's value when you assign it a new value?",o:["The old value is replaced","Both values are kept at once","The program stops","The variable becomes a function"],a:0},
    {q:"Which of these is usually a bad variable name?",o:["x1y2z3q","studentAge","totalMarks","userName"],a:0},
    {q:"What is the result of combining two strings (concatenation)?",o:["One longer string","A number","A Boolean only","An error every time"],a:0}
  ],
control: [
    {q:"What does logical OR generally require?",o:["At least one condition to be true","Both conditions to be false","No conditions","A loop to be infinite"],a:0},
    {q:"What does the break statement commonly do in a loop?",o:["Exits the loop early","Starts the loop again from zero","Deletes the loop variable","Declares a function"],a:0},
    {q:"What does elif / else if allow you to do?",o:["Check another condition when earlier ones are false","Repeat code forever","Define a class","Import a library"],a:0},
    {q:"What is a nested loop?",o:["A loop inside another loop","A loop that never starts","A loop with no body","A variable inside a string"],a:0},
    {q:"What is an off-by-one error?",o:["A loop or index that runs one step too many or too few","A missing monitor","A slow internet connection","A misspelled file name only"],a:0}
  ],
  functions: [
    {q:"What is a function call?",o:["Running a function by using its name","Writing a comment","Deleting a variable","Closing the editor"],a:0},
    {q:"What is the scope of a variable?",o:["The part of the program where it can be used","Its colour in the editor","Its file size","The speed of the computer"],a:0},
    {q:"What is an argument?",o:["The actual value passed to a function when calling it","A fight between programmers","The name of a language","A type of loop"],a:0},
    {q:"What is a common way to add an item to a list?",o:["Use the list's append/add operation","Rename the list","Restart the computer","Delete the index"],a:0},
    {q:"What is recursion?",o:["A function calling itself","A loop with no condition","A variable with two names","A file with no extension"],a:0}
  ],
 structures: [
    {q:"What is a method in OOP?",o:["A function that belongs to a class or object","A type of monitor","A comment style","A network protocol"],a:0},
    {q:"What is an attribute (property) of an object?",o:["A piece of data stored in the object","A kind of loop","A compiler setting","A keyboard shortcut"],a:0},
    {q:"What is polymorphism?",o:["Different objects responding to the same call in their own way","Turning text into numbers","Sorting a list","Installing two languages"],a:0},
    {q:"What is a stack typically known for?",o:["Last in, first out (LIFO) order","First in, first out order only","Random order only","No order and no data"],a:0},
    {q:"What is a queue typically known for?",o:["First in, first out (FIFO) order","Last in, first out order only","Only storing numbers","Only storing text"],a:0}
  ],
project: [
    {q:"What is a commit in Git?",o:["A saved snapshot of your changes","A deleted project","A type of loop","A programming language"],a:0},
    {q:"Why handle invalid user input in a project?",o:["So the program does not crash on unexpected input","So the program becomes slower","So users cannot use it","So the code becomes shorter"],a:0},
    {q:"What is refactoring?",o:["Improving code structure without changing what it does","Adding bugs on purpose","Deleting the whole project","Changing the programming language"],a:0},
    {q:"What is a good reason to share a project on GitHub?",o:["To show your work and get feedback","To hide it from everyone","To stop it from running","To avoid learning"],a:0},
    {q:"What is the benefit of planning features before coding?",o:["You build in a clear order and avoid wasted effort","You never need to test","You can skip the idea","Code writes itself"],a:0}
  ]
};
Object.keys(EXTRA_QUESTIONS).forEach((k) => QUIZ_BANKS[k].push(...EXTRA_QUESTIONS[k]));

const QUESTIONS_PER_TEST = 10;
const RETRY_COOLDOWN_MIN = [2, 10, 60]; // wait after 1st, 2nd, 3rd+ unsuccessful attempt

// Random shuffle (Fisher-Yates) so no two attempts look the same.
function shuffled(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Answers are kept in memory only, never written into the page HTML.
let activeQuiz = null;

function attemptKey(key, index) { return `${key}:${index}`; }
function lockRemaining(key, index) {
  const entry = state.attempts[attemptKey(key, index)];
  return entry && entry.lockUntil ? Math.max(0, entry.lockUntil - Date.now()) : 0;
}
function cooldownMs(count) {
  return RETRY_COOLDOWN_MIN[Math.min(count, RETRY_COOLDOWN_MIN.length) - 1] * 60000;
}
function formatWait(ms) {
  const mins = Math.ceil(ms / 60000);
  return mins >= 60 ? `${Math.ceil(mins / 60)} hour(s)` : `${mins} minute${mins === 1 ? "" : "s"}`;
}

function normalizeEmail(email) { return String(email || "").trim().toLowerCase(); }

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object") {
      state.accounts = saved.accounts && typeof saved.accounts === "object" ? saved.accounts : {};
      state.theme = saved.theme === "dark" ? "dark" : "light";
      const activeEmail = normalizeEmail(saved.activeEmail);
      if (activeEmail && state.accounts[activeEmail]) activateAccount(activeEmail, false);
    } else {
      const old = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem("skillpath") || "null");
      if (old && old.user && old.user.email) {
        const email = normalizeEmail(old.user.email);
        state.accounts[email] = { user: old.user, done: old.done || {}, quizPassed: {}, lastCompletedCourse: old.lastCompletedCourse || null };
activateAccount(email, false);
      }
    }
  } catch (error) {
    console.warn("Could not read saved SkillPath profiles.", error);
  }
  applyTheme();
}

function activateAccount(email, persist = true) {
  const account = state.accounts[email];
  if (!account) return;
  state.user = account.user;
  state.done = account.done || {};
  state.quizPassed = account.quizPassed || {};
  state.attempts = account.attempts || {};
  state.lastCompletedCourse = account.lastCompletedCourse || null;
  if (persist) saveState();
}
function syncAccount() {
  if (!state.user) return;
  const email = normalizeEmail(state.user.email);
  state.accounts[email] = {
    user: state.user,
    done: state.done,
    quizPassed: state.quizPassed,
    attempts: state.attempts,
    lastCompletedCourse: state.lastCompletedCourse
  };
}
function saveState() {
  try {
    syncAccount();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      accounts: state.accounts,
      activeEmail: state.user ? normalizeEmail(state.user.email) : null,
      theme: state.theme
    }));
  } catch (error) {
    showToast("Progress could not be saved in this browser.");
  }
}
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $("themeIcon").textContent = state.theme === "dark" ? "☀" : "☾";
  $("themeToggle").setAttribute("aria-label", state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

function showView(name) {
  document.querySelectorAll(".view").forEach((view) => {
    const active = view.id === `view-${name}`;
    view.classList.toggle("active", active);
    view.setAttribute("aria-hidden", String(!active));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showToast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 2800);
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
function completedIndexes(key) {
  const values = Array.isArray(state.done[key]) ? state.done[key] : [];
  return [...new Set(values.filter((n) =>
    Number.isInteger(n) && n >= 0 && n < COURSES[key].steps.length
  ))].sort((a, b) => a - b);
}

function passedIndexes(key) {
  const values = Array.isArray(state.quizPassed[key]) ? state.quizPassed[key] : [];
  return [...new Set(values.filter((n) =>
    Number.isInteger(n) && n >= 0 && n < COURSES[key].steps.length
  ))].sort((a, b) => a - b);
}
function progress(key) {
  const total = COURSES[key].steps.length;
  const completed = completedIndexes(key).length;
  return {
    done: completed,
    total,
    percent: Math.round((completed / total) * 100)
  };
}

function totalProgress() {
  const keys = Object.keys(COURSES);
  const total = keys.reduce((sum, key) =>
    sum + COURSES[key].steps.length, 0
  );
  const done = keys.reduce((sum, key) =>
    sum + progress(key).done, 0
  );
  return {
    done,
    total,
    percent: Math.round((done / total) * 100)
  };
}
function setSignedInUI() {
  const signedIn = Boolean(state.user);
  $("userChip").classList.toggle("hidden", !signedIn);
  $("logoutBtn").classList.toggle("hidden", !signedIn);
  $("headerName").textContent = signedIn
    ? state.user.name.split(/\s+/)[0]
    : "Learner";
  $("avatarInitial").textContent = signedIn
    ? state.user.name.trim().charAt(0).toUpperCase()
    : "A";
}

function renderCourses() {
  const query = $("courseSearch").value.trim().toLowerCase();
  const grid = $("courseGrid");

  const cards = Object.entries(COURSES).filter(([key, course]) =>
    [course.name, course.category, course.description]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );
grid.innerHTML = cards.map(([key, course]) => {
    const p = progress(key);
    const icons = { python: "Py", cpp: "C++", java: "J" };

    return `<article class="course-card ${course.tint}" data-course="${key}" tabindex="0" role="button" aria-label="Open ${safeText(course.name)} learning path">
      <div class="course-card-top">
        <span class="course-icon">${icons[key]}</span>
        <span class="course-level">${course.level}</span>
      </div>
      <div class="course-category">${safeText(course.category)}</div>
      <h3>${safeText(course.name)} programming</h3>
      <p>${safeText(course.description)}</p>
      <div class="course-card-bottom">
 <span>◷ ${course.duration}</span>
        <span>${p.done}/${p.total} done</span>
      </div>
      <div class="progress-track">
        <i style="width:${p.percent}%"></i>
      </div>
      <div class="course-card-action">
        <span>${p.done ? "Continue learning" : "Explore roadmap"}</span>
        <span class="arrow">↗</span>
      </div>
    </article>`;
  }).join("");
$("emptyCourses").classList.toggle("hidden", cards.length > 0);

  grid.querySelectorAll("[data-course]").forEach((card) => {
    const open = () => openRoadmap(card.dataset.course);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function renderStats() {
  const total = totalProgress();
  $("statPaths").textContent = Object.keys(COURSES).length;
  $("statDone").textContent = total.done;
  $("statProgress").textContent = `${total.percent}%`;
  $("overallBar").style.width = `${total.percent}%`;
}

function renderDashboard() {
  if (!state.user) return showView("login");

  setSignedInUI();
const firstName = state.user.name.trim().split(/\s+/)[0];
  $("welcomeText").textContent =
    `Welcome back, ${firstName}. Choose a skill, follow a roadmap, and build momentum one milestone at a time.`;

  renderStats();
  renderCourses();
  showView("welcome");
}

function openRoadmap(key) {
  if (!COURSES[key] || !state.user) return;

  state.currentCourse = key;
const course = COURSES[key];
  const p = progress(key);
  const done = completedIndexes(key);
  const passed = passedIndexes(key);

  $("breadcrumbCourse").textContent = course.name;
  $("roadmapTag").textContent =
    `${course.category.toUpperCase()} · LEARNING PATH`;
  $("roadmapTitle").textContent = `${course.name} roadmap`;
  $("roadmapDescription").textContent = course.longDescription;

  $("roadmapPercent").textContent = `${p.percent}%`;
  $("roadmapBar").style.width = `${p.percent}%`;
  $("roadmapProgressText").textContent =
    `${p.done} of ${p.total} milestones completed`;
  $("stepCount").textContent = `${p.done} / ${p.total} complete`;

  $("milestoneList").innerHTML = course.steps.map((step, index) => {
    const isDone = done.includes(index);
    const unlocked = index === 0 || done.includes(index - 1);
    const locked = !isDone && !unlocked;
    const hasPassed = passed.includes(index);
 const status = isDone
      ? "Completed"
      : locked
        ? "Locked"
        : hasPassed
          ? "Test passed"
          : "Ready to start";

    const icon = isDone
      ? "✓"
      : locked
        ? "⌑"
        : String(index + 1).padStart(2, "0");

    const search = encodeURIComponent(step[2]);

    const action = isDone
? `<span class="completed-note">✓ Milestone completed · Test ${hasPassed ? "passed" : "recorded"}</span>
         <button class="button button-quiet undo-button" data-undo="${index}" type="button">Undo</button>`
      : locked
        ? `<span class="locked-note">Pass the previous topic test with at least 7/10 to unlock this topic.</span>`
        : `<span class="practice-tip"><b>Try it:</b> ${safeText(step[3])}</span>
           ${(!hasPassed && lockRemaining(key, index) > 0)
             ? `<button class="button button-small button-secondary" type="button" disabled>Retry in ${formatWait(lockRemaining(key, index))}</button>`
             : `<button class="button button-small ${hasPassed ? "button-secondary" : "button-primary"}" data-test="${index}" type="button">${hasPassed ? "Retake topic test" : "Take 10-question test"} ${hasPassed ? "↻" : "→"}</button>`}
           ${hasPassed ? `<button class="button button-small button-primary" data-complete="${index}" type="button">Mark complete ✓</button>` : ""}`;
return `<article class="milestone ${isDone ? "is-done" : ""} ${locked ? "is-locked" : ""}">
      <div class="milestone-index">${icon}</div>
      <div class="milestone-body">
        <div class="milestone-title-row">
          <div>
            <span class="milestone-number">MILESTONE ${String(index + 1).padStart(2, "0")}</span>
            <h3>${safeText(step[0])}</h3>
          </div>
          <span class="status-pill ${isDone ? "status-done" : locked ? "status-locked" : hasPassed ? "status-done" : "status-ready"}">${status}</span>
        </div>
<p>${safeText(step[1])}</p>
        <div class="resource-links">
          <a href="https://www.youtube.com/results?search_query=${search}" target="_blank" rel="noopener noreferrer">▶ Video lessons <span>↗</span></a>
          <a href="https://www.google.com/search?q=${encodeURIComponent(course.name + " " + step[0] + " official documentation tutorial")}" target="_blank" rel="noopener noreferrer">↗ Reading & docs</a>
        </div>
        <div class="milestone-footer">${action}</div>
      </div>
    </article>`;
  }).join("");

  $("milestoneList").querySelectorAll("[data-test]").forEach((button) =>
    button.addEventListener("click", () =>
      startQuiz(key, Number(button.dataset.test))
    )
  );

  $("milestoneList").querySelectorAll("[data-complete]").forEach((button) =>
    button.addEventListener("click", () =>
      completeMilestone(key, Number(button.dataset.complete))
    )
  );
$("milestoneList").querySelectorAll("[data-undo]").forEach((button) =>
    button.addEventListener("click", () =>
      undoMilestone(key, Number(button.dataset.undo))
    )
  );

  showView("roadmap");
}

function startQuiz(key, index) {
  const done = completedIndexes(key);
  const unlocked = index === 0 || done.includes(index - 1);

  if (!unlocked) {
    showToast("Complete the previous milestone first.");
    return;
  }

  state.currentCourse = key;
  state.currentStep = index;

  const alreadyPassed = passedIndexes(key).includes(index);
  const wait = lockRemaining(key, index);
  if (wait > 0 && !alreadyPassed) {
    showToast(`Next attempt available in ${formatWait(wait)}. Use the time to review the topic.`);
    openRoadmap(key);
    return;
  }

  // Starting a test counts as an attempt, so quitting to peek at the questions is not free.
  if (!alreadyPassed) {
    const id = attemptKey(key, index);
    const count = ((state.attempts[id] && state.attempts[id].count) || 0) + 1;
    state.attempts[id] = { count, lockUntil: Date.now() + cooldownMs(count) };
    saveState();
  }
 const course = COURSES[key];
  const step = course.steps[index];
  const pool = QUIZ_BANKS[quizBankForStep(index)];

  // Random questions in random order, with randomly ordered options.
  activeQuiz = shuffled(pool).slice(0, QUESTIONS_PER_TEST).map((item) => {
    const order = shuffled(item.o.map((text, i) => ({ text, right: i === item.a })));
    return { q: item.q, options: order.map((x) => x.text), correct: order.findIndex((x) => x.right) };
  });
  const bank = activeQuiz;

  $("quizBreadcrumb").textContent = `${course.name} · ${step[0]}`;
  $("quizTitle").textContent = `${step[0]} test`;
  $("quizDescription").textContent =
    `${course.name} · 10 questions · 1 point each. Score at least 7/10 to pass and unlock the next topic.`;

  $("quizQuestions").innerHTML = bank.map((item, qIndex) => {
    const options = item.options;

    return `<fieldset class="quiz-question">
      <legend><span>Q${qIndex + 1}.</span> ${safeText(item.q)}</legend>
      <div class="quiz-options">
        ${options.map((option, optIndex) =>
          `<label class="quiz-option">
            <input type="radio" name="q${qIndex}" value="${optIndex}" required>
            <span>${safeText(option)}</span>
          </label>`
        ).join("")}
      </div>
    </fieldset>`;
  }).join("");
$("quizError").textContent = "";
  $("quizResult").classList.add("hidden");
  $("quizForm").classList.remove("hidden");

  showView("quiz");
}

function submitQuiz(event) {
  event.preventDefault();

  const key = state.currentCourse;
  const index = state.currentStep;
  const bank = activeQuiz;

  if (!key || index === null || !bank) return;

  const answers = bank.map((_, qIndex) => {
    const selected = document.querySelector(
      `input[name="q${qIndex}"]:checked`
    );
    return selected ? Number(selected.value) : null;
  });

  if (answers.some((answer) => answer === null)) {
    $("quizError").textContent =
      "Please answer all 10 questions before submitting.";
    return;
  }

  const score = answers.reduce((total, answer, qIndex) => {
    const correct = bank[qIndex].correct;
    return total + (answer === correct ? 1 : 0);
  }, 0);
 const passed = score >= 7;

  if (passed) {
    const values = passedIndexes(key);
    if (!values.includes(index)) values.push(index);
    state.quizPassed[key] = values.sort((a, b) => a - b);
    delete state.attempts[attemptKey(key, index)];
  } else {
    const entry = state.attempts[attemptKey(key, index)];
    if (entry) entry.lockUntil = Date.now() + cooldownMs(entry.count);
  }
  activeQuiz = null;

  saveState();

  $("quizForm").classList.add("hidden");
  $("quizResult").classList.remove("hidden");

  $("quizResult").innerHTML = passed
    ? `<div class="quiz-result-icon">✓</div>
       <h2>You passed!</h2>
       <p>Your score: <strong>${score}/10</strong>. You can now mark this milestone complete. Complete it to unlock the next topic.</p>
       <button class="button button-primary" id="quizContinueBtn" type="button">Return to roadmap</button>`
    : `<div class="quiz-result-icon fail">↻</div>
       <h2>Not quite — try again</h2>
       <p>Your score: <strong>${score}/10</strong>. You need at least 7/10 to pass. Review the topic, then try again in ${formatWait(lockRemaining(key, index))}. Your next test will have different questions in a different order.</p>
       <button class="button button-secondary" id="quizRoadmapBtn" type="button">Back to roadmap</button>`;

  const cont = $("quizContinueBtn");
  if (cont) cont.addEventListener("click", () => openRoadmap(key));

  const retry = $("quizRetryBtn");
  if (retry) retry.addEventListener("click", () => startQuiz(key, index));

  const back = $("quizRoadmapBtn");
if (back) back.addEventListener("click", () => openRoadmap(key));
}
function completeMilestone(key,index) {
  const course=COURSES[key]; if(!course)return;
  const done=completedIndexes(key), passed=passedIndexes(key);
  if(index>0&&!done.includes(index-1)){showToast("Complete the previous milestone first.");return;}
  if(!passed.includes(index)){showToast("Pass the topic test with at least 7/10 first.");return;}
  if(!done.includes(index)) done.push(index); state.done[key]=done.sort((a,b)=>a-b); saveState();
  const p=progress(key); if(p.done===p.total){state.lastCompletedCourse=key;saveState();renderCompletion(key);}else{openRoadmap(key);showToast("Milestone complete! The next topic is unlocked.");}
}
function undoMilestone(key,index) {
  state.done[key]=completedIndexes(key).filter(n=>n<index);
  state.quizPassed[key]=passedIndexes(key).filter(n=>n<index);
  saveState();openRoadmap(key);showToast("This milestone and later progress were reset.");
}
function renderCompletion(key) {
  const course=COURSES[key]; $("completedCourseName").textContent=course.name; $("completedUserName").textContent=state.user.name;
  $("completionMessage").textContent=`You've completed all six milestones in the ${course.name} learning path, including the topic tests. Take a moment to celebrate, then choose a practical next step.`;
  $("nextSteps").innerHTML=course.next.map((item,index)=>`<div class="next-step"><span>0${index+1}</span><p>${safeText(item)}</p></div>`).join(""); showView("completion");
}
function renderCertificate(key) {
  const course=COURSES[key]; if(!course||progress(key).done!==progress(key).total){showToast("Complete all milestones to view this certificate.");return;}
  $("certificateName").textContent=state.user.name; $("certificateCourse").textContent=`${course.name} Programming Roadmap`;
  $("certificateDate").textContent=`Completed on ${new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}`; showView("certificate");
}
function setAuthMode(mode) {
  state.authMode=mode; const register=mode==="register";
  $("authTitle").textContent=register?"Create your account":"Welcome back";
  $("authDescription").textContent=register?"Create a profile to save your own roadmap and test scores.":"Sign in with the email you used to create your local demo profile.";
  $("nameField").classList.toggle("hidden",!register); $("nameInput").required=register;
  $("authSubmitBtn").innerHTML=register?"Create account <span aria-hidden=\"true\">↗</span>":"Sign in <span aria-hidden=\"true\">↗</span>";
  $("registerModeBtn").classList.toggle("active",register); $("loginModeBtn").classList.toggle("active",!register); $("loginError").textContent="";
}
function logout() {
state.user=null;state.done={};state.quizPassed={};state.attempts={};state.lastCompletedCourse=null;state.currentCourse=null;state.currentStep=null;saveState();
  $("passwordInput").value="";$("loginError").textContent="";setSignedInUI();setAuthMode("login");showView("login");
}
function bindEvents() {
  $("loginForm").addEventListener("submit",event=>{
    event.preventDefault();const name=$("nameInput").value.trim(),email=normalizeEmail($("emailInput").value),password=$("passwordInput").value;
    const emailValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),register=state.authMode==="register";
    if(register&&name.length<2){$("loginError").textContent="Please enter a name with at least 2 characters.";$("nameInput").focus();return;}
    if(!emailValid){$("loginError").textContent="Please enter a valid email address.";$("emailInput").focus();return;}
    if(password.length<3){$("loginError").textContent="Enter at least 3 characters to continue in this demo.";$("passwordInput").focus();return;}
    if(register){if(state.accounts[email]){$("loginError").textContent="An account profile with this email already exists. Choose Sign in.";return;}
state.accounts[email]={user:{name,email},done:{},quizPassed:{},lastCompletedCourse:null};activateAccount(email,false);saveState();showToast("Demo profile created.");
    }else{if(!state.accounts[email]){$("loginError").textContent="No profile found for this email in this browser. Choose Create account first.";return;}activateAccount(email,false);saveState();}
    $("loginError").textContent="";$("passwordInput").value="";renderDashboard();
  });
  $("registerModeBtn").addEventListener("click",()=>setAuthMode("register"));$("loginModeBtn").addEventListener("click",()=>setAuthMode("login"));
  $("themeToggle").addEventListener("click",()=>{state.theme=state.theme==="dark"?"light":"dark";applyTheme();saveState();});
  $("logoutBtn").addEventListener("click",logout);
  $("brandHome").addEventListener("click",event=>{event.preventDefault();state.user?renderDashboard():showView("login");});
  $("browseCoursesBtn").addEventListener("click",()=>$ ("courseSection").scrollIntoView({behavior:"smooth",block:"start"}));
  $("courseSearch").addEventListener("input",renderCourses);



