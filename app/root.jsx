import { Link, Links, LiveReload, Meta, Outlet } from "remix";

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
