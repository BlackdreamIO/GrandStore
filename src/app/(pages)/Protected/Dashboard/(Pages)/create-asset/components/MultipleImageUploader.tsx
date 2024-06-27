import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface MultipleImageUploaderProps {
    onImageUpload: (images: File[]) => void;
}

export const MultipleImageUploader: React.FC<MultipleImageUploaderProps> = ({ onImageUpload }) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && ["image/png", "image/jpeg", "image/jfif", "image/webp"].includes(selectedFile.type)) {
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, selectedFile];
                onImageUpload(updatedFiles); // Trigger the callback with the updated array of files
                return updatedFiles;
            });
        } else {
            alert("Only Images Are Allowed To Upload");
        }
    };

    const handleRemoveImage = (index: number) => {
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, imgIndex) => imgIndex !== index);
            onImageUpload(updatedFiles); // Trigger the callback with the updated array of files
            return updatedFiles;
        });
    };

    return (
        <div className="w-full space-y-4">
            <h1 className="text-lg">Upload Showcase Images</h1>
            <section className="w-full bg-neutral-900 h-auto p-4">
                <div className="w-full flex flex-row items-center justify-center gap-4">
                    <input 
                        type="file" 
                        className="px-4 w-full bg-neutral-950 h-14 border-2 border-neutral-800 rounded-xl" 
                        onChange={handleFileChange} 
                    />
                </div>
                <ul className="w-full flex flex-row items-center justify-center gap-4 flex-wrap p-6">
                    {files.map((file, index) => (
                        <li key={index} className="w-5/12 relative border-2 border-transparent hover:border-neutral-300">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={`uploaded image ${index + 1}`}
                                width={100}
                                height={100}
                                className="w-full"
                            />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                onClick={() => handleRemoveImage(index)}
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};
