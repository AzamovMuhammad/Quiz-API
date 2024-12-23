const categorys = [
  { "id": "8", "category": "Any Category", "img": 'https://static.vecteezy.com/system/resources/thumbnails/030/597/271/small_2x/an-open-book-with-a-light-bulb-on-top-of-it-generative-ai-photo.jpg' },
  { "id": "9", "category": "General Knowledge", "img": 'https://img.freepik.com/free-photo/books-with-brain-digital-art-style-education-day_23-2151164350.jpg' },
  { "id": "10", "category": "Entertainment: Books", "img": 'https://i.pinimg.com/736x/f3/9a/fb/f39afba224fdd4eaf43d31e501165e36.jpg' },
  { "id": "11", "category": "Entertainment: Film", "img": 'https://static.vecteezy.com/system/resources/thumbnails/027/856/814/small_2x/clapper-board-and-film-tape-with-dark-background-3d-rendering-photo.jpg' },
  { "id": "12", "category": "Entertainment: Music", "img": 'https://static.vecteezy.com/system/resources/thumbnails/024/295/098/small_2x/music-notes-background-illustration-ai-generative-free-photo.jpg' },
  { "id": "13", "category": "Entertainment: Musicals & Theatres", "img": 'https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?s=612x612&w=0&k=20&c=0rDtwzMmLbqe_8GuGw2dpjkD0MsXGywJmdmg0jDbMxQ=' },
  { "id": "14", "category": "Entertainment: Television", "img": 'https://img.freepik.com/premium-photo/media-technology-display-show-television-vintage-old-news-screen-analog-nostalgia-broadcasting-entertainment-blank-background-video-retro-object-classic-set-tv_163305-244393.jpg' },
  { "id": "15", "category": "Entertainment: Video Games", "img": 'https://img.freepik.com/premium-photo/back-view-close-up-professional-gamer-playing-online-video-game-with-his-gameset-room-lit-neon-light-retro-style-using-headphones-talk-with-team-entertainment-fun-concept_489646-5635.jpg' },
  { "id": "16", "category": "Entertainment: Board Games", "img": 'https://www.shutterstock.com/image-photo/dice-board-game-background-cartoon-600nw-2453777487.jpg' },
  { "id": "17", "category": "Science & Nature", "img": 'https://img.lovepik.com//photo/50048/1183.jpg_860.jpg' },
  { "id": "18", "category": "Science: Computers", "img": 'https://i.pinimg.com/originals/40/ce/e2/40cee2ae407de99af49bea4ff771bcff.jpg' },
  { "id": "19", "category": "Science: Mathematics", "img": 'https://img.freepik.com/premium-vector/science-technology-engineering-math-linear-colored-frame_104589-4481.jpg?semt=ais_hybrid' },
  { "id": "20", "category": "Mythology", "img": 'https://t4.ftcdn.net/jpg/08/63/40/61/360_F_863406151_LCwpSlP4fnSLL6dJwiztw5Ois8oJHByN.jpg' },
  { "id": "21", "category": "Sports", "img": 'https://cdn11.bigcommerce.com/s-jdhnct1/images/stencil/1280x1280/products/233/741/sports_marketing_background__14948.1446754476.jpg?c=2' },
  { "id": "22", "category": "Geography", "img": 'https://static.vecteezy.com/system/resources/thumbnails/041/402/682/small_2x/ai-generated-a-globe-symbolizing-worldliness-or-travel-photo.jpeg' },
  { "id": "23", "category": "History", "img": 'https://wallpapers.com/images/hd/historical-background-2560-x-1600-q8k2ub17sd2sxqu3.jpg' },
  { "id": "24", "category": "Politics", "img": 'https://img.freepik.com/premium-photo/democracy-blue-political-background_87720-86681.jpg' },
  { "id": "25", "category": "Art", "img": 'https://t4.ftcdn.net/jpg/07/63/11/39/360_F_763113923_rrXxrAq56IUGX43Z9P4VhDvkVctM0Xc7.jpg' },
  { "id": "26", "category": "Celebrities", "img": 'https://www.shutterstock.com/image-vector/red-carpet-crowd-fans-paparazzi-600nw-1620128815.jpg' },
  { "id": "27", "category": "Animals", "img": 'https://img.freepik.com/premium-photo/world-animal-day_1322041-2255.jpg' },
  { "id": "28", "category": "Vehicles", "img": 'https://img.freepik.com/premium-photo/car-nature-free-photo-hd-background_915071-96472.jpg' },
  { "id": "29", "category": "Entertainment: Comics", "img": 'https://img.freepik.com/free-vector/flat-comic-style-background-copy-space_52683-54924.jpg' },
  { "id": "30", "category": "Science: Gadgets", "img": 'https://static.vecteezy.com/system/resources/thumbnails/047/613/744/small_2x/ai-letters-inside-digital-brain-on-dark-background-concept-of-artificial-intelligence-circuit-elements-technology-science-and-innovation-photo.jpg' },
  { "id": "31", "category": "Entertainment: Japanese Anime & Manga", "img": 'https://otakukart.com/wp-content/uploads/2022/08/Why-is-Manga-Right-to-Left-in-Terms-of-Reading-2.jpg' },
  { "id": "32", "category": "Entertainment: Cartoon & Animations", "img": 'https://t4.ftcdn.net/jpg/05/71/32/77/360_F_571327732_wIewi34aQ77ES1ZiAZfpegfXjnt1Fhul.jpg' }
]



const userId = new URLSearchParams(document.location.search).get("userId");
axios
  .get(`https://676905edcbf3d7cefd394c2a.mockapi.io/quizusers`)
  .then((response) => {
    const userData = response.data;
    console.log(userData); 
    const user = userData.find(user => user.id === userId);
    if (user) {
      document.getElementById('username').innerHTML = user.username;
      document.getElementById('avatar').src = user.userAvatar;
    } else {
      console.error('Foydalanuvchi topilmadi.');
    }
  })
  .catch((error) => {
    console.error('Xatolik yuz berdi:', error);
  });

const all_card = document.querySelector('.all_card');

categorys.map((category) => {
  all_card.innerHTML += `
      <div onclick="loadingSettings(${category.id})" class="topic_card" style="background-image: url('${category.img}');">
        <h3 class="topic_name">${category.category}</h3>
      </div>
  `;
});


function loadingSettings(id) {
  window.location.href = `settings.html?category=${id}`
}


function displayCategories(filter = '') {
  all_card.innerHTML = '';

  categorys
    .filter((category) =>
      category.category.toLowerCase().includes(filter.toLowerCase())
    )
    .map((category) => {
      all_card.innerHTML += `
        <div onclick="loadingSettings(${category.id})" class="topic_card" style="background-image: url('${category.img}');">
          <h3 class="topic_name">${category.category}</h3>
        </div>
      `;
    });
}


displayCategories();


document.getElementById('serach_input').addEventListener('input', (e) => {
  displayCategories(e.target.value);
});


function loadingSettings(id) {
  window.location.href = `settings.html?category=${id}&userId=${userId}`;
}