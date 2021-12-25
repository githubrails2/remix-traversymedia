import { Link, Links, LiveReload, Meta, Outlet, useLoaderData } from "remix";

import { getUser } from "~/utils/session.server";
import globalStylesUrl from "~/styles/global.css";

export const links = () => [
	{
		rel: "stylesheet",
		href: globalStylesUrl,
	},
];
export const meta = () => {
	const description = "A cool blog build with Remix";
	const keywords = "remix,react,javascript";
	return {
		description,
		keywords,
	};
};
export const loader = async ({ request }) => {
	const user = await getUser(request);
	const data = {
		user,
	};
	return data;
};
const App = () => {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
};
export default App;

const Document = ({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<Links />
				<Meta />
				<title>{title ? title : "Remix Blog"}</title>
			</head>
			<body>
				{children}
				{process.env.NODE_ENV === "development" ? <LiveReload /> : null}
			</body>
		</html>
	);
};

const Layout = ({ children }) => {
	const { user } = useLoaderData();
	return (
		<>
			<nav className="navbar">
				<Link to="/" className="logo">
					Remix
				</Link>
				<ul className="nav">
					<li>
						<Link to="/posts">Posts</Link>
					</li>
					{user ? (
						<li>
							<form action="/auth/logout" method="POST">
								<button className="btn" type="submit">
									{" "}
									Logout {user.username}
								</button>
							</form>
						</li>
					) : (
						<li>
							<Link to="/auth/login">Login</Link>
						</li>
					)}
				</ul>
			</nav>
			<div className="container">{children}</div>
		</>
	);
};
export const ErrorBoundary = ({ error }) => {
	console.log(error);
	return (
		<Document>
			<Layout>
				<h1>Error</h1>
				<p>{error.message}</p>
			</Layout>
		</Document>
	);
};
