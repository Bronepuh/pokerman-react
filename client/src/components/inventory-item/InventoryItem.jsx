import React from 'react';
import './inventory-item.scss'
import { useDispatch } from 'react-redux';
import { setChosenItem } from '../../store/action';


const InventoryItem = ({ item }) => {
  // const [newChoseItem, setNewChoseItem] = useState({});
  const dispatch = useDispatch();

  const handleItemFocus = () => {
    // setNewChoseItem(item);
    dispatch(setChosenItem(item));
  }

  const handleItemBlur = () => {
    // setNewChoseItem({});
    // dispatch(setChosenItem({}));
  }

  if (!item.isActive) {
    return (
      <li className='inventory__item' tabIndex="0" onFocus={handleItemFocus} onBlur={handleItemBlur}>
        <div className="inventory__item-inner">
          <p className="inventory__item-title">{item.title}</p>
          <img className="inventory__item-picture" src="img/underpants.png" alt="" />
        </div>
        <div className="inventory__item-cloth">
          <img className="inventory__item-cloth-picture" src="img/underpants.png" alt="" />
        </div>
      </li>
    );
  } else {
    return (
      <li className='inventory__item inventory__item--active' tabIndex="0" onFocus={handleItemFocus} onBlur={handleItemBlur}>
        <div className="inventory__item-inner">
          <p className="inventory__item-title">{item.title}</p>
          <img className="inventory__item-picture" src="img/underpants.png" alt="" />
        </div>
        <div className="inventory__item-cloth">
          <img className="inventory__item-cloth-picture" src="img/underpants.png" alt="" />
        </div>
      </li>
    );
  }
}

export default InventoryItem;
