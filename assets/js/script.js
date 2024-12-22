const userId = new URLSearchParams(document.location.search).get("category");
console.log(userId);
function changeIndo() {
  const countQ = document.querySelector("#questionCount").value;
  const difficulty = document.querySelector("#difficulty").value;

  sessionStorage.setItem("qCount", JSON.stringify(countQ));
  sessionStorage.setItem("mode", JSON.stringify(difficulty));
  window.location.href = `question.html?category=${ userId }`;
}
