import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from 'firebaseConfig';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	hideModal,
	showModal,
	signOut,
	updateUserFailure,
	updateUserStart,
	updateUserSuccess,
	useDispatch,
	useSelector
} from 'store';
import { showToast } from 'store';
import { AppError, SignInForm, SignUpForm, PopUpTitle, User } from 'types';
import { rules } from 'utils';

export function Profile() {
	const { currentUser, loading } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const [image, setImage] = useState<File | undefined>(undefined);
	const [imagePercentage, setImagePercentage] = useState(0);
	const [imageError, setImageError] = useState('');
	const [downloadURL, setDownloadURL] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		formState: { errors },
		handleSubmit,
		register,
		watch
	} = useForm<SignUpForm>({
		defaultValues: { username: currentUser?.username, email: currentUser?.email },
		criteriaMode: 'all'
	});
	const watchedUsername = watch('username');
	const watchedEmail = watch('email');

	const hasChanges = useMemo(() => {
		const formValues = {
			username: watchedUsername,
			email: watchedEmail
		};
		const initialValues = {
			username: currentUser?.username,
			email: currentUser?.email
		};
		return !isEqual(formValues, initialValues);
	}, [currentUser?.email, currentUser?.username, watchedEmail, watchedUsername]);

	const handleFileChange = useCallback(
		(image: File) => {
			if (image.size > 2 * 1024 * 1024) {
				setImageError('File size should not exceed 2MB');
			} else {
				if (imageError !== '') {
					setImageError('');
				}
				const storage = getStorage(app);
				const fileName = new Date().getTime() + image.name;
				const storageRef = ref(storage, fileName);
				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					'state_changed',
					snapshot => {
						setImagePercentage(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
					},
					error => {
						setImageError(`Error uploading file ${error.message}`);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
							setDownloadURL(downloadURL);
							dispatch(updateUserStart());
							fetch(`/api/user/update/${currentUser?._id}`, {
								body: JSON.stringify({ profilePicture: downloadURL }),
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
									dispatch(updateUserSuccess(data));
									dispatch(
										showToast({
											type: PopUpTitle.SUCCESS,
											subtitle: 'Profile picture updated successfully'
										})
									);
								})
								.catch((error: AppError) => {
									dispatch(updateUserFailure());
									dispatch(
										showToast({
											type: PopUpTitle.ERROR,
											subtitle: error.message
										})
									);
								});
						});
					}
				);
			}
		},
		[currentUser?._id, dispatch, imageError]
	);

	const handleDelete = useCallback(() => {
		dispatch(deleteUserStart());
		fetch(`/api/user/delete/${currentUser?._id}`, {
			method: 'DELETE',
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
			.then(data => {
				dispatch(deleteUserSuccess(data));
				dispatch(
					showToast({
						type: PopUpTitle.SUCCESS,
						subtitle: 'User deleted successfully'
					})
				);
				dispatch(hideModal());
			})
			.catch((error: AppError) => {
				dispatch(deleteUserFailure());
				dispatch(
					showToast({
						type: PopUpTitle.ERROR,
						subtitle: error.message
					})
				);
				dispatch(hideModal());
			});
	}, [currentUser?._id, dispatch]);

	const handleSubmitForm = useCallback(
		async (requestData: SignInForm) => {
			dispatch(updateUserStart());
			fetch(`/api/user/update/${currentUser?._id}`, {
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
					dispatch(updateUserSuccess(data));
					dispatch(
						showToast({
							type: PopUpTitle.SUCCESS,
							subtitle: 'User info updated successfully'
						})
					);
				})
				.catch((error: AppError) => {
					dispatch(updateUserFailure());
					dispatch(
						showToast({
							type: PopUpTitle.ERROR,
							subtitle: error.message
						})
					);
				});
		},
		[currentUser?._id, dispatch]
	);

	const handleDeleteClick = useCallback(() => {
		dispatch(
			showModal({
				actionButton: 'Delete',
				title: 'Delete account',
				type: PopUpTitle.ERROR,
				subtitle: 'Are you sure you want to delete your account? This cannot be undone',
				handleClick: handleDelete
			})
		);
	}, [dispatch, handleDelete]);

	const handleSignOut = useCallback(async () => {
		fetch(`/api/auth/signout/${currentUser?._id}`, {
			method: 'POST'
		})
			.then(response => {
				if (!response.ok) {
					return response.json().then(err => Promise.reject(err));
				}
				return response.json();
			})
			.then(data => {
				dispatch(
					showToast({
						type: PopUpTitle.SUCCESS,
						subtitle: data.message
					})
				);
				dispatch(signOut());
			})
			.catch(error => {
				dispatch(
					showToast({
						type: PopUpTitle.ERROR,
						subtitle: error.message
					})
				);
			});
	}, [currentUser?._id, dispatch]);

	useEffect(() => {
		if (image) {
			handleFileChange(image);
		}
	}, [handleFileChange, image]);

	return (
		<main className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
			<form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(handleSubmitForm)}>
				<div className="flex flex-col">
					<input
						ref={inputRef}
						accept="image/*"
						hidden
						type="file"
						onChange={event => setImage(event.target.files?.[0])}
					/>
					<img
						alt={`${currentUser?.username} profile photo`}
						className="w-24 h-24 mt-2 self-center cursor-pointer rounded-full object-cover"
						src={downloadURL || currentUser?.profilePicture}
						onClick={() => inputRef?.current?.click()}
					/>
					{imageError && <p className="mt-2 text-sm text-red-600">{imageError}</p>}
					{imagePercentage > 0 && imagePercentage <= 99 && (
						<p className="mt-2 text-sm self-center text-slate-700">Uploading: {imagePercentage}%</p>
					)}
					{imagePercentage === 100 && (
						<p className="mt-2 text-sm self-center text-green-700">Upload complete!</p>
					)}
				</div>
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
					{errors.username &&
						Object.values(errors.username.types || {}).map((message, index) => (
							<p key={index} className="mt-2 text-sm text-red-600">
								{message as string}
							</p>
						))}
				</div>
				<div className="flex flex-col">
					<input
						{...register('email', { pattern: rules.email.pattern })}
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
					{errors.password &&
						Object.values(errors.password.types || {}).map((message, index) => (
							<p key={index} className="mt-2 text-sm text-red-600">
								{message as string}
							</p>
						))}
				</div>
				<button
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition ease-in-out duration-200"
					disabled={loading || !hasChanges}
					type="submit"
				>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</form>
			<div className="flex justify-between mt-5">
				<span className="text-red-700 cursor-pointer" onClick={handleDeleteClick}>
					Delete Account
				</span>
				<span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
					Sign Out
				</span>
			</div>
		</main>
	);
}
