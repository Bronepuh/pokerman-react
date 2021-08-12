import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, logout, getUser, setInventory, setUserLocation } from '../action';
import { AuthorizationStatus } from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  id: null,
  name: '',
  inventory: [],
  location: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(getUser, (state, action) => {
      const user = action.payload[0];
      if(user) {
        state.id = user._id;
        state.name = user.login;
      } else {
        console.log('юзера нет');
      }
    })
    .addCase(setInventory, (state, action) => {
      const inventory = action.payload;
      if(inventory) {        
        state.inventory = inventory;
      } else {
        console.log('инвернтарь не получен');
      }
    })
});

export { user };
