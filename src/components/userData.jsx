import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import { FiChevronDown, FiUser, FiPackage, FiLogOut } from "react-icons/fi";

export default function UserData({ isMobileHeader = false }) {
    const userData = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 1024 : false
    );
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const firstName = userData?.user?.firstName || userData?.user?.firstname || (userData?.user?.email ? userData.user.email.split("@")[0] : "User");
    const lastName = userData?.user?.lastName || userData?.user?.lastname || "";
    const fullName = userData?.user
        ? `${firstName} ${lastName}`.trim() || firstName
        : "";

    const displayName = isMobile ? firstName : (fullName || firstName);
    const userEmail = userData?.user?.email || "";

    const avatarUrl =
        userData?.user?.image && userData.user.image !== "/images/default-profile.png"
            ? userData.user.image
            : "/userGirl.jpg";

    function handleLogout() {
        setIsOpen(false);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        if (userData?.setUser) {
            userData.setUser(null);
        }
        navigate("/login");
    }

    // Mobile Top Header Variant
    if (isMobileHeader) {
        if (userData?.user == null) {
            return (
                <Link
                    to="/login"
                    className="px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                    Login
                </Link>
            );
        }
        return (
            <Link
                to="/settings"
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/25 px-2.5 py-1 rounded-full text-white text-xs font-semibold transition-all max-w-[130px] active:scale-95"
                title={`Logged in as ${displayName}`}
            >
                <img
                    src={avatarUrl}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/userGirl.jpg";
                    }}
                    alt="Profile"
                    className="w-5 h-5 rounded-full object-cover border border-cyan-400 shrink-0"
                />
                <span className="truncate">{firstName}</span>
            </Link>
        );
    }

    return (
        <>
            {userData?.user == null ? (
                <>
                    <div className="text-white p-2 hidden lg:flex items-center gap-3 text-base">
                        <Link to="/login" className="flex items-center">
                            <img
                                src="/userGirl.jpg"
                                alt="User"
                                className="w-[42px] h-[42px] rounded-full border-2 border-white object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            />
                        </Link>
                        <div>
                            <Link to="/login" className="hover:underline font-semibold">Login</Link>
                            {" | "}
                            <Link to="/register" className="hover:underline font-semibold">Register</Link>
                        </div>
                    </div>
                    <Link className="h-full aspect-square flex flex-col items-center justify-center lg:hidden" to="/login">
                        <img
                            src="/userGirl.jpg"
                            alt="Login"
                            className="w-[30px] h-[30px] rounded-full border-2 border-accent object-cover mb-0.5"
                        />
                        <span className="text-accent text-[11px] font-medium">Login</span>
                    </Link>
                </>
            ) : (
                <>
                    {/* Desktop Header Custom User Profile Dropdown */}
                    <div className="relative hidden lg:block" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className={`flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border ${
                                isOpen ? "border-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.45)]" : "border-white/20"
                            } px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer select-none`}
                            aria-expanded={isOpen}
                        >
                            <img
                                src={avatarUrl}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/userGirl.jpg";
                                }}
                                alt="Avatar"
                                className="w-[36px] h-[36px] rounded-full border-2 border-cyan-400 object-cover shadow-xs"
                            />
                            <span className="text-white font-bold text-sm tracking-wide max-w-[140px] truncate">
                                {displayName}
                            </span>
                            <FiChevronDown
                                className={`text-cyan-300 text-base transition-transform duration-300 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {/* Custom Modern Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute right-0 top-full mt-2.5 w-64 bg-[#0a0f24]/95 backdrop-blur-xl border border-cyan-400/30 shadow-[0_16px_36px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                {/* Header Info Card */}
                                <div className="px-4 py-3.5 bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border-b border-white/10 flex items-center gap-3">
                                    <img
                                        src={avatarUrl}
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/userGirl.jpg";
                                        }}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-white font-bold text-sm truncate leading-tight">
                                            {fullName || firstName}
                                        </p>
                                        {userEmail && (
                                            <p className="text-cyan-300/80 text-xs truncate mt-0.5 font-medium">
                                                {userEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Menu Navigation Options */}
                                <div className="p-1.5 space-y-0.5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false);
                                            navigate("/settings");
                                        }}
                                        className="w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-slate-200 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold cursor-pointer group text-left"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                                            <FiUser className="text-base" />
                                        </div>
                                        <span>Settings &amp; Profile</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false);
                                            navigate("/my-orders");
                                        }}
                                        className="w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-slate-200 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold cursor-pointer group text-left"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-300 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <FiPackage className="text-base" />
                                        </div>
                                        <span>My Orders</span>
                                    </button>
                                </div>

                                {/* Logout Option */}
                                <div className="p-1.5 pt-1 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full px-3 py-2.5 rounded-xl flex items-center gap-3 text-rose-400 hover:text-rose-200 hover:bg-rose-500/15 transition-all text-sm font-semibold cursor-pointer group text-left"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                            <FiLogOut className="text-base" />
                                        </div>
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Bottom Bar Profile Item */}
                    <Link
                        to="/settings"
                        className="h-full aspect-square flex flex-col items-center justify-center lg:hidden text-blue-700"
                        title="Profile Settings"
                    >
                        <img
                            src={avatarUrl}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/userGirl.jpg";
                            }}
                            alt="Profile"
                            className="w-[28px] h-[28px] rounded-full border-2 border-blue-600 object-cover"
                        />
                        <span className="text-[11px] font-semibold text-blue-700 truncate max-w-[56px] text-center mt-0.5">
                            {firstName}
                        </span>
                    </Link>
                </>
            )}
        </>
    );
}