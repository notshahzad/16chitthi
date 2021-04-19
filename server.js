const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const {gamelogin ,UsersInWaiting ,Offliner ,GetUserById ,CheckAuth} = require('./utils/gamelogic');

const app = express();
const HttpServer = http.createServer(app);
const io = socketio(HttpServer);
const bodyParser = require('body-parser');

var destination = '/index.html'

app.use(express.static(`${__dirname}/views`));
app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine','ejs')

io.on('connect',socket=>{
    const id = socket.id
    console.log(id)
    socket.on('login',({name,room})=>{
        login = gamelogin({name,room,id})
        if(login!=false){
            socket.join(room)
            waiting = UsersInWaiting(room)
            io.to(room).emit('send_users',waiting)
        }else{
            socket.emit('redirect',destination)
        }
    })
    socket.on('check_auth',({name,room})=>{
        user = CheckAuth({name,room})
        if(user){
            console.log(user)
        }else{
            socket.emit('redirect',destination)
        }
    })
    socket.on('disconnect',()=>{
        Offliner(id)
        userleft = GetUserById(id)
        if(userleft){    
            waiting = UsersInWaiting(userleft.room)
            io.to(userleft.room).emit('send_users',waiting)
        }
    })
});
PORT = 3000 ||process.env.PORT
HttpServer.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})