import Form from "../../components/Auth";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1>Sign in</h1>
      <Form action="/api/signin">
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" />
      </Form>
      <Link href="/signup">Create an account</Link>
    </>
  );
};

export default Page;
