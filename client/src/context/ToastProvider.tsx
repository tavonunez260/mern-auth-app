import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ToastContextType {
	hideToast: () => void;
	show: boolean;
	showToast: (title: string, subtitle?: string) => void;
	subtitle?: string;
	title: string;
}

interface ToastProviderProps {
	children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('');
	const [subtitle, setSubtitle] = useState<string | undefined>(undefined);

	const showToast = useCallback((title: string, subtitle?: string) => {
		setTitle(title);
		setSubtitle(subtitle);
		setShow(true);
		setTimeout(() => setShow(false), 5000); // Auto-hide after 5 seconds
	}, []);

	const hideToast = useCallback(() => {
		setShow(false);
	}, []);

	return (
		<ToastContext.Provider value={{ show, title, subtitle, showToast, hideToast }}>
			{children}
		</ToastContext.Provider>
	);
};
