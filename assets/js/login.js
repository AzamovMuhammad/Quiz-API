const animals = [
  { animal: "assets/img/login Animals Img/fil.jpeg" },
  { animal: "assets/img/login Animals Img/qoy.jpeg" },
  { animal: "assets/img/login Animals Img/kangru.jpeg" },
  { animal: "assets/img/login Animals Img/it.jpeg" },
  { animal: "assets/img/login Animals Img/pishak.jpeg" },
  { animal: "assets/img/login Animals Img/oq_ayiq.jpeg" },
  { animal: "assets/img/login Animals Img/ayiq.jpeg" },
  { animal: "assets/img/login Animals Img/kuala.jpeg" },
  { animal: "assets/img/login Animals Img/jraffa.jpeg" },
  { animal: "assets/img/login Animals Img/quyon.jpeg" },
  { animal: "assets/img/login Animals Img/ukki.jpeg" },
  { animal: "assets/img/login Animals Img/delfin.jpeg" },
  { animal: "assets/img/login Animals Img/bo'ri.jpeg" },
  { animal: "assets/img/login Animals Img/ot.jpeg" },
  { animal: "assets/img/login Animals Img/kirpi.jpeg" },
  { animal: "assets/img/login Animals Img/qunduz.jpeg" },
  { animal: "assets/img/login Animals Img/kapalak.jpeg" },
  { animal: "assets/img/login Animals Img/tulki.jpeg" },
  { animal: "assets/img/login Animals Img/sher.jpeg" },
  { animal: "assets/img/login Animals Img/panda.jpeg" },
  { animal: "assets/img/login Animals Img/tovuq.jpeg" },
  { animal: "assets/img/login Animals Img/pingivin.jpeg" },
  { animal: "assets/img/login Animals Img/yolbars.jpeg" },
];

const selectRandomIndex = Math.floor(Math.random() * animals.length);
const selectImg = animals[selectRandomIndex];
document.getElementById("loginImg").src = selectImg.animal;

const animalsDiv = document.querySelector(".animalsDiv");
function closeModal() {
  animalsDiv.style.display = "none";
}
function openModal() {
  animalsDiv.style.display = "flex";
}

const animalsCards = document.querySelector(".animalsCards");
animalsCards.innerHTML = "";
animals.map((jonzot, index) => {
  animalsCards.innerHTML += `
    <img class="animal" onclick="choosenAnimal(${index})" src="${jonzot.animal}" alt="">
    `;
});
function choosenAnimal(index) {
  document.getElementById("loginImg").src = animals[index].animal;
  closeModal();
}

const usersData = JSON.parse(localStorage.getItem("userData")) || [];
function submitUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const userImg = document.getElementById("loginImg").src;

  if (username === "" || password === "") {
    console.log(`Inputlar to'ldirilmagan`);
    return;
  }

  const userObject = {
    username: username,
    password: password,
    userAvatar: userImg,
  };

  const sameUser = usersData.find(
    (userData) =>
      userData.username === userObject.username &&
      userData.password === userObject.password
  );

  if (sameUser) { 
    console.log(sameUser.index);
    // window.location.href = `index.html?userIndex=${usersData.length}`;
  } else {
    usersData.push(userObject);
    localStorage.setItem("userData", JSON.stringify(usersData));
    console.log(userObject.index);
    // window.location.href = `index.html?userIndex=${usersData.length}`;
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}
