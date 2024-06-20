"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import logIn from "@/app/actions/auth/logIn";
import { setCookie } from 'cookies-next';

export default function Authentication()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const sucess = await logIn({ email : email, password : password });
        if(sucess) {
            setCookie("verified", sucess, { maxAge : 30 * 24 * 60 * 60 });
            router.push("/Protected/Dashboard");
        }
    };

    return (
        <div className="w-full min-h-screen pt-10 space-y-10">
            <h1 className="text-center text-5xl mt-10">Authentication Barieer</h1>
            <form onSubmit={handleLogin} action={'#'} className="w-8/12 max-lg:w-9/12 max-sm:w-11/12 m-auto bg-neutral-900 rounded-xl p-4 flex flex-col items-center justify-center space-y-6">
                <ul className="w-full flex flex-row items-center justify-center space-x-4 max-sm:flex-col max-sm:justify-start max-sm:space-x-0 max-sm:space-y-4">
                    <div className="w-full flex flex-col space-y-4">
                        <label htmlFor="email">Email</label>
                        <input
                            className="w-full bg-neutral-950 h-14 border border-neutral-800 hover:border-neutral-700 rounded-xl px-4 !ring-0 !outline-none"
                            type="email"
                            id="email"
                            onChange={((e) => setEmail(e.target.value))}
                        />
                    </div>
                    <div className="w-full flex flex-col space-y-4">
                        <label htmlFor="password">Password</label>
                        <input
                            className="w-full bg-neutral-950 h-14 border border-neutral-800 hover:border-neutral-700 rounded-xl px-4 !ring-0 !outline-none"
                            type="password"
                            id="password"
                            onChange={((e) => setPassword(e.target.value))}
                        />
                    </div>
                </ul>
                <button type="submit" className="w-full rounded-xl border border-neutral-800 h-14 bg-neutral-950 hover:bg-indigo-600"> 
                    AUTHENTICATE 
                </button>
            </form>
        </div>
    )
}
