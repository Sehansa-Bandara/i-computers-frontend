import { useEffect, useState } from "react";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import formatTimestamp from "../lib/date-format";
import getFormattedPrice from "../lib/price-format";
import OrderDetailsModal from "../components/orderDetailsModal";
import { Link } from "react-router-dom";
import {
    FiShoppingBag,
    FiRefreshCw,
    FiChevronLeft,
    FiChevronRight,
    FiPackage,
    FiCalendar,
    FiMapPin,
    FiArrowRight
} from "react-icons/fi";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    const fetchOrders = () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        api.get(`/orders/${pageSize}/${currentPage}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setOrders(response.data.orders || []);
                setTotalPages(response.data.totalPages || 1);
                setTotalOrders(response.data.totalCount || 0);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load orders:", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, [pageSize, currentPage]);

    const getStatusBadge = (status) => {
        const s = (status || "").toLowerCase();
        if (s === "delivered" || s === "completed") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {status || "Delivered"}
                </span>
            );
        }
        if (s === "pending") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {status || "Pending"}
                </span>
            );
        }
        if (s === "processing") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                    {status || "Processing"}
                </span>
            );
        }
        if (s === "shipped") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    {status || "Shipped"}
                </span>
            );
        }
        if (s === "cancelled" || s === "rejected") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {status || "Cancelled"}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                {status || "Unknown"}
            </span>
        );
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-[#e8f4fe] via-[#f4f9ff] to-[#eaf3fe] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
                {isLoading && <LoadingAnimation />}

                {/* Top Header Card */}
                <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl border border-sky-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#000066] to-[#000080] text-white flex items-center justify-center shadow-md shadow-blue-900/15 shrink-0">
                            <FiShoppingBag className="text-2xl text-sky-200" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    My Orders
                                </h1>
                                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 text-accent border border-sky-200 text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                    {totalOrders} {totalOrders === 1 ? "Order" : "Orders"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                Track delivery status, view invoices, and manage past purchases
                            </p>
                        </div>
                    </div>

                    {/* Header Controls */}
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-200/80 text-xs font-semibold">
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                        <button
                            onClick={fetchOrders}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 text-xs font-semibold transition-all flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95 disabled:opacity-60"
                            title="Refresh orders list"
                        >
                            <FiRefreshCw className={`text-sm text-accent ${isLoading ? "animate-spin" : ""}`} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Orders Content Container */}
                <div className="w-full bg-white/95 backdrop-blur-sm border border-sky-100 shadow-md shadow-blue-950/5 rounded-2xl overflow-hidden flex flex-col">
                    {/* Orders Table (desktop & tablet wrapper) */}
                    <div className="w-full overflow-x-auto hidden md:block">
                        <table className="min-w-[920px] w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#000066] via-[#000080] to-[#0a1b4d] text-white text-xs font-semibold uppercase tracking-wider h-[50px]">
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">Date Placed</th>
                                    <th className="py-3 px-4">Recipient</th>
                                    <th className="py-3 px-4">City</th>
                                    <th className="py-3 px-4">Items</th>
                                    <th className="py-3 px-4">Total</th>
                                    <th className="py-3 px-4 text-center">Status</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {orders.length === 0 && !isLoading ? (
                                    <tr>
                                        <td colSpan="8" className="py-16 text-center">
                                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div className="w-16 h-16 rounded-2xl bg-sky-50 text-accent flex items-center justify-center mb-3 shadow-inner">
                                                    <FiPackage className="text-3xl" />
                                                </div>
                                                <h3 className="text-base font-bold text-slate-800">No orders found</h3>
                                                <p className="text-xs text-slate-500 mt-1 mb-5 text-center leading-relaxed">
                                                    You haven't placed any orders yet. Discover our top collection of laptops, computers, and accessories!
                                                </p>
                                                <Link
                                                    to="/products"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-blue-900 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer"
                                                >
                                                    <span>Explore Products</span>
                                                    <FiArrowRight className="text-sm" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((item) => {
                                        return (
                                            <tr
                                                key={item.orderId}
                                                className="hover:bg-sky-50/50 transition-colors text-sm text-slate-700"
                                            >
                                                {/* Order ID */}
                                                <td className="py-3.5 px-4">
                                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-sky-50 text-accent border border-sky-200/80">
                                                        {item.orderId}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5">
                                                        <FiCalendar className="text-slate-400 text-xs shrink-0" />
                                                        <span>{formatTimestamp(item.date)}</span>
                                                    </div>
                                                </td>

                                                {/* Recipient */}
                                                <td className="py-3.5 px-4">
                                                    <div className="font-semibold text-slate-900 text-xs">
                                                        {item.firstName} {item.lastName}
                                                    </div>
                                                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                                                        {item.email}
                                                    </div>
                                                </td>

                                                {/* City */}
                                                <td className="py-3.5 px-4 text-xs text-slate-600">
                                                    <div className="flex items-center gap-1">
                                                        <FiMapPin className="text-slate-400 text-xs shrink-0" />
                                                        <span className="capitalize">{item.city || "-"}</span>
                                                    </div>
                                                </td>

                                                {/* Item Count */}
                                                <td className="py-3.5 px-4">
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                                                        {item.items ? item.items.length : 0} {item.items?.length === 1 ? "item" : "items"}
                                                    </span>
                                                </td>

                                                {/* Total */}
                                                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap text-sm">
                                                    {getFormattedPrice(item.totalAmount)}
                                                </td>

                                                {/* Status */}
                                                <td className="py-3.5 px-4 text-center">
                                                    {getStatusBadge(item.status)}
                                                </td>

                                                {/* Action */}
                                                <td className="py-3.5 px-4 text-center">
                                                    <div className="flex justify-center items-center">
                                                        <OrderDetailsModal order={item} />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Orders Cards List (Phones) */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {orders.length === 0 && !isLoading ? (
                            <div className="py-16 text-center px-4">
                                <div className="w-16 h-16 rounded-2xl bg-sky-50 text-accent flex items-center justify-center mb-3 shadow-inner mx-auto">
                                    <FiPackage className="text-3xl" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">No orders found</h3>
                                <p className="text-xs text-slate-500 mt-1 mb-5 text-center leading-relaxed">
                                    You haven't placed any orders yet. Discover our top collection of laptops, computers, and accessories!
                                </p>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-blue-900 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer"
                                >
                                    <span>Explore Products</span>
                                    <FiArrowRight className="text-sm" />
                                </Link>
                            </div>
                        ) : (
                            orders.map((item) => (
                                <div key={item.orderId} className="p-4 space-y-3 hover:bg-sky-50/40 transition-colors">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-sky-50 text-accent border border-sky-200/80">
                                            {item.orderId}
                                        </span>
                                        {getStatusBadge(item.status)}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <FiCalendar className="text-slate-400 text-xs shrink-0" />
                                            <span>{formatTimestamp(item.date)}</span>
                                        </div>
                                        {item.city && (
                                            <div className="flex items-center gap-1 text-slate-600 capitalize">
                                                <FiMapPin className="text-slate-400 text-xs shrink-0" />
                                                <span>{item.city}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-xs text-slate-700">
                                        <span className="font-semibold text-slate-900">{item.firstName} {item.lastName}</span>
                                        {item.email && <span className="text-slate-400 block truncate text-[11px]">{item.email}</span>}
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                        <div>
                                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                                                Total ({item.items?.length || 0} {item.items?.length === 1 ? "item" : "items"})
                                            </span>
                                            <span className="font-extrabold text-slate-900 text-sm">
                                                {getFormattedPrice(item.totalAmount)}
                                            </span>
                                        </div>
                                        <OrderDetailsModal order={item} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Integrated Pagination Footer */}
                    {orders.length > 0 && (
                        <div className="w-full bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Left count indicator */}
                            <div className="text-xs text-slate-500 font-medium">
                                Showing <strong className="text-slate-800">{orders.length}</strong> of{" "}
                                <strong className="text-slate-800">{totalOrders}</strong> total orders
                            </div>

                            {/* Right Pagination Controls */}
                            <div className="flex items-center gap-4 flex-wrap justify-center">
                                {/* Page size selector */}
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                    <label htmlFor="pageSize">Show:</label>
                                    <select
                                        id="pageSize"
                                        className="h-8 border border-slate-200 rounded-lg px-2 text-xs font-semibold outline-none cursor-pointer focus:border-accent bg-white text-slate-700 shadow-2xs"
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(parseInt(e.target.value, 10));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value={3}>3 per page</option>
                                        <option value={5}>5 per page</option>
                                        <option value={10}>10 per page</option>
                                    </select>
                                </div>

                                {/* Prev / Next buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={currentPage === 1 || isLoading}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                                    >
                                        <FiChevronLeft className="text-sm" />
                                        <span>Previous</span>
                                    </button>

                                    <div className="px-3 py-1 rounded-lg bg-sky-50 text-accent font-bold text-xs border border-sky-200/80">
                                        {currentPage} / {totalPages}
                                    </div>

                                    <button
                                        disabled={currentPage >= totalPages || isLoading}
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                                    >
                                        <span>Next</span>
                                        <FiChevronRight className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}