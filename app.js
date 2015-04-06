var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;
 
app.get('/',function(req,res){

res.sendFile(__dirname + '/index.html');
});
 
io.on('connection',function(socket){
console.log("user id : %s",socket.id);
 
socket.broadcast.emit('message','New User Connected ','Chat console Says');
 
socket.on('message',function(msj){
io.emit('message',msj,socket.id);
});
 
socket.on('disconnect',function(){
console.log("Disconnect : %s",socket.id);
});
 
});
 
http.listen(PORT,function(){
console.log('The server listen to %s',PORT);
});
