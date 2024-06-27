"use server"

import { revalidatePath } from "next/cache";
import { craeteSupabaseAppServerClient } from "../../utils/supabase";

interface CreateCategoryParams {
    category: string;
    revalidationPath: string;
}

export default async function deleteCategory({ category, revalidationPath }: CreateCategoryParams) : Promise<any | null>
{
    try
    {
        if(category.length < 2) return;

        const supabase = craeteSupabaseAppServerClient();
        const { data, error } = await supabase.from("categoires").delete().eq("category", category);
        
        if(!error) 
        {
            revalidatePath(revalidationPath);
            return;
        }
        
        throw new Error(error.message);
    } 
    catch (error : any) 
    {
        throw new Error(error);
    }
}