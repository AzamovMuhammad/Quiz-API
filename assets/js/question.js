const userId = new URLSearchParams(document.location.search).get("category");
const qCount = JSON.parse(sessionStorage.getItem("qCount"));
const mode = JSON.parse(sessionStorage.getItem("mode"));
let apiUrl = "";
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

// URL для API с игроками
const playersApiUrl = 'https://676905edcbf3d7cefd394c2a.mockapi.io/quizusers';

// Функция для получения вопросов
async function fetchQuestions() {
  try {
    console.log("Запрос отправляется...");
    const response = await axios.get(apiUrl);
    console.log("Ответ получен:", response.data);

    questions = response.data.results;

    if (questions.length === 0) {
      throw new Error("Список вопросов пуст.");
    }

    loadQuestion(questions[currentQuestionIndex]);
  } catch (error) {
    console.error("Ошибка при получении вопросов:", error);
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML =
      '<div class="error-message">Не удалось загрузить вопросы. Повторите попытку позже.</div>';
  }
}

// Функция для получения игроков
async function fetchPlayers() {
  try {
    const response = await axios.get(playersApiUrl);
    return response.data; // Возвращаем данные игроков
  } catch (error) {
    console.error("Ошибка при получении данных игроков:", error);
    return []; // Возвращаем пустой массив, если ошибка
  }
}

// Функция для отображения игроков
function displayPlayers(players) {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

  players.forEach(player => {
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.innerHTML = `
      <p><strong>${player.name}</strong></p>
      <p>Очки: ${player.score}</p>
    `;
    playersContainer.appendChild(playerElement);
  });
}

// Функция для загрузки вопросов
function loadQuestion(questionData) {
  const questionElement = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers");

  questionElement.innerHTML = questionData.question;

  answersContainer.innerHTML = "";

  const allAnswers = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
  ].sort(() => Math.random() - 0.5);

  const answerImages = [
    "https://i.pinimg.com/736x/6f/f4/02/6ff4023a78a20233d1c8e96cadbe6121.jpg",
    "https://i.pinimg.com/736x/bc/a6/8f/bca68f6dadf93d048f6ebc6f044b779d.jpg",
    "https://i.pinimg.com/736x/74/e2/44/74e244ad955438ced1d2af0f4c7eb295.jpg",
    "https://i.pinimg.com/736x/b7/57/35/b75735f195193a0da018c492450fbc6a.jpg",
  ];

  allAnswers.forEach((answer, index) => {
    const answerOption = document.createElement("div");
    answerOption.classList.add("answer-option");
    answerOption.dataset.correct = answer === questionData.correct_answer;

    const img = document.createElement("img");
    img.src = answerImages[index];
    img.alt = "icon";

    const span = document.createElement("span");
    span.textContent = answer;

    answerOption.appendChild(img);
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
  const questionContainer = document.getElementById("question-container");
  const answersContainer = document.getElementById("answers");
  const questionElement = document.getElementById("question-text");

  questionElement.style.display = "none"; // Скрываем вопрос
  answersContainer.style.display = "none"; // Скрываем ответы

  answerOptions.forEach((option) => {
    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
    option.style.pointerEvents = "none";
  });

  if (isCorrect) {
    correctAnswersCount++;
  } else {
    wrongAnswersCount++;
  }

  const resultMessage = document.createElement("div");
  resultMessage.className = "result-message";
  resultMessage.innerHTML = isCorrect
    ? "Ооо, похоже, я поспешил с выводами. У тебя всё-таки есть мозги! Давай же, старайся, старайся!"
    : "!@#$%^&*";
  questionContainer.appendChild(resultMessage);

  setTimeout(() => {
    resultMessage.remove();

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion(questions[currentQuestionIndex]);
    } else {
      showFinalResult();
    }

    questionElement.style.display = "block"; // Показываем вопрос
    answersContainer.style.display = "flex"; // Показываем ответы
  }, 1000);
}

// Функция для отображения финальных результатов
async function showFinalResult() {
  const questionContainer = document.getElementById("question-container");
  const quizContainer = document.querySelector(".quiz-container");

  // Скрываем последний вопрос и ответы
  quizContainer.style.display = "none";

  // Получаем игроков и отображаем их
  const players = await fetchPlayers();
  const playersContainer = document.createElement('div');
  playersContainer.id = 'players-container';
  displayPlayers(players);

  // Показ финальных результатов
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

  questionContainer.appendChild(playersContainer);
}

function redirectToOtherPage() {
  window.location.href = "login.html"; // Измените на нужный URL
}

fetchQuestions();
