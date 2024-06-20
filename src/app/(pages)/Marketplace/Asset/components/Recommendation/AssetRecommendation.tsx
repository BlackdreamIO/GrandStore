"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import getFilterAssets from '@/app/actions/getFilterAssets';
import { IFilter } from '@/types/Filter';
import { Asset } from '@/types/Asset';


export const AssetRecommendation = ({ category, currentAssetTitle } : { category : string, currentAssetTitle : string }) => {

    const [recommendedAssets, setRecommendedAssets] = useState<Asset[]>([]);

    useEffect(() => {
        const fetchRecommendedAssets = async () => {
            const assets = await getFilterAssets({ filterBy : IFilter.Category, query : category, limit : 5 });
            if (assets) {
                const updatedAsset = assets.filter((asset) => asset.title !== currentAssetTitle);
                setRecommendedAssets(updatedAsset);
            }
        };
    
        fetchRecommendedAssets();
    }, [category]);

    return (
        <div className='w-full space-y-8 !mt-10'>
            <div className='w-full h-[1px] bg-neutral-800'></div>
            <h1 className='text-2xl'>Recommended Assets by Similer Category</h1>
            <ul className='flex flex-row flex-wrap items-center justify-start gap-6'>
                {recommendedAssets.map((asset, index) => (
                    <Link 
                        href={`/Marketplace/Asset/${asset.title}`} 
                        className='w-64 flex flex-col items-center justify-start space-y-4 overflow-hidden bg-neutral-950 hover:bg-neutral-900 pb-5 rounded-lg border border-neutral-700' 
                        key={asset.id}
                    >
                        <Image
                            src={asset.thumbnail}
                            alt='thumbnail not found'
                            width={250}
                            height={100}
                            loading='lazy'
                            quality={70}
                        />
                        <h3 className='w-full text-center truncate'>{asset.title}</h3>
                        <p>Category: {asset.category}</p>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
