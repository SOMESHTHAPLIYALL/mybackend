//Node server which will handle socket io connection


const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection' , socket => {
    socket.on('new-user-joined' , name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //Broadcast.emit gives info to other user exluding you
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})