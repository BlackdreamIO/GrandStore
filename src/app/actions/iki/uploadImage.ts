"use server"

import { IUploadImage } from "@/types/iki/upload";
import { UploadResponse } from "imagekit-javascript/dist/src/interfaces";

export default async function uploadImage(uploadData : IUploadImage) : Promise<(UploadResponse & { $ResponseMetadata: any }) | null>
{
    try
    {
        if(!(uploadData.file instanceof File)) {
            throw new Error("Only Images Are Allowed To Upload");
        }

        if(!(uploadData.file instanceof File) || !(uploadData.fileName.length > 0) || !(uploadData.folderName.length > 0)) {
            throw new Error("Missing Feilds Value");
        }

        const IKIForm = new FormData();
        IKIForm.append("file", uploadData.file as File);
        IKIForm.append("fileName", uploadData.fileName as string);
        IKIForm.append("folder", uploadData.folderName as string);

        const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!;

        const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
            method : "POST",
            body : IKIForm,
            headers: {
                Authorization: `Basic ${Buffer.from(privateKey + ':').toString('base64')}`,
            },
        }).then(async (response) => {
            const responseJSON : UploadResponse & { $ResponseMetadata: any } = await response.json();
            return responseJSON;
        })
        .catch((e) => {
            return null;
        })
        
        return response;
    } 
    catch (error : any) 
    {
        throw new Error(error);
    }
}