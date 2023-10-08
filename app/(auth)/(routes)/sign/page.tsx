import { Metadata } from "next"
import { SignUpForm } from "@/components/SignUpForm"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

const SignIn = () => {
    return (
        <>
            <div className="container shadow-sm h-fit w-fit rounded-2xl shadow-gray-400 mt-40 justify-center grid  lg:px-0">
                <div className="lg:p-8 box-shadow  shadow-black">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                        </div>
                        <SignUpForm buttonText="Sign in" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn