import React, { useEffect, useState } from 'react';
import './chat.scss';
import { socket } from '../../../socket';

const Chat = ({ user, roomId }) => {
  const [messageList, setMessageList] = useState({});

  const scrollChat = () => {
    const testList = document.querySelector('.chat__list');
    testList.scrollTop = testList.scrollHeight;
  }

  useEffect(() => {
    if (messageList.length) {
      scrollChat();
    }
  }, [messageList.length])



  const handleSubmit = (evt) => {
    evt.preventDefault();
    const textInput = document.querySelector('.chat__textarea');

    if (user.id) {
      socket.emit('SEND_MESSAGE', {
        roomId: roomId,
        author: user.name,
        msg: evt.target[0].value
      })
    }
    textInput.value = '';
  }

  useEffect(() => {
    if (user.id) {
      socket.emit('GET_MESSAGES', roomId)
    }
  }, [user, roomId])

  socket.on('MESSAGE_CREATED', (messages) => {
    setMessageList(messages);
  })


  const clearMessages = () => {
    socket.emit('CLEAR_MSG', roomId);

    socket.emit('GET_MESSAGES', roomId);
    setMessageList([]);
  }

  return (
    <section className="chat">
      <h3 className="chat__title">Сообщения: </h3>
      <div className="chat__list-wrapper">
        <ul className="chat__list">
          {messageList.length > 0 &&
            messageList.map((msg, idx) => {
              return (
                <li className="chat__item" key={idx} >
                  <div className="chat__avatar">{msg.author}</div>
                  <div className="chat__message">
                    <p className="chat__text">{msg.msg}</p>
                  </div>
                </li>)
            })}

        </ul>
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <textarea className="chat__textarea" type="text" />
        <button className="chat__btn" type="submit">ok</button>
      </form>
      {user.name === 'Bronepuh' &&
        <button className="chat__message" onClick={clearMessages}>clear messages</button>
      }

    </section>
  );
}

export default Chat;
