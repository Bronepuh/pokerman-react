import React, { useEffect, useState, useRef } from 'react';
import './form.scss';
import { initRegForm } from './init-form1';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { login, reg } from '../../store/api-actions';
import {encode} from '../../common'


const Form1 = ({ pageName }) => {

  const loginRef = useRef()

  const [form, setForm] = useState({
    login: '',
    email: '',
    password: '',
  })

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const resetForm = () => {
    setForm({
      login: '',
      email: '',
      password: '',
    })
  }

  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: encode(evt.target.value)});
  }

  const handleReg = async () => {
    console.log(form);

    if(!form.login.length) {
      loginRef.current.textContent = 'логин обязателен';
      loginRef.current.style = 'color: #880000';
      return console.log('нет логина!');
    }

    dispatch(reg(form));
    resetForm();
  }

  const handleLogin = () => {
    dispatch(login(form));
    resetForm()
  }

  useEffect(() => {
    initRegForm();
  }, [])

  return (
    <form className="form" onSubmit={(evt) => {evt.preventDefault()}}>
      <div className="form__cover"></div>
      <div className="form__loader">
        <div className="spinner active">
          <svg className="spinner__circular" viewBox="25 25 50 50">
            <circle className="spinner__path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10"></circle>
          </svg>
        </div>
      </div>
      <div className="form__content">
        {pageName === 'reg' &&
          <h1>Регистрация</h1>
        }
        {pageName !== 'reg' &&
          <h1>Авторизация</h1>
        }
        {pageName === 'reg' &&
          <div className="styled-input">
            <input type="text" className="styled-input__input" name="login" min="2" max="15" onChange={handleChange} value={form.value} required={true} />
            <div ref={loginRef} className="styled-input__placeholder">
              <span className="styled-input__placeholder-text">Логин</span>
            </div>
            <div className="styled-input__circle"></div>
          </div>
        }

        <div className="styled-input">
          <input type="email" className="styled-input__input" name="email" onChange={handleChange} value={form.value} required={true} />
          <div className="styled-input__placeholder">
            <span className="styled-input__placeholder-text">Ваша&nbsp;почта</span>
          </div>
          <div className="styled-input__circle"></div>
        </div>
        <div className="styled-input">
          <input type="password" className="styled-input__input" name="password" min="2" max="100" onChange={handleChange} value={form.value} required={true} />
          <div className="styled-input__placeholder">
            <span className="styled-input__placeholder-text">Пароль</span>
          </div>
          <div className="styled-input__circle"></div>
        </div>

        {pageName === 'reg' &&
          <button type="button" className="styled-button" onClick={handleReg}>
            <span className="styled-button__real-text-holder">
              <span className="styled-button__real-text">Зарегистрироваться</span>
              <span className="styled-button__moving-block face">
                <span className="styled-button__text-holder">
                  <span className="styled-button__text">Зарегистрироваться</span>
                </span>
              </span><span className="styled-button__moving-block back">
                <span className="styled-button__text-holder">
                  <span className="styled-button__text">Зарегистрироваться</span>
                </span>
              </span>
            </span>
          </button>
        }

        {pageName === 'auth' && authorizationStatus !== 'AUTH' &&
          <button type="button" className="styled-button" onClick={handleLogin}>
            <span className="styled-button__real-text-holder">
              <span className="styled-button__real-text">Войти</span>
              <span className="styled-button__moving-block face">
                <span className="styled-button__text-holder">
                  <span className="styled-button__text">Войти</span>
                </span>
              </span><span className="styled-button__moving-block back">
                <span className="styled-button__text-holder">
                  <span className="styled-button__text">Войти</span>
                </span>
              </span>
            </span>
          </button>
        }

      </div>
    </form>

  );

}

export default Form1;
