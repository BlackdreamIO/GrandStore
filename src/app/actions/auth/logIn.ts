"use server"

import { supabase } from "@/app/utils/supabase";

export default async function logIn({ email, password } : { email : string, password : string }) : Promise<boolean>
{
    try
    {
        const { error } = await supabase.auth.signInWithPassword({ email,password });
        
        if (error) {
            console.error('Error logging in:', error.message);
            return false;
        }
        else
        {
            return true;
        }
    }
    catch (error) {
        return false;
    }
}