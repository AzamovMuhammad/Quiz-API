const userId = new URLSearchParams(document.location.search).get("userId");
const usersData = JSON.parse(localStorage.getItem("userData")) || [];
console.log(usersData[userId]);
// Validatsiya: userId va foydalanuvchi mavjudligini tekshirish
if (!usersData[userId]) {
  console.error("Foydalanuvchi topilmadi yoki userId noto'g'ri.");
} else {
  // Foydalanuvchi ma'lumotlarini olish
  const user = usersData[userId];

  // DOM elementlarini yangilash
  document.querySelector(".name").innerHTML = user.username;
  document.querySelector(".avatar").src = user.userAvatar;
  user.totalOfFindAnswerAll = user.totalOfFindAnswerAll || 0;
  user.totalOfGame = user.totalOfGame || 0;

  // Foydalanuvchi statistikasi
  function score() {
    user.totalOfFindAnswerAll += 1;
    document.querySelector(".score").innerHTML = user.totalOfFindAnswerAll || 0;
    saveUserInfo();
  }

  function numberOfStartGame() {
    user.totalOfGame += 1;
    document.querySelector(".numberGame").innerHTML = user.totalOfGame || 0;
    saveUserInfo();
    window.location.href = "login.html";
  }

  // Foydalanuvchi ma'lumotlarini saqlash
  function saveUserInfo() {
    usersData[userId] = user; // Mavjud foydalanuvchini yangilash
    localStorage.setItem("userData", JSON.stringify(usersData));
  }

  // Dastlabki ko'rsatmalarni yuklash
  const scoreElement = document.querySelector(".score");
  const numberGameElement = document.querySelector(".numberGame");
  if (scoreElement) scoreElement.innerHTML = user.totalOfFindAnswerAll;
  if (numberGameElement) numberGameElement.innerHTML = user.totalOfGame;
}
