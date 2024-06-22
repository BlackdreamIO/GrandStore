"use client"

import Image from "next/image";
import Link from "next/link";

import { useAssets } from "@/context/AssetProvider";
import { IFilter } from "@/types/Filter";

export default function AllAssetsPage ()
{
    const { assets, LoadMore, loading, hasMore, FilterAsset } = useAssets()!;

    return (
        <div className="w-full h-screen overflow-y-scroll p-6 space-y-4 no-scrollbar">
            <h1 className="text-3xl">All Assets Page</h1>
            <div className="w-full flex flex-row items-center justify-center">
                <input
                    type="text"
                    placeholder="Search Asset"
                    className="w-full bg-neutral-900 h-12 rounded-md px-4"
                    onChange={(e) => {
                        const currentTimout = setTimeout(() => {
                            FilterAsset({ filterBy : IFilter.Title, query : e.target.value })
                        }, 500);

                        return () => clearTimeout(currentTimout);
                    }}
                />
            </div>
            <div className="w-full h-[1px] bg-neutral-800"></div>
            <ul className="w-full flex flex-col items-center justify-center space-y-4 !mt-10">
                {
                    assets && assets.map((asset, index) => (
                        <Link 
                            href={`/Marketplace/Asset/${asset.title}`} 
                            target="_blank" 
                            key={index} 
                            className="w-full min-h-20 bg-neutral-950 flex flex-row items-center justify-start gap-4 px-2 rounded-md border-2 border-neutral-900 hover:bg-neutral-800 hover:border-sky-400 transition-all duration-100"
                        >
                            <div className="w-full flex flex-row items-center justify-start gap-4">
                                <Image
                                    src={asset.thumbnail}
                                    alt="thumbnail not found"
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                />
                                <p>{asset.title}</p>
                            </div>
                            <div className="w-full flex flex-row items-center justify-end gap-4 text-neutral-400">
                                <p className="text-emerald-400">{asset.category}</p>
                                <p>{asset.created_at && new Date(asset.created_at).toDateString()}</p>
                                <p className="text-orange-400">ID : {asset.id}</p>
                            </div>
                        </Link>
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
