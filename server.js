const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const {
  gamelogin,
  UsersInWaiting,
  Offliner,
  GetUserById,
  CheckAuth,
  UsersInCurrentRoom,
  sendchitti,
  GenerateChitti,
  UserSendingChtthi,
  ChangeUserId,
  ChitthiPass,
} = require("./utils/gamelogic");

const app = express();
const HttpServer = http.createServer(app);
const io = socketio(HttpServer);
const bodyParser = require("body-parser");
const { mainModule } = require("process");

var destination = "/index.html";

app.use(express.static(`${__dirname}/views`));
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('view engine','ejs')

io.on("connect", (socket) => {
  const id = socket.id;
  //console.log(id)
  socket.on("login", ({ name, room }) => {
    login = gamelogin({ name, room, id });
    if (login != false) {
      socket.join(room);
      waiting = UsersInWaiting(room);
      io.to(room).emit("send_users", waiting);
      var allusers = UsersInCurrentRoom(room);
      var is_start;
      if (allusers.length == 4) {
        is_start = true;
        io.to(room).emit("game_start", is_start);
      } else {
        is_start = false;
        io.to(room).emit("game_start", is_start);
      }
    } else {
      socket.emit("redirect", destination);
    }
  });
  socket.on("Start-game", ({ name, room }) => {
    user = CheckAuth({ name, room });
    if (user != false) {
      socket.join(user.room);
      socket.broadcast.to(user.room).emit("auto-submit");
      GenerateChitti(room);
      ChangeUserId(name, socket.id);
      const chitthi2send = sendchitti(name, room);
      socket.emit("show_chitthi", chitthi2send);
      waiting = UsersInWaiting(room);
      io.to(room).emit("send_users", waiting);
      const first = UserSendingChtthi(room);
      if (socket.id == first.id) {
        io.to(socket.id).emit("Turn");
      }
    } else {
      socket.emit("redirect", destination);
    }
  });
  socket.on("ChittiToPass", ({ chitthival, name, room }) => {
    ChitthiPass(chitthival, name, room);
    io.to(room).emit("update-chitthi");
    pass = UserSendingChtthi(room);
    io.to(pass.id).emit("Turn");
    //waiting = UsersInWaiting(room);
    //io.to(room).emit("send_users", waiting);
  });
  socket.on("SendMeNewChitthi", ({ name, room }) => {
    const chitthi2send = sendchitti(name, room);
    socket.emit("show_chitthi", chitthi2send);
  });
  socket.on("disconnect", () => {
    Offliner(id);
    userleft = GetUserById(id);
    if (userleft) {
      waiting = UsersInWaiting(userleft.room);
      io.to(userleft.room).emit("send_users", waiting);
    }
  });
});
PORT = 3000 || process.env.PORT;
HttpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
