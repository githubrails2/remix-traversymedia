import { logout } from "~/utils/session.server";
import { redirect } from "remix";

export const action = async ({ request }) => {
	return logout(request);
};
export const loader = async () => {
	return redirect("/");
};
