import Image from "next/image"

export const HomeWhyUS = () => {
    const labelStyle = `text-2xl border-b-4 border-black max-xl:text-xl max-lg:text-lg max-md:text-sm`;
    
    return (
        <div className="w-9/12 max-lg:w-11/12 !mb-20 bg-blue-600 flex flex-row items-center justify-between rounded-lg max-md:justify-center">
            <Image
                src={"https://assetstorev1-prd-cdn.unity3d.com/key-image/2f401ca3-7384-4a04-b970-8e4336c4f053.webp"}
                alt="not found"
                width={100}
                height={100}
                unoptimized
                loading="lazy"
                className="w-96 max-lg:w-80 max-md:hidden"
            />
            <div className="flex-grow max-md:w-full flex flex-col items-center justify-end p-4 space-y-4">
                <h1 className="text-3xl font-extrabold bg-black px-4 py-1">WHY US</h1>
                <div className="flex flex-row items-center justify-center space-x-4">
                    <h1 className={labelStyle}>NO CREDIT CARD REQUIRED</h1>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
                    <h1 className={labelStyle}>NO CREDIT REQUIRED</h1>
                    <h1 className={labelStyle}>100% VIRUS SAFE</h1>
                </div>
                <div className="flex flex-row items-center justify-center space-x-4">
                    <h1 className={labelStyle}>NO SPAM</h1>
                    <h1 className={labelStyle}>LEGITIMACY</h1>
                </div>
            </div>
        </div>
    )
}
