import UpdateForms from '@/components/forms/updateForms';
import { type BlogPageProps } from '../page'
import { getSingleBlog} from '@/actions/blogs';

async function UpdateBlogPage({params}: BlogPageProps) {
    const { id } = await params;
    const blog = await getSingleBlog(id);

    return (
        <>
            <UpdateForms blog={blog}/>
        </>
    )
}

export default UpdateBlogPage