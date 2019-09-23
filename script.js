/**
 *                         Rules for Quiz Game
 *
 *
 *   User will get Question with all options(answers)
 *
 *   User will be able to chose answer
 *
 *   check if the answer was right or wrong
 *
 *   After choose the answer  display next question until the end of the         questions
 *
 *   Show score to the user how much they scored
 *
 *   User will be able to restart the game again
 *
 */


//Get Ui Variables
const quiz = document.querySelector('#quiz');
const startBtn = document.querySelector('#start');
const questionInput = document.querySelector('#question');
const answerValue = document.getElementsByClassName('answer');
const submitBtn = document.querySelector('#check');
const message = document.querySelector('#message');
const choices = document.querySelector('#choices');
const score = document.getElementById('score');



//set variables

let startQuestion = 0; // start question at 0
let currentQuestion; // store cuurent question init
let keepScore = 0; // keep score
// Make constructor function for create multiple question

let Question = function (question, answer, correct) {
    this.question = question;
    this.answer = answer;
    this.correct = correct;
}

Question.prototype.showQuestion = function () {

    quiz.style.display = 'flex';

    questionInput.textContent = this.question;

    let option = ``;
    this.answer.forEach((ans, i) => {
        option += ` <div class="choicesInput">
        <input type="radio" class="answer" name="name" value="${ans}"> <label>${ans}</label>
    </div>`;
    });

    choices.innerHTML = option;


}

Question.prototype.checkAnswer = function (value) {

    if (this.correct === value) {

        answerIsRight(); // Show  right answer Message
        keepScore += 1;

        if (isStillQuestion()) {
            nextQuestion();
        } else {
            startQuestion = 0;

            currentQuestion = startQuestion;
            gameover();

        }
    } else {
        answerIsWrong(); // Show wrong answer Message

        if (isStillQuestion()) {
            nextQuestion(); // next question
        } else {
            startQuestion = 0;

            currentQuestion = startQuestion;
            gameover()

        }
    }

    if (keepScore <= (questions.length)) {
        newScore = keepScore;
        score.style.display = 'block';
        score.textContent = `Your CurrentScore is : ${newScore}`;

    } else {
        gameover();

    }

}


function isStillQuestion() {
    return questions.length - 1 >= startQuestion;
}

function answerIsRight() {
    setMessge(`Correct answer`, 'green')
}

function answerIsWrong() {
    setMessge(`Wrong answer`, 'red');
}

function nextQuestion() {

    currentQuestion = startQuestion;
    questions[startQuestion].showQuestion();
    startQuestion++;
}

function setMessge(msg, color) {
    message.style.display = 'block';
    message.style.color = color;
    message.textContent = msg;

    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function gameover() {
    quiz.style.display = 'none';
    message.style.display = 'none';
    startBtn.style.display = 'block';
    startBtn.textContent = 'Restart Game';
    restart();
}


function restart() {
    startBtn.classList.add('restart');
    let restart = document.querySelector('.restart');
    restart.addEventListener('click', function () {
        document.location.reload();
    });
}


// Create some question and store them in array

let questions = [new Question('What is your Name?', ['Ajay', 'Vijay'], 'Ajay'),
    new Question('Where are your From?', ['Pakistan', 'India', 'USA', 'Japan'], 'India'), new Question('What do you do?', ['Web Design', 'Study', 'Something Else'], 'Web Design')
];



start.addEventListener('click', function () {

    // hide startbtn
    startBtn.style.display = 'none';

    currentQuestion = startQuestion;
    questions[startQuestion].showQuestion(); // show question

    startQuestion++;
});

submitBtn.addEventListener('click', function () {
    let answer;
    for (i = 0; i < answerValue.length; i++) {
        if (answerValue[i].checked)
            answer = answerValue[i].value;
    }


    questions[currentQuestion].checkAnswer(answer);


})