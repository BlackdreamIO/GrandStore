"use server"

import { revalidatePath } from "next/cache";
import { craeteSupabaseAppServerClient } from "../../utils/supabase";

interface CreateCategoryParams {
    category: string;
    revalidationPath: string;
}

export default async function createCategory({ category, revalidationPath }: CreateCategoryParams) : Promise<any | null>
{
    try
    {
        if(category.length < 2) return;

        const supabase = craeteSupabaseAppServerClient();

        // name of the column > category fr
        const insertData : any = {
            category : category
        }

        const { data, error } = await supabase.from("categoires").insert([insertData]);
        
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