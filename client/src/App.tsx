import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header, PrivateRoute, Toast } from './components';
import { ToastProvider } from './context';
import { About, Home, Profile, SignIn, SignUp } from './pages';

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<About />} path="/about" />
					<Route element={<PrivateRoute />}>
						<Route element={<Profile />} path="/profile" />
					</Route>
					<Route element={<SignIn />} path="/sign-in" />
					<Route element={<SignUp />} path="/sign-up" />
				</Routes>
				<Toast />
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;
