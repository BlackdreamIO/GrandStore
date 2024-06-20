"use client"

import { useState } from "react";
import Image from "next/image";
import { Asset } from "@/types/Asset";


export const AssetCarousel = ({ currentAssetData } : { currentAssetData : Asset }) => {

    const [currentImage, setCurrentImage] = useState("");

    return (
        <div className="min-w-[510px] max-lg:min-w-28 w-6/12 space-y-8 max-md:w-full flex flex-col max-md:items-center">
            <Image
                src={currentImage == "" ? (currentAssetData?.thumbnail ? currentAssetData.thumbnail : '') : currentImage}
                alt="wadwa"
                width={100}
                height={100}
                className="w-full rounded-lg border-4 border-indigo-500 max-md:w-11/12 max-sm:w-full"
                unoptimized
            />
            <ul className="w-full flex flex-row flex-wrap items-center justify-center gap-4">
                {
                    currentAssetData?.showcaseImages && (
                        currentAssetData?.showcaseImages.map((img, index) => (
                            <button  onClick={() => setCurrentImage(img)} className="p-0 border-2 border-transparent hover:border-indigo-500 rounded-lg " key={index}>
                                <Image
                                    src={img}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="p-2 bg-neutral-700 rounded-lg max-lg:w-12 max-lg:h-12 max-lg:p-1 max-sm:w-8 max-sm:h-8"
                                    loading="lazy"
                                    quality={20}
                                />
                            </button>
                        ))
                    )
                }
            </ul>
        </div>
    )
}
