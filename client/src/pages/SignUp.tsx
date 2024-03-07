import { Link } from 'react-router-dom';

export function SignUp() {
	return (
		<main className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			<form className="flex flex-col gap-4">
				<input
					className="bg-slate-100 p-3 rounded-lg"
					id="username"
					placeholder="User Name"
					type="text"
				/>
				<input
					className="bg-slate-100 p-3 rounded-lg"
					id="email"
					placeholder="Email"
					type="email"
				/>
				<input
					className="bg-slate-100 p-3 rounded-lg"
					id="password"
					placeholder="Password"
					type="password"
				/>
				<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200">
					Sign Up
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
