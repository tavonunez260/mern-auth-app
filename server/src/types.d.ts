export interface HttpError extends Error {
	statusCode: number;
}

export interface UserType {
	email?: string;
	password?: string;
	profilePicture?: string;
	username?: string;
}
