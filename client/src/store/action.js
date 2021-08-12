import { createAction } from '@reduxjs/toolkit';

const ActionType = {
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'user/redirectToRoute',
  SET_USER: 'user/setUser',
  SET_USER_LOCATION: 'user/setUserLocation',
  SET_INVENTORY: 'user/setInventory',
  SET_ROOMS: 'room/setRoomBD',
  SET_ONLINE_USERS: 'room/setOnlineUsers',
  SET_CHOSEN_ITEM: 'inventory/getInventory',
};

const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

const logout = createAction(ActionType.LOGOUT);
const setUserLocation = createAction(ActionType.SET_USER_LOCATION, (location) => ({payload: location}));

const getUser = createAction(ActionType.SET_USER, (user) => ({ payload: user }));

const setInventory = createAction(ActionType.SET_INVENTORY, (inventory) => ({ payload: inventory }));

const setRooms = createAction(ActionType.SET_ROOMS, (rooms) => ({ payload: rooms }));
const setOnlineUsers = createAction(ActionType.SET_ONLINE_USERS, (users) => ({ payload: users }));

const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({ payload: url }));

const setChosenItem = createAction(ActionType.SET_CHOSEN_ITEM, (item) => ({ payload: item }));

export { ActionType, requireAuthorization, logout, redirectToRoute, getUser, setInventory, setChosenItem, setRooms, setOnlineUsers, setUserLocation };
