import express from 'express';
import mongoose from 'mongoose';
import routerAuth from './routes/auth.route.js';
import routerUser from './routes/user.route.js';
import routerInventory from './routes/inventory.route.js';
import routerRoom from './routes/room.route.js';
import routerOnlineUser from './routes/onlineUser.route.js';
import routerConnection from './routes/connection.route.js';
import config from './config/default.js';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import favicon from 'express-favicon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;

const ROOMS = [
  {
    name: 'MAIN_ROOM',
    room_id: '6111901e25947259b089bdb7',
    online_users: [],
  },
  {
    name: 'REG_ROOM',
    room_id: '611190f825947259b089bdc7',
    online_users: [],
  },
  {
    name: 'LOGIN_ROOM',
    room_id: '6111910925947259b089bdcb',
    online_users: [],
  },
  {
    name: 'USER_ROOM',
    room_id: '6111911625947259b089bdcf',
    online_users: [],
  },
  {
    name: 'ROOM_1',
    room_id: '6111912325947259b089bdd3',
    online_users: [],
    messages: [],
  },
  {
    name: 'ROOM_2',
    room_id: '6111912a25947259b089bdd7',
    online_users: [],
    messages: [],
  },
]

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const checkUserInRoom = (someUser, someRoom) => {
  return someRoom.online_users.find((online_user) => online_user.id === someUser.id)
}

const pushUserToRoom = (user, roomId) => {
  const room = ROOMS.find((item) => item.room_id === roomId);
  let isUser = checkUserInRoom(user, room);
  if (!isUser) {
    room.online_users.push(user);
    io.emit('SEND_NEW_ROOMS', ROOMS)
  }
}

const deleteUserFromRoom = (user, roomId) => {
  const room = ROOMS.find((item) => item.room_id === roomId);
  if (room && user) {
    room.online_users.forEach(function (el, i) {
      if (el.id == user.id) room.online_users.splice(i, 1)
    })
  }
  io.emit('SEND_NEW_ROOMS', ROOMS)
}

const deleteUserFromAllRooms = (someUser) => {
  console.log('комната: ');
  console.log('вырезать', someUser);
  ROOMS.forEach((room) => {
    room.online_users.forEach(function (el, i) {
      if (el.id == someUser.id) room.online_users.splice(i, 1)
    })
  })
}

io.on("connection", (socket) => {
  console.log('connection started');

  socket.on("disconnect", () => {
    console.log('DISCONNECTED');
    if (socket.user) {
      deleteUserFromAllRooms(socket.user);
      io.emit('SEND_NEW_ROOMS', ROOMS)
    };
  });

  socket.on('ROOM:JOIN', ({ user, roomId }) => {
    socket.user = user;
    console.log('произошел джоин');
    if (user) {
      pushUserToRoom(user, roomId)
    }
    io.emit('SEND_NEW_ROOMS', ROOMS)
  })

  socket.on('ROOM:RELOCATION', ({ user, roomId }) => {
    console.log('ROOM:RELOCATION');
    deleteUserFromRoom(user, roomId);
    io.emit('SEND_NEW_ROOMS', ROOMS)
  })

  socket.on('GET_ROOMS', () => {
    io.emit('SEND_NEW_ROOMS', ROOMS);
  })

  socket.on('USER_LEAVE', (user) => {
    if (user) {
      deleteUserFromAllRooms(user);
      io.emit('SEND_NEW_ROOMS', ROOMS)
    }
    io.emit('SEND_NEW_ROOMS', ROOMS);
  })

  socket.on('SEND_MESSAGE', (msg) => {
    if (msg) {
      const room = ROOMS.find((item) => item.room_id === msg.roomId);
      room.messages.push(msg)
      io.emit('MESSAGE_CREATED', room.messages)
    }
  })

  socket.on('GET_MESSAGES', (roomId) => {
    console.log('GET_MESSAGES');
    if (roomId) {
      const room = ROOMS.find((item) => item.room_id === roomId);
      io.emit('MESSAGE_CREATED', room.messages)
    }
  })

  socket.once('CLEAR_MSG', (roomId) => {
    const room = ROOMS.find((item) => item.room_id === roomId);
    room.messages = [];
  })

});

app.use(express.json({ extended: true }));
app.use('/api/auth', routerAuth);
app.use('/api/user', routerUser);
app.use('/api/inventory', routerInventory);
app.use('/api/room', routerRoom);
app.use('/api/online_user', routerOnlineUser);
app.use('/api/connection', routerConnection);
// app.use(express.static('client/public'));

// app.use(favicon(__dirname + 'client/build/favicon.png')); 

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Bronepuh:Bronepuh13032005@cluster0.obcya.mongodb.net/pokerman?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(`server started on port ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }
}

start();

