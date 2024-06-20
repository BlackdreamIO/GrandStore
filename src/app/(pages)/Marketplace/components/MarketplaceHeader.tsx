"use client"

import { useEffect, useState } from "react";
import { useAssets } from "@/context/AssetProvider";
import ErrorBoundary from "@/app/components/ErrorBoundery";
import { Dropdown } from "@/app/components/Dropdown";
import { IFilter } from "@/types/Filter";

export const MarketplaceHeader = () => {

    const { setAssets, staticAssets } = useAssets()!;
    const [currentCategory, setCurrentCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const { FilterAsset, ResetFilter } = useAssets()!;

    const handleCategorySelect = (category : string) => {
        setCurrentCategory(category);
        if(category == "All") {
            ResetFilter({ ReFetch : false });
            return;
        }
        FilterAsset({ filterBy : IFilter.Category, query : category });
    }
    
    const handleFilter = (filterMethod : string) => {
        switch (filterMethod) 
        {
            case "Populer Assets":
                const sortedAssets = [...staticAssets].sort((a, b) => {
                    return a.downloads.localeCompare(b.downloads);
                });
                setAssets(sortedAssets);
                break;
            case "Latest To Old":
                FilterAsset({ filterBy : IFilter.LatestToOld, query : "" });
                break;
            case "Old To Latest":
                FilterAsset({ filterBy : IFilter.OldToLatest, query : "" });
                break;
            case "":
                ResetFilter({ ReFetch : false });
                break;

            default:
                setAssets(staticAssets);
                break;
        }
    }

    const handleSearch =  async () => {
        if(searchQuery == "") {
            setAssets(staticAssets);
            ResetFilter({ ReFetch : false });
            return;
        }
        FilterAsset({ filterBy : IFilter.Title, query : searchQuery });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch();
        }, 500); // MS 

        return () => clearTimeout(timeout);
    }, [searchQuery, handleSearch])
    

    const Category = ({ category, onClick, active } : { category : string, onClick : () => void, active : boolean }) => {
        return (
            <button 
                onClick={onClick} 
                className={`${active ? "bg-indigo-500" : "bg-neutral-900 hover:bg-indigo-500"} px-4 py-2 rounded-xl max-sm:text-xs`}
            >
                {category}
            </button>
        )
    }

    const renderedCategories = new Set();

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-row items-center justify-center space-x-4">
                <input 
                    type="text" 
                    className="w-7/12 h-12 bg-neutral-900 rounded-xl p-2"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key == 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button
                    onClick={() => handleSearch()}
                    className="h-12 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 w-40 max-lg:w-36 max-md:w-auto max-md:px-4 max-sm:text-xs rounded-lg">
                    Search
                </button>
                <Dropdown 
                    label="Filter" 
                    content={["Populer Assets", "Latest To Old", "Old To Latest"]}
                    onSelect={(filterMethod) => handleFilter(filterMethod)}
                />
            </div>
            <ErrorBoundary fallback={<p className="text-red-500">Caught Error While Rendering Assets </p>}>
                <ul className="w-full flex flex-row items-center justify-center gap-4 flex-wrap">
                    <Category 
                        category={"All"}
                        active={currentCategory == "All"}
                        onClick={() => handleCategorySelect("All")}
                        key={"All"}
                    />
                    {
                        staticAssets.map(({ category, id }, i) => {
                            if (!renderedCategories.has(category)) 
                            {
                                renderedCategories.add(category);
                                return (
                                    <Category 
                                        category={category} 
                                        key={category} 
                                        onClick={() => handleCategorySelect(category)}
                                        active={currentCategory == category}
                                    />
                                )
                            }
                            return null
                        })
                    }
                </ul>
            </ErrorBoundary>
        </div>
    )
}
