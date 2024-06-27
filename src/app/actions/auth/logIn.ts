"use server"

import { supabase } from "@/app/utils/supabase";
import { Session, User } from "@supabase/supabase-js";

interface LogInResponse {
    user : User | null;
    session : Session | null;
}

export default async function logIn({ email, password } : { email : string, password : string }) : Promise<LogInResponse>
{
    try
    {
        const { data : { user, session }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) {
            console.error('Error logging in:', error.message);
            throw new Error(error?.message);
        }
        else
        {
            return {
                user : user,
                session : session
            };
        }
    }
    catch (error : any) {
        throw new Error(error?.message);
    }
}