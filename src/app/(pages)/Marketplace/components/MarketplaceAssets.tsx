"use client"

import { useAssets } from "@/context/AssetProvider";

import { Asset } from "./Asset";

export const MarketplaceAssets = () => {
    
    const { assets } = useAssets()!;
    
    return (
        <div className="w-full">
            <ul className="w-full flex flex-row flex-wrap items-center justify-center mt-20 gap-4">
                {
                    assets.map((asset, index) => (
                        <Asset assetData={asset} key={index} />
                    ))
                }
            </ul>
        </div>
    )
}
