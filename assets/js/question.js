const userId = new URLSearchParams(document.location.search).get("category");
const qCount = JSON.parse(sessionStorage.getItem("qCount")) || 10; // Значение по умолчанию
const mode = JSON.parse(sessionStorage.getItem("mode")) || "easy"; // Значение по умолчанию
let apiUrl = "";

// Формируем URL для API вопросов
if (userId == 8) {
  apiUrl = `https://opentdb.com/api.php?amount=${qCount}&difficulty=${mode}&type=multiple`;
} else {
  apiUrl = `https://opentdb.com/api.php?amount=${qCount}&category=${userId}&difficulty=${mode}&type=multiple`;
}

// --------------------------------------------------------------------

let currentQuestionIndex = 0;
let questions = [];
let correctAnswersCount = 0;
let wrongAnswersCount = 0;

const playersApiUrl = "https://676905edcbf3d7cefd394c2a.mockapi.io/quizusers"; // URL для игроков

// Функция для получения вопросов
async function fetchQuestions() {
  try {
    console.log("Запрос отправляется...");
    const response = await axios.get(apiUrl);
    console.log("Ответ получен:", response.data);

    if (response.data.response_code !== 0 || response.data.results.length === 0) {
      throw new Error("Список вопросов пуст или некорректный запрос.");
    }

    questions = response.data.results;
    loadQuestion(questions[currentQuestionIndex]);
  } catch (error) {
    console.error("Ошибка при получении вопросов:", error);
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
      <div class="error-message">Не удалось загрузить вопросы. Проверьте параметры или повторите попытку позже.</div>
    `;
  }
}

// Функция для получения игроков
async function fetchPlayers() {
  try {
    const response = await axios.get(playersApiUrl);
    console.log("Данные игроков:", response.data); // Логируем данные игроков
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных игроков:", error);
    return [];
  }
}

// Функция для отображения игроков
function displayPlayers(players) {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых данных

  if (!players || players.length === 0) {
    playersContainer.innerHTML = "<p>Игроки отсутствуют</p>";
    return;
  }

  players.forEach((player) => {
    const playerName = player.name || "Неизвестный игрок";
    const playerScore = player.score !== undefined ? player.score : "Нет очков";

    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    playerElement.innerHTML = `
      <p><strong>${playerName}</strong></p>
      <p>Очки: ${playerScore}</p>
    `;
    playersContainer.appendChild(playerElement);
  });
}

// Функция для загрузки вопроса
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

// Обработка ответа
function handleAnswer(answerOption, questionData) {
  const isCorrect = answerOption.dataset.correct === "true";
  const answerOptions = document.querySelectorAll(".answer-option");

  answerOptions.forEach((option) => {
    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none"; // Отключаем клики
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

// Функция для отображения финального результата
async function showFinalResult() {
  const questionContainer = document.getElementById("question-container");
  const quizContainer = document.querySelector(".quiz-container");

  // Скрываем викторину
  quizContainer.style.display = "none";

  // Получаем список игроков
  const players = await fetchPlayers();

  questionContainer.innerHTML = `
    <div class="result-message">
      Викторина завершена!
      <br>Правильных ответов: ${correctAnswersCount}
      <br>Неправильных ответов: ${wrongAnswersCount}
    </div>
    <div class="button-container">
      <button class="button" onclick="redirectToOtherPage()">Перейти на другую страницу</button>
    </div>
  `;

  const playersContainer = document.createElement("div");
  playersContainer.id = "players-container";
  questionContainer.appendChild(playersContainer);

  displayPlayers(players);
}

// Переход на другую страницу
function redirectToOtherPage() {
  window.location.href = "login.html";
}

// Запуск функции загрузки вопросов
fetchQuestions();
