const userId = new URLSearchParams(document.location.search).get("userId");
const usersData = JSON.parse(localStorage.getItem("userData"));

if (usersData[userId]) {
  const user = usersData[userId];
  document.querySelector(".name").innerHTML = user.username;
  document.querySelector(".avatar").src = user.userAvatar;
} else {
  console.log("Foydalanuvchi topilmadi");
}

let a = 0;
function score() {
  a = a + 1;
  document.querySelector(".score").innerHTML = a;
}


