import { combineReducers } from 'redux';
import { user } from './user/user';
import { inventory } from './inventory/inventory'; 
import { room } from './room/room'; 

const NameSpace = {
  USER: 'USER',
  INVENTORY: 'INVENTORY',
  ROOM: 'ROOM',
};

export { NameSpace };

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.INVENTORY]: inventory,
  [NameSpace.ROOM]: room,
});


