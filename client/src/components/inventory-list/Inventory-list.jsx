import React from 'react';
import InventoryItem from '../inventory-item/InventoryItem';
import './inventory-list.scss'

const InventoryList = ({ inventory }) => {
  return (
    <ul className="inventory__list">
      {inventory.map((item, index) => <InventoryItem key={index} item={item} />)}
    </ul>
  )
}

export default InventoryList;
