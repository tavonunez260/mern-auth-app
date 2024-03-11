import { OAuth } from 'components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { rules } from 'utils';

import { AppError, SignUpForm } from '../types';

export function SignUp() {
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm<SignUpForm>({ criteriaMode: 'all' });
	const [error, setError] = useState<string | null>(null);
	const [errorsState, setErrorsState] = useState<string[]>([]);
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
				if (error.errors) {
					setErrorsState(Object.values(error.errors));
				}
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
					{errors.username &&
						Object.values(errors.username.types || {}).map((message, index) => (
							<p key={index} className="mt-2 text-sm text-red-600">
								{message as string}
							</p>
						))}
				</div>
				<div className="flex flex-col">
					<input
						{...register('email', rules.email)}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="email"
						placeholder="Email"
						type="email"
					/>
					{errors.email &&
						Object.values(errors.email.types || {}).map((message, index) => (
							<p key={index} className="mt-2 text-sm text-red-600">
								{message as string}
							</p>
						))}
				</div>
				<div className="flex flex-col">
					<input
						{...register('password', rules.password)}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="password"
						placeholder="Password"
						type="password"
					/>
					{errors.password &&
						Object.values(errors.password.types || {}).map((message, index) => (
							<p key={index} className="mt-2 text-sm text-red-600">
								{message as string}
							</p>
						))}
				</div>
				{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
				{errorsState.length > 0 && (
					<div className="flex flex-col">
						{errorsState.map(error => (
							<p key={error} className="mt-2 text-sm text-red-600">
								{error}
							</p>
						))}
					</div>
				)}
				<button
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200"
					disabled={loading}
					type="submit"
				>
					{loading ? 'Loading ...' : 'Sign Up'}
				</button>
				<OAuth />
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
