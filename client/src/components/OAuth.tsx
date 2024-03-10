import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signInSuccess, useDispatch } from 'store';

import { app } from '../firebase.ts';

export function OAuth() {
	const dispatch = useDispatch();
	const handleGoogleClick = async () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth(app);
		const result = await signInWithPopup(auth, provider);
		const response = await fetch('/api/auth/google', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: result.user.email,
				name: result.user.displayName,
				photo: result.user.photoURL
			})
		});
		const data = await response.json();
		dispatch(signInSuccess(data));
		console.log(result);
	};
	return (
		<button
			className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200"
			type="button"
			onClick={handleGoogleClick}
		>
			Continue with Google
		</button>
	);
}
