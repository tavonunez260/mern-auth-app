import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header, Modal, PrivateRoute, Toast } from './components';
import { Home, Profile, SignIn, SignUp } from './pages';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<PrivateRoute />}>
					<Route element={<Profile />} path="/profile" />
				</Route>
				<Route element={<SignIn />} path="/sign-in" />
				<Route element={<SignUp />} path="/sign-up" />
			</Routes>
			<Toast />
			<Modal />
		</BrowserRouter>
	);
}

export default App;
