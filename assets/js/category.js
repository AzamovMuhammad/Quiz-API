const categorys = [
  { "id": "8", "category": "Any Category" , "img":'https://static.vecteezy.com/system/resources/thumbnails/030/597/271/small_2x/an-open-book-with-a-light-bulb-on-top-of-it-generative-ai-photo.jpg' },
  { "id": "9", "category": "General Knowledge" , "img":'https://img.freepik.com/free-photo/books-with-brain-digital-art-style-education-day_23-2151164350.jpg' },
  { "id": "10", "category": "Entertainment: Books" , "img":'https://i.pinimg.com/736x/f3/9a/fb/f39afba224fdd4eaf43d31e501165e36.jpg' },
  { "id": "11", "category": "Entertainment: Film" , "img":'https://static.vecteezy.com/system/resources/thumbnails/027/856/814/small_2x/clapper-board-and-film-tape-with-dark-background-3d-rendering-photo.jpg' },
  { "id": "12", "category": "Entertainment: Music" , "img":'https://static.vecteezy.com/system/resources/thumbnails/024/295/098/small_2x/music-notes-background-illustration-ai-generative-free-photo.jpg' },
  { "id": "13", "category": "Entertainment: Musicals & Theatres" , "img":'https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?s=612x612&w=0&k=20&c=0rDtwzMmLbqe_8GuGw2dpjkD0MsXGywJmdmg0jDbMxQ=' },
  { "id": "14", "category": "Entertainment: Television" , "img":'https://img.freepik.com/premium-photo/media-technology-display-show-television-vintage-old-news-screen-analog-nostalgia-broadcasting-entertainment-blank-background-video-retro-object-classic-set-tv_163305-244393.jpg' },
  { "id": "15", "category": "Entertainment: Video Games" , "img":'https://img.freepik.com/premium-photo/back-view-close-up-professional-gamer-playing-online-video-game-with-his-gameset-room-lit-neon-light-retro-style-using-headphones-talk-with-team-entertainment-fun-concept_489646-5635.jpg' },
  { "id": "16", "category": "Entertainment: Board Games" , "img":'https://www.shutterstock.com/image-photo/dice-board-game-background-cartoon-600nw-2453777487.jpg' },
  { "id": "17", "category": "Science & Nature" , "img":'https://img.lovepik.com//photo/50048/1183.jpg_860.jpg' },
  { "id": "18", "category": "Science: Computers" , "img":'https://i.pinimg.com/originals/40/ce/e2/40cee2ae407de99af49bea4ff771bcff.jpg' },
  { "id": "19", "category": "Science: Mathematics" , "img":'https://img.freepik.com/premium-vector/science-technology-engineering-math-linear-colored-frame_104589-4481.jpg?semt=ais_hybrid' },
  { "id": "20", "category": "Mythology" , "img":'' },
  { "id": "21", "category": "Sports" , "img":'' },
  { "id": "22", "category": "Geography" , "img":'' },
  { "id": "23", "category": "History" , "img":'' },
  { "id": "24", "category": "Politics" , "img":'' },
  { "id": "25", "category": "Art" , "img":'' },
  { "id": "26", "category": "Celebrities" , "img":'' },
  { "id": "27", "category": "Animals" , "img":'' },
  { "id": "28", "category": "Vehicles" , "img":'' },
  { "id": "29", "category": "Entertainment: Comics" , "img":'' },
  { "id": "30", "category": "Science: Gadgets" , "img":'' },
  { "id": "31", "category": "Entertainment: Japanese Anime & Manga" , "img":'' },
  { "id": "32", "category": "Entertainment: Cartoon & Animations" , "img":'' }
]



const userId = new URLSearchParams(document.location.search).get("userId");

const userData = JSON.parse(localStorage.getItem('userData'))

console.log(userData);

if (userData[userId]) {
  document.getElementById('username').innerHTML = userData[userId].username
  document.getElementById('avatar').src = userData[userId].userAvatar

}

const all_card = document.querySelector('.all_card');

categorys.map((category) => {
  all_card.innerHTML += `
      <div onclick="loadingSettings(${category.id})" class="topic_card" style="background-image: url('${category.img}');">
        <h3 class="topic_name">${category.category}</h3>
      </div>
  `;
});


function loadingSettings(id) {
  window.location.href= `index.html?category=${id}`
}
