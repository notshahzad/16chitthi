const socket = io();
const user_names = []
var name = getParameterByName('name01');
var room = getParameterByName('room01');
document.getElementById('name').value = name
document.getElementById('room').value = room
socket.emit('login',{name,room});
socket.on('send_users',(waiting)=>{
    ShowUsers(waiting)
})
socket.on('redirect',destination=>{
    window.location.href = destination
})
function ShowUsers(name){
    var userlist = document.getElementById('users')
    userlist.innerHTML = ''
    name.forEach(element => {
        userlist.innerHTML+=`${element}<br>`
    });
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}