
import Image from "next/image";
import Link from "next/link";

import grandfleetLogo from '../../../public/grandfleetLogo.webp';

export const Footer = () => {

    const links = [
        {
            title : "Home",
            path : "/Home"
        },
        {
            title : "Legitimacy",
            path : "/Legitimacy"
        },
        {
            title : "How It Works",
            path : "/HowItWorks"
        },
    ]

    return (
        <div className="bg-neutral-950 border-t-2 border-neutral-700 px-4 py-2 flex flex-col items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start w-full space-x-4">
                    <Image
                        src={grandfleetLogo.src}
                        alt="logo not found"
                        width={100}
                        height={100}
                        unoptimized
                        loading="lazy"
                        className="w-14 h-14 rounded-full"
                    />
                    <h1 className="font-extrabold text-xl">GrandFleet</h1>
                </div>
                <ul className="w-full flex flex-row items-center justify-end space-x-4">
                    {
                        links.map((link, index) => (
                            <Link key={index} href={link.path} className="text-neutral-500 hover:text-white rounded-xl">
                                {link.title}
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
