var socket = io();
var name = getParameterByName("name");
var room = getParameterByName("room");
var pass;
console.log(name, room);
socket.emit("Start-game", { name, room });
socket.on("redirect", (destination) => {
  window.location.href = destination;
});
socket.on("show_chitthi", (chitthi2send) => {
  chitthi2send.forEach((chitthi) => {
    ShowChitti(chitthi);
  });
});
socket.on("send_users", (waiting) => {
  ShowUsers(waiting);
});
socket.on("Turn", () => {
  pass = true;
});
socket.on("won", (won) => {
  alert(`${won} won`);
});
socket.on("update-chitthi", () => {
  clear();
  socket.emit("SendMeNewChitthi", { name, room });
});
function clear() {
  document.getElementById("chitti-container").innerHTML = "";
}
function ShowChitti(chitthi) {
  console.log(chitthi);
  const div = document.createElement("div");
  div.classList.add("chitti");
  div.innerHTML = `
    <label for ="${chitthi}">${chitthi}<label>
    <input type = "radio" id = "${chitthi}" name = "chitthi" value = "${chitthi}">`;
  document.querySelector(".chitti-container").appendChild(div);
}
function ShowUsers(name) {
  var userlist = document.getElementById("users");
  userlist.innerHTML = "";
  name.forEach((element) => {
    userlist.innerHTML += `${element}<br>`;
  });
}
function SendChittiToServer() {
  var chitthival = document.querySelector(
    'input[name="chitthi"]:checked'
  ).value;
  if (pass === true) {
    socket.emit("ChittiToPass", { chitthival, name, room });
    pass = false;
  }
}
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
