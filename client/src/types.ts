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
	message: string;
	statusCode: number;
	success: boolean;
};

export type User = {
	_id: string;
	email: string;
	photo: string | null;
	username: string;
};

export type UserState = {
	currentUser: User | null;
	error: string;
	loading: boolean;
};
