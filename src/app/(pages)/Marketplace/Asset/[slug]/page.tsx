"use client"

import { useEffect, useState } from "react";
import { useAssets } from "@/context/AssetProvider";
import { Asset } from "@/types/Asset";
import { TiptapEditor } from "@/app/components/TipTapEditor";

import { AssetInfo } from "../components/AssetInfo";
import { AssetCarousel } from "../components/AssetCarousel";
import { AssetRecommendation } from "../components/Recommendation/AssetRecommendation";

const SingleAsset = ({ params } : { params : { slug : string } }) => {

    const [currentAssetData, setCurrentAssetData] = useState<Asset | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { GetSingleAsset } = useAssets()!;

    const maxAssetLoadTimout = 6000; // MS

    useEffect(() => {
        const fetchSingleAsset = async () => {
            const singleAsset = await GetSingleAsset({ title : decodeURIComponent(params.slug)});            
            if(singleAsset) {
                setCurrentAssetData(singleAsset);
            }
            setIsLoading(false);
        }
        fetchSingleAsset();

        const currentTimeID = setTimeout(() => {
            setIsLoading(false);
        }, maxAssetLoadTimout);
        return () => clearTimeout(currentTimeID);
    }, [])



    if(!currentAssetData) {

        return (
            <div className="w-full min-h-screen py-10 space-y-16">
                <h1 className="text-5xl text-neutral-600 text-center"> {isLoading ? "LOADING..." : "ASSET NOT FOUND"} </h1>
            </div>
        )
    }

    return (
        <div className="w-full max-w-screen-3xl m-auto min-h-screen py-10 space-y-16">
            <h1 className="text-5xl text-neutral-600 text-center"> ASSET DETAILS</h1>
            
            <section className="w-full flex flex-row items-start justify-between gap-8 px-10 max-sm:px-5 max-md:space-y-8 max-md:flex-col max-md:items-start max-md:justify-start">
                <AssetCarousel currentAssetData={currentAssetData} />
                <AssetInfo currentAssetData={currentAssetData} />
            </section>
            <div className="w-full h-[1px] bg-neutral-700"> </div>

            <section className="px-5 space-y-8">
                <h1 className="text-xl">Description</h1>
                <pre className="text-neutral-400 leading-loose ml-5 whitespace-pre-wrap">
                    
                </pre>
                <TiptapEditor editable={false} content={currentAssetData?.description} />
            </section>

            <section className="px-5 space-y-8">
                <AssetRecommendation currentAssetTitle={currentAssetData.title} category={currentAssetData?.category} />
            </section>
        </div>
    )
}

export default SingleAsset