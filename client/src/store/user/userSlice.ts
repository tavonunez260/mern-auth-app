import { createSlice } from '@reduxjs/toolkit';
import { UserState } from 'types';

const initialState: UserState = {
	currentUser: null,
	loading: false
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: state => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
		},
		signInFailure: state => {
			state.loading = false;
		},
		updateUserStart: state => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
		},
		updateUserFailure: state => {
			state.loading = false;
		},
		deleteUserStart: state => {
			state.loading = true;
		},
		deleteUserSuccess: state => {
			state.currentUser = null;
			state.loading = false;
		},
		deleteUserFailure: state => {
			state.loading = false;
		},
		// @ts-ignore
		signOut: state => (state = initialState)
	}
});

export const {
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	signInFailure,
	signInStart,
	signInSuccess,
	signOut,
	updateUserFailure,
	updateUserStart,
	updateUserSuccess
} = userSlice.actions;

export const userReducer = userSlice.reducer;
