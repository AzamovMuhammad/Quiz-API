const userId = new URLSearchParams(document.location.search).get("userId");
const categoryId = new URLSearchParams(document.location.search).get("category");
const questionId = parseInt(new URLSearchParams(document.location.search).get("question"));
const teamId = parseInt(new URLSearchParams(document.location.search).get("team"));
const showWinnerDiv = document.querySelector('.showWinnerDiv')

function backMainPage() {
  window.location.href = `baamb_settings.html?userId=${userId}&category=${categoryId}`;
}

const groups = document.querySelector(".groups");
let teams = Array(teamId).fill(0);
let currentTeamIndex = 0;

for (let i = 0; i < teamId; i++) {
  groups.innerHTML += `<h2 id="team-${i}" class="team">Team ${i + 1}: <span class="score">0</span> points</h2>`;
}

const questionsContainer = document.querySelector(".questions");
const questModal = document.querySelector(".questModal");
const resultModal = document.createElement("div");
resultModal.classList.add("resultModal");
document.body.appendChild(resultModal);

let questionsArray = [];
let disabledQuestions = new Set();

function fetchQuestions() {
  let apiURL =
    categoryId == 8
      ? `https://opentdb.com/api.php?amount=${questionId}&type=multiple`
      : `https://opentdb.com/api.php?amount=${questionId}&category=${categoryId}&type=multiple`;

  axios
    .get(apiURL)
    .then((res) => {
      questionsArray = res.data.results;
      showQuestions();
      highlightCurrentTeam(); // Boshlang‘ich holatda birinchi guruhni qora qilish
    })
    .catch((error) => console.error("Xatolik:", error));
}

function showQuestions() {
  questionsContainer.innerHTML = "";
  for (let i = 0; i < questionId; i++) {
    questionsContainer.innerHTML += `
      <div class="question" id="question-${i}" onclick="questionFunc(${i})">
        <h1>${i + 1}</h1>
      </div>
    `;
  }
}

function highlightCurrentTeam() {
  document.querySelectorAll(".team").forEach((team, index) => {
    team.style.color = index === currentTeamIndex ? "black" : "gray"; // Hozirgi guruh qora, boshqalar kulrang
  });
}

function questionFunc(index) {
  if (disabledQuestions.has(index)) return;

  let questionText = questionsArray[index]?.question || "Savol topilmadi";
  let correctAnswer = questionsArray[index]?.correct_answer || "Javob topilmadi";

  questModal.style.display = "flex";
  questModal.innerHTML = `
    <h2 class="savol">Question: ${questionText}</h2>
    <h2 class="questAnswer" style="display: none;">Answer: ${correctAnswer}</h2>
    <div class="btnsModal">
      <button class="btn check" onclick="showAnswer()">Check</button>
      <div class="ansBtns" style="display: none;">
        <button onclick="nextTeam(false, ${index})">Wrong</button>
        <button onclick="nextTeam(true, ${index})">Correct</button>
      </div>
    </div>
  `;
}

function showAnswer() {
  document.querySelector(".questAnswer").style.display = "block";
  document.querySelector(".ansBtns").style.display = "flex";
  document.querySelector(".check").style.display = "none";
}

function nextTeam(isCorrect, index) {
  if (isCorrect) {
    teams[currentTeamIndex] += 10;
    document.querySelector(`#team-${currentTeamIndex} .score`).innerText = teams[currentTeamIndex];
  }

  disabledQuestions.add(index);
  document.querySelector(`#question-${index}`).style.pointerEvents = "none";
  document.querySelector(`#question-${index}`).style.opacity = "0.5";

  if (disabledQuestions.size === questionId) {
    showWinner();
  } else {
    currentTeamIndex = (currentTeamIndex + 1) % teamId;
    highlightCurrentTeam(); // Navbatdagi jamoani qora rang qilish
  }

  questModal.style.display = "none";
}

function showWinner() {
  let maxScore = Math.max(...teams);
  let winners = teams
    .map((score, index) => (score === maxScore ? index : null))
    .filter((index) => index !== null);
    showWinnerDiv.innerHTML = "";
  if (winners.length === teams.length) {
    showWinnerDiv.innerHTML += `
        <h2>Game Over!</h2>
        <h2 class="yozuv">Durrang! Barcha jamoalar ${maxScore} ball to‘pladi.</h2>
        <button onclick="leaveGame()">Leave Game</button>
    `
  } else {
    let winningTeams = winners.map((index) => `<h2>Team ${index + 1}: ${maxScore} points</h2>`).join("");
    showWinnerDiv.innerHTML += `
        <h2>Game Over!</h2>
        <h2>Winner!</h2>
        ${winningTeams}
        <button onclick="leaveGame()">Leave Game</button>`;
  }
  questionsContainer.style.display = 'none'
  resultModal.style.display = "flex";
}

function leaveGame() {
  window.location.href = "baamb_cate.html";
}

fetchQuestions();
