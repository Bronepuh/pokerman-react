import { createReducer } from '@reduxjs/toolkit';
import { setChosenItem } from '../action';
// import {  } from '../../const';

const initialState = {
  chosenItem: {},
};

const inventory = createReducer(initialState, (builder) => {
  builder
    .addCase(setChosenItem, (state, action) => {
      state.chosenItem = action.payload;
    })
});

export { inventory };
