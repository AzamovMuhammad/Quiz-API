const userId = new URLSearchParams(document.location.search).get("userId");
const countQ = JSON.parse(sessionStorage.getItem('qCount'))
const mode = JSON.parse(sessionStorage.getItem('difficulty'))

axios.get(`https://opentdb.com/api.php?amount=${countQ}&category=9&difficulty=${mode}&type=multiple`)
  .then(response => {
    const question = response.data
    console.log(question);
    // const categories = response.data; 
    // const container = document.getElementById('all_menu');

  });
// window.location.href = `category.html?userId=${userId}`;