export function Home() {
	return (
		<main className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Welcome to my auth app!</h1>
			<p className="mb-4 text-slate-700">
				This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js)
				stack. It includes authentication features that allow users to sign up, log in, and log out,
				and provides access to protected routes only for authenticated users.
			</p>
			<p className="mb-4 text-slate-700">
				The front-end of the application is built with React and uses React Router for client-side
				routing and Redux for state management. The back-end is built with Node.js and Express, and
				uses MongoDB as the database. Authentication is implemented using JSON Web Tokens (JWT).
				Client-side validation is implemented with React-Hook-Form and server-side validation is
				implemented with a custom middleware. User feedback is implemented with Tailwind UI (Toasts
				and modals components).
			</p>
			<p className="mb-4 text-slate-700">
				This application is intended as a starting point for building full-stack web applications
				with authentication using the MERN stack. Feel free to use it as a template for your own
				projects!
			</p>
		</main>
	);
}
