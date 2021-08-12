import { createReducer } from '@reduxjs/toolkit';
import { setRooms, setOnlineUsers } from '../action';

const initialState = {
  rooms: [],  
};

const room = createReducer(initialState, (builder) => {
  builder
    .addCase(setRooms, (state, action) => {
      console.log('ACTION', action.payload);
      state.rooms = action.payload;
    })
    .addCase(setOnlineUsers, (state, action) => {
      state.onlineUsers = action.payload;
    })
});

export { room };
