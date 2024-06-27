"use client"

import { useEffect, useState } from "react";
import { useAssets } from "@/context/AssetProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import { AssetUpload } from "@/types/Asset";

import getCategories from "@/app/actions/category/getCategories";
import deleteCategory from "@/app/actions/category/deleteCategoire";
import createCategory from "@/app/actions/category/createCategorie";

import { MultipleImageUploader } from "./MultipleImageUploader";
import { CategoryDropdown } from "./CategoryDropdown";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { TiptapEditor } from "@/app/components/TipTapEditor";

import { Input } from './Input';

const AssetForm = () => {
    
    const [categoires, setCategoires] = useState<string[]>(['']);
    const [showcaseImages, setShowcaseImages] = useState<File[]>([]);

    const { setValue, getValues, handleSubmit } = useForm<AssetUpload>();
    const { CreateAsset, loading } = useAssets()!;

    const HandleCreateCategory = async (category : string) => {
        await createCategory({ category : category, revalidationPath : "/Protected/Dashboard/create-asset" });
    }
    const HandleDeleteCategory = async (category : string) => {
        await deleteCategory({ category : category, revalidationPath : "/Protected/Dashboard/create-asset" });
    }

    const handleAssetDeploy : SubmitHandler<AssetUpload> = async (data) => {
        await CreateAsset({
            assetData  : {
                title : data.title,
                thumbnail : getValues("thumbnail"),
                category : data.category,
                downloadLink : data.downloadLink,
                downloads : 0,
                fileType : '.unityPackage',
                originalLink : data.originalLink,
                platform : "Unity",
                originalPrice : data.originalPrice,
                showcaseImages : showcaseImages,
                description : data.description,
                created_at : new Date()
            }
        })
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const FetchedCategoires = await getCategories("/Protected/Dashboard/create-asset");
            if(FetchedCategoires) {
                setCategoires(FetchedCategoires.map((x : any, i) => x.category));
            }
        }

        fetchCategories();
    }, [])

    return (
        <div className="w-full space-y-16">
            <div className="w-full h-[1px] bg-neutral-800"></div>
            <form onSubmit={handleSubmit(handleAssetDeploy)} action="#" className="space-y-8">
                <ThumbnailUploader  onUpload={(file) => setValue("thumbnail", file)} />
                <Input id="title" label="Title" onChange={((e) => setValue("title", e.target.value))} />
                
                <CategoryDropdown 
                    label="Category"
                    content={categoires}
                    onSelect={(category) => setValue("category", category)}
                    onCategoryCreate={(c) => HandleCreateCategory(c)}
                    onCategoryDelete={(c) => HandleDeleteCategory(c)}
                />
                <Input id="originalLinks" label="Original Link" onChange={((e) => setValue("originalLink", e.target.value))} />
                <Input id="downloadLinks" label="Download Link" onChange={((e) => setValue("downloadLink", e.target.value))} />
                <Input id="originalPrice" label="Original Price" onChange={((e) => setValue("originalPrice", e.target.value))} />
                <Input id="platform" label="Platform" defaultValue={"Unity"} disabled onChange={((e) => setValue("platform", "Unity"))} />
                
                <MultipleImageUploader
                    onImageUpload={setShowcaseImages}
                />

                <div className="w-full">
                    <h1 className="mb-5 text-lg">Description</h1>
                    <div className="w-full">
                        <TiptapEditor editable content={''} onValueChange={e => setValue("description", e)} />
                    </div>
                </div>

                <button className={`w-full ${ loading ? "bg-black" : "bg-neutral-300"} ${loading ? "text-indigo-400" : "text-black"} h-12 px-2 py-2 text-black text-xl rounded-xl ${loading ? "border-4 border-blue-400" : "border-4 border-transparent hover:border-blue-400"}`}>
                    {loading ? "Loading Do Not Close" : "Deploy"}
                </button>
            </form>
        </div>
    )
}

AssetForm.displayName = "AssetForm";

export default AssetForm;