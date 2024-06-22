import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (req : NextRequest) 
{
    const res = NextResponse.next();

    const user = getCookie("verified", { req : req, res : res });
    
    if (!user) 
    {
        const loginUrl = new URL('/Home', req.url);
        return NextResponse.redirect(loginUrl);
    }
    if (user && req.nextUrl.pathname.endsWith("Authentication") || req.nextUrl.pathname == config.matcher[1]) {
        const dashboardUrl = new URL('/Protected/Dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
    }
    else { 
        return res;
    }
}

export const config = {
    matcher : ['/Protected/Dashboard', "/Protected/Authentication"]
}