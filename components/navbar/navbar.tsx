import Link from "next/link";
import LogoutBtn from "./logoutbtn";


async function Navbar() {

    return (
        <header className=" bg-blue-400">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-5">
                <div>
                    <Link 
                        href="/"
                        className="text-white text-2xl"
                    >
                        MyBlogs
                    </Link>
                </div>
                <div className="flex gap-5">
                    <Link 
                        href="/blog"
                        className="text-white cursor-pointer">
                            Browse my Blogs
                    </Link>
                    <Link 
                        href="/blog/create"
                        className="text-white cursor-pointer">
                            Create Blog
                    </Link>
                    <LogoutBtn />
                </div>
            </nav>      
        </header>
    )
}

export default Navbar