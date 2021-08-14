import React, { useState, useEffect, useCallback } from 'react';
import { AppRoute } from '../../const';
// import { useHistory } from 'react-router';
import './page-user.scss'
import '../../scss/inventory.scss'
import axios from 'axios'
import { setInventory } from '../../store/action';
import { useSelector, useDispatch } from 'react-redux';
import InventoryList from '../inventory-list/Inventory-list';
import InventoryPromo from '../inventory-promo/InventoryPromo';
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';
import { socket } from '../../socket';
import { ROOMS } from '../../const';
import { getRooms } from '../../store/room/selectors';
import { setRooms } from '../../store/action';
import Navbar from '../navbar/Navbar';

const User = ({ user }) => {
  const roomId = ROOMS.USER_ROOM
  const [newInventory, setNewInventory] = useState([]);
  const dispatch = useDispatch();
  const id = user.id;

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
  //End Sockets

  const getInventory = useCallback(async () => {
    try {
      await axios.get('/api/inventory', { params: id }).then((res) => {
        const data = res.data;
        dispatch(setInventory(data))
        setNewInventory(data);
      })
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id])

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  if (user) {
    return (
      <div className="page-user">
        <Navbar user={user} roomId={roomId} />
        <div className="page-user__inventory inventory">
          <InventoryList inventory={newInventory} />
          <InventoryPromo user={user} getInventory={getInventory} />
        </div>
      </div>
    );
  } else {
    return <Loader />
  }
}

export default User;