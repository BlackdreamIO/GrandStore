"use client"

import { useState } from "react";

export const ThumbnailUploader = ({ onUpload } : { onUpload : (file : any) => void }) => {

    const [uploadedFile, setUploadedFile] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();

            setFileName(file.name);

            onUpload(file);
                
            reader.onloadend = () => {
                const result = reader.result as string;
                setUploadedFile(result);
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    return (
        <div className="w-full space-y-4">
            <h1 className="text-lg">Thumbnail</h1>
            <div className="w-full h-60 relative p-4 bg-neutral-900 border-2 border-neutral-800 hover:border-neutral-600 rounded-xl">
                <input 
                    type="file" 
                    className="w-full h-60 absolute top-0 left-0 bg-neutral-400 opacity-0 cursor-pointer" 
                    onChange={handleFileUpload}
                />
                {
                    uploadedFile == "" && (
                        <>
                            <p className="absolute top-24 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl pointer-events-none">
                                Upload Thumbnail
                            </p>
                            <p className="absolute top-36 left-1/2 -translate-y-1/2 -translate-x-1/2 text-base pointer-events-none text-neutral-400">
                                uploaded image size should be 350px by 250px or 350px by 350px
                            </p>
                        </>
                    )
                }
                {uploadedFile !== "" && (
                    <p className="uppercase absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-base pointer-events-none text-indigo-300">
                        UPLOADED {fileName}
                    </p>
                )}
            </div>
        </div>
    )
}
