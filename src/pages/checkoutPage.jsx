import { useState } from "react";
import { getCartTotal, getCart, removeFromCart } from "../lib/cart";
import getFormattedPrice from "../lib/price-format";
import { useLocation, Link } from "react-router-dom";
import OrderModal from "../components/orderModal";
import { 
    FiArrowLeft, 
    FiShoppingBag, 
    FiTrash2, 
    FiPlus, 
    FiMinus 
} from "react-icons/fi";

export default function CheckoutPage() {
    const location = useLocation();

    const [cart, setCart] = useState(() => {
        if (location.state && Array.isArray(location.state) && location.state.length > 0) {
            return location.state;
        }
        return getCart();
    });

    const handleUpdateQuantity = (index, delta) => {
        const newCart = [...cart];
        const currentQty = newCart[index]?.qty || 1;
        const newQty = currentQty + delta;
        if (newQty < 1) return;

        newCart[index] = { ...newCart[index], qty: newQty };
        setCart(newCart);

        if (!location.state) {
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };

    const handleRemoveItem = (index) => {
        const itemToRemove = cart[index];
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);

        if (!location.state && itemToRemove?.product?.productId) {
            removeFromCart(itemToRemove.product.productId);
        }
    };

    const totalItemsCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartTotal = getCartTotal(cart);

    return (
        <div className="relative w-full min-h-[calc(100vh-90px)] bg-gradient-to-b from-[#e8f4fe] via-[#f4f9ff] to-[#eaf3fe] py-8 px-4 sm:px-6 lg:px-8 pb-32 lg:pb-16 overflow-hidden">
            {/* Ambient Background Glowing Spheres */}
            <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-sky-300/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-blue-400/15 blur-[130px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 space-y-5">
                {/* Header & Back Link */}
                <div>
                    <Link
                        to="/cart"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-700 transition-colors mb-3 group"
                    >
                        <FiArrowLeft className="text-base group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Shopping Cart</span>
                    </Link>

                    <div className="flex items-center justify-between pb-3 border-b border-sky-200/80">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Order Review &amp; Checkout
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                Review your selected items and confirm your order
                            </p>
                        </div>

                        {cart.length > 0 && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-sky-800 border border-sky-200 shadow-2xs">
                                {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Empty State */}
                {cart.length === 0 ? (
                    <div className="max-w-md mx-auto my-16 bg-white rounded-3xl border border-sky-100 shadow-sm p-8 sm:p-10 text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-blue-600 flex items-center justify-center text-3xl mx-auto shadow-2xs">
                            <FiShoppingBag />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
                            Your Checkout is Empty
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                            You don't have any items in your checkout list right now. Explore our catalog of genuine computer parts and accessories!
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                        >
                            <span>Browse Products</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items List */}
                        <div className="space-y-3.5">
                            {cart.map((item, index) => {
                                const product = item.product || {};
                                const imgUrl = product.image || (Array.isArray(product.images) && product.images[0]) || "";
                                const labelledPrice = product.labelledPrice ?? product.labledPrice ?? product.labeledPrice;
                                const hasDiscount = Number(labelledPrice) > Number(product.price);
                                const lineTotal = (product.price || 0) * (item.qty || 1);

                                return (
                                    <div
                                        key={product.productId || index}
                                        className="bg-white rounded-2xl border border-sky-100/90 shadow-[0_2px_12px_rgba(2,132,199,0.04)] hover:shadow-md hover:border-sky-200 transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
                                    >
                                        {/* Image Box */}
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-50/80 border border-slate-100 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                                            {imgUrl ? (
                                                <img
                                                    src={imgUrl}
                                                    alt={product.name || "Hardware component"}
                                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <FiShoppingBag className="text-3xl text-slate-300" />
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 w-full flex flex-col justify-between self-stretch">
                                            <div>
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug">
                                                        {product.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => handleRemoveItem(index)}
                                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                                                        title="Remove item"
                                                        aria-label="Remove item"
                                                    >
                                                        <FiTrash2 className="text-base" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2 mt-1.5">
                                                    {hasDiscount && (
                                                        <span className="text-xs text-slate-400 line-through">
                                                            {getFormattedPrice(labelledPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-xs sm:text-sm font-bold text-blue-700">
                                                        {getFormattedPrice(product.price)}
                                                    </span>
                                                    <span className="text-[11px] text-slate-400 font-medium">/ unit</span>
                                                </div>
                                            </div>

                                            {/* Stepper & Line Subtotal */}
                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                                                {/* Stepper */}
                                                <div className="inline-flex items-center bg-slate-50 border border-slate-200/80 rounded-xl p-1 shadow-2xs">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(index, -1)}
                                                        disabled={item.qty <= 1}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-100/70 transition-all font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                                        title="Decrease quantity"
                                                    >
                                                        <FiMinus className="text-xs" />
                                                    </button>
                                                    <span className="w-8 sm:w-10 text-center font-extrabold text-slate-800 text-xs sm:text-sm">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(index, 1)}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-100/70 transition-all font-bold cursor-pointer"
                                                        title="Increase quantity"
                                                    >
                                                        <FiPlus className="text-xs" />
                                                    </button>
                                                </div>

                                                {/* Line Total */}
                                                <div className="text-right">
                                                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                                                        Item Total
                                                    </span>
                                                    <span className="text-base sm:text-lg font-black text-slate-900">
                                                        {getFormattedPrice(lineTotal)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Total & Order Action Bar */}
                        <div className="sticky bottom-[85px] lg:bottom-4 z-20 bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(2,132,199,0.12)] border border-sky-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 mt-6">
                            <OrderModal
                                cart={cart}
                                buttonClassName="px-7 sm:px-9 py-3 sm:py-3.5 bg-gradient-to-r from-blue-700 via-blue-800 to-[#000080] hover:from-blue-800 hover:to-[#00005a] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                                buttonText="Order"
                            />

                            <div className="text-right">
                                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                                    Total
                                </span>
                                <span className="text-xl sm:text-2xl font-black text-[#000080]">
                                    {getFormattedPrice(cartTotal)}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}