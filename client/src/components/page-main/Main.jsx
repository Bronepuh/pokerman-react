import React, { useCallback, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import './page-main.scss'
import { getAuthorizationStatus } from '../../store/user/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { isCheckedAuth } from '../../common';
import Loader from '../loader/Loader';
// import browserHistory from '../../browser-history';
import axios from 'axios';
import { getRooms } from '../../store/room/selectors';
import { socket } from '../../socket';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROOMS } from '../../const';
import { setRooms } from '../../store/action';

const getAllOnlineUsers = (rooms) => {
  let count = 0;
  rooms.forEach((room) => {
    count += room.online_users.length;
  });
  return count;
}

const Main = ({ user }) => {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const roomId = ROOMS.MAIN_ROOM;
  const rooms = useSelector(getRooms);
  console.log('Комнаты из Стора: ', rooms);
  const onlineUsersLength = getAllOnlineUsers(rooms);

  const dispatch = useDispatch();

  const socketRelocation = useCallback(() => {
    socket.emit('ROOM:RELOCATION', { user, roomId })
  }, [roomId, user]);

  const createRoom = async () => {
    try {
      axios.post('api/room/add-room', { name: 'ROOM_2' })
    } catch (error) {
      console.log(error);
    }
  }

  //Sockets
  useEffect(() => {
    if (user.id) {
      socket.emit('ROOM:JOIN', { user, roomId });
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



  if (isCheckedAuth(authorizationStatus)) {
    return (
      <Loader />
    );
  }

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <div className='page-main'>
        <Navbar user={user} roomId={roomId} isMainPage={true}/>
        <div className="page-main__navigation navigation">
          <div className="navigation__panel">
            <div className="navigation__info info">
              <p className="info__name">{`Вы вошли как: ${user.name}`}</p>
              <p className="info__statistic">{`игроков онлайн: ${onlineUsersLength}`}</p>
            </div>
          </div>
        </div>
        <div className="page-main__inner">
        <section className="page-main__rooms">
          <h3>Список комнат:</h3>
          <ul className="page-main__rooms__list">
            <li className="page-main__rooms__item">
              <Link to={'/room-1'} className="page-main__rooms__button" type="button" onClick={socketRelocation}>В комнату 1</Link>
            </li>
            <li className="page-main__rooms__item">
              <Link to={'/room-2'} className="page-main__rooms__button" type="button" onClick={socketRelocation}>В комнату 2</Link>
            </li>
            {user.name === 'Bronepuh' &&
              <li className="page-main__rooms__item">
                <button className="page-main__button" type="button" onClick={createRoom}>Создать комнату</button>
              </li>
            }
          </ul>
        </section>
        <section className="page-main__promo promo">
          <div className="promo__picture">
            <img src="img/poker-table-bg.png" alt="промо" />
          </div>
        </section>
        </div>
      </div>
    );
  }

  return (
    <div className='page-main'>
      <Navbar roomId={roomId} isMainPage={true}/>
      <div className="page-main__navigation navigation">
        <div className="navigation__panel">
          <div className="navigation__info info">
            <p className="info__name">{`Вы вошли как: Неопознанный Енот`}</p>
            <p className="info__statistic">{`игроков онлайн: ${onlineUsersLength}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;
