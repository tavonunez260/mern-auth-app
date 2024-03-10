import { Link } from 'react-router-dom';
import { useSelector } from 'store';

export function Header() {
	const { currentUser } = useSelector(state => state.user);
	console.log(currentUser);
	return (
		<header className="bg-slate-200">
			<nav className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/">
					<h1 className="font-bold">Auth App</h1>
				</Link>

				<ul className="flex gap-4">
					<Link to="/">
						<li>Home</li>
					</Link>
					<Link to="/about">
						<li>About</li>
					</Link>
					<Link to={currentUser ? '/profile' : '/sign-in'}>
						{currentUser ? (
							<li>
								<img
									alt={`${currentUser.username} profile photo`}
									className="w-7 h-7 rounded-full object-cover"
									src={currentUser.profilePicture}
								/>
							</li>
						) : (
							<li>Sign In</li>
						)}
					</Link>
				</ul>
			</nav>
		</header>
	);
}
