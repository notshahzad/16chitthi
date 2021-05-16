var socket = io()
var name = getParameterByName('name')
var room = getParameterByName('room')
console.log(name,room)
socket.emit('check_auth',{name,room})
socket.on('redirect',destination=>{
    window.location.href = destination
})
socket.on('show_chitthi',chitthi2send=>{
    chitthi2send.forEach(chitthi => {
        ShowChitti(chitthi)
    });
})
function ShowChitti(chitthi){
    console.log(chitthi)
    const div = document.createElement('div')
    div.classList.add('chitti')
    div.innerHTML = `<p>${chitthi}</p>`
    document.querySelector('.chitti-container').appendChild(div)
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}