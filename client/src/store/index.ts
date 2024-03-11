import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
	TypedUseSelectorHook
} from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { modalReducer } from './modal';
import { toastReducer } from './toast';
import { userReducer } from './user';

export * from './user';
export * from './toast';
export * from './modal';
const userPersistConfig = {
	key: 'user',
	version: 1,
	storage
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
	user: persistedUserReducer, // now user is persisted
	toast: toastReducer,
	modal: modalReducer
});

const store = configureStore({
	reducer: rootReducer,
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
