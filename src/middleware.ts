import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./app/utils/supabase";

export async function middleware (req : NextRequest) 
{
    const res = NextResponse.next();

    const verifiedCookie = getCookie("verified", { req, res });

    if (!verifiedCookie) 
    {
        const loginUrl = new URL('/Home', req.url);
        return NextResponse.redirect(loginUrl);
    }
    if (verifiedCookie && req.nextUrl.pathname.endsWith("Authentication") || req.nextUrl.pathname == "/Protected/Authentication") {
        const dashboardUrl = new URL('/Protected/Dashboard', req.url);
        return NextResponse.redirect(dashboardUrl.toString())
    }
    
    
    return NextResponse.next();
}

export const config = {
    matcher : ['/Protected/Dashboard']
}