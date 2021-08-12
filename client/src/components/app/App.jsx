import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from '../page-main/Main';
import Auth from '../page-auth/Auth';
import { AppRoute } from '../../const';
import Reg from '../page-reg/Reg';
import { getAuthorizationStatus, getUser } from '../../store/user/selectors';
import { setUserLocation } from '../../store/action';
import Loader from '../loader/Loader';
import { isCheckedAuth } from '../../common';
import './app.scss'
import User from '../user/User';
import Room from '../page-room/Room';
import { socket } from '../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { ROOMS } from '../../const';
import browserHistory from '../../browser-history';
// import axios from 'axios';

socket.on("connect", () => {
  if (socket.connected) {
    console.log('успешно соединился');
  }
});

function App() {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);

  socket.on("disconnect", () => {
    console.log('соединение разорвано');
    socket.emit('ROOM:USER_OUT', user);
  });


  const dispatch = useDispatch();

  if (user.location === '') {
    dispatch(setUserLocation(AppRoute.MAIN));
  }

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main user={user} />
        </Route>
        <Route exact path={AppRoute.REG}>
          <Reg />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <Auth />
        </Route>
        <Route exact path={AppRoute.PROFILE}>
          <User user={user} />
        </Route>
        <Route exact path={AppRoute.ROOM_1}>
          <Room user={user} roomId={ROOMS.ROOM_1} />
        </Route>
        <Route exact path={AppRoute.ROOM_2}>
          <Room user={user} roomId={ROOMS.ROOM_2} />
        </Route>
      </Switch>
    </BrowserRouter>

  )
}

export default App;