import SubmitBUtton from '@/components/forms/submitButton'
import React from 'react'
import { createBlogPost } from '@/actions/blogs'

function CreateBlogPage() {
  return (
    <section className='flex-1 p-5 flex flex-col gap-8 items-center'>
        <h2 className='text-2xl font-bold text-center'>Create A New Blog Post</h2>
        <form action={createBlogPost} className='flex flex-col border-2 border-gray-200 w-1/2 p-10 gap-6'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='text-xl'>Title:</label>
                <input 
                    type="text" 
                    id='title' 
                    name="title"
                    placeholder='Blog Title'
                    className='p-2 border-1 border-gray-600 rounded-lg'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="desc" className='text-xl'>Description:</label>
                <textarea 
                    id='desc' 
                    name='desc'
                    placeholder='Blog Content'
                    className='p-2 border-1 border-gray-600 sm:h-20 xl:h-100 rounded-lg resize-none'
                />
            </div>
            <SubmitBUtton />
        </form>
    </section>
  )
}

export default CreateBlogPage