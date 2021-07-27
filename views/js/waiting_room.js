const socket = io();
const user_names = [];
var name = document.getElementById("name").value;
var room = document.getElementById("room").value;
socket.emit("login", { name, room });
socket.on("send_users", (waiting) => {
  ShowUsers(waiting);
});
socket.on("auto-submit", () => {
  document.getElementById("subm1t").click();
});
socket.on("game_start", (is_start) => {
  if (is_start == true) {
    div = document.getElementById("start-game-form");
    div.innerHTML += '<input id = "subm1t" type = "submit"></input>';
  }
});

socket.on("redirect", (destination) => {
  window.location.href = destination;
});
function ShowUsers(name) {
  var userlist = document.getElementById("users");
  userlist.innerHTML = "";
  name.forEach((element) => {
    userlist.innerHTML += `${element}<br>`;
  });
}
