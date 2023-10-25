import { auth } from "../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (!session) {
        redirect("/auth/signin");
    } else {
        redirect("/dashboard");
    }
}

export default Page