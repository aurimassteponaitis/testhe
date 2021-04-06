import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import gifsSlicer from '@Store/gifs/gifsSlicer';

const reducer = combineReducers({
  gifs: gifsSlicer,
});
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
