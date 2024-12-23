const usersData = JSON.parse(localStorage.getItem("userData")) || [];
document.getElementById('line').innerHTML = ``;

// `usersData`ni `totalOfFindAnswerAll` bo'yicha kamayish tartibida tartiblash
const sortedUsers = usersData.sort((a, b) => b.totalOfFindAnswerAll - a.totalOfFindAnswerAll);

// Eng katta 10 foydalanuvchini olish
const top10Users = sortedUsers.slice(0, 10);

// Eng katta 10 foydalanuvchini ekranga chiqarish
top10Users.forEach((user, index) => {
    document.getElementById('line').innerHTML += `
        <tr>
            <td>${index+1 || '-'}</td>
            <td>${user.username || '-'}</td>
            <td>${user.totalOfGame || 0}</td>
            <td>${user.totalOfFindAnswerAll || 0}</td>
        </tr>
    `;
});
