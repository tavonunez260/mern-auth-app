import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'store';
import { SignUpForm } from 'types';
import { rules } from 'utils';

export function Profile() {
	const { currentUser } = useSelector(state => state.user);
	const [loading, setLoading] = useState(false);
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm<SignUpForm>({
		defaultValues: { username: currentUser?.username, email: currentUser?.email }
	});

	const onSubmit = (requestData: SignUpForm) => {
		setLoading(true);
		console.log(requestData);
		reset();
		setLoading(false);
	};

	return (
		<main className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
			<form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
				<img
					alt={`${currentUser?.username} profile photo`}
					className="w-24 h-24 mt-2 self-center cursor-pointer rounded-full object-cover"
					src={currentUser?.profilePicture}
				/>
				<div className="flex flex-col">
					<input
						{...register('username', {
							pattern: rules.name.pattern,
							maxLength: rules.name.maxLength
						})}
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
						{...register('email', { pattern: rules.email.pattern })}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="email"
						placeholder="Email"
						type="email"
					/>
					{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
				</div>
				<div className="flex flex-col">
					<input
						{...register('password', {
							minLength: rules.password.minLength,
							maxLength: rules.password.maxLength,
							pattern: rules.password.pattern
						})}
						className="bg-slate-100 p-3 rounded-lg border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none"
						id="password"
						placeholder="Password"
						type="password"
					/>
					{errors.password && (
						<p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
					)}
				</div>
				<button
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200"
					disabled={loading}
					type="submit"
				>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</form>
			<div className="flex justify-between mt-5">
				<span className="text-red-700 cursor-pointer">Delete Account</span>
				<span className="text-red-700 cursor-pointer">Sign Out</span>
			</div>
		</main>
	);
}
