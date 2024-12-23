// settings page
const userId = new URLSearchParams(document.location.search).get("category"); // userId olish
console.log(userId); // userId'ni tekshirish

function changeIndo() {
  const countQ = document.querySelector("#questionCount").value; // Savollar soni
  const difficulty = document.querySelector("#difficulty").value; // Qiyinchilik darajasi

  // sessionStorage orqali tanlangan qiymatlarni saqlash
  sessionStorage.setItem("qCount", JSON.stringify(countQ));
  sessionStorage.setItem("mode", JSON.stringify(difficulty));

  // Question sahifasiga o'tish va category parametri bilan userId ni yuborish
  window.location.href = `question.html?category=${userId}`;
}
