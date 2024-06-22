"use server"

import { revalidatePath } from "next/cache";
import { Asset } from "@/types/Asset";
import { craeteSupabaseAppServerClient } from "../utils/supabase";

export default async function getPaginationAssets(limit: number = 5, offset: number = 0): Promise<Asset[]> {
    try {
        const supabase = craeteSupabaseAppServerClient();

        const { data, error } = await supabase.from("unityAssets")
            .select("*")
            .range(offset, offset + limit - 1);

        if (!error) {
            revalidatePath("/Marketplace");
            return data ? data : [];
        }
        
        throw new Error(error.message);
    }
    catch (error: any) {
        throw new Error(error);
    }
}
