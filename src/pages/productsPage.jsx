import { useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import ProductCard from "../components/productCard";
import { FiRefreshCcw, FiSearch } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (loading) {
            api.get("/products").then((response) => {
                setProducts(response.data);
                setLoading(false);
            }).catch(() => {
                toast.error("Error fetching products");
                setLoading(false);
            });
        }
    }, [loading]);

    async function handleSearch(e) {
        if (e) e.preventDefault();
        if (!query.trim()) {
            setLoading(true);
            return;
        }
        setSearching(true);
        try {
            const response = await api.get(`/products/search/` + query);
            setProducts(response.data);
        } catch {
            toast.error("Error searching products");
        }
        setSearching(false);
    }

    const handleReset = () => {
        setQuery("");
        setLoading(true);
    };

    return (
        <div className="relative w-full min-h-[calc(100vh-90px)] bg-gradient-to-b from-[#e8f4fe] via-[#f4f9ff] to-[#eaf3fe] py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background Glowing Spheres */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-300/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-blue-400/15 blur-[130px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan-200/25 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                {/* Catalog Header & Search Container */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-sky-800 bg-white/90 border border-sky-200 shadow-xs backdrop-blur-md">
                        <HiOutlineSparkles className="text-sky-500 text-sm" />
                        <span>Genuine Hardware Catalog</span>
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500">Products &amp; Gear</span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 max-w-xl font-medium">
                        Original laptops, custom-build components, monitors, and accessories with official distributor warranty.
                    </p>

                    {/* Modern Search & Filter Bar */}
                    <form onSubmit={handleSearch} className="w-full max-w-xl mt-3 flex items-center gap-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-sky-200/80 shadow-md hover:shadow-lg transition-all">
                        <div className="relative flex-1 flex items-center">
                            <FiSearch className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search monitors, Ryzen CPUs, SSDs, laptops..."
                                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none font-medium"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={searching}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-sm rounded-xl shadow-sm shadow-sky-500/25 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                        >
                            <span>Search</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            title="Reset / Refresh list"
                            className="p-2.5 rounded-xl bg-sky-50 text-blue-600 hover:bg-sky-100 hover:text-blue-800 border border-sky-100 transition-colors cursor-pointer"
                        >
                            <FiRefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </form>

                    {!loading && (
                        <div className="text-xs font-semibold text-slate-500 pt-1">
                            Showing <span className="font-bold text-slate-800">{products.length}</span> items
                        </div>
                    )}
                </div>

                {/* Products Grid */}
                {loading || searching ? (
                    <div className="py-24 flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                ) : products.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-sky-200 p-12 text-center max-w-md mx-auto shadow-xs">
                        <p className="text-lg font-bold text-slate-800">No products found</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">Try another search keyword or reset the filters.</p>
                        <button
                            onClick={handleReset}
                            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-xs hover:bg-blue-700 transition-colors"
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6 pt-2">
                        {products.map((product) => (
                            <ProductCard product={product} key={product.productId} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}