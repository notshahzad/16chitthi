users = [];
function gamelogin({ name, room, id }) {
  if (name.length != 0 && room.length != 0) {
    room_users = users.filter((user) => user.room === room);
    if (room_users.length == 0) {
      user = { name, room, id };
      user["chitthi"] = [];
      user["online"] = true;
      user["turn"] = false;
      users.push(user);
      return users;
    } else if (room_users.length <= 3) {
      user = room_users.find(
        (user) => user.name === name && user.room === room
      );
      if (!user) {
        user = { name, room, id };
        user["chitthi"] = [];
        user["online"] = true;
        user["turn"] = false;
        users.push(user);
        return users;
      } else if (user && user.online == false) {
        user.id = id;
        user.online = true;
        return users;
      } else if (user && user.online == true) {
        console.log(id);
        console.log(user);
        return false;
      }
    } else if (room_users.length == 4) {
      return false;
    }
  } else {
    return false;
  }
}
function GetUserById(id) {
  const user = users.find((user) => user.id === id);
  if (user) {
    return user;
  }
}
function UsersInWaiting(room) {
  const user = users.filter(
    (user) => user.room === room && user.online == true
  );
  var UserNames = [];
  user.forEach((element) => {
    UserNames.push(element.name);
  });
  return UserNames;
}
function Offliner(id) {
  const user = users.find((user) => user.id === id);
  if (user) {
    user.online = false;
  }
}
function CheckAuth({ name, room }) {
  try {
    const user = users.find((user) => user.name === name && user.room === room);
    user.online = true;
    return user;
  } catch {
    return false;
  }
}
function UsersInCurrentRoom(room) {
  return users.filter((user) => user.room === room);
}
function GenerateChitti(room) {
  const user = UsersInCurrentRoom(room);
  if (user[0]["chitthi"].length == 0) {
    var chitti = [
      { name: "aam", value: 0 },
      { name: "jaam", value: 0 },
      { name: "kaju", value: 0 },
      { name: "badam", value: 0 },
    ];
    list2 = [];
    for (j = 0; j < 4; j++) {
      for (i = 0; i < 4; i++) {
        random = Math.floor(Math.random() * 4);
        if (chitti[random].value < 4) {
          chitti[random].value++;
          user[j]["chitthi"].push(chitti[random].name);
        } else {
          i--;
        }
      }
    }
  }
}
function sendchitti(name, room) {
  const user = users.find((user) => user.name === name && user.room === room);
  return user.chitthi;
}
function UserToStart(room) {
  const user = users.filter((user) => user.room === room);
  user[0].turn = true;
  return user[0];
}
function ChangeUserId(name, socid) {
  const user = users.find((user) => user.name === name);
  user.id = socid;
}
function ChitthiPass(chitthi, name, room) {
  const allusers = users.filter((user) => user.room === room);
  const crntuser = users.find(
    (user) => user.room === room && user.name === name
  );
  for (var i = 0; i < crntuser["chitthi"].length; i++) {
    if (crntuser["chitthi"][i] === chitthi) {
      crntuser["chitthi"].splice(i, 1);
      break;
    }
  }
  var crntuserindex = allusers.indexOf(crntuser);
  allusers[crntuserindex + 1]["chitthi"].push(chitthi);
}
exports.gamelogin = gamelogin;
exports.UsersInWaiting = UsersInWaiting;
exports.Offliner = Offliner;
exports.GetUserById = GetUserById;
exports.CheckAuth = CheckAuth;
exports.UsersInCurrentRoom = UsersInCurrentRoom;
exports.GenerateChitti = GenerateChitti;
exports.sendchitti = sendchitti;
exports.UserToStart = UserToStart;
exports.ChangeUserId = ChangeUserId;
exports.ChitthiPass = ChitthiPass;