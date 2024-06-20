import { Asset } from "@/types/Asset";


export const AssetInfo = ({ currentAssetData } : { currentAssetData : Asset }) => {

    return (
        <div className="w-6/12 p-2 space-y-8 max-md:w-full">
            <h1 className="text-3xl max-lg:text-xl max-lg:font-bold"> {currentAssetData?.title}</h1>
            <ul className="w-full flex flex-col items-start justify-center space-y-4 max-lg:text-sm">
                <p>Category : {currentAssetData.category}</p>
                <p>Uploaded : {currentAssetData?.created_at && new Date(currentAssetData?.created_at)?.toDateString()} </p>
                <p>Supported Platforms : Untiy</p>
                <p>Download Type : <span className="underline underline-offset-4"> {`.unitypackage`} </span></p>
                <p>Total Downloads : 204</p>
                <p>Original Link : 
                    <a href={currentAssetData.originalLink} className="mx-2 text-blue-400 hover:text-blue-300">
                        https://assetstore.unity.com/packages/tools/utilities/obfuscator-pro-89589
                    </a>
                </p>
            </ul>
            <div className="w-full bg-neutral-800 h-[1px] my-4"></div>
            <ul className="w-full flex flex-col items-start justify-center space-y-4">
                <p className="text-md">Original Price : 125$</p>
                <p className="text-md">Discount Price : 0$</p>
                <p className="text-md">Current Price : 0$</p>
            </ul>
            <div className="w-full bg-neutral-800 h-[1px] my-4"></div>
            <div className="w-full flex flex-row items-center justify-center">
                <button className="w-9/12 h-12 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg">DOWNLOAD FREE</button>
            </div>
        </div>
    )
}
