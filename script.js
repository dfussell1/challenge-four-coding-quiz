const startBtn = document.getElementById('start-btn');
const scoresBtn = document.getElementById('scores-btn');
const answerBtns = document.getElementById('answer-btns');
const questionsEl = document.getElementById('questions');
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
        correct: "<script>"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            "myFunction()",
            "const = myFunction()",
            "function myFunction()",
            "function = myFunction()",
        ],
        correct: "function myFunction()"
    },
    {
        question: "How do you call a function in JavaScript?", 
        answers: [
            "const = myFunction()",
            "myFunction()",
            "function myFunction()",
            "call function myFunction()",
        ],
        correct: "myFunction()"
    },
    {
        question: "What are some commonly used data types in JavaScript?",
        answers: [
            "booleans",
            "strings",
            "objects",
            "all of the above",
        ],
        correct: "all of the above"
    },
    {
        question: "What is the proper way to grab an HTML element by its ID?",
        answers: [
            "document.getElementById()",
            "document.getElementByClass()",
            "document.getElementByTag()",
            "None of the above",
        ],
        correct: "document.getElementById()"
    },
];

let currentQuestionIndex, timer, timerInterval; 

startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.classList.add('hide');
    currentQuestionIndex = 0;

answerBtns.classList.remove('hide');
    timer = 60;
    startTimer();
    NextQuestion(); 
}

function startTimer() {
    const timerInterval = setInterval(function() {
        timer--;
        timerEl.textContent = timer

        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function NextQuestion() {
    showQuestion(questionsArr[currentQuestionIndex]);
}

function showQuestion(question) {
    questionsEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', chooseAnswer);

        answerBtns.appendChild(button);
    });
}

function chooseAnswer(e) {
    const selectedAnswer = e.target.textContent; 
    if (questionsArr[currentQuestionIndex].correct !== selectedAnswer) {
        timer -=10;
    }
    answerBtns.innerHTML = '';
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsArr.length) {
        NextQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
        answerBtns.classList.add('hide');
    questionsEl.classList.add('hide');
}