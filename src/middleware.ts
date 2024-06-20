import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (req : NextRequest) 
{
    const res = NextResponse.next();

    const user = getCookie("verified", { req : req, res : res });
    console.log(user);
    
    if (!user) 
    {
        const loginUrl = new URL('/Home', req.url);
        return NextResponse.redirect(loginUrl);
    }
    
    return res;
}

export const config = {
    matcher : ['/Protected/Dashboard']
}