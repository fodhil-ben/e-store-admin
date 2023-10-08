import { Metadata } from "next"
import { LoginForm } from "@/components/LoginForm"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

const Login = () => {
    return (
        <>
            <div className="container shadow-sm h-fit w-fit rounded-2xl  shadow-gray-400 mt-40 justify-center grid  lg:px-0">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login into your account
                            </h1>
                        </div>
                        <LoginForm buttonText="Login" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login