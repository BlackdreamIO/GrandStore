
export interface Asset {
    id? : string;
    title : string;
    thumbnail : string;
    category : string;
    downloads : string;
    showcaseImages : string[];
    description : string;
    originalLink : string;
    downloadLink : string;
    platform : string;
    fileType : string;
    created_at : Date;
}

export interface AssetUpload {
    title : string;
    thumbnail : File | Blob | string;
    category : string;
    downloads : number;
    showcaseImages : File[] | Blob[] | string[];
    description : string;
    originalLink : string;
    downloadLink : string;
    platform : string;
    fileType : string;
    originalPrice : string;
    created_at : Date;
}