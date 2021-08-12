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

const User = ({ user }) => {
  const roomId = ROOMS.USER_ROOM
  const [newInventory, setNewInventory] = useState([]);
  const dispatch = useDispatch();
  // const history = useHistory();
  const id = user.id;

  const rooms = useSelector(getRooms);
  console.log('Комнаты из Стора: ', rooms);

  const item = {
    owner: id,
    title: 'красные труселя',
    description: 'Эти легендаоные труселя являются незаменимым талисманом удачливого игрока. Данный артефакт появляется в начале игры и очень сильно привязывается к своему хозяину. Берегите его и он отплатит Вам, принеся удачу (но это неточно)',
    power: [{ luck: 3 }, { charm: 1 }],
    img: 'img/underpants',
    isActive: false,
  }

  const socketRelocation = useCallback(() => {
    socket.emit('ROOM:RELOCATION', { user, roomId })    
  }, [roomId, user]);



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
        console.log('пришло новое состояние комнат', rooms);
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


  const createUnderpants = async () => {
    try {
      await axios.post('/api/inventory/add', { item, id })
        .then(() => {
          getInventory();
        })
    } catch (error) {
      console.log(error);
    }
  }

  if (user) {
    return (
      <div className="page-user">
        <div className="navbar">
          <div className="navbar__user-name">{user.name}</div>
          <Link to={AppRoute.MAIN} className="user__logo" onClick={socketRelocation} >Pokerman</Link>
        </div>
        <h2 className="page-reg__title">Личный кабинет</h2>
        <div className="page-user__inventory inventory">
          <InventoryList inventory={newInventory} />
          <InventoryPromo user={user} getInventory={getInventory} />
        </div>
        <button type="button" className="page-user__get-underpants" onClick={createUnderpants}>Создать трусы</button>
        <button type="button" className="page-user__get-underpants" onClick={getInventory}>Получить трусы</button>
      </div>
    );
  } else {
    return <Loader />
  }
}

export default User;