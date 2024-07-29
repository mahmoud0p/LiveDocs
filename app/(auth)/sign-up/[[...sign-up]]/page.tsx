import {  SignUp } from "@clerk/nextjs"

function SignUpPage () {

    return (
        <main className=" auth-page p-4 h-auto flex w-full  items-center justify-center">
            <div>
                <SignUp/>
            </div>
        </main>
    )
}

export default SignUpPage