"use client"

import { useFormStatus } from "react-dom"

function SubmitBUtton() {
    const { pending } = useFormStatus();
    return (
        <button 
            type="submit" 
            disabled={pending}
            className={`bg-blue-600 w-40 self-center p-2 text-white rounded-lg ${pending ? "cursor-none" : "cursor-pointer"}`}
        >
            {pending ? "Submiting..." : "Submit"}
        </button>
    )
}

export default SubmitBUtton; 