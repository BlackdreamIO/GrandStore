"use client"

import { useEffect, useRef, useState } from "react";

// UI COMPONENT

interface DropdownProps {
    defaultValue? : string;
    label: string;
    content : string[];
    onSelect : (value : string) => void;
    onCategoryCreate : (category : string) => void;
    onCategoryDelete : (category : string) => void;
}

export const CategoryDropdown = ({ label, content, defaultValue, onSelect, onCategoryCreate, onCategoryDelete } : DropdownProps) => {

    const [newCategory, setNewCategory] = useState("");
    const [searchedCategory, setSearchedCategory] = useState("");
    const [categories, setCategories] = useState<string[]>(content);

    const [selectedItem, setSelectedItem] = useState<string>(defaultValue ?? "");
    const [openDropdown, setOpenDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleDropdownOpen = (e : any) => {
        e.preventDefault();
        setOpenDropdown(!openDropdown);
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(false);
            }
        };
    
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, [])

    useEffect(() => {
        setCategories(content);
    }, [])

    useEffect(() => {
        if(searchedCategory == "") {
            setCategories(content);
        }
        else {
            setCategories((e) => categories.filter((category, i) => category.includes(searchedCategory)));
        }
    }, [searchedCategory, content])
    

    return (
        <div ref={dropdownRef} className="w-full relative flex flex-col items-start justify-center space-y-4">
            <label htmlFor={label} className="text-lg">{label}</label>
            <button 
                onClick={handleDropdownOpen}
                className="w-full h-12 flex flex-row items-center justify-between space-x-4 bg-neutral-900 border-2 border-neutral-800 hover:border-neutral-700 
                px-4 rounded-lg !ring-0 !outline-none focus-visible:border-neutral-500 cursor-pointer text-start">
                    
                <h1>{selectedItem ?? content[0]}</h1>
            </button>
            {
                openDropdown && (
                    <div className="w-6/12 h-auto max-h-96 overflow-y-scroll overflow-x-hidden custom-scrollbar py-2 px-2 absolute top-24 left-1 bg-neutral-950 z-40 space-y-2 rounded-md border-2 border-neutral-700">
                        <p className="text-center">Update Require Full Page Refresh</p>
                        <input
                            className="w-full h-10 py-2 px-4 border-2 border-transparent cursor-pointer rounded-tl-xl rounded-bl-xl text-start bg-neutral-900 !right-0 !outline-none"
                            type="text"
                            placeholder="search category" 
                            onChange={(e) => setSearchedCategory(e.target.value)}
                        />
                        <div className="w-full flex flex-row items-center justify-between group">
                            <input
                                className="w-full h-10 py-2 px-4 border-2 border-transparent cursor-pointer rounded-tl-xl rounded-bl-xl text-start bg-neutral-900 !right-0 !outline-none"
                                type="text"
                                placeholder="custom category" 
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onCategoryCreate(newCategory);
                                    setSelectedItem(newCategory);
                                }} 
                                className="w-32 h-10 border-none bg-neutral-900 group-hover:bg-neutral-800 rounded-tr-xl rounded-br-xl"> 
                                CREATE 
                            </button>
                        </div>
                        {
                            categories.map((item, index) => (
                                <div key={index} className="w-full flex flex-row items-center justify-between">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedItem(item);
                                            onSelect(item);
                                            setSearchedCategory("");
                                        }}
                                        type="button"
                                        className={`w-full h-10 py-2 px-4 border-2 border-transparent cursor-pointer rounded-xl text-start
                                            ${selectedItem == item ? "bg-neutral-900 border-indigo-400" : "hover:bg-neutral-900 hover:border-indigo-400"}`
                                        }
                                    >
                                        <h1>
                                            {item}
                                        </h1>
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onCategoryDelete(item);
                                        }}
                                        type="button"
                                        className="w-6 h-6 bg-red-800 hover:bg-red-400 text-white text-center flex justify-center items-center rounded-full">
                                            &times;
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
