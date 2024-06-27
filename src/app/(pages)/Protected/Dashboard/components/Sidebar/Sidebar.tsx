"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Group = [
    {
        title: "Dashboard",
        links: [
            {
                title: "OVERVIEW",
                path: "/Protected/Dashboard/overview"
            }
        ]
    },
    {
        title: "Asset",
        links: [
            {
                title: "All Asset",
                path: "/Protected/Dashboard/all-assets"
            },
            {
                title: "Create Asset",
                path: "/Protected/Dashboard/create-asset"
            },
            {
                title: "Update Asset",
                path: "/Protected/Dashboard/update-asset"
            },
            {
                title: "Delete Asset",
                path: "/Protected/Dashboard/delete-asset"
            }
        ]
    },
    {
        title: "Authentication",
        links: [
            {
                title: "Add Developer",
                path: "/Protected/Dashboard/add-developer"
            },
            {
                title: "Remove Developer",
                path: "/Protected/Dashboard/remove-developer"
            }
        ]
    },
    {
        title: "Additional",
        links: [
            {
                title: "Asset Interest",
                path: "/Protected/Dashboard/asset-interest"
            },
            {
                title: "Requested Asset",
                path: "/Protected/Dashboard/requested-asset"
            }
        ]
    }
];

export const Sidebar = () => {

    const pathname = usePathname();

    const linkStyle = `w-full px-4 text-start text-neutral-500 text-lg max-lg:text-sm py-2 rounded-lg transition-all duration-250 border-2 border-transparent`;

    const RenderLinks = ({ links } : any) => {
        return links.map((link : any) => (
            <Link 
                key={link.title} 
                href={link.path} 
                className={`
                    ${linkStyle} 
                    ${pathname === link.path ? "!text-neutral-200 bg-neutral-900 !border-indigo-400" : "hover:text-neutral-200 hover:bg-neutral-900"}`}>
                        {link.title}
                </Link>
        ))
    }

    return (
        <div className="w-[300px] max-md:w-[200px] bg-neutral-950 h-[90vh] overflow-y-scroll custom-scrollbar p-4 space-y-16 pt-5 max-md:absolute max-md:z-40">
            {Group.map(group => (
                <div key={group.title} className="w-full space-y-4">
                    <h1 className="text-2xl max-lg:text-base">{group.title}</h1>
                    <div className="w-full h-[1px] bg-neutral-700 my-4"></div>
                    <div className="w-full flex flex-col items-start justify-start space-y-4">
                        <RenderLinks links={group.links} />
                    </div>
                </div>
            ))}
        </div>
    );
}
