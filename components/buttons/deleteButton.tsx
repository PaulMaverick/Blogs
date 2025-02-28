"use client"
import { deleteBlog } from "@/actions/blogs"
import { useState, useTransition } from "react"

type deleteProps = {
    id: string
}

export const DeleteButton = ({ id }: deleteProps) => {
    const [isPending, startTransition] = useTransition()
    const [confirmation, setConfirmation] = useState(false)

    function handleDelete() {
        startTransition(async () => {
          await deleteBlog(id);
        });
    }

    function handleConfirmation() {
        setConfirmation(true)
    }

    return (
       <>
            {
                confirmation ? (
                    <>
                        <button 
                            onClick={handleDelete}
                            className='px-2 py-1 bg-red-600 text-white rounded-sm cursor-pointer'>
                            Are you sure?
                        </button>
                        <button 
                            onClick={() => setConfirmation(false)}
                            className='px-2 py-1 bg-blue-600 text-white rounded-sm cursor-pointer'>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={handleConfirmation}
                        disabled={isPending}
                        className='px-2 py-1 bg-red-600 text-white rounded-sm cursor-pointer'>
                        { isPending ? "Deleting..." : "Delete"}
                    </button>
                )
            }
       </>
    )
}