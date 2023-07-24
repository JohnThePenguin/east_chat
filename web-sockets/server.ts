const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
    console.log('New client inside');
    // console.log(socket);
    // console.log();

    socket.on('message', (msg) => {
        console.log('got ' + msg);
        io.emit('message', msg);
    });


    io.emit('message', 'Welcome to my socket');
});

const port = 3131;
server.listen(port, () => {
    console.log(`WebSocket server running on ${port}`);
});