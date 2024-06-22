"use server"

import { revalidatePath } from "next/cache";
import { Asset } from "@/types/Asset";
import { craeteSupabaseAppServerClient, supabase } from "../utils/supabase";
import { IFilter } from "@/types/Filter";

export default async function getFilterAssets({ filterBy, query, limit } : { filterBy : IFilter, query : any, limit? : number }) : Promise<Asset[] | null>
{
    try
    {
        //const supabase = craeteSupabaseAppServerClient();

        let request = supabase.from("unityAssets").select("*").limit(limit ?? 100);

        if (filterBy === IFilter.Title) {
            request = request.ilike("title", `%${query}%`);
        }
      
        if (filterBy === IFilter.OldToLatest) {
            request = request.order("created_at", { ascending: true });
        }
      
        if (filterBy === IFilter.LatestToOld) {
            request = request.order("created_at", { ascending: false });
        }
      
        if (filterBy === IFilter.Populer) {
             request = request.order("downloads", { ascending: false });
        }
        
        if (filterBy === IFilter.Category) {
            request = request.eq("category", query);
        }

        const { data, error } = await request;

        if(error) 
        {
            return null;
        }
        revalidatePath("/Marketplace");
        return data as Asset[];
    } 
    catch (error : any) 
    {
        throw new Error(error);
        return [];
    }
}