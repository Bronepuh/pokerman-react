import React from 'react';
import ConnectionItem from '../connection-item/ConnectionItem';
import './connection.scss'

const Connection = ({ room }) => {
  if (room) {
    return (
      <section className="page-room__connection connection">
        <h2 className="connection__title">Сейчас в комнате:</h2>
        <ul className="connection__list">
          {room.online_users.map((online_user) => <ConnectionItem key={online_user.id} user={online_user} />)}
        </ul>
      </section>
    );
  } else {
    return (
      <section className="page-room__connection connection">
        <h2 className="connection__title">Сейчас в комнате:</h2>
        <ul className="connection__list">

          <ConnectionItem />
        </ul>
      </section>
    );
  }
}

export default Connection;
