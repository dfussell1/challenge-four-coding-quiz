const startBtn = document.getElementById('start-btn');
const scoresBtn = document.getElementById('scores-btn');
const answerBtns = document.getElementById('answer-btns');
const saveBtn = document.getElementById('save-btn');
const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
const gameOver = document.getElementById('game-over');

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
    clearInterval(timerInterval);
    currentQuestionIndex = 0;

answerBtns.classList.remove('hide');
    timer = 60;
    startTimer();
    NextQuestion(); 
}

function startTimer() {
    if(timerInterval)
clearInterval(timerInterval);

    timerInterval = setInterval(function() {
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
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    answerBtns.classList.add('hide');
    questionsEl.classList.add('hide');
    gameOver.classList.remove('hide');
}

function saveScore() {
    const initials = document.getElementById('initials').value;
    const score = { initials: initials, score: timer }; 

    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);

    localStorage.setItem('scores', JSON.stringify(scores));
    displayScores();
}

function displayScores() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';

    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.score - a.score); 

    scores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.initials}: ${score.score}`;
        scoresList.appendChild(listItem);

        document.getElementById('start-btn').classList.add('hide');
        document.getElementById('game-over').classList.add('hide');
        document.getElementById('leaderboard').classList.remove('hide');
    });
}

saveBtn.addEventListener('click', saveScore);
scoresBtn.addEventListener('click', displayScores);