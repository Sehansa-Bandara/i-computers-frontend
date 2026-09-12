import { useLocation, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/image-slideShow";
import getFormattedPrice from "../lib/price-format";
import { toast } from "react-hot-toast";
import { addToCart } from "../lib/cart";
import { FiShoppingCart, FiZap, FiPlus, FiMinus } from "react-icons/fi";

export default function ProductOverview() {
    const params = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state);
    const [loading, setLoading] = useState(!location.state);
    const [quantity, setQuantity] = useState(1);

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
    const discountAmount = Number(labelledPrice) > Number(product?.price) 
        ? Number(labelledPrice) - Number(product?.price) 
        : 0;
    const discountPercent = Number(labelledPrice) > 0 && discountAmount > 0 
        ? Math.round((discountAmount / Number(labelledPrice)) * 100) 
        : 0;

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {loading && <LoadingAnimation />}

            {!loading && product != null && (
                <div className="w-full max-w-6xl space-y-4">
                    {/* Breadcrumb Navigation */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                        <span>/</span>
                        {product.category && (
                            <>
                                <span className="text-slate-500">{product.category}</span>
                                <span>/</span>
                            </>
                        )}
                        <span className="text-slate-800 font-semibold truncate max-w-[250px]">{product.name}</span>
                    </div>

                    {/* Main Product Card */}
                    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
                        {/* Left Column: Image Slideshow */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <ImageSlideShow images={product?.images || []} />
                        </div>

                        {/* Right Column: Product Details */}
                        <div className="w-full lg:w-1/2 flex flex-col space-y-5">
                            {/* Badges Bar: ID, Category, Availability */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-mono font-semibold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                                    ID: {product.productId}
                                </span>
                                {product.category && (
                                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                                        {product.category}
                                    </span>
                                )}
                                <span
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1 ${
                                        product.isAvailable !== false
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : "bg-rose-50 text-rose-700 border-rose-200"
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${product.isAvailable !== false ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                                    {product.isAvailable !== false ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            {/* Clean Title */}
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                                    {product.name}
                                </h1>
                                {product.brand && (
                                    <p className="text-sm font-medium text-slate-500 mt-1">
                                        Brand: <span className="text-slate-800 font-semibold">{product.brand}</span>
                                        {product.model && <span> ({product.model})</span>}
                                    </p>
                                )}
                            </div>

                            {/* Alternative Names (Clean chips instead of raw pipes) */}
                            {Array.isArray(product.altNames) && product.altNames.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-xs text-slate-400 font-medium">Also known as:</span>
                                    {product.altNames.map((name, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Price & Discount Bar */}
                            <div className="py-2 border-y border-slate-100 flex items-baseline gap-3">
                                <span className="text-3xl font-extrabold text-blue-950 tracking-tight">
                                    {getFormattedPrice(product.price)}
                                </span>
                                {Number(labelledPrice) > Number(product?.price) && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-slate-400 line-through">
                                            {getFormattedPrice(labelledPrice)}
                                        </span>
                                        {discountPercent > 0 && (
                                            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-xs font-bold shadow-xs">
                                                {discountPercent}% OFF
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Description
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                                    {product.description || "No description provided for this item."}
                                </p>
                            </div>

                            {/* Quantity Selector & Action Buttons */}
                            <div className="pt-2 space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-semibold text-slate-600">Quantity:</span>
                                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-xs">
                                        <button
                                            type="button"
                                            disabled={quantity <= 1}
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors cursor-pointer"
                                        >
                                            <FiMinus className="text-xs" />
                                        </button>
                                        <span className="w-10 text-center text-sm font-bold text-slate-800 select-none">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                                        >
                                            <FiPlus className="text-xs" />
                                        </button>
                                    </div>
                                    {product.stock != null && (
                                        <span className="text-xs text-slate-400">
                                            ({product.stock} available)
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    {/* Add to Cart Button (Primary Blue) */}
                                    <button
                                        onClick={() => {
                                            addToCart(product, quantity);
                                            toast.success(`Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`);
                                        }}
                                        className="flex-1 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <FiShoppingCart className="text-base" />
                                        <span>Add to Cart</span>
                                    </button>

                                    {/* Buy Now Button (Emerald Green) */}
                                    <Link
                                        to="/checkout"
                                        state={[
                                            {
                                                product: {
                                                    productId: product.productId,
                                                    name: product.name,
                                                    price: product.price,
                                                    labelledPrice: product.labelledPrice || product.labledPrice,
                                                    image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : ""
                                                },
                                                qty: quantity
                                            }
                                        ]}
                                        className="flex-1 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                                    >
                                        <FiZap className="text-base" />
                                        <span>Buy Now</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!loading && product == null && (
                <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4 my-auto">
                    <h1 className="text-2xl font-bold text-slate-800">Product Not Found</h1>
                    <p className="text-sm text-slate-500">The product you are looking for may have been removed or is currently unavailable.</p>
                    <Link to="/products" className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-md transition-all">
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
}
