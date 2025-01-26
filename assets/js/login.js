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

// page ochilganda data ichidan random bita rasmni chiqarib beradi.
const selectRandomIndex = Math.floor(Math.random() * animals.length);
const selectImg = animals[selectRandomIndex];
document.getElementById("loginImg").src = selectImg.animal;

// modalni ochilishi va yopilishi
const animalsDiv = document.querySelector(".animalsDiv");
function closeModal() {
  animalsDiv.style.display = "none";
}
function openModal() {
  animalsDiv.style.display = "flex";
}

// animals arraydan rasmlarni tanlash uchun hamma rasmni chiqarib beradi.
const animalsCards = document.querySelector(".animalsCards");
animalsCards.innerHTML = "";
animals.map((jonzot, index) => {
  animalsCards.innerHTML += `
    <img class="animal" onclick="choosenAnimal(${index})" src="${jonzot.animal}" alt="">
    `;
});

// hamma chiqgan rasmlardan bittashini tanlab ekranga chiqarib beradi
function choosenAnimal(index) {
  document.getElementById("loginImg").src = animals[index].animal;
  closeModal();
}







function submitUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const userAvatar = document.getElementById("loginImg").src;

  if (username === "" || password === "") {
    console.log(`Inputlar to'ldirilmagan`);
    return;
  }

  const userObject = {
    username: username,
    password: password,
    userAvatar: userAvatar,
    totalOfFindAnswerAll: 0,
    totalOfGame: 0,
    bestScore: 0,
  };

 
  axios
    .get(`https://678b9aa91a6b89b27a2ae07d.mockapi.io/quiz`)
    .then((response) => {
      const existingUser = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (existingUser) {
        console.log("User already exists. Redirecting to category page.");
        window.location.href = `category.html?userId=${existingUser.id}`;
      } else {
        axios
          .post(`https://678b9aa91a6b89b27a2ae07d.mockapi.io/quiz`, userObject)
          .then((response) => {
            console.log("User successfully submitted", response);
            window.location.href = `category.html?userId=${response.data.id}`;
          })
          .catch((error) => {
            console.log("Error submitting the user", error);
          });
      }
    })
    .catch((error) => {
      console.log("Error fetching existing users", error);
    });

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}
