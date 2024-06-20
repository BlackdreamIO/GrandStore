
import Image from 'next/image'
import React from 'react'

export const HomeHeroSection = () => {
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <main className="w-full flex flex-row items-start justify-between max-xl:items-center max-lg:items-start max-md:flex-col max-md:justify-center max-md:space-y-8">
                <section className="w-6/12 px-10 max-sm:px-5 mt-10 space-y-8 max-lg:space-y-4 max-md:space-y-6 max-md:w-full">
                    <h1 className="text-6xl max-xl:text-4xl max-lg:text-2xl max-lg:space-y-2 font-bold flex flex-col items-start justify-center space-y-4 max-md:text-4xl">
                        <span>
                            Discover, 
                        </span>
                        <span>
                            Collect, & Get 
                        </span>
                        <span className="text-purple-400">
                            Extraordinary
                        </span>
                        <span className="text-green-500">
                            Assets
                        </span>
                    </h1>
                    <div className="w-full flex flex-row items-center justify-start space-x-4">
                        <h1>20k Assets</h1>
                        <h1>120k Downloads</h1>
                    </div>
                    <p className="w-7/12 max-lg:w-11/12 max-sm:w-full">
                        the best digital  
                        <span className="underline underline-offset-8 mx-2 text-blue-400">
                            game marketplace
                        </span>
                        for your unity game assets
                    </p>
                    <div className="w-full flex flex-row items-center justify-start space-x-4">
                        <button className="bg-neutral-950 hover:bg-neutral-900 p-2 border border-neutral-700 rounded-xl w-44 h-12 max-sm:h-10">Explore</button>
                    </div>
                </section>
                <section className="w-6/12 max-lg:w-8/12 max-md:w-full max-sm:w-full flex flex-col items-center justify-center">
                    <Image
                        src={'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/4615fb2e-ced2-4500-a785-f8adb48d8eb2.webp'}
                        alt="not found"
                        width={100}
                        height={100}
                        unoptimized
                        loading="lazy"
                        className="w-full max-md:w-8/12 m-auto max-sm:w-full bg-neutral-950 border border-neutral-700 p-6 rounded-xl shadow-lg shadow-indigo-500"
                    />
                </section>
            </main>
        </div>
    )
}
