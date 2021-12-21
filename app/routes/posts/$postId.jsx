import { Link, redirect, useLoaderData } from "remix";

import db from "~/utils/db.server";

export const loader = async ({ params }) => {
	const post = await db.post.findUnique({
		where: { id: params.postId },
	});
	if (!post) {
		console.log("No Post Found with that id");
	}
	const data = { post };
	return data;
};
export const action = async ({ request, params }) => {
	const form = await request.formData();

	if (form.get("_method") === "delete") {
		const post = await db.post.findUnique({
			where: { id: params.postId },
		});
		if (!post) {
			console.log("No Post Found with that id");
		}
		await db.post.delete({ where: { id: params.postId } });
		return redirect("/posts");
	}
};
const Post = () => {
	const { post } = useLoaderData();
	return (
		<div>
			<div className="page-header">
				<h1>{post.title}</h1>
				<Link to="/posts" className="btn btn-reverse">
					Back
				</Link>
			</div>
			<div className="page-content">
				<p>{post.body}</p>
			</div>
			<div className="page-footer">
				<form method="POST">
					<input type="hidden" name="_method" value="delete" />
					<button className="btn btn-delete">Delete Post</button>
				</form>
			</div>
		</div>
	);
};

export default Post;
