import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { Fragment, useRef } from 'react';
import { hideModal, setModal, useDispatch, useSelector } from 'store';
import { PopUpTitle } from 'types';

export function Modal() {
	const { actionButton, handleClick, show, subtitle, title, type } = useSelector(
		state => state.modal
	);
	const dispatch = useDispatch();

	const setModalState = (value: boolean) => {
		dispatch(setModal(value));
	};
	const closeModal = () => {
		dispatch(hideModal());
	};

	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root as={Fragment} show={show}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setModalState}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div className="sm:flex sm:items-start">
									<div
										className={clsx(
											`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10`,
											{ 'bg-red-100': type === PopUpTitle.ERROR },
											{ 'bg-green-100': type === PopUpTitle.SUCCESS }
										)}
									>
										{type === PopUpTitle.ERROR && (
											<ExclamationTriangleIcon
												aria-hidden="true"
												className="h-6 w-6 text-red-600"
											/>
										)}
										{type === PopUpTitle.SUCCESS && (
											<InformationCircleIcon
												aria-hidden="true"
												className="h-6 w-6 text-green-600"
											/>
										)}
									</div>
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
										<Dialog.Title
											as="h3"
											className="text-base font-semibold leading-6 text-gray-900"
										>
											{title}
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">{subtitle}</p>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
									<button
										className={clsx(
											`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto`,
											{ 'bg-red-600 hover:bg-red-500': type === PopUpTitle.ERROR },
											{ 'bg-green-600 hover:bg-green-500': type === PopUpTitle.SUCCESS }
										)}
										type="button"
										onClick={handleClick}
									>
										{actionButton}
									</button>
									<button
										ref={cancelButtonRef}
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
										type="button"
										onClick={closeModal}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
