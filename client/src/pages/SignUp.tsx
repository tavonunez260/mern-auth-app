import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AppError, SignUpForm } from 'types';
import { rules } from 'utils';

export function SignUp() {
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm<SignUpForm>();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (requestData: SignUpForm) => {
		setLoading(true);
		fetch(`/api/auth/signup`, {
			body: JSON.stringify(requestData),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (!response.ok) {
					return response.json().then(err => Promise.reject(err));
				}
				return response.json();
			})
			.then(() => {
				navigate('/sign-in');
			})
			.catch((error: AppError) => {
				reset();
				setError(error.message);
				setLoading(false);
			});
	};

	return (
		<main className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			<form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col">
					<input
						{...register('username', rules.name)}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="username"
						placeholder="User Name"
						type="text"
					/>
					{errors.username && (
						<p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
					)}
				</div>
				<div className="flex flex-col">
					<input
						{...register('email', rules.email)}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="email"
						placeholder="Email"
						type="email"
					/>
					{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
				</div>
				<div className="flex flex-col">
					<input
						{...register('password', rules.password)}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="password"
						placeholder="Password"
						type="password"
					/>
					{errors.password && (
						<p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
					)}
				</div>
				{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
				<button
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200"
					disabled={loading}
					type="submit"
				>
					{loading ? 'Loading ...' : 'Sign Up'}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Have an account?</p>
				<Link to="/sign-in">
					<span className="text-blue-500">Sign In</span>
				</Link>
			</div>
		</main>
	);
}
