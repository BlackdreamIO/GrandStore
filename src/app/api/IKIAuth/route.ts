import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req : NextRequest)
{
    const token = uuidv4();
    const expire = (Math.floor(Date.now() / 1000) + 2400).toString();
    const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY;

    const signature = crypto.createHmac('sha1', process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY as string)
                            .update(token + expire)
                            .digest('hex');

    return NextResponse.json({
        token: token,
        expire: expire,
        signature: signature
    })
}
