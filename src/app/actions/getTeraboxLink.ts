"use server"

import axios from "axios";

import { load } from "cheerio";

export default async function getTeraBoxDownloadLink()
{
    try 
    {
        const response = await axios.get(`https://teradownloader.com/api?data=U2FsdGVkX19GO41A3RzUx%2FX2u5chQEix8BMhhwBeB2msSyiSvJcG457F%2Fq44EOwNJcIG59iKSHdeKJFpcdG52CKyQW9rdKnob8KXEWQvrlbfgXyiba9y%2B7mitTijHcQ7xho1OsGlc7pEyxroa8pQQw%3D%3D`);
        
        console.log("Download Link:", response);
        
        return response;
        //console.log(parsed);
    }
    catch (error) 
    {
        console.error('Error:', error);
    }
}