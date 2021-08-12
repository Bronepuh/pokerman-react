import { NameSpace } from '../root-reducer';

const getRooms = (state) => state[NameSpace.ROOM].rooms;
const getOnlineUsers = (state) => state[NameSpace.ROOM].onlineUsers;

export { getRooms, getOnlineUsers };