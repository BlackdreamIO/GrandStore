import Link from 'next/link';

const Group = [
    {
        title: "Dashboard",
        links: [
            {
                title: "OVERVIEW",
                path: "/Protected/Dashboard/Overview"
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
  
    const linkStyle = `w-full px-4 text-start text-lg hover:text-indigo-400`;

    const RenderLinks = ({ links } : any) => {
        return links.map((link : any) => (
            <Link key={link.title} href={link.path} className={linkStyle}>{link.title}</Link>
        ))
    }

    return (
        <div className="w-full bg-black min-h-screen p-4 space-y-16">
            {Group.map(group => (
                <div key={group.title} className="w-full space-y-4">
                    <h1 className="text-2xl">{group.title}</h1>
                    <div className="w-full h-[1px] bg-neutral-700 my-4"></div>
                    <div className="w-full flex flex-col items-center justify-start space-y-4">
                        <RenderLinks links={group.links} />
                    </div>
                </div>
            ))}
        </div>
    );
}
