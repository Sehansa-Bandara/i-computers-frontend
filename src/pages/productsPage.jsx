import { useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import ProductCard from "../components/productCard";
import { FiRefreshCcw } from "react-icons/fi";





export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState("");



    useEffect(
        () => {
            if (loading) {
                api.get("/products").then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                }).catch(() => {
                    toast.error("Error fetching products");


                })
            }

        }, [loading]

    );
     async function handleSearch(){
        setSearching(true);
        try {
            const response = await api.get(`/products/search/`+query);

            setProducts(response.data);

        } catch {
            toast.error("Error searching products");
        }
        setSearching(false);
    }


    return (
        <div className="w-full flex flex-wrap p-8 justify-center">
            <div className="w-full flex justify-center">
                <input type="text" placeholder="Search products..." className="w-[350px] p-2 border border-gray-300 rounded" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button onClick={handleSearch} className="ml-2 p-2 bg-accent text-white rounded">
                    Search
                </button>
                <button className="ml-2 p-2 bg-accent text-white rounded" onClick={() => setLoading(true)}>
                    <FiRefreshCcw className="w-5 h-5" />
                </button>
            </div>
            {loading||searching ? (
                <LoadingAnimation />
            ) : (
                <>
                    {products.map((product) => {
                        return (
                            <ProductCard product={product} key={product.productId} />
                        );
                    })}
                </>
            )}

        </div>
    );
}