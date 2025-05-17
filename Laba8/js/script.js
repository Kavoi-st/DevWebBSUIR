
const quizData = new Map([
    ["Столица Франции?", {
        image: "images/paris.jpg",
        options: ["Берлин", "Мадрид", "Париж", "Рим"],
        correct: "Париж"
    }],
    ["Сколько ног у паука?", {
        image: "images/spider.jpg",
        options: ["6", "8", "10", "12"],
        correct: "8"
    }],
    ["Какой цвет получается при смешении синего и жёлтого?", {
        image: "images/green.jpg",
        options: ["Зелёный", "Оранжевый", "Фиолетовый", "Красный"],
        correct: "Зелёный"
    }]
]);

let questions = [...quizData.keys()];
let currentIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let intervalId = null;
let timeoutId = null;
const TIME_LIMIT = 10; 

const questionImage = document.getElementById("questionImage");
const questionText = document.getElementById("questionText");
const optionsForm = document.getElementById("optionsForm");
const timeDisplay = document.getElementById("time");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");
const startBtn = document.getElementById("startBtn");

function showQuestion() {
    if (currentIndex >= questions.length) return finishQuiz();
    const q = questions[currentIndex];
    const data = quizData.get(q);

    questionImage.src = data.image;
    questionText.textContent = q;
    optionsForm.innerHTML = "";
    data.options.forEach(opt => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}<br>`;
        optionsForm.appendChild(label);
    });
    timeDisplay.textContent = TIME_LIMIT;
    startTimer();
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    timeoutId = setTimeout(() => {
        checkAnswer(); 
    }, TIME_LIMIT * 1000);

    intervalId = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) clearInterval(intervalId);
    }, 1000);
}

function checkAnswer() {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    const selected = document.querySelector('input[name="option"]:checked');
    const correct = quizData.get(questions[currentIndex]).correct;
    if (selected && selected.value === correct) {
        result.textContent = "✅ Правильный ответ!";
        correctAnswers++;
    } else {
        result.textContent = "❌ Неправильный ответ.";
        wrongAnswers++;
    }
    currentIndex++;
    setTimeout(() => {
        result.textContent = "";
        showQuestion();
    }, 1000);
}

function finishQuiz() {
    questionImage.style.display = "none";
    questionText.textContent = `Тест завершён. Правильных: ${correctAnswers}, Ошибок: ${wrongAnswers}`;
    optionsForm.innerHTML = "";
    submitBtn.style.display = "none";
    startBtn.style.display = "inline-block";
    showCorrectAnswersLoop();
}

function showCorrectAnswersLoop() {
    let i = 0;
    const keys = [...quizData.keys()];
    intervalId = setInterval(() => {
        const data = quizData.get(keys[i]);
        questionImage.src = data.image;
        questionImage.style.display = "block";
        questionText.textContent = `Правильный ответ: ${data.correct}`;
        i = (i + 1) % keys.length;
    }, 2000); 
}

document.addEventListener("DOMContentLoaded", () => {
    submitBtn.onclick = checkAnswer;
    startBtn.onclick = () => location.reload();
    startBtn.style.display = "none";
    showQuestion(); 
});
