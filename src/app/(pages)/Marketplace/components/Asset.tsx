"use client"

import { forwardRef } from "react";
import Image from "next/image"
import Link from "next/link";

import { Asset as AssetTypes } from "@/types/Asset";
import { useInView } from "react-intersection-observer";

interface AssetProps {
    assetData: AssetTypes;
}

export const Asset = forwardRef<HTMLDivElement, AssetProps>(({ assetData }, ref) => {

    const { ref: inViewRef, inView } = useInView({
        threshold: 0.1, 
        triggerOnce: false,
    })

    const setRefs = (node: HTMLDivElement | null) => {
        if (ref && typeof ref === 'function') 
        {
            ref(node);
        } 
        else if (ref) 
        {
            ref.current = node;
        }
        inViewRef(node);
    }

    return (
        <Link href={`/Marketplace/Asset/${assetData.title}`} className="w-[350px] max-xl:w-72 max-sm:w-full h-84 bg-neutral-950 border border-neutral-900 hover:bg-neutral-800 rounded-xl p-4 space-y-4">
            <div ref={setRefs} className="w-full h-[210px] overflow-hidden">
                {
                    inView && (
                        <Image
                            src={assetData.thumbnail}
                            alt="img not found"
                            width={350}
                            height={100}
                            loading="lazy"
                            unoptimized={false}
                            quality={100}
                        /> 
                    )
                }
            </div>
            <div className="w-full space-y-2">
                <h1 className="text-lg truncate max-xl:text-base hover:text-indigo-400">{assetData.title}</h1>
                <p className="text-neutral-400 max-xl:text-sm">Category : {assetData.category}</p>
                <p className="text-neutral-400 max-xl:text-sm">Downloads : {assetData.downloads}</p>
                <p className="text-orange-400 max-xl:text-sm">Free</p>
            </div>
        </Link>
    )
})

Asset.displayName = "Asset";