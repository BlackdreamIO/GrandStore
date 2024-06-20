"use client"

import { useState, useEffect, useRef } from "react";

import checkIcon from '../../../public/icosn/check.svg';
import closeIcon from '../../../public/icosn/close.svg';
import Image from "next/image";

export const Dropdown = ({ label, content, onSelect } : { label : string, content : string[], onSelect : (value : string) => void }) => {
    
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleFilterSelect = (value : string) => {
        onSelect(value);
        setSelectedFilter(value);
    }

    const handleDropdownOpen = () => {
        setOpenDropdown(!openDropdown);
    }
    
    const handleResetFilter = () => {
        onSelect("");
        setSelectedFilter("");
    }
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(false);
            }
        };
    
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);
    

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={handleDropdownOpen} 
                className="h-12 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 w-40 max-lg:w-36 max-md:w-auto max-md:px-4 max-sm:text-xs rounded-lg">
                {label}
            </button>
            {
                openDropdown && (
                    <div className="w-64 py-2 bg-neutral-950 border border-neutral-700 absolute top-16 space-y-4 z-50 right-1 shadow-lg shadow-black rounded-lg">
                        <div className="w-full flex flex-row items-center justify-between px-4 py-2">
                            <h1>Filter By</h1>
                            <button onClick={() => setOpenDropdown(false)} className="p-0">
                                <Image width={100} height={100} src={closeIcon.src} alt="icon not found" className="opacity-60 hover:opacity-100 invert w-4 h-4" />
                            </button>
                        </div>
                        <ul className="w-full flex flex-col items-center justify-start space-y-2 px-2">
                            {
                                (content ?? []).map((filter, index) => (
                                    <button 
                                        onClick={() => handleFilterSelect(filter)} 
                                        key={filter} 
                                        className="w-full bg-neutral-900 hover:bg-neutral-800 rounded-xl text-start px-4 py-2 text-sm flex flex-row items-center justify-between">
                                        {filter}
                                        {
                                            selectedFilter == filter && (
                                                <img src={checkIcon.src} alt="icon not found" className="invert w-4 h-4" />
                                            )
                                        }
                                    </button>        
                                ))
                            }
                        </ul>
                        <div className="w-full bg-neutral-800 h-[1px]"></div>
                        <div className="w-full flex flex-row items-center justify-center">
                            <button onClick={() => handleResetFilter()} className="w-7/12 bg-neutral-900 hover:bg-neutral-800 rounded-xl m-auto text-center px-4 py-2 text-sm">
                                Clear
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
