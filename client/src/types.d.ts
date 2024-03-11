export type SignUpForm = {
	email: string;
	password: string;
	username: string;
};

export type SignInForm = {
	email: string;
	password: string;
};

export type AppError = {
	errors?: { [key: string]: string };
	message: string;
	statusCode: number;
	success: boolean;
};

export type User = {
	_id: string;
	email: string;
	profilePicture: string;
	username: string;
};

export type UserState = {
	currentUser: User | null;
	loading: boolean;
};

export enum PopUpTitle {
	SUCCESS = 'Success',
	ERROR = 'Error'
}

export type ToastState = {
	show: boolean;
	subtitle: string;
	type: PopUpTitle | null;
};

export type ModalState = {
	actionButton: string;
	handleClick: () => void;
	title: string;
} & ToastState;
