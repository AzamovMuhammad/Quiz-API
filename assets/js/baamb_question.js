const userId = new URLSearchParams(document.location.search).get("userId");
const categoryId = new URLSearchParams(document.location.search).get("category");
const questionId = new URLSearchParams(document.location.search).get("question");
const teamId = new URLSearchParams(document.location.search).get("team");

const groups = document.querySelector('.groups')
let teamNum = 1
groups.innerHTML = ` `
for (let i = 0; i < teamId; i++) {
    groups.innerHTML += `
        <h2 >Team ${teamNum}</h2>
    `
    teamNum++
}


function backMainPage() {
    window.location.href = `baamb_settings.html?userId=${userId}&category=${categoryId}`;
  }