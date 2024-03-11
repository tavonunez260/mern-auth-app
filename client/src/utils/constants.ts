export const rules = {
	name: {
		required: {
			value: true,
			message: 'Name is required.'
		},
		pattern: {
			value: /^[a-zA-Z-' _0-9]+$/,
			message: 'Only letters, numbers, hyphens, underscores, and apostrophes are allowed.'
		},
		maxLength: {
			value: 64,
			message: 'Name must not exceed 64 characters.'
		}
	},
	email: {
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: 'Invalid email'
		},
		required: {
			value: true,
			message: 'Email is required.'
		}
	},
	url: {
		required: {
			value: true,
			message: 'This field is required.'
		},
		pattern: {
			value:
				/^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
			message: 'Invalid URL.'
		},
		maxLength: {
			value: 256,
			message: 'URL must not exceed 256 characters.'
		}
	},
	comment: {
		required: {
			value: true,
			message: 'Comment is required.'
		},
		maxLength: {
			value: 200,
			message: 'Comment must not exceed 200 characters.'
		}
	},
	json: {
		required: {
			value: true,
			message: 'This field is required.'
		},
		validate: (value: string) => {
			try {
				JSON.parse(value);
				return true;
			} catch (e) {
				return 'Invalid JSON.';
			}
		}
	},
	css: {
		required: {
			value: true,
			message: 'This field is required.'
		},
		validate: (value: string) => {
			try {
				document.querySelector(value);
				return true;
			} catch (error) {
				return 'Invalid CSS selector.';
			}
		}
	},
	urlWildcard: {
		required: {
			value: true,
			message: 'This field is required.'
		},
		pattern: {
			value: /^[a-zA-Z0-9-._~:/?#[\]@!$&’()*+,;=%]*$/,
			message: 'Invalid URL Wildcard.'
		}
	},
	password: {
		required: {
			value: true,
			message: 'Password is required.'
		},
		minLength: {
			value: 8,
			message: 'Password must be at least 8 characters long.'
		},
		maxLength: {
			value: 64,
			message: 'Password must not exceed 64 characters.'
		},
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			message:
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
		}
	}
};
