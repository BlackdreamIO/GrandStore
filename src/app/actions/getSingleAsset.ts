"use server"

import { revalidatePath } from "next/cache";
import { craeteSupabaseAppServerClient } from "../utils/supabase";
import { Asset } from "@/types/Asset";

export default async function getSingleAsset (title : string) : Promise<Asset | null>
{
    try 
    {
        const supabase = craeteSupabaseAppServerClient();
        const { data, error } = await supabase.from("unityAssets").select("*").eq("title", title).single();
        
        if(!error) 
        {
            revalidatePath(`/Marketplace/Asset/${encodeURIComponent(title)}`);
            return data ? data : null;
        }
        
        console.error(error);
        return null;
    } 
    catch (error : any) 
    {
        throw new Error(error);
        return null;
    }
}