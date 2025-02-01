const userId = new URLSearchParams(document.location.search).get("userId");
const categoryId = new URLSearchParams(document.location.search).get("category");
const questionId = new URLSearchParams(document.location.search).get("question");
const teamId = new URLSearchParams(document.location.search).get("team");

const groups = document.querySelector(".groups");
let teamNum = 1;
for (let i = 0; i < teamId; i++) {
  groups.innerHTML += `
        <h2 >Team ${teamNum}</h2>
    `;
  teamNum++;
}

function backMainPage() {
  window.location.href = `baamb_settings.html?userId=${userId}&category=${categoryId}`;
}


const questionsContainer = document.querySelector('.questions');
const questModal = document.querySelector('.questModal');

let questionsArray = [];
function fetchQuestions() {
    let apiURL = categoryId == 8 
        ? `https://opentdb.com/api.php?amount=${questionId}&type=multiple` 
        : `https://opentdb.com/api.php?amount=${questionId}&category=${categoryId}&type=multiple`;

    axios.get(apiURL)
        .then((res) => {
            questionsArray = res.data.results; // API dan kelgan savollarni saqlaymiz
            showQuestions(); // Savollar tugmalarini ekranga chiqaramiz
        })
        .catch((error) => console.error("Xatolik:", error));
}
function showQuestions() {
    questionsContainer.innerHTML = ""; // Avvalgi ma'lumotlarni tozalash

    for (let i = 0; i < questionId; i++) {
        questionsContainer.innerHTML += `
            <div class="question" onclick="questionFunc(${i})">
                <h1>${i + 1}</h1>
            </div>
        `;
    }
}


function questionFunc(index) {
    let questionText = questionsArray[index]?.question || "Savol topilmadi";
    let correctAnswer = questionsArray[index]?.correct_answer || "Javob topilmadi";

    questModal.style.display = 'flex';
    questModal.innerHTML = `
        <h2 class="savol">Question: ${questionText}</h2>
        <h2 class="questAnswer" style="display: none;">Javob: ${correctAnswer}</h2>
        <div class="btnsModal">
          <button class="btn check" onclick="showAnswer()">check</button>
          <div class="ansBtns" style="display: none;">
            <button onclick="closeModal()">correct</button>
            <button onclick="closeModal()">wrong</button>
          </div>
        </div>
    `;
}

function showAnswer() {
    document.querySelector('.questAnswer').style.display = 'block';
    document.querySelector('.ansBtns').style.display = 'flex';
    document.querySelector('.check').style.display = 'none';
}

// Modalni yopish
function closeModal() {
    questModal.style.display = 'none';
}

// API dan savollarni olishni chaqirish
fetchQuestions();


