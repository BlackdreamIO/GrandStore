/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['assetstorev1-prd-cdn.unity3d.com', 'i.ytimg.com', 'unityassets4free.com', 'ik.imagekit.io'],
    },
    serverRuntimeConfig : {

    },
    experimental : {
        serverActions : {
            bodySizeLimit : "25mb"
        }
    }
};

export default nextConfig;
