"use client";

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation';

type paginationProps = {
    totalPages: number
    currentPage: number
}

export const Pagination = ({ totalPages, currentPage }: paginationProps) => {
    const currentPath = usePathname();
    const params = useSearchParams();

    const page = parseInt(params.get("page") as string, 10) || 1;

    return (
        <div className='flex gap-5 p-5'>
            <div>
                <Link
                    className={`${page == 1 ? "pointer-events-none opacity-50" : ""} text-2xl`}    
                    href={`${currentPath}?page=${page - 1}`}
                >
                     &lt;&lt;
                </Link>
            </div>
            <div><p>Page: {currentPage}</p></div>
            <div>
                <Link
                    className={`${page == totalPages ? 'pointer-events-none opacity-50' : ''} text-2xl`}
                    href={`${currentPath}?page=${page + 1}`}
                >
                   &gt;&gt;
                </Link>
            </div>
        </div>
    )
}
