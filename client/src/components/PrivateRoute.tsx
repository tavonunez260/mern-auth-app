import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'store';

export function PrivateRoute() {
	const { currentUser } = useSelector(state => state.user);
	return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
