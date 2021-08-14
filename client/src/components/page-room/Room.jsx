import Connection from '../connection/Connection';
import React, { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import './page-room.scss';
// import { getRoomBD } from '../../store/api-actions';
// import { getRoomFromStore, getOnlineUsers } from '../../store/room/selectors';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import { socket } from '../../socket';
// import { setOnlineUsers } from '../../store/action';
import { setRooms } from '../../store/action';
import { getRooms } from '../../store/room/selectors';
import Chat from '../app/chat/Chat';

const Room = ({ user, roomId }) => {

  const rooms = useSelector(getRooms);

  let room = null;

  if (rooms.length) {
    room = rooms.find((item) => item.room_id === roomId)
  }

  const dispatch = useDispatch();

  //Sockets
  useEffect(() => {
    if (user.id) {
      socket.emit('ROOM:JOIN', { user, roomId });
      socket.emit('GET_ROOMS');
    }
  }, [user.id, roomId, user])

  useEffect(() => {
    if (user.id) {
      socket.once('ROOM:USER_JOINED');
    }
  }, [user.id])

  useEffect(() => {
    if (user.id) {
      socket.on('SEND_NEW_ROOMS', (rooms) => {
        dispatch(setRooms(rooms))
      });
    }
  }, [user.id, dispatch])

  useEffect(() => {
    if (user.id) {
      socket.once("disconnect", () => {
        console.log('соединение разорвано');
      });
    }
  }, [user.id])


  // useEffect(() => {
  //   if (user.id && roomId) {
  //     socket.on('MESSAGE_CREATED', (messages) => {
  //       console.log(messages);
  //     });
  //   }
  // }, [user.id, roomId])
  //End Sockets

  return (
    <div className="page-room">
      <Navbar user={user} roomId={roomId} />
      <div className="page-room__inner">
        <Chat user={user} roomId={roomId} />
        <Connection room={room} />
      </div>
    </div>
  );
}

export default Room;
