import { AssetForm } from "./components/AssetForm";

export default function CreateAssetPage() {
    return (
        <div className="w-full h-screen overflow-y-scroll p-6 space-y-4 no-scrollbar">
            <h1 className="text-3xl">Asset Create Page</h1>
            <AssetForm />
        </div>
    )
}
