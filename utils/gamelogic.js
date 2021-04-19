users=[]
function gamelogin({name,room,id}){
    room_users = users.filter(user =>user.room === room)
    if(room_users.length == 0){
        user={name ,room ,id}
        user['chitthi'] = []
        user['online'] = true
        users.push(user)
        return users
    }
    else if(room_users.length<=3){
        user = room_users.find(user => user.name === name && user.room === room)
        if(!user){
            user={name ,room ,id}
            user['chitthi']=[]
            user['online'] =  true
            users.push(user)
            return users
        }else if(user && user.online == false){
            user.id = id
            user.online = true
            return users
        }else if(user && user.online == true){
            console.log(id)
            console.log(user)
            return false
        }
    }
    else if(room_users.length==4){
        return false
    }
}
function GetUserById(id){
    const user = users.find(user=> user.id === id)
    if(user){
        return user
    }
}
function UsersInWaiting(room){
    const user = users.filter(user =>user.room === room && user.online == true)
    var UserNames = []
    user.forEach(element => {
        UserNames.push(element.name)       
    });
    return UserNames
}
function Offliner(id){
    const user = users.find(user => user.id === id)
    if(user){   
        user.online = false
    }
}
function CheckAuth({name,room}){
    const user = users.find(user => user.name === name && user.room === room)
    user.online = true
    return user
}
exports.gamelogin = gamelogin
exports.UsersInWaiting = UsersInWaiting
exports.Offliner = Offliner
exports.GetUserById = GetUserById
exports.CheckAuth = CheckAuth