const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const socket = require('socket.io');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'frontEnd', 'dist')));


const chatPath = path.resolve(__dirname, "db","chats.json");
const usersPath = path.resolve(__dirname, "db","users.json");

app.post('/api/user/signup', (req,res)=>{
    let allUsersTxt = fs.readFileSync(usersPath, {encoding:'utf8'});
    let allUsers = JSON.parse(allUsersTxt);
    allUsers.push(req.body);
    fs.writeFileSync(usersPath, JSON.stringify(allUsers), {encoding:'utf8'});
    res.json({msg:'User Register', user:req.body});
});

app.post('/api/user/login', (req,res)=>{
    let allUsersTxt = fs.readFileSync(usersPath, {encoding:'utf8'});
    let allUsers = JSON.parse(allUsersTxt);
    let user = allUsers.find(u=>u.userName == req.body.userName && u.password==req.body.password);
    if(user)
        res.json({msg:'User Login', user});
    else
        res.json({msg:'User Not Exist'});
});

app.get('/api/users', (req,res)=>{
    let allUsersTxt = fs.readFileSync(usersPath, {encoding:'utf8'});
    let allUsers = JSON.parse(allUsersTxt);
    res.json({users:allUsers});
});

app.get('/api/chats/:u1/:u2', (req,res)=>{
    let allChatTxt = fs.readFileSync(chatPath, {encoding:'utf8'});
    let allChat = JSON.parse(allChatTxt);
    const {u1, u2} = req.params;
    res.json({chats:allChat.filter(v=>(v.sender==u1&&v.reciver==u2) || (v.reciver==u1&&v.sender==u2))});
});

app.get('/*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'frontEnd', 'dist', 'index.html'));
})

const listener = app.listen(process.env.PORT || 8080, ()=>{

    console.log(`listening on http://localhost:${listener.address().port}`);
});

const io = socket(listener);
io.on("connection", (socket)=>{
    socket.on('chat', data=>{
        let allChatTxt = fs.readFileSync(chatPath, {encoding:'utf8'});
        let allChat = JSON.parse(allChatTxt);
        data.time = new Date();
        allChat.push(data);
        fs.writeFileSync(chatPath, JSON.stringify(allChat), {encoding:'utf8'});
        socket.emit('chatback',null);
        socket.broadcast.emit('chatback',null);
    })
});