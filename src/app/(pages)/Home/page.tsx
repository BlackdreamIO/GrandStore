
import Image from "next/image";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { HomeCategorySection } from "./components/HomeCategorySection";
import { HomeGetStarted } from "./components/HomeGetStarted";
import { HomeWhyUS } from "./components/HomeWhyUS";

const Home = () => {
    return (
        <div className="w-full p-4 max-w-screen-3xl m-auto flex flex-col items-center justify-center space-y-60">
            <HomeHeroSection />
            <HomeCategorySection />
            <HomeGetStarted />
            <HomeWhyUS/>
        </div>
    )
}

export default Home