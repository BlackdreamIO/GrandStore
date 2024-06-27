"use server"

import { revalidatePath } from "next/cache";
import { craeteSupabaseAppServerClient } from "../../utils/supabase";

export default async function getCategories(revalidationPath="/Marketplace") : Promise<string[]>
{
    try
    {
        const supabase = craeteSupabaseAppServerClient();

        const { data, error } = await supabase.from("categoires").select("*");
        
        if(!error) 
        {
            revalidatePath(revalidationPath);
            return data ? data : [];
        }
        
        throw new Error(error.message);
    } 
    catch (error : any) 
    {
        throw new Error(error);
    }
}