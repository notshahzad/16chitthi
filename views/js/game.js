var socket = io()
var name = getParameterByName('name')
var room = getParameterByName('room')
console.log(name,room)
socket.emit('check_auth',{name,room})
socket.on('redirect',destination=>{
    window.location.href = destination
})
socket.on('show_chitthi',chitthi2send=>{
    console.log('emitting')
    console.log(chitthi2send)
})
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}