"use server"

import { revalidatePath } from "next/cache";
import { Asset } from "@/types/Asset";
import { craeteSupabaseAppServerClient } from "../utils/supabase";

export default async function getAssets(limits? : number) : Promise<Asset[]>
{
    try
    {
        const supabase = craeteSupabaseAppServerClient();

        const { data, error } = await supabase.from("unityAssets").select("*").limit(limits ?? 100);
        
        if(!error) 
        {
            revalidatePath("/Marketplace");
            return data ? data : [];
        }
        
        throw new Error(error.message);
        return [];
    } 
    catch (error : any) 
    {
        throw new Error(error);
        return [];
    }
}