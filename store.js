import { configureStore } from '@reduxjs/toolkit';
import handlerReducer from './features/counter/handlerSlice';
import itemsReducer from './features/counter/itemsSlice';
import fetchReducer from './features/counter/fetchSlice';

export const store = configureStore({
  reducer: {
    handler: handlerReducer,
    items: itemsReducer,
    fetchData: fetchReducer,
  },
});
