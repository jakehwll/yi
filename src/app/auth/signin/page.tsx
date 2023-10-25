import Link from "next/link";
import Form from "~/components/Auth";

const Page = () => {
	return (
		<>
			<div className="flex flex-col gap-4 w-80">
				<h1 className="text-xl font-medium">Sign in</h1>
				<Form action="/api/signin">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label 
								htmlFor="username"
								className="font-medium text-sm text-gray-800"
							>
								Username
							</label>
							<input 
								type="text"
								name="username"
								id="username"
								className="w-fullshadow-sm rounded-lg border border-gray-200 px-4 py-2 transition-all duration-500 placeholder:text-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label 
								htmlFor="password"
								className="font-medium text-sm text-gray-800"
							>
								Password
							</label>
							<input 
								type="password"
								name="password"
								id="password"
								className="w-fullshadow-sm rounded-lg border border-gray-200 px-4 py-2 transition-all duration-500 placeholder:text-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
							/>
						</div>
						<input 
							type="submit"
							className="rounded-xl text-sm border border-green-600 bg-green-500 px-6 py-2 font-medium text-white shadow-sm transition-all cursor-pointer"
						/>
					</div>
				</Form>
				<Link 
					href="/auth/signup"
					className="rounded-xl text-sm border border-gray-200 bg-white px-6 py-2 font-medium text-black shadow-sm transition-all text-center"
				>
					Create an account
				</Link>
			</div>
		</>
	);
};

export default Page;
