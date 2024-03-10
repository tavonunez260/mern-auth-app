import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types';

const initialState: UserState = {
	currentUser: null,
	error: '',
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
			state.error = '';
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;
