import { signup } from "@/actions/auth"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { FormMessage, Message } from "@/components/form-message"
import SubmitBUtton from "@/components/forms/submitButton"

export default async function SignUpPage(props: { searchParams: Promise<Message>}) {
    const searchParams = await props.searchParams
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (user) {
        return redirect("/");
    }

    return (
        <section className=" flex items-center justify-center min-h-screen">
            <form 
                action={signup} 
                className="relative w-110 h-fit border-1 flex flex-col p-5 gap-5 justify-around rounded-lg">
                <h1 className="text-3xl text-center font-bold">Sign Up</h1>
                <p className="text-sm text text-foreground text-center">
                    Already have an account?{" "}
                    <Link className="text-primary font-medium underline" href="/login">
                        Log In
                    </Link>
                </p>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="first_name">First Name:</label>
                        <input 
                            type="text" 
                            id="first_name" 
                            name="first_name" 
                            className="border-1 p-2 rounded-lg bg-gray-100" 
                            required 
                            placeholder="First name"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="last_name">Last Name:</label>
                        <input 
                            type="text" 
                            id="last_name" 
                            name="last_name" 
                            className="border-1 p-2 rounded-lg bg-gray-100" 
                            required 
                            placeholder="Last name"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="border-1 p-2 rounded-lg bg-gray-100" 
                            required 
                            placeholder="example@email.com"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="border-1 p-2 rounded-lg bg-gray-100" 
                            required
                            placeholder="*********"/>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <SubmitBUtton />   
                </div>
                <FormMessage message={searchParams}/>
            </form>
        </section>
    )
}