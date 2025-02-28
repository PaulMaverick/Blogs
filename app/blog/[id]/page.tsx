import { getSingleBlog } from '@/actions/blogs'
import { DeleteButton } from '@/components/buttons/deleteButton';
import { formatDate } from '@/utils/utils';
import Link from 'next/link';

export type BlogPageProps = {
    params: { id: string };
};

async function BlogPage({params}: BlogPageProps) {
    const { id } = await params;

    const blog = await getSingleBlog(id);

    return (
        <section className='flex-1 flex justify-center p-5'>
            <div className='flex flex-col gap-5 p-5 w-1/2 border-1 border-blue-600 h-fit rounded-lg'>
                <header className='py-2 border-b-1 border-blue-600'>
                    <h3 className='text-3xl text-center'>{blog?.title}</h3>
                    <p className='text-sm'>Date Posted: {formatDate(blog?.created_at)}</p>
                </header>

                <div>
                    <p>{blog?.description}</p>
                </div>

                <div className='flex gap-5'>
                    <Link href={`/blog/${blog?.id}/update`} 
                        className='px-3 py-1 bg-blue-600 text-white rounded-sm'>
                        Edit
                    </Link>
                    <DeleteButton id={id} />
                </div>
            </div>
        </section>
    )
}

export default BlogPage