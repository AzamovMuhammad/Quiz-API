const userId = new URLSearchParams(document.location.search).get("userId");
console.log(userId);

document.getElementById('line').innerHTML = ``;
axios
    .get(`https://678b9aa91a6b89b27a2ae07d.mockapi.io/quiz`)
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
        window.location.href = `category.html?userId=${userId}`
    }