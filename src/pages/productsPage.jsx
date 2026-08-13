import { useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import ProductCard from "../components/productCard";







export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


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

    return (
        <div className="w-full flex flex-wrap p-8 justify-center">

            {loading ? (
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