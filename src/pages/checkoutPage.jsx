import { useState } from "react";
import { getCart, getCartTotal } from "../lib/cart";
import { Link, useLocation } from "react-router-dom";
import getFormattedPrice from "../lib/price-format";

import OrderModal from "../components/orderModal";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(
        Array.isArray(location.state) ? location.state : getCart()
    );

    const cartItems = Array.isArray(cart) ? cart : [];

    return (
        <div className="w-full min-h-[calc(100vh-100px)] overflow-y-auto flex flex-col items-center p-6 pb-28">

            {cartItems.length === 0 ? (
                <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-sm text-center flex flex-col items-center gap-4 mt-6">
                    <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
                    <Link
                        to="/products"
                        className="px-6 py-2.5 bg-accent-blue hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="w-full max-w-2xl flex flex-col items-center gap-4">
                    {cartItems.map((item, index) => {
                        const product = item.product || {};
                        const labelledPrice = product.labelledPrice ?? product.labledPrice ?? product.labeledPrice;

                        return (
                            <div
                                key={product.productId || index}
                                className="w-full min-h-[130px] bg-white shadow-md rounded-xl overflow-hidden flex flex-row items-center p-3 gap-4 border border-slate-100"
                            >
                                <img
                                    src={product.image || "https://placehold.co/130x130?text=No+Image"}
                                    alt={product.name || "Product"}
                                    className="h-[110px] w-[110px] object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1 flex flex-col justify-between h-full py-1">
                                    <div>
                                        <h2 className="font-semibold text-slate-800 text-lg line-clamp-1">{product.name}</h2>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="text-lg font-semibold text-accent-blue">
                                                {getFormattedPrice(product.price)}
                                            </span>
                                            {Number(labelledPrice) > Number(product.price) && (
                                                <span className="text-sm font-normal line-through text-gray-400">
                                                    {getFormattedPrice(labelledPrice)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-center mt-3 pt-2 border-t border-slate-100">
                                        <div className="w-[110px] h-[36px] border border-accent-blue rounded-md overflow-hidden flex flex-row items-center bg-white">
                                            <button
                                                onClick={() => {
                                                    if (item.qty > 1) {
                                                        const newCart = [...cart];
                                                        newCart[index].qty -= 1;
                                                        setCart(newCart);
                                                    }
                                                }}
                                                className="w-[36px] h-full text-accent-blue hover:bg-accent-blue hover:text-white cursor-pointer font-bold flex justify-center items-center transition-colors duration-200"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="flex-1 h-full flex justify-center items-center text-slate-800 font-semibold text-sm">
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    const newCart = [...cart];
                                                    newCart[index].qty += 1;
                                                    setCart(newCart);
                                                }}
                                                className="w-[36px] h-full text-accent-blue hover:bg-accent-blue hover:text-white cursor-pointer font-bold flex justify-center items-center transition-colors duration-200"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="text-base font-semibold text-slate-700">
                                            {getFormattedPrice((Number(product.price) || 0) * (Number(item.qty) || 0))}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="w-full lg:w-[550px] min-h-[90px] fixed bottom-[80px] lg:bottom-2 bg-white shadow-lg shadow-accent-blue my-4 rounded-md overflow-hidden flex flex-row items-center justify-between px-4">
                    <OrderModal cart={cartItems} />
                    <span className="text-xl font-bold text-slate-800 pr-2">
                        {getFormattedPrice(getCartTotal(cartItems))}
                    </span>
                </div>
            )}
        </div>
    );
}

