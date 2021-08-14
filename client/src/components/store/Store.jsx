import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../navbar/Navbar';
import './store.scss'
import { AppRoute } from '../../const';
// import { useHistory } from 'react-router';
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

const Store = ({ user }) => {

  const roomId = ROOMS.USER_ROOM
  const [newInventory, setNewInventory] = useState([]);
  const dispatch = useDispatch();
  const id = user.id;

  const item = {
    owner: id,
    title: 'красные труселя',
    description: 'Эти легендарный труселя необходимый атрибут одежды в начале игры. Они позволят Вам не быть голым. Берегите их их и они принесут Вам удачу',
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
      <div className="store">
        <Navbar user={user} roomId={roomId} />
        <div className="store__inner">
          <div className="store__showcase">
            <div className="store__picture">
              <img src="img/showcase.jpg" alt="витрина" />
            </div>
            <div className="store__good">
              <img src="img/underpants.png" alt="товар" />
            </div>
            <div className="store__promo">
              <button type="button" className="store__button" onClick={createUnderpants}>Получить чудо трусы</button>
              <div className="store__promo-description">
                <p className="store__promo-title">красные труселя</p>
                <p className="store__promo-text">Эти легендарный труселя необходимый атрибут одежды в начале игры. Они позволят Вам не быть голым. Берегите их их и они принесут Вам удачу</p>
                <p className="store__promo-power">luck<span>+3</span></p>
                <p className="store__promo-power">charm<span>+1</span></p>                
              </div>
            </div>
          </div>

          <InventoryList inventory={newInventory} isStore={true}/>

        </div>
      </div>
    );
  } else {
    return <Loader />
  }
}

export default Store;
