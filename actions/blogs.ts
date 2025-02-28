'use server';

import { createClient } from "@/utils/supabase/server"; 
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { encodedRedirect } from "@/utils/utils";
import { blogType, updateInitialState } from "@/components/forms/updateForms";

export const createBlogPost = async(formData: FormData) => {
    const supabase = await createClient();
    const {data: { user }} = await supabase.auth.getUser();

    const formFields = {
        title: formData.get("title") as string,
        description: formData.get("desc") as string,
        profile_id: user?.id,
    }


    const { data, error} = await supabase.from('Blogs').insert(formFields).select().single();

    console.log(data)
    if(error) {
        console.log(error)
    }

    if(data) {
        redirect(`/blog/${data.id}`)
    }
}

type Profile = {
    first_name: string;
    last_name: string;
};

export type BlogType = { 
    id: string;
    title: string;
    description: string;
    profiles: Profile;
};

type options = {
    currentPage?: number
    blogsPerPage?: number
}

export const getAllBlogs = async(options: options = {}) => {
    const { 
        currentPage = 1,
        blogsPerPage = 5
    } = options;
    const supabase = await createClient()

    const startingIndex = (currentPage - 1) * blogsPerPage;
    const endingIndex = (currentPage * blogsPerPage) -1

    const { data, error, count } = await supabase
        .from('Blogs')
        .select(`
            id,
            title,
            description,
            profiles (
                first_name,
                last_name
            )
        `, { count: 'exact'})
        .range(startingIndex, endingIndex) as unknown as { data: BlogType[] | null, error: unknown, count: number };

    const totalPages = count ? Math.ceil(count / blogsPerPage) : 0

    if(error) {
        console.log(error)
    }

    return { data: data, totalPages: totalPages };
}

export const getMyBlogs = async(options: options = {}) => {
    const { 
        currentPage = 1,
        blogsPerPage = 5
    } = options;

    const startingIndex = (currentPage - 1) * blogsPerPage;
    const endingIndex = (currentPage * blogsPerPage) -1

    const supabase = await createClient()
    const {data: { user }} = await supabase.auth.getUser();

    if(!user) {
        console.log("user error")
        return { blogs: [], totalPages: 0}
    }

    const { data, error, count } = await supabase 
        .from('Blogs')
        .select(`id, title, description`, {count: 'exact'})
        .eq('profile_id', user.id)
        .range(startingIndex, endingIndex) as unknown as { data: BlogType[] | null, error: unknown, count: number };;

    const totalPages = count ? Math.ceil(count / blogsPerPage) : 0
    
    if(error) {
        console.log(error);
        return { blogs: [], totalPages: 0}
    }

    return { blogs: data, totalPages: totalPages };
}

export const getSingleBlog = async(id: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('Blogs')
        .select(`id, title, description, created_at`)
        .eq('id', id)
        .single() as unknown as { data: blogType, error: unknown};

    if(error) {
        console.log(error);
    }

    return data;
}

export const updateBlog = async(prevState: updateInitialState, formData: FormData) => {
    const supabase = await createClient();
    const id = prevState.id
    const formFields = {
        title: formData.get("title") as string,
        description: formData.get("desc") as string
    }

    const { error } = await supabase
        .from('Blogs')
        .insert(formFields)
        .eq('id', id)

    if(error) { 
        console.log(error)
        return {
            ...prevState,
            error: {
                status: true,
                message: `Update Did not go through!`
            }
        }
    }   

    return {
        ...prevState,
        formFields: formFields ,
        id: id
    }
}

export const deleteBlog = async(id: string) => {
    const supabase = await createClient();

    const { error } = await supabase
        .from('Blogs')
        .delete()
        .eq('id', id)

    if(error) {
        console.log(error);
    } else {
        revalidatePath('/blog', 'layout')
        encodedRedirect('success', '/blog', 'blog has been deleted')
    }
}