import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { About, Home, Profile, SignIn } from './pages';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<About />} path="/about" />
				<Route element={<Profile />} path="/profile" />
				<Route element={<SignIn />} path="/sign-in" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
