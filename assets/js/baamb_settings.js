const userId = new URLSearchParams(document.location.search).get("userId");
const categoryId = new URLSearchParams(document.location.search).get("category");

function backMainPage() {
  window.location.href = `baamb_cate.html?userId=${userId}`;
}

let selectedTeam = null;
let selectedOption = null;

function getSelectedLabel(name) {
    const selectedRadio = document.querySelector(`input[name="${name}"]:checked`);
    if (selectedRadio) {
        const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
        return label ? label.textContent.trim() : null;
    }
    return null;
}

document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        selectedTeam = getSelectedLabel("team");
        selectedOption = getSelectedLabel("option");
    });
});

function goToNextPage() {
    if (selectedTeam === null || selectedOption === null ) {
        alert('Guruh yoki savollarning miqdorini kiritmadingiz.')
    }else{
        window.location.href = `baamb_question.html?category=${categoryId}&userId=${userId}&question=${selectedOption}&team=${selectedTeam}`
    }
}


