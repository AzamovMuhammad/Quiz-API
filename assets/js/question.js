let currentQuestionIndex = 0;
let questions = [];
let correctAnswersCount = 0;
let wrongAnswersCount = 0;

const userId = new URLSearchParams(document.location.search).get("userId");
const categoryId = new URLSearchParams(document.location.search).get("category") || sessionStorage.getItem("userId");
const qCount = JSON.parse(sessionStorage.getItem("qCount")) || 10;
const mode = JSON.parse(sessionStorage.getItem("mode")) || "easy";
let apiUrl = categoryId == 8
    ? `https://opentdb.com/api.php?amount=${qCount}&difficulty=${mode}&type=multiple`
    : `https://opentdb.com/api.php?amount=${qCount}&category=${categoryId}&difficulty=${mode}&type=multiple`;

axios.get(apiUrl)
    .then((response) => {
        if (response.data.response_code !== 0 || response.data.results.length === 0) {
            document.getElementById("question-container").innerHTML =
                `<div class="error-message">Savollarni olishda xato yuz berdi. Iltimos, qayta urinib ko'ring.</div>`;
            return;
        }
        questions = response.data.results;
        if (questions.length > 0) {
            loadQuestion(questions[currentQuestionIndex]);
        }
    })
    .catch((error) => {
        document.getElementById("question-container").innerHTML =
            `<div class="error-message">Savollarni olishda xato yuz berdi: ${error.message}</div>`;
    });

function loadQuestion(questionData) {
    document.getElementById("question-text").innerHTML = questionData.question;
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);
    allAnswers.forEach((answer) => {
        const answerOption = document.createElement("div");
        answerOption.classList.add("answer-option");
        answerOption.dataset.correct = answer === questionData.correct_answer;
        const span = document.createElement("span");
        span.textContent = answer;
        answerOption.appendChild(span);
        answerOption.addEventListener("click", () => handleAnswer(answerOption, questionData));
        answersContainer.appendChild(answerOption);
    });
    startTimer(15, questionData);
}

function startTimer(duration, questionData) {
    let timerBar = document.getElementById("timer-bar");
    timerBar.style.transition = "none";
    timerBar.style.width = "100%";
    setTimeout(() => {
        timerBar.style.transition = `width ${duration}s linear`;
        timerBar.style.width = "0%";
    }, 100);
    setTimeout(() => {
        showCorrectAnswer();
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(questions[currentQuestionIndex]);
            } else {
                showFinalResult();
            }
        }, 1000);
    }, duration * 1000);
}

function handleAnswer(answerOption, questionData) {
    document.querySelectorAll(".answer-option").forEach(option => {
        option.classList.add(option.dataset.correct === "true" ? "correct" : "wrong");
        option.style.pointerEvents = "none";
    });
    if (answerOption.dataset.correct === "true") correctAnswersCount++;
    else wrongAnswersCount++;
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(questions[currentQuestionIndex]);
        } else {
            showFinalResult();
        }
    }, 1000);
}

function showCorrectAnswer() {
    document.querySelectorAll(".answer-option").forEach(option => {
        if (option.dataset.correct === "true") {
            option.classList.add("correct");
        } else {
            option.classList.add("wrong");
        }
        option.style.pointerEvents = "none";
    });
}

function showFinalResult() {
    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("question-container").innerHTML = `
        <div class="resultF">
            <div class="result-message">
                Viktorina yakunlandi! <br>To'g'ri javoblar: ${correctAnswersCount} <br>Notog'ri javoblar: ${wrongAnswersCount} 
            </div>
            <div class="button-container">
                <button class="button" onclick="redirectToOtherPage()">Boshqa sahifaga o'tish</button>
            </div>
        </div>`;
}

function redirectToOtherPage() {
    sessionStorage.setItem("userId", userId);
    window.location.href = `category.html?userId=${userId}`;
}