const userId = new URLSearchParams(document.location.search).get("category");
const qCount = JSON.parse(sessionStorage.getItem("qCount"));
const mode = JSON.parse(sessionStorage.getItem("mode"));
let apiUrl = '';
if (userId == 8) {
   apiUrl = `https://opentdb.com/api.php?amount=${qCount}&difficulty=${mode}&type=multiple`;
} else {
   apiUrl = `https://opentdb.com/api.php?amount=${qCount}&category=${userId}&difficulty=${mode}&type=multiple`;
}
let currentQuestionIndex = 0;
let questions = [];


async function fetchQuestions() {
  try {
    const response = await axios.get(apiUrl);
    questions = response.data.results;
    loadQuestion(questions[currentQuestionIndex]); 
  } catch (error) {
    console.error('Ошибка при получении вопросов:', error);
  }
}

function loadQuestion(questionData) {
  const questionContainer = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const questionImage = document.getElementById('question-image');
  const answersContainer = document.getElementById('answers');


  questionContainer.innerHTML = '';

 
  const newQuestionElement = document.createElement('div');
  newQuestionElement.id = 'question';
  newQuestionElement.className = 'question';
  newQuestionElement.innerHTML = questionData.question;
  questionContainer.appendChild(newQuestionElement);

  const newQuestionImage = document.createElement('img');
  newQuestionImage.id = 'question-image';
  newQuestionImage.className = 'question-image';
  newQuestionImage.style.display = 'none';
  questionContainer.appendChild(newQuestionImage);


  if (questionData.image) {
    newQuestionImage.src = questionData.image;
    newQuestionImage.style.display = 'block';
  }

  
  answersContainer.innerHTML = '';

 
  const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer]
    .sort(() => Math.random() - 0.5);


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

 
  answersContainer.style.display = 'none';
  questionElement.style.display = 'none';

  if (isCorrect) {
    questionContainer.innerHTML = '<div class="result-message">Ооо, похоже, я поспешил с выводами. У тебя всё-таки есть голова! Давай же, старайся, старайся!</div>';
  } else {
    questionContainer.innerHTML = '<div class="result-message">###</div>';
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      questionContainer.innerHTML = ''; 
      answersContainer.style.display = 'block';
      questionElement.style.display = 'block';
      loadQuestion(questions[currentQuestionIndex]);
    } else {
      questionContainer.innerHTML = '<div class="result-message">Викторина завершена!</div>';
    }
  }, 3000);
}


fetchQuestions();

