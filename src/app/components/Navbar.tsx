"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import grandfleetLogo from '../../../public/grandfleetLogo.webp';
import hamburgerIcon from '../../../public/icosn/hamburger.svg';

export const Navbar = () => {

    const [oepnNavbar, setOpenNavbar] = useState(false);

    const links = [
        {
            title : "Home",
            path : "/Home"
        },
        {
            title : "About",
            path : "/About"
        },
        {
            title : "Marketplace",
            path : "/Marketplace"
        },
        {
            title : "How It Works",
            path : "/How It Works"
        },
    ]

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(window.innerWidth > 640) {
                setOpenNavbar(false);
            }
        })
    }, [])
    

    return (
        <nav className="relative w-full bg-neutral-950 flex flex-row items-center justify-between max-sm:flex-col max-sm:justify-start space-x-4 max-sm:space-x-0 max-sm:space-y-4 px-4 py-2">
            <div className="flex flex-row items-center justify-between max-sm:w-full">
                <div className="flex-grow flex flex-row items-center justify-start space-x-4">
                    <Image
                        src={grandfleetLogo.src}
                        alt="logo not found"
                        width={100}
                        height={100}
                        unoptimized
                        className="w-10 h-10 rounded-full"
                        loading="lazy"
                    />
                    <h1 className="font-extrabold text-xl">GrandFleet</h1>
                </div>
                <button onClick={() => setOpenNavbar(!oepnNavbar)} className="bg-transparent p-0 border-none hidden max-sm:flex">
                    <Image
                        src={hamburgerIcon.src}
                        alt="logo not found"
                        width={100}
                        height={100}
                        unoptimized
                        className="w-6 h-6 rounded-full max-sm:flex invert"
                    />
                </button>
            </div>
            <ul className="flex flex-row items-center justify-end space-x-6 max-sm:hidden">
                {
                    links.map((link, index) => (
                        <Link key={index} href={link.path} className="text-neutral-500 hover:text-white">
                            {link.title}
                        </Link>
                    ))
                }
            </ul>
            {
                oepnNavbar && (
                    <ul className="w-full flex flex-col items-start justify-start space-y-4">
                        <div className="w-full h-[1px] bg-neutral-800"></div>
                        {
                            links.map((link, index) => (
                                <Link key={index} href={link.path} className="text-neutral-500 hover:text-white w-full hover:bg-neutral-800 py-2 px-4 rounded-xl">
                                    {link.title}
                                </Link>
                            ))
                        }
                    </ul>
                )
            }
        </nav>
    )
}
