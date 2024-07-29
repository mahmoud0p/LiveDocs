import { SignIn } from "@clerk/nextjs"

function SignInPage (){

    return (
        <main className="auth-page p-4 auth-page flex w-full h-screen items-center justify-center">
            <div className=" shadow-md">
                <SignIn/>

            </div>
        </main>
    )
}
export default SignInPage