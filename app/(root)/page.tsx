import { getAllBlogs } from "@/actions/blogs";
import { Pagination } from "@/components/pagination/pagination";

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {

    const { page } = await searchParams
    const currentPage = parseInt(page, 10) || 1;
    const { data, totalPages } = await getAllBlogs({ currentPage });



    return (
        <main className="flex-1 flex flex-col">
            <section className="flex-1">
                <header className="text-center p-5">
                    <h1 className="text-2xl font-bold">Blog Feed</h1>
                </header>
                <div className="flex-1 flex flex-col items-center gap-5">
                    {data?.map(blog => (
                        <article key={blog.id}
                            className="border-1 border-blue-600 w-1/2 p-5 rounded-lg"
                        >
                            <header className=" border-b-1 pb-2 border-blue-600">
                                <h3 className="text-1xl font-bold">{blog.title}</h3>
                                <h5 className="text-sm text-gray-500">posted by: {`${blog?.profiles?.first_name} ${blog?.profiles?.last_name}`}</h5>
                            </header>
                            <div className="p-2">
                                <p>{blog.description}</p>
                            </div>
                        </article>
                    ))}
                    <Pagination totalPages={totalPages} currentPage={currentPage}/>
                </div>
            </section>
        </main>
    );
}
