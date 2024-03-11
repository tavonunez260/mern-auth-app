import { createSlice } from '@reduxjs/toolkit';
import { ToastState } from 'types';

const initialState: ToastState = {
	show: false,
	subtitle: '',
	type: null
};

const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		showToast: (state, action) => {
			state.show = true;
			state.type = action.payload.type;
			state.subtitle = action.payload.subtitle;
		},
		hideToast: () => initialState
	}
});

export const { hideToast, showToast } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
