import { useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response.data?.products)) {
                    setProducts(response.data.products);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                toast.error("Error fetching products");
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full flex flex-wrap p-8 justify-center min-h-[calc(100vh-100px)]">
            {loading ? (
                <LoadingAnimation />
            ) : products.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center p-12 text-gray-500">
                    <p className="text-xl font-medium">No products found</p>
                    <p className="text-sm text-gray-400 mt-1">Make sure your backend server is running on http://localhost:3000</p>
                </div>
            ) : (
                products.map((product, index) => (
                    <ProductCard product={product} key={product.productId || product._id || index} />
                ))
            )}
        </div>
    );
}