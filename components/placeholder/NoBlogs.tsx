import Link from "next/link"

function NoBlogs() {
  return (
    <div className="flex justify-center">
        <div className="text-center border-1 border-blue-600 w-1/2 p-5 rounded-lg flex flex-col gap-3">
            <h2 className="text-2xl">It seems that you don&apos;t have any blogs at the moment</h2>
            <p className="text-2xl">Click the button below to start creating!</p>
            <Link 
                className="bg-blue-600 py-2 px-5 rounded-lg text-white cursor-pointer w-40 self-center"
                href="/blog/create">Create</Link>
        </div>
    </div>
  )
}

export default NoBlogs