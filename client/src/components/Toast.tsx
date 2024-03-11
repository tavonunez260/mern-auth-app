import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect } from 'react';
import { setToast, useDispatch, useSelector } from 'store';
import { PopUpTitle } from 'types';

export function Toast() {
	const { show, subtitle, type } = useSelector(state => state.toast);
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(setToast(false));
		}, 5000);
		return () => clearTimeout(timer);
	}, [dispatch]);

	return (
		<>
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					<Transition
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						show={show}
					>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										{type === PopUpTitle.SUCCESS && (
											<CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
										)}
										{type === PopUpTitle.ERROR && (
											<XCircleIcon aria-hidden="true" className="h-6 w-6 text-red-400" />
										)}
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">{type}</p>
										{type && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											type="button"
											onClick={() => dispatch(setToast(false))}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon aria-hidden="true" className="h-5 w-5" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	);
}
