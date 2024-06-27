import { UploadResponse } from "imagekit-javascript/dist/src/interfaces";

export interface IUploadImage {
    file : File | Blob | string;
    fileName : string;
    folderName : string;
    useUniqueFileName? : boolean;
};