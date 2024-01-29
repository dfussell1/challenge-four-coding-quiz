// grab necessary HTML elements for use
const startBtn = document.getElementById('start-btn');
const scoresBtn = document.getElementById('scores-btn');
const answerBtns = document.getElementById('answer-btns');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const startingText = document.getElementById('start-text');
const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
const gameOver = document.getElementById('game-over');

// array of questions for quiz
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
        question: "How do you start a FOR loop?",
        answers: [
            "for(i<=5, i++)",
            "for(i=0, i<=5, i++)",
            "for(i=0, i<=5)",
            "None of these",
        ],
        correct: "for(i=0, i<=5, i++)"
    },
];

// variables for global use
let currentQuestionIndex, timer, timerInterval; 

// event listener to start the quiz
startBtn.addEventListener('click', startGame);

// hides starting text and button and displays questions with answer buttons 
function startGame() {
    startingText.classList.add('hide');
    startBtn.classList.add('hide');

    // randomizes the questions
    questionsArr.sort(() => Math.random() - 0.5);
    clearInterval(timerInterval);
    currentQuestionIndex = 0;

answerBtns.classList.remove('hide');
    timer = 60;
    startTimer();
    NextQuestion(); 
}

// begins timer, if timer reaches 0 before all questions have been answered, then ends the game 
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

// function to go to the next question
function NextQuestion() {
    showQuestion(questionsArr[currentQuestionIndex]);
}

// displays question on screen along with answer buttons 
function showQuestion(question) {
    questionsEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.addEventListener('click', chooseAnswer);

        answerBtns.appendChild(button);
    });
}

// if the selected answer is NOT the correct answer, then 10 seconds will be deducted 
function chooseAnswer(e) {
    const selectedAnswer = e.target.textContent; 
    if (questionsArr[currentQuestionIndex].correct !== selectedAnswer) {
        timer -=10;
    }
    answerBtns.innerHTML = '';
    currentQuestionIndex++;
    
    // if the current question is not the last in the array, then it will display the next question, else it will end the game once the last question has been answered
    if (currentQuestionIndex < questionsArr.length) {
        NextQuestion();
    } else {
        clearInterval(timerInterval);
        endGame();
    }
}

// ends the game and displays the user's score along with an input box to type in their initials for their score, which is equal to time left
function endGame() {
    clearInterval(timerInterval);
    answerBtns.classList.add('hide');
    questionsEl.classList.add('hide');
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = timer;
    gameOver.classList.remove('hide');
}

// saves the user's score into localStorage with two properties: their initials and their score
function saveScore() {
    const initials = document.getElementById('initials').value;
    const score = { initials: initials, score: timer }; 

    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);

    localStorage.setItem('scores', JSON.stringify(scores));
    displayScores();
}

// displays the leaderboard once the user clicks save or if they click the button at the top 
function displayScores() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';

    // sorts the scores in descending order
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.score - a.score); 

    // creates a list element for each user's scores for the leaderboard
    scores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.initials}: ${score.score}`;
        scoresList.appendChild(listItem);

        document.getElementById('start-text').classList.add('hide');
        document.getElementById('start-btn').classList.add('hide');
        document.getElementById('game-over').classList.add('hide');
        document.getElementById('leaderboard').classList.remove('hide');
    });
}

// clears any scores from local storage and the screen. NOTE: there MUST be a score in the localStorage for the leaderboard to show 
function clearScores() {
    localStorage.removeItem('scores');
    document.getElementById('scores-list').innerHTML = '';
}

// event listeners for buttons
saveBtn.addEventListener('click', saveScore);
scoresBtn.addEventListener('click', displayScores);
clearBtn.addEventListener('click', clearScores);