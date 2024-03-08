import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
	TypedUseSelectorHook
} from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user';

export * from './user';
const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
	key: 'root',
	version: 1,
	storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { persistor, store, useDispatch, useSelector };
