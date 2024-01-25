const startBtn = document.getElementById('start-btn');
const scoresBtn = document.getElementById('scores-btn');
const questionsEl = document.getElementById('question');
const timerEl = document.getElementById('time');

const questionsArr = [
    {
        question: "Which HTML tag do you use to reference a JavaScript file?",
        answers: [
            "<script>",
            "<div>",
            "<js>",
            "<link>",
        ],
        correct: "answer1"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            "myFunction()",
            "const myFunction()",
            "function myFunction()",
            "function = myFunction()",
        ],
        correct: "answer3"
    },
    {
        question: "How do you call a function in JavaScript?", 
        answers: [
            "const = myFunction()",
            "myFunction()",
            "function myFunction()",
            "call function myFunction()",
        ],
        correct: "answer2"
    },
    {
        question: "What are some commonly used data types in JavaScript?",
        answers: [
            "booleans",
            "strings",
            "objects",
            "all of the above",
        ],
        correct: "answer4"
    },
    {
        question: "What is the proper way to grab an HTML element by its ID?",
        answers: [
            "document.getElementById()",
            "document.getElementByClass()",
            "document.getElementByTag()",
            "None of the above",
        ],
        correct: "answer1"
    },
]