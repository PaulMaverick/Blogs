"use client"
import { updateBlog } from "@/actions/blogs"
import { useActionState } from "react"


export type updateInitialState = {
    formFields: {
        title: string,
        description: string,
    },
    id: string,
    error: {
        status: boolean,
        message: string,
    }
}

export type blogType = {
    id: string,
    title: string,
    description: string,
    created_at: string,
}

export type updateProps = {
    blog: blogType
}


function UpdateForms({ blog }: updateProps) {
    const initialState = {
        formFields: {
            title: blog?.title,
            description: blog?.description
        },
        id: blog?.id,
        error: {
            status: false,
            message: ''
        }
    }

    const [data, formAction, isPending] = useActionState(
        updateBlog,
        initialState
    )
    
    return (
        <section className='flex-1 p-5 flex flex-col gap-8 items-center'>
            <h2 className='text-2xl font-bold text-center'>Update a Blog Post</h2>
            {
                data.error.status ? (
                    <div className="bg-red-600 w-1/2 p-5 rounded-lg">
                        <h3 className="text-white">Error</h3>
                        <p>{data?.error?.message}</p>
                    </div>
                ) : (<></>)
            }
            <form action={formAction}
                className='flex flex-col border-2 border-gray-200 w-1/2 p-10 gap-6'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title" className='text-xl'>Title:</label>
                    <input 
                        type="text" 
                        id='title' 
                        name="title"
                        placeholder='Blog Title'
                        className='p-2 border-1 border-gray-600 rounded-lg'
                        defaultValue={data.formFields.title}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="desc" className='text-xl'>Description:</label>
                    <textarea 
                        id='desc' 
                        name='desc'
                        placeholder='Blog Content'
                        className='p-2 border-1 border-gray-600 sm:h-20 xl:h-100 rounded-lg resize-none'
                        defaultValue={data.formFields.description}
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="bg-blue-600 w-40 self-center p-2 text-white cursor-pointer rounded-lg"
                >
                    {isPending ? "Submiting..." : "Submit"}
                </button>
             
            </form>
            
        </section>
    )
}

export default UpdateForms;