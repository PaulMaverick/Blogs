'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from "@/utils/utils"

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };


    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return encodedRedirect("error", "/sign-in", error.message);
    } else {
        revalidatePath('/', 'layout')
        redirect("/")
    }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                first_name: formData.get("first_name") as string,
                last_name: formData.get("last_name") as string,
            }
        }
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "/sign-up", error.message);
    } else {
        return encodedRedirect(
            "success",
            "/sign-up",
            "Thanks for signing up! Please check your email for a verification link.",
        );
    }
}

export async function logOff() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if(error) {
        console.log(error)
        redirect("/error")
    }

    revalidatePath("/", "layout");
    redirect("/public/login")
}