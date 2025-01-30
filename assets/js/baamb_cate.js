const userId = new URLSearchParams(document.location.search).get("userId");
console.log(userId);
function backMainPage() {
    window.location.href = `category.html?userId=${userId}`
}