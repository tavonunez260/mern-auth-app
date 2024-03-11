export interface HttpError extends Error {
	data?: { [key: string]: string[] };
	statusCode: number;
}

export interface UserType {
	email?: string;
	password?: string;
	profilePicture?: string;
	username?: string;
}
