import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { dashboardSlice } from './dashboard/dashboardSlice'

const persistConfig = {
  key: 'dashboard',
  storage,
//   whitelist: ['token']
};

export const store = configureStore({
  reducer: {
    dashboard: persistReducer(persistConfig, dashboardSlice.reducer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);