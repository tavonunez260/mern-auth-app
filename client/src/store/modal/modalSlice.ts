import { createSlice } from '@reduxjs/toolkit';
import { ModalState } from 'types';

const initialState: ModalState = {
	actionButton: '',
	show: false,
	subtitle: '',
	title: '',
	type: null,
	handleClick: () => {}
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: (state, action) => {
			state.actionButton = action.payload.actionButton;
			state.show = true;
			state.title = action.payload.title;
			state.type = action.payload.type;
			state.subtitle = action.payload.subtitle;
			state.handleClick = action.payload.handleClick;
		},
		setModal: (state, action) => {
			state.show = action.payload;
			if (!action.payload) {
				state = initialState;
			}
		},
		hideModal: () => initialState
	}
});

export const { hideModal, setModal, showModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
