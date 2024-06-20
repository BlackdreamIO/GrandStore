import Image from "next/image"

export const HomeGetStarted = () => {
    return (
        <div className='w-full space-y-60 flex flex-col items-center justify-center'>
            <div className="w-11/12 max-lg:w-11/12 flex flex-row items-center justify-between rounded-lg space-x-4 max-md:flex-col max-md:justify-center">
                <Image
                    src={"https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/647202c6-11b9-434b-95b0-fd3c10dbd721.webp"}
                    alt="not found"
                    width={100}
                    height={100}
                    unoptimized
                    loading="lazy"
                    className="w-5/12 max-lg:w-7/12 max-md:hidden"
                />
                <div className="w-6/12 space-y-4 max-md:w-full">
                    <h1 className="text-3xl max-xl:text-xl max-sm:text-base max-md:text-2xl text-center leading-relaxed font-extrabold px-4 py-1">
                        Explore All Varieties of Premium Assets in Our Collection
                    </h1>
                    <Image
                        src={"https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/647202c6-11b9-434b-95b0-fd3c10dbd721.webp"}
                        alt="not found"
                        width={100}
                        height={100}
                        unoptimized
                        loading="lazy"
                        className="w-7/12 m-auto max-md:flex hidden max-sm:w-full"
                    />
                    <p className="text-center max-xl:text-xs max-sm:text-neutral-400">
                        Discover a comprehensive range of premium Unity engine game assets in our collection. Whether you need high-quality 3D models, 
                        textures, animations, sound effects, or complete asset packs, we have everything you need to enhance your game development projects.
                    </p>
                </div>
            </div>
            <div className="w-11/12 max-lg:w-11/12 flex flex-row items-center justify-between rounded-lg space-x-4 max-md:flex-col max-md:justify-center">
                <div className="w-6/12 space-y-4 max-md:w-full">
                    <h1 className="text-3xl max-xl:text-xl max-sm:text-base max-md:text-2xl text-center leading-relaxed font-extrabold px-4 py-1">
                        Find the One You Like 
                    </h1>
                    <Image
                        src={"https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/f9530cc4-287c-43e3-ad7c-910e8c38637d.webp"}
                        alt="not found"
                        width={100}
                        height={100}
                        unoptimized
                        loading="lazy"
                        className="w-7/12 m-auto max-md:flex hidden max-sm:w-full"
                    />
                    <p className="text-center max-xl:text-xs max-sm:text-neutral-400">
                        Explore our extensive collection of premium Unity engine game assets to find the one that perfectly fits your needs. 
                        Whether you{`'`}re looking for stunning 3D models, realistic textures, dynamic animations, immersive sound effects, 
                        or comprehensive asset packs, we have a variety of high-quality options for you to choose from.
                    </p>
                </div>
                <Image
                    src={"https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/f9530cc4-287c-43e3-ad7c-910e8c38637d.webp"}
                    alt="not found"
                    width={100}
                    height={100}
                    unoptimized
                    loading="lazy"
                    className="w-5/12 max-lg:w-7/12 max-md:hidden"
                />
            </div>
            <div className="w-11/12 max-lg:w-11/12 flex flex-row items-center justify-between rounded-lg space-x-4 max-md:flex-col max-md:justify-center">
                <Image
                    src={"https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/f9530cc4-287c-43e3-ad7c-910e8c38637d.webp"}
                    alt="not found"
                    width={100}
                    height={100}
                    unoptimized
                    loading="lazy"
                    className="w-5/12 max-lg:w-7/12 max-md:hidden"
                />
                <div className="w-6/12 space-y-4 max-md:w-full">
                    <h1 className="text-3xl max-xl:text-xl max-sm:text-base max-md:text-2xl text-center leading-relaxed font-extrabold px-4 py-1">
                        Finally, Download
                    </h1>
                    <Image
                        src={"https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/f9530cc4-287c-43e3-ad7c-910e8c38637d.webp"}
                        alt="not found"
                        width={100}
                        height={100}
                        unoptimized
                        loading="lazy"
                        className="w-7/12 m-auto max-md:flex hidden max-sm:w-full"
                    />
                    <p className="text-center max-xl:text-xs max-sm:text-neutral-400">
                        Once you{`'`}ve found the perfect Unity engine game assets from our extensive collection,
                        simply download them to start enhancing your game development project. Enjoy high-quality 3D models, textures, 
                        animations, sound effects, and comprehensive asset packs
                    </p>
                </div>
            </div>
        </div>
    )
}
