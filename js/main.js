const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const timerTime = document.getElementById('timerTime');
const timer = document.getElementById('timer');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = [];

let questions = [
    {
        question: "Who is in charge of the executive branch?",
        choice1: "The President.",
        choice2: "The Chief Justice.",
        choice3: "The Speaker of the House.",
        choice4: "The Prime Minister.",
        answer: 1
   
    },
    {
        question: "What is the name of the National Anthem?",
        choice1: "The Start-Spangled Banner.",
        choice2: "My country Tis of thee.",
        choice3: "America the Beautiful.",
        choice4: "God Bless the U.S.A.",
        answer: 1
   
    },
    {
        question: "When was the Declaration of Independence adopted?",
        choice1: "March 4, 1789.",
        choice2: "December 7, 1787.",
        choice3: "July 4, 1776.",
        choice4: "July 4, 1789.",
        answer: 3
   
    },
    {
        question: "Who is the Father of Our Country?",
        choice1: "Abraham Lincoln.",
        choice2: "Partick Henry.",
        choice3: "Thomas Jefferson.",
        choice4: "George Washington.",
        answer: 4
   
    },
    {
        question: "Name one problem that led to the Civil War?",
        choice1: "Westward expansion.",
        choice2: "Slavery.",
        choice3: "Oil.",
        choice4: "Money.",
        answer: 2
   
    },
    {
        question: "Name one American Indian tribe in the United States?",
        choice1: "Cherokee.",
        choice2: "Celts.",
        choice3: "Zawi Chemi.",
        choice4: "Slavs.",
        answer: 1
   
    },
    {
        question: "What is one thing Benjamin Franklin is famous for?",
        choice1: "Third President of the United States.",
        choice2: "Inventor of the Phone.",
        choice3: "U.S diplomat.",
        choice4: "Youngest memeber of the Constitution.",
        answer: 3
   
    },
    {
        question: "What do we call the first ten amendments to the Constitution ?",
        choice1: "The Articles of Confedation.",
        choice2: "The Declaration of Independence.",
        choice3: "The Inalieanble Rights.",
        choice4: "The Bill of Rights.",
        answer: 4
   
    },
    {
        question: "What are Two rights in the Declaration of Independence ?",
        choice1: "Life and Death.",
        choice2: "Life and pursuit of happiness.",
        choice3: "Life and right to own a home.",
        choice4: "Liberty and justice.",
        answer: 2
   
    },
    {
        question: "What stops one branche of government from becoming too powrful ?",
        choice1: "The people.",
        choice2: "The President.",
        choice3: "freedom of speech.",
        choice4: "Checks and balances.",
        answer: 4
   
    },
    
]

// Contenents 
const CORRECT_ANSWER = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avialableQestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(avialableQestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // assign to the End Page
        return window.location.assign('./finish.html');
    }
    
    questionCounter++;
    questionCounterText.innerText = questionCounter+"/"+MAX_QUESTIONS
    const questionIndex = Math.floor(Math.random() * avialableQestions.length);
    currentQuestion = avialableQestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    avialableQestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};
 
// if the choice was correct or not correct
choices.forEach(choice => {
    choice.addEventListener("click", e => {
       if(!acceptingAnswer) return;
       acceptingAnswer = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset["number"];

       const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

       if (classToApply === "correct") {
        incrementScore(CORRECT_ANSWER);
       }
       
       selectedChoice.parentElement.classList.add(classToApply);
       

       setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();

       }, 1000);
   
    });
});

// Timer of 150 second
var sec = 150;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec;
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}


startGame();

