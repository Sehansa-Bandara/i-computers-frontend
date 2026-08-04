import { useLocation, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/image-slideShow";
import getFormattedPrice from "../lib/price-format";
import { toast } from "react-hot-toast";


export default function ProductOverview() {
    const params = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state);
    const [loading, setLoading] = useState(!location.state);

    const productId = params.productId;

    useEffect(() => {
        if (loading) {
            api.get("/products/" + productId).then((response) => {
                setProduct(response.data);
                setLoading(false);
            }).catch((err) => {
                toast.error("Failed to fetch product");
                setProduct(null);
                setLoading(false);
            });
        }
    }, [productId, loading]);

    const labelledPrice = product?.labelledPrice ?? product?.labledPrice ?? product?.labeledPrice;

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-slate-100 p-6 flex justify-center items-center">
            {loading && <LoadingAnimation />}

            {!loading && product != null && (
                <div className="w-full max-w-6xl min-h-[550px] bg-slate-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 p-6">
                    {/* Left Column: Image Slideshow */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <ImageSlideShow images={product?.images || []} />
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="w-full md:w-1/2 flex flex-col justify-start space-y-4 p-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-200">
                            ID: {product.productId}
                        </span>

                        <h1 className="text-3xl font-semibold text-slate-800 leading-tight">
                            {product.name}
                            {product.altNames.map(
                                (name, index) => {
                                    return (<span key={index} className="font-normal text-gray-500"> |{name}</span>)
                                }

                            )}
                        </h1>
                        <p className="text-sm text-black-500 pt-2">Brand: {product.brand} {product.model}</p>
                        <p className="text-sm text-black-500 pt-2">Category: {product.category}</p>
                        <p className="text-slate-600 text-base leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-baseline gap-4 pt-2">
                            <span className="text-3xl font-semibold text-emerald-600">
                                {getFormattedPrice(product.price)}
                            </span>
                            {Number(labelledPrice) > Number(product?.price) && (
                                <span className="text-lg text-slate-400 line-through">
                                    {getFormattedPrice(labelledPrice)}
                                </span>
                            )}
                        </div>

                        <div className="pt-6 flex items-center gap-4">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer">
                                Add to Cart
                            </button>
                            <Link to="/products" className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all">
                                Buy Now 
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {!loading && product == null && (
                <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                    <h1 className="text-3xl font-bold text-slate-700">Product Not Found</h1>
                    <Link to="/products" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all">
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
}
