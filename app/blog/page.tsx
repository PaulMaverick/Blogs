import { getMyBlogs } from '@/actions/blogs'
import { DeleteButton } from '@/components/buttons/deleteButton'
import { FormMessage, Message } from '@/components/form-message'
import { Pagination } from '@/components/pagination/pagination'
import NoBlogs from '@/components/placeholder/NoBlogs'
import Link from 'next/link'
import React from 'react'

async function BlogListPage({ searchParams } : { searchParams: { page?: string} & Message }) {
    const params = searchParams
    const currentPage = parseInt(params.page as string, 10) || 1;
    const { blogs, totalPages } = await getMyBlogs({currentPage})

    return (
        <main className="flex-1 flex flex-col">
            <section className="flex-1">
                <header className="text-center p-5">
                    <h1 className="text-2xl font-bold">My Blogs</h1>
                </header>
                <div className='flex justify-center mb-5'>   
                    <FormMessage message={params}/>
                </div>
                {
                    (blogs || []).length >= 1 ? (
                        <div className="flex-1 flex flex-col items-center gap-5">
                    {blogs?.map(blog => (
                        <article key={blog.id}
                            className="border-1 border-blue-600 w-1/2 p-5 rounded-lg"
                        >
                            <header className=" border-b-1 pb-2 border-blue-600 flex justify-between">
                                <h3 className="text-1xl font-bold">{blog.title}</h3>
                                <div className='flex gap-3'>
                                    
                                    <Link href={`/blog/${blog.id}/update`} 
                                        className='px-2 bg-blue-600 text-white'>
                                        Edit
                                    </Link>
                                    <DeleteButton id={blog.id} />
                                    
                                        </div>
                                    </header>
                                    <div className="p-2">
                                        <p>{blog.description}</p>
                                    </div>
                                    <div>
                                        <Link href={`blog/${blog.id}`}
                                            className='px-2 bg-blue-600 text-white'
                                        >
                                            View my Post
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <NoBlogs />
                    )
                }

                <div className='flex justify-center'>
                    <Pagination totalPages={totalPages} currentPage={currentPage}/>
                </div>
            </section>
        </main>
    )
}

export default BlogListPage