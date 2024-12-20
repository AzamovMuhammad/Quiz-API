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
    { animal: "assets/img/login Animals Img/yolbars.jpeg" }
];

const selectRandomIndex = Math.floor(Math.random()*animals.length)
const selectImg = animals[selectRandomIndex]
document.getElementById('loginImg').src = selectImg.animal

const animalsDiv = document.querySelector('.animalsDiv')
function closeModal() {
    animalsDiv.style.display = 'none'
}
function openModal() {
    animalsDiv.style.display = 'flex'
}

