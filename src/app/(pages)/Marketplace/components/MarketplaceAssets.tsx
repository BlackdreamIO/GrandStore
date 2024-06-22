"use client"

import { useAssets } from "@/context/AssetProvider";

import { Asset } from "./Asset";

export const MarketplaceAssets = () => {
    
    const { assets, loading, hasMore, LoadMore } = useAssets()!;
    
    return (
        <div className="w-full">
            <ul className="w-full flex flex-row flex-wrap items-center justify-center mt-20 gap-4">
                {
                    assets.map((asset, index) => (
                        <Asset assetData={asset} key={index} />
                    ))
                }
            </ul>
            <div className="w-full mt-10 flex flex-col items-center justify-center">
                <button
                    disabled={loading}
                    onClick={LoadMore}
                    style={{ display : hasMore ? "block" : "none" }}
                    className="w-40 h-12 bg-neutral-900 border-2 border-neutral-800 rounded-md disabled:border-indigo-400">
                        LOAD MORE
                </button>
            </div>
        </div>
    )
}
