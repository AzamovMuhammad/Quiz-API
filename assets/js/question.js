const apiUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
let currentQuestionIndex = 0;
let questions = [];

// Функция для получения вопросов с использованием Axios
async function fetchQuestions() {
  try {
    const response = await axios.get(apiUrl);
    questions = response.data.results;
    loadQuestion(questions[currentQuestionIndex]); // Загрузить первый вопрос
  } catch (error) {
    console.error('Ошибка при получении вопросов:', error);
  }
}

function loadQuestion(questionData) {
  const questionContainer = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const questionImage = document.getElementById('question-image');
  const answersContainer = document.getElementById('answers');

  // Очистить контейнер вопроса
  questionContainer.innerHTML = '';

  // Пересоздать элемент вопроса
  const newQuestionElement = document.createElement('div');
  newQuestionElement.id = 'question';
  newQuestionElement.className = 'question';
  newQuestionElement.innerHTML = questionData.question;
  questionContainer.appendChild(newQuestionElement);

  // Пересоздать элемент изображения
  const newQuestionImage = document.createElement('img');
  newQuestionImage.id = 'question-image';
  newQuestionImage.className = 'question-image';
  newQuestionImage.style.display = 'none';
  questionContainer.appendChild(newQuestionImage);

  // Установить изображение, если доступно
  if (questionData.image) {
    newQuestionImage.src = questionData.image;
    newQuestionImage.style.display = 'block';
  }

  // Очистить предыдущие ответы
  answersContainer.innerHTML = '';

  // Объединить правильные и неправильные ответы и перемешать
  const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer]
    .sort(() => Math.random() - 0.5);

  // Создать кнопки для ответов
  allAnswers.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('answer');
    button.textContent = answer;
    button.dataset.correct = answer === questionData.correct_answer;
    button.addEventListener('click', () => handleAnswer(button));
    answersContainer.appendChild(button);
  });
}

function handleAnswer(button) {
  const isCorrect = button.dataset.correct === 'true';
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');
  const questionElement = document.getElementById('question');

  // Убираем ответы и текст вопроса
  answersContainer.style.display = 'none';
  questionElement.style.display = 'none';

  if (isCorrect) {
    questionContainer.innerHTML = '<div class="result-message">Ооо, похоже, я поспешил с выводами. У тебя всё-таки есть голова! Давай же, старайся, старайся!</div>';
  } else {
    questionContainer.innerHTML = '<div class="result-message">###</div>';
  }

  // Переход к следующему вопросу через 3 секунды
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      questionContainer.innerHTML = ''; // Очистить сообщение
      answersContainer.style.display = 'block';
      questionElement.style.display = 'block';
      loadQuestion(questions[currentQuestionIndex]);
    } else {
      questionContainer.innerHTML = '<div class="result-message">Викторина завершена!</div>';
    }
  }, 3000);
}

// Инициализация викторины
fetchQuestions();

