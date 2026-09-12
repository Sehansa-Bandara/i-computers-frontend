import { Link, useLocation } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import UserData from "./userData";
import { CiHome, CiBoxList, CiPhone, CiShoppingCart } from "react-icons/ci";

export default function Header() {
    const location = useLocation();

    const navTabs = [
        {
            name: "Home",
            path: "/",
            isActive: (pathname) => pathname === "/",
        },
        {
            name: "Products",
            path: "/products",
            isActive: (pathname) => pathname === "/products" || pathname.startsWith("/overview"),
        },
        {
            name: "About Us",
            path: "/about",
            isActive: (pathname) => pathname === "/about",
        },
    ];

    return (
        <>
            <header className="w-full h-[90px] bg-accent-blue text-white flex items-center px-6 lg:px-10 justify-between font-semibold text-xl shadow-lg sticky top-0 z-40">
                {/* Brand Logo Box */}
                <Link to="/" className="h-full flex items-center group py-1" title="i-Computers Home">
                    <div className="w-[82px] h-[82px] rounded-xl overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.4)] bg-[#070b19] flex items-center justify-center p-0.5 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.65)]">
                        <img
                            src="/logo.png"
                            alt="i-Computers Logo"
                            className="w-full h-full object-contain cursor-pointer"
                        />
                    </div>
                </Link>

                {/* Desktop Navigation Tabs with Active Underline */}
                <nav className="h-full hidden lg:flex items-center gap-8">
                    {navTabs.map((tab) => {
                        const active = tab.isActive(location.pathname);
                        return (
                            <Link
                                key={tab.name}
                                to={tab.path}
                                className={`relative py-2 text-lg transition-all duration-300 group flex flex-col items-center justify-center ${
                                    active
                                        ? "text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                                        : "text-blue-100/75 hover:text-white font-medium"
                                }`}
                            >
                                <span className="tracking-wide">{tab.name}</span>

                                {/* Active Underline directly under text */}
                                {active && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-[3.5px] bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                                )}

                                {/* Hover Underline Effect for Inactive Tabs */}
                                {!active && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-cyan-300/60 rounded-full transition-all duration-300 group-hover:w-full group-hover:bg-cyan-300" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions: Cart & User Profile */}
                <div className="h-full text-white hidden lg:flex items-center gap-5">
                    <Link to="/cart" aria-label="Shopping Cart">
                        <HiShoppingCart className="text-white text-4xl hover:scale-110 transition-transform duration-200" />
                    </Link>
                    <UserData />
                </div>
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <div className="fixed bottom-0 flex lg:hidden w-screen h-[75px] z-30 bg-white shadow-2xl shadow-black justify-evenly border-t border-gray-100">
                <Link
                    className={`h-full aspect-square flex flex-col items-center justify-center transition-colors ${
                        location.pathname === "/" ? "text-blue-700 font-semibold" : "text-gray-500"
                    }`}
                    to="/"
                >
                    <CiHome className="text-3xl" />
                    <span className="text-xs mt-0.5">Home</span>
                    {location.pathname === "/" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-0.5" />
                    )}
                </Link>

                <Link
                    className={`h-full aspect-square flex flex-col items-center justify-center transition-colors ${
                        location.pathname === "/products" ? "text-blue-700 font-semibold" : "text-gray-500"
                    }`}
                    to="/products"
                >
                    <CiBoxList className="text-3xl" />
                    <span className="text-xs mt-0.5">Products</span>
                    {location.pathname === "/products" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-0.5" />
                    )}
                </Link>

                <Link
                    className={`h-full aspect-square flex flex-col items-center justify-center transition-colors ${
                        location.pathname === "/about" ? "text-blue-700 font-semibold" : "text-gray-500"
                    }`}
                    to="/about"
                >
                    <CiPhone className="text-3xl" />
                    <span className="text-xs mt-0.5">About Us</span>
                    {location.pathname === "/about" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-0.5" />
                    )}
                </Link>

                <Link
                    className={`h-full aspect-square flex flex-col items-center justify-center transition-colors ${
                        location.pathname === "/cart" ? "text-blue-700 font-semibold" : "text-gray-500"
                    }`}
                    to="/cart"
                >
                    <CiShoppingCart className="text-3xl" />
                    <span className="text-xs mt-0.5">Cart</span>
                    {location.pathname === "/cart" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-0.5" />
                    )}
                </Link>

                <UserData />
            </div>
        </>
    );
}

