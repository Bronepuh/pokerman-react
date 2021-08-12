import React from 'react';
import './connection-item.scss'

const ConnectionItem = ({user}) => {
  if(user) {
    return (
      <li className="connection__item">{user.name}</li>
    );
  }
  return null;
}

export default ConnectionItem;
