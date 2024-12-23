let currentQuestionIndex = 0;
let questions = [];
let correctAnswersCount = 0;
let wrongAnswersCount = 0;

const playersApiUrl = "https://676905edcbf3d7cefd394c2a.mockapi.io/quizusers"; // Foydalanuvchilar API
const userId = new URLSearchParams(document.location.search).get("category") || sessionStorage.getItem("userId"); // URL dan category parametrini olish yoki sessionStorage'dan olish
console.log(userId); // category'ni tekshirish

const qCount = JSON.parse(sessionStorage.getItem("qCount")) || 10; // Savollar soni
const mode = JSON.parse(sessionStorage.getItem("mode")) || "easy"; // Qiyinchilik darajasi

// API URL ni yaratish
let apiUrl = userId == 8 ? 
  `https://opentdb.com/api.php?amount=${qCount}&difficulty=${mode}&type=multiple` : 
  `https://opentdb.com/api.php?amount=${qCount}&category=${userId}&difficulty=${mode}&type=multiple`;

console.log("API URL:", apiUrl); // API URL'ni konsolda ko'rsatish

// Savollarni olish
axios.get(apiUrl)
  .then((response) => {
    console.log("Savollar:", response.data);

    if (response.data.response_code !== 0 || response.data.results.length === 0) {
      const questionContainer = document.getElementById("question-container");
      questionContainer.innerHTML = `
        <div class="error-message">Savollarni olishda xato yuz berdi. Iltimos, qayta urinib ko'ring.</div>
      `;
      return;
    }

    questions = response.data.results;
    if (questions.length > 0) {
      loadQuestion(questions[currentQuestionIndex]);
    } else {
      console.error("Savollar bo'sh yoki noto'g'ri olingan.");
    }
  })
  .catch((error) => {
    console.error("Savollarni olishda xato:", error);
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
      <div class="error-message">Savollarni olishda xato yuz berdi: ${error.message}</div>
    `;
  });

// Savollarni yuklash
function loadQuestion(questionData) {
  const questionElement = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers");

  questionElement.innerHTML = questionData.question;
  answersContainer.innerHTML = "";

  const allAnswers = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
  ].sort(() => Math.random() - 0.5);

  allAnswers.forEach((answer) => {
    const answerOption = document.createElement("div");
    answerOption.classList.add("answer-option");
    answerOption.dataset.correct = answer === questionData.correct_answer;

    const span = document.createElement("span");
    span.textContent = answer;

    answerOption.appendChild(span);

    answerOption.addEventListener("click", () =>
      handleAnswer(answerOption, questionData)
    );

    answersContainer.appendChild(answerOption);
  });
}

// Javobni tekshirish
function handleAnswer(answerOption, questionData) {
  const isCorrect = answerOption.dataset.correct === "true";
  const answerOptions = document.querySelectorAll(".answer-option");

  answerOptions.forEach((option) => {
    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none"; // Bosilmasligi uchun
  });

  if (isCorrect) {
    correctAnswersCount++;
  } else {
    wrongAnswersCount++;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion(questions[currentQuestionIndex]);
    } else {
      showFinalResult();
    }
  }, 1000);
}

// Yakuniy natijani ko'rsatish
function showFinalResult() {
  const questionContainer = document.getElementById("question-container");
  const quizContainer = document.querySelector(".quiz-container");

  // Quiz ni yashirish
  quizContainer.style.display = "none";

  // Foydalanuvchilarni olish
  fetchPlayers();

  questionContainer.innerHTML = `
    <div class="result-message">
      Viktorina yakunlandi!
      <br>To'g'ri javoblar: ${correctAnswersCount}
      <br>Notog'ri javoblar: ${wrongAnswersCount}
    </div>
    <div class="button-container">
      <button class="button" onclick="redirectToOtherPage()">Boshqa sahifaga o'tish</button>
    </div>
  `;
}

// Foydalanuvchilarni olish
function fetchPlayers() {
  axios.get(playersApiUrl)
    .then((response) => {
      const players = response.data;
      displayPlayers(players);
    })
    .catch((error) => {
      console.error("Foydalanuvchilarni olishda xato:", error);
    });
}

// Foydalanuvchilarni ko'rsatish
function displayPlayers(players) {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = "<h3>Foydalanuvchilar</h3>";

  players.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.classList.add("player");

    playerElement.innerHTML = `
      <img src="${player.userAvatar}" alt="${player.username}" class="player-avatar">
      <span class="player-name">${player.username}</span>
    `;
    playersContainer.appendChild(playerElement);
  });
}

// Boshqa sahifaga o'tish
function redirectToOtherPage() {
  // Foydalanuvchi ID ni sessionStorage'ga saqlash
  sessionStorage.setItem("userId", userId);
  window.location.href = "category.html";
}
