import React from 'react';
import './inventory-promo.scss';
import { getChosenItem } from '../../store/inventory/selectors';
import { useSelector } from 'react-redux';
import Equipment from '../equipment/Equipment';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setChosenItem } from '../../store/action';

const InventoryPromo = ({ user, getInventory }) => {
  const chosenItem = useSelector(getChosenItem);
  const dispatch = useDispatch();
  
  const removeItem = async () => {
    const id = chosenItem._id;
    try {
      await axios.delete(`/api/inventory/delete/${id}`).then((res) => {  
        dispatch(setChosenItem({}));
        getInventory();        
      })
    } catch (error) {
      console.log(error);
    }
  }

  const clothOnItem = async () => {
    const id = chosenItem._id;
    try {
      await axios.put(`/api/inventory/active/${id}`, {id:id}).then((res) => {  
        console.log(res);
        dispatch(setChosenItem({}));
        getInventory();        
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (chosenItem._id) {
    return (
      <div className="inventory__promo">
        <div className="inventory__promo-settings">
          <p className="inventory__promo-title">{chosenItem.title}</p>
          <p className="inventory__promo-description">{chosenItem.description}</p>
          <ul className="inventory__promo-list">
            {
              chosenItem.power.map((powerItem, index) => {
                const powerItemKey = Object.keys(powerItem)[0];
                return (
                  <li className="inventory__promo-item" key={index}>{powerItemKey}
                    <span className="inventory__promo-power">{`+ ${powerItem[powerItemKey]}`}</span>
                  </li>
                )
              })
            }
          </ul>
          <button className="inventory__promo-delete" onClick={removeItem}>удалить</button>
          <button className="inventory__promo-put-on" onClick={clothOnItem}>{`${chosenItem.isActive ? 'снять': 'одеть'}`}</button>
        </div>
        <Equipment />
      </div>
    );
  }
  return (
    <div className="inventory__promo">
      <div className="inventory__promo-settings">
        <p className="inventory__promo-title">{user.name}</p>
      </div>
      <Equipment />
    </div>
  );
}

export default InventoryPromo;
