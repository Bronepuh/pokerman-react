import React, { useCallback } from 'react';
import { AppRoute } from '../../const';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { logout } from '../../common';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { socket } from '../../socket';

import './navbar.scss'

const Navbar = ({ user, roomId, isMainPage }) => {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    dispatch(logout);
    socket.emit('USER_LEAVE', user)
    history.push(AppRoute.MAIN)
    window.location.reload();
  }

  const socketRelocation = useCallback(() => {
    socket.emit('ROOM:RELOCATION', { user, roomId })
  }, [roomId, user]);

  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    return (
      <div className="navbar">
        <Link to={AppRoute.MAIN} className="navbar__logo" onClick={socketRelocation}>
          <div className="stage">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>
        </Link>

        <div className="glitch-btn-container">
          <Link to={AppRoute.REG} className="glitch-btn" onClick={socketRelocation}>
            <div className="text">РЕГИСТРАЦИЯ<span className="hidden">&nbsp;</span></div>
            <div className="mask mask1">
              <span>РЕГИСТРАЦИЯ</span>
            </div>
            <div className="mask mask2">
              <span>РЕГИСТРАЦИЯ</span>
            </div>
            <div className="mask mask3">
              <span>РЕГИСТРАЦИЯ</span>
            </div>
          </Link>
        </div>

        <div className="glitch-btn-container glitch-btn-container--enter">
          <Link to={AppRoute.SIGN_IN} className="glitch-btn" onClick={socketRelocation}>
            <div className="text">ВХОД<span className="hidden">&nbsp;</span></div>
            <div className="mask mask1">
              <span>ВХОД</span>
            </div>
            <div className="mask mask2">
              <span>ВХОД</span>
            </div>
            <div className="mask mask3">
              <span>ВХОД</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      {isMainPage &&
        <div to={AppRoute.MAIN} className="navbar__logo">
          <div className="stage">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>
        </div>
      }

      {!isMainPage &&
        <Link to={AppRoute.MAIN} className="navbar__logo" onClick={socketRelocation}>
          <div className="stage">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>
        </Link>
      }

      <div className="avatar">
        <div className="cabinet-btn-body">
          <Link to={AppRoute.PROFILE} className="cabinet-btn" onClick={socketRelocation}>
            <img className="cabinet-btn-avatar" src="img/avatar.jpg" alt="аватар" />
          </Link>
        </div>
      </div>

      <div className="glitch-btn-container">
        <Link to={'#'} className="glitch-btn" onClick={handleLogout}>
          <div className="text">ВЫЙТИ<span className="hidden">&nbsp;</span></div>
          <div className="mask mask1">
            <span>ВЫЙТИ</span>
          </div>
          <div className="mask mask2">
            <span>ВЫЙТИ</span>
          </div>
          <div className="mask mask3">
            <span>ВЫЙТИ</span>
          </div>
        </Link>
      </div>

    </div >
  );
}

export default Navbar;
