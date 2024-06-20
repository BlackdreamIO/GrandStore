'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';

import { Asset } from '@/types/Asset';
import { IFilter } from '@/types/Filter';

import getAssets from '@/app/actions/getAssets';
import getSingleAsset from '@/app/actions/getSingleAsset';
import getFilterAssets from '@/app/actions/getFilterAssets';

export const dynamic = 'force-dynamic';

export interface AssetContextType{

    assets : Asset[];
    setAssets: Dispatch<SetStateAction<Asset[]>>;
    staticAssets : Asset[];
    setStaticAssets: Dispatch<SetStateAction<Asset[]>>;

    GetAllAssets : () => Promise<Asset[]>;
    GetSingleAsset : ({ title } : {title : string}) => Promise<Asset | null>;
    FilterAsset : ({ filterBy, query } : { filterBy : IFilter, query : any }) => void;
    ResetFilter : ({ ReFetch } : { ReFetch : boolean }) => void;
    CreateAsset: (data : Asset) => Promise<void>;
    UpdateAsset: (data : Asset) => Promise<void>;
    DeleteAsset: (id: string) => Promise<any>;
}

type AssetContextProviderProps = {
    children : ReactNode;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const useAssets = () => useContext(AssetContext);

export const AssetContextProvider = ({children} : AssetContextProviderProps) => {

    const [assets, setAssets] = useState<Asset[]>([]);
    const [staticAssets, setStaticAssets] = useState<Asset[]>([]);

    const GetAllAssets = async () => {
        const assets = await getAssets();
        setAssets(assets);
        setStaticAssets(assets);
        return assets;
    }

    const GetSingleAsset = async ({ title } : {title : string}) => {
        const asset = await getSingleAsset(title);
        if(asset !== null) {
            return asset;
        }
        return null;
    }

    const CreateAsset = async () => {
        
    }

    const UpdateAsset = async () => {
        
    }
    
    const DeleteAsset = async () => {
        return [];
    }

    const FilterAsset = async ({ filterBy, query } : { filterBy : IFilter, query : any }) => {
        const assets = await getFilterAssets({ filterBy : filterBy, query : query });
        if(assets) {
            setAssets(assets);
        }
    }

    const ResetFilter = async ({ ReFetch } : { ReFetch : boolean }) => {
        if(ReFetch) {
            const originalAsset = await GetAllAssets();
            setAssets(originalAsset);
        }
        setAssets(staticAssets);
    }

    useEffect(() => {
        GetAllAssets();
    }, [])
    

    const contextValue: AssetContextType = {
        assets,
        setAssets,
        staticAssets,
        setStaticAssets,

        GetAllAssets,
        FilterAsset,
        ResetFilter,
        GetSingleAsset,
        CreateAsset,
        UpdateAsset,
        DeleteAsset
    };

    return (
        <AssetContext.Provider value={contextValue}>
            {children}
        </AssetContext.Provider>
    )
}