import { OAuth } from 'components';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess, useDispatch, useSelector } from 'store';
import { rules } from 'utils';

import { AppError, SignInForm, User } from '../types';

export function SignIn() {
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm<SignInForm>({ criteriaMode: 'all' });
	const navigate = useNavigate();
	const { error, loading } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const onSubmit = async (requestData: SignInForm) => {
		dispatch(signInStart());
		fetch(`/api/auth/signin`, {
			body: JSON.stringify(requestData),
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (!response.ok) {
					return response.json().then(err => Promise.reject(err));
				}
				return response.json();
			})
			.then((data: User) => {
				dispatch(signInSuccess(data));
				navigate('/profile');
			})
			.catch((error: AppError) => {
				reset();
				dispatch(signInFailure(error.message));
			});
	};

	return (
		<main className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
			<form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
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
						{...register('password')}
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
				<button
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200"
					disabled={loading}
					type="submit"
				>
					{loading ? 'Loading ...' : 'Sign In'}
				</button>
				<OAuth />
			</form>
			<div className="flex gap-2 mt-5">
				<p>Don&apos;`t have an account?</p>
				<Link to="/sign-up">
					<span className="text-blue-500">Sign Up</span>
				</Link>
			</div>
		</main>
	);
}
