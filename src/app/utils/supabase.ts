import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';;

const url = process.env.NEXT_SUPABASE_URL || '';
const anon = process.env.NEXT_SUPABASE_ANON || '';

export const supabase = createClient(url, anon);

export function craeteSupabaseAppServerClient (isServer = false) {
    return createServerClient(url, anon, {
        cookies : {
            get(name) {
                return cookies().get(name)?.value;
            },
            set(name, value, options) {
                if(isServer) return;
                cookies().set(name, value, options);
            },
            remove(name, options) {
                if(isServer) return;
                cookies().set(name, "", options);
            },
        }
    })
}

export function craeteSupabaseServerComponentClient () {
    return craeteSupabaseAppServerClient(true);
}