
import { createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from "cookies-next";

export function craeteSupabaseReqResClient (req : any, res : any) {
    return createServerClient(process.env.NEXT_SUPABASE_URL as string || '', process.env.NEXT_SUPABASE_ANON as string || '', {
        cookies : {
            get(name) {
                return getCookie(name, {req, res});
            },
            set(name, value, options) {
                setCookie(name, value, {req, res, ...options});
            },
            remove(name, options) {
                setCookie(name, "", {req, res, ...options});
            },
        }
    })
}
