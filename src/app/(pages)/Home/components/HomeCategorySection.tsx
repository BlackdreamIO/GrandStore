import Image from "next/image";

export const HomeCategorySection = () => {

    const categories = [
        {
            category : "3D",
            thumbnail : "https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/28fbdea8-d03e-45fb-aa81-13bee5e1ce0b.webp"
        },
        {
            category : "2D",
            thumbnail : "https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/bc8e56e3-3c4c-4c93-aa33-beaff8b9764e.webp"
        },
        {
            category : "AUDIO",
            thumbnail : "https://assetstorev1-prd-cdn.unity3d.com/key-image/b6e9df7a-7858-4806-849c-eada8967b972.webp"
        },
        {
            category : "TOOLS",
            thumbnail : "https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/94433300-8dec-4dd4-9ba7-3ca3880ed3b7.webp"
        },
        {
            category : "TEMPLATE",
            thumbnail : "https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/f83cbda7-e184-4cbb-95dc-95bd1fe23729.webp"
        },
        {
            category : "VFX",
            thumbnail : "https://assetstorev1-prd-cdn.unity3d.com/key-image/e7b79985-56b1-4d9b-9427-86ac5e1ce7d3.webp"
        },
    ]

    const Category = ({ thumbnail, title } : { thumbnail : string, title : string }) => {
        return (
            <div className="relative w-96 h-56 max-xl:w-80 max-xl:h-48 max-md:w-64 max-md:h-36 max-sm:w-64 max-sm:h-auto overflow-hidden bg-neutral-900 rounded-lg p-2 border-2 border-indigo-400 group">
                <Image
                    src={thumbnail}
                    alt="not found"
                    width={100}
                    height={100}
                    unoptimized
                    loading="lazy"
                    className="w-full opacity-75"
                />
                <h1 className="absolute text-4xl font-bold top-24 max-xl:top-20 max-md:top-14 max-lg:text-2xl left-1/2 -translate-x-1/2">{title}</h1>
            </div>
        )
    }

    return (
        <div className="w-full mt-10">
            <h1 className="text-4xl ml-5 max-sm:text-2xl">The Best Marketplace To Find Your Needs</h1>
            <ul className="w-full mt-10 flex flex-row flex-wrap items-center justify-center gap-4">
                {
                    categories.map((category, index) => (
                        <Category
                            key={index + 1}
                            thumbnail={category.thumbnail}
                            title={category.category}
                        />
                    ))
                }
            </ul>
        </div>
    )
}
