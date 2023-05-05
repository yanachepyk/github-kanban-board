import { configureStore, Store } from '@reduxjs/toolkit';
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
import { dashboardSlice } from './dashboard/dashboardSlice';
import { DashboardState } from './dashboard/dashboard.model';

export interface KanbanBoardStore {
  dashboard: DashboardState;
}

const persistConfig = {
  key: 'dashboard',
  storage,
  whitelist: ['repositories', 'activeBoard'],
};

export const store: Store<KanbanBoardStore> = configureStore({
  reducer: {
    dashboard: persistReducer(persistConfig, dashboardSlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
