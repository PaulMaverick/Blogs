"use client";

import { logOff } from "@/actions/auth";
import { useState } from "react";

function LogoutBtn() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async(event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        await logOff();
        setLoading(false);
    }

    return (
        <div className="border-white border-1 w-20 flex justify-center items-center rounded-lg cursor-pointer">
            <form onSubmit={handleLogout}>
                <button type="submit" disabled={loading} className="text-white cursor-pointer">
                    {loading ? "Signing out..." : "Sign Out"}
                </button>
            </form>
        </div>
    )
}

export default LogoutBtn;