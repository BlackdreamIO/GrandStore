'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';

import { Asset, AssetUpload } from '@/types/Asset';
import { IFilter } from '@/types/Filter';

import getAssets from '@/app/actions/getAssets';
import getSingleAsset from '@/app/actions/getSingleAsset';
import getFilterAssets from '@/app/actions/getFilterAssets';
import getPaginationAssets from '@/app/actions/getPaginationAssets';
import createAsset from '@/app/actions/assets/CreateAsset/createAsset';

export const dynamic = 'force-dynamic';

export interface AssetContextType{

    assets : Asset[];
    setAssets: Dispatch<SetStateAction<Asset[]>>;
    staticAssets : Asset[];
    setStaticAssets: Dispatch<SetStateAction<Asset[]>>;

    loading : boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    hasMore : boolean;
    setHasMore: Dispatch<SetStateAction<boolean>>;

    GetAllAssets : () => Promise<Asset[]>;
    GetSingleAsset : ({ title } : {title : string}) => Promise<Asset | null>;
    FilterAsset : ({ filterBy, query } : { filterBy : IFilter, query : any }) => void;
    ResetFilter : ({ ReFetch } : { ReFetch : boolean }) => void;

    LoadMore: () => void;
    CreateAsset: ({ assetData } : {assetData : AssetUpload}) => Promise<void>;
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

    const [offset, setOffset] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    
    const limit = 10;

    const GetAllAssets = async () => {
        //const paginationAssets = await getPaginationAssets(offset, limit);
        const paginationAssets = await getAssets(50);
        if(paginationAssets) {
            setAssets(paginationAssets.slice(0, limit));
        }
        setStaticAssets(paginationAssets);
        return assets;
    }

    const GetSingleAsset = async ({ title } : {title : string}) => {
        const asset = await getSingleAsset(title);
        if(asset !== null) {
            return asset;
        }
        return null;
    }

    const LoadMore = async () => {
        setLoading(true);
        if(!hasMore) return;

        const paginationAssets = await getPaginationAssets(limit, offset);
        if(paginationAssets) {
            setHasMore(paginationAssets.length > 0);
            setAssets(prevAssets => [...prevAssets, ...paginationAssets]);
            setOffset(prevOffset => prevOffset + limit);
            setLoading(false);
        }
        setLoading(false);
    }

    const CreateAsset = async ({ assetData } : {assetData : AssetUpload}) => {

        if(assetData.title && assetData.thumbnail && assetData.category && assetData.platform && assetData.downloadLink) {
            if(assetData.originalLink && assetData.originalPrice && assetData.fileType && assetData.description) {
                const AssetFormData : FormData = new FormData();
        
                // FOLDER FILE 
                AssetFormData.append("thumbnail", assetData.thumbnail);
                AssetFormData.append("fileName", "thumbnail");
                AssetFormData.append("folder", assetData.title);
        
                // ASSET INFO
                AssetFormData.append("title", assetData.title);
                AssetFormData.append("category", assetData.category);
                AssetFormData.append("originalLink", assetData.originalLink);
                AssetFormData.append("downloadLink", assetData.downloadLink);
                AssetFormData.append("description", assetData.description);
                AssetFormData.append("created_at", new Date().toDateString());
        
                // NON CONTROLLABLE FIELD
                AssetFormData.append("downloads", String(0)); // initial non controllable feild
                AssetFormData.append("platform", 'Unity'); // initial non controllable feild
                AssetFormData.append("fileType", '.unityPackage'); // initial non controllable feild
                
                assetData.showcaseImages.forEach((img) => AssetFormData.append("showcaseImages[]", img));
        
                setLoading(true);
                const res = await createAsset(AssetFormData);
                setLoading(false);
                console.log(res);
            }
            else {
                alert("Feild Value Missing");
            }
        }
        else {
            alert("Feild Value Missing");
        }
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
        loading,
        setLoading,
        hasMore,
        setHasMore,

        GetAllAssets,
        FilterAsset,
        ResetFilter,
        GetSingleAsset,
        LoadMore,
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