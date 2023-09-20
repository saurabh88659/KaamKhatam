import {configureStore} from '@reduxjs/toolkit';
import updateReducer from '../features/updatedata/update.reducer';

export const store = configureStore({
  reducer: {
    updateState: updateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
