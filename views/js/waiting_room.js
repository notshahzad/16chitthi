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
socket.on('auto-submit',()=>{
    document.getElementById("subm1t").click()
})
socket.on('game_start',is_start=>{
    if(is_start == true){
        div = document.getElementById('start-game-form') 
        div.innerHTML += '<input id = "subm1t" type = "submit"></input>'
    }else{
        console.log(document.getElementById('start-game-form').innerHTML)
    }
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