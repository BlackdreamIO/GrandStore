import { MarketplaceAssets } from "./components/MarketplaceAssets";
import { MarketplaceHeader } from "./components/MarketplaceHeader";

const Marketplace = () => {

    return (
        <div className="min-h-screen h-auto p-4 space-y-16">
            <h1 className="text-3xl font-bold mt-5 ml-5">Marketplace</h1>
            <MarketplaceHeader/>
            <MarketplaceAssets/>
        </div>
    )
}

export default Marketplace