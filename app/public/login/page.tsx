import { login } from "@/actions/auth"
import { createClient } from "@/utils/supabase/server"
import { FormMessage, Message } from "@/components/form-message"
import { redirect } from "next/navigation"
import Link from "next/link"
import SubmitBUtton from "@/components/forms/submitButton"

export default async function loginPage(props: { searchParams: Promise<Message>}) {
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
                action={login}
                className="relative w-110 h-fit border-1 flex flex-col p-5 gap-5 justify-around rounded-lg">
                <h1 className="text-3xl text-center font-bold">Login</h1>
                <p className="text-sm text-foreground text-center">
                    Don&apos;t have an account?{" "}
                    <Link className="text-foreground font-medium underline" href="signup">
                        Sign up
                    </Link>
                </p>
                <div className="flex flex-col gap-5">
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