"use server"

import { Asset, AssetUpload } from "@/types/Asset";
import { craeteSupabaseAppServerClient } from "@/app/utils/supabase";

import uploadImage from "../../iki/uploadImage";

interface IUploadThumbnail {
    hasError : boolean;
    url : string;
}

async function UploadFile ({file, fileName, folder, useUniqueFileName} : {file : File, fileName : string, folder : string, useUniqueFileName? : boolean}) : Promise<IUploadThumbnail> {
    try
    {
        const ConvertToFolderName = (value : string) => {
            return value.replaceAll(" ", "_").replaceAll("-", "_").replaceAll("(", "_").replaceAll(")", "_").replaceAll("[", "_").replaceAll("]", "_");
        }

        if(file instanceof File && fileName && folder) {

            const response = await uploadImage({
                file : file,
                fileName : fileName,
                folderName : ConvertToFolderName(folder),
                useUniqueFileName : useUniqueFileName ?? true
            })

            if(response) return { hasError : false, url : response.thumbnailUrl };
            return { hasError : true, url : "" };
        }
        return { hasError : true, url : "" };
    }
    catch (error : any) {
        throw new Error(error);
    }
}

export default async function createAsset(formData : FormData) : Promise<any>
{
    try
    {
        const title = formData.get('title')! as string;
        const category = formData.get('category')! as string;
        const description = formData.get('description')! as string;
        const originalLink = formData.get('originalLink')! as string;
        const platform = formData.get('platform')! as string;
        const fileType = formData.get('fileType')! as string;
        const downloadLink = formData.get('downloadLink')! as string;
        const downloads = formData.get('downloads')!;
        const created_at = formData.get('created_at')!;

        let hasIKIError = false;
        let thumbnailSrc = "";
        let showcaseImagesSrc : string[] = [];

        const thumbnail = formData.get('thumbnail')! as File;
        const showcaseImages = formData.getAll('showcaseImages[]')! as File[];

        const uploadResponse = await UploadFile({
            file : thumbnail,
            fileName : "thumbnail",
            folder : title,
            useUniqueFileName : false
        });
        if(uploadResponse.url && !uploadResponse.hasError) {
            thumbnailSrc = uploadResponse.url;
        }
        if(uploadResponse.hasError) {
            hasIKIError = true;
            throw new Error("500 : Error While Uploading Thumbnail File");
        }
        if(showcaseImages) {
            for (let i = 0; i < showcaseImages.length; i++) {
                const response = await UploadFile({
                    file : showcaseImages[i],
                    fileName : `ShowcaseImage ${i}`,
                    folder : `${title}/showcase/`
                })
                if(!response.hasError && response.url) {
                    showcaseImagesSrc.push(response.url);
                }
                else {
                    hasIKIError = true;
                    throw new Error("500 : Error While Uploading Showcase Images File");
                }
            }
        }

        if(thumbnailSrc && !hasIKIError) {

            const newAssetData = {
                title: title,
                thumbnail: thumbnailSrc,
                category: category,
                downloads: downloads,
                showcaseImages: showcaseImagesSrc,
                description: description,
                originalLink: originalLink,
                platform: platform,
                fileType: fileType,
                created_at : created_at,
                downloadLink : downloadLink,
            };

            const supabase = craeteSupabaseAppServerClient();
            const { data, error } = await supabase.from("unityAssets").insert(newAssetData);

            if(!error) 
            {
                return data;
            }
            throw new Error(error.message);
        }
        else {
            throw new Error("Internal 500 Error");
        }
    } 
    catch (error : any) 
    {
        throw new Error(error);
        return [];
    }
}