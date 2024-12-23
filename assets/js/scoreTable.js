document.getElementById('line').innerHTML = ``;
axios
    .get(`https://676905edcbf3d7cefd394c2a.mockapi.io/quizusers`)
    .then((res) => {
        const usersData = res.data
        const sortedUsers = usersData.sort((a, b) => b.totalOfFindAnswerAll - a.totalOfFindAnswerAll);
        const top10Users = sortedUsers.slice(0, 10);
        top10Users.forEach((user, index) => {
            document.getElementById('line').innerHTML += `
                <tr>
                    <td>${index+1 || '-'}</td>
                    <td>${user.username || '-'}</td>
                    <td>${user.totalOfGame || 0}</td>
                    <td>${user.totalOfFindAnswerAll || 0}</td>
                    <td><img class='userimg' src="${user.userAvatar}" alt=""></td>
                </tr>
            `;
        });
    })


    function backToMain() {
        window.location.href = 'category.html'
    }