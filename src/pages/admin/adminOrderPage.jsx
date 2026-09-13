import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../lib/price-format";
import formatTimestamp from "../../lib/date-format";
import AdminOrderDetailsModal from "../../components/AdminOrderDetailsModal";
import {
    FiShoppingBag,
    FiRefreshCw,
    FiChevronLeft,
    FiChevronRight,
    FiSearch,
    FiFilter,
    FiX,
    FiMail,
    FiPhone
} from "react-icons/fi";

export default function AdminOrdersPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const emailFilter = searchParams.get("email") || "";

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const queryParams = new URLSearchParams();
        if (emailFilter) queryParams.append("email", emailFilter);
        if (searchTerm) queryParams.append("search", searchTerm);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        const url = `/orders/${pageSize}/${currentPage}${queryString}`;

        api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setOrders(response.data.orders || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalOrders(response.data.totalCount || 0);
            setIsLoading(false);
        }).catch((err) => {
            console.error("Failed to fetch orders:", err);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchOrders();
    }, [pageSize, currentPage, emailFilter, searchTerm]);

    const clearEmailFilter = () => {
        searchParams.delete("email");
        setSearchParams(searchParams);
        setCurrentPage(1);
    };

    return (
        <div className="w-full min-h-full flex flex-col gap-6 p-2 sm:p-4 text-slate-800 font-sans">
            {isLoading && <LoadingAnimation />}

            {/* Top Header Card */}
            <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-xs border border-amber-100">
                        <FiShoppingBag />
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Order Management</h1>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                                {totalOrders} {totalOrders === 1 ? "Order" : "Orders"}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                            Track customer orders, review shipping addresses, and manage status updates
                        </p>
                    </div>
                </div>

                {/* Search & Actions */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700">
                        <FiSearch className="text-slate-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search Order ID, name..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="bg-transparent outline-none text-xs text-slate-800 placeholder:text-slate-400 w-36 sm:w-52"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <FiX className="text-xs" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={fetchOrders}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                        title="Refresh orders list"
                    >
                        <FiRefreshCw className={`text-base ${isLoading ? "animate-spin" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Email Filter Pill Banner */}
            {emailFilter && (
                <div className="w-full bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center text-sm shadow-xs">
                            <FiFilter />
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Filtered by Customer Email:</span>
                            <span className="ml-2 text-sm font-mono font-bold text-amber-950">{emailFilter}</span>
                            <span className="ml-2 text-xs text-amber-700 font-medium">({totalOrders} orders found)</span>
                        </div>
                    </div>

                    <button
                        onClick={clearEmailFilter}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                    >
                        <FiX className="text-sm" />
                        <span>Show All Orders</span>
                    </button>
                </div>
            )}

            {/* Orders Table Container */}
            <div className="w-full bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs uppercase tracking-wider font-bold">
                                <th className="py-4 px-4">Order ID</th>
                                <th className="py-4 px-4">Date</th>
                                <th className="py-4 px-4">Customer Details</th>
                                <th className="py-4 px-4">Delivery Location</th>
                                <th className="py-4 px-4 text-center">Status</th>
                                <th className="py-4 px-4 text-center">Items</th>
                                <th className="py-4 px-4 text-right">Total Amount</th>
                                <th className="py-4 px-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm">
                            {isLoading && orders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-slate-400 font-medium">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-12 text-slate-400 font-medium">
                                        {emailFilter
                                            ? `No orders found for ${emailFilter}`
                                            : searchTerm
                                            ? `No orders matching "${searchTerm}"`
                                            : "No orders found."}
                                    </td>
                                </tr>
                            ) : (
                                orders.map((item) => {
                                    const statusStr = (item.status || "").toLowerCase();
                                    const statusBadgeClass =
                                        statusStr === "delivered" || statusStr === "completed"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                            : statusStr === "pending" || statusStr === "processing"
                                            ? "bg-amber-50 text-amber-700 border-amber-300"
                                            : statusStr === "cancelled" || statusStr === "rejected"
                                            ? "bg-rose-50 text-rose-700 border-rose-300"
                                            : "bg-blue-50 text-blue-700 border-blue-300";

                                    return (
                                        <tr
                                            key={item.orderId}
                                            className="hover:bg-slate-50/70 text-sm text-slate-700 transition-colors"
                                        >
                                            <td className="py-3.5 px-4 font-bold text-blue-900 font-mono text-xs">
                                                {item.orderId}
                                            </td>

                                            <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                                                {formatTimestamp(item.date)}
                                            </td>

                                            <td className="py-3.5 px-4">
                                                <div className="font-semibold text-slate-900 text-xs">
                                                    {item.firstName || "Customer"} {item.lastName || ""}
                                                </div>
                                                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                                                    <FiMail className="text-slate-400 shrink-0 text-[10px]" />
                                                    <span className="truncate max-w-[170px]">{item.email}</span>
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4 text-xs">
                                                <div className="font-medium text-slate-800 capitalize">{item.city || "—"}</div>
                                                {item.phone && (
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                                                        <FiPhone className="text-[10px]" />
                                                        <span>{item.phone}</span>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="py-3.5 px-4 text-center">
                                                <span
                                                    className={`px-2.5 py-1 text-xs rounded-full font-bold border inline-block ${statusBadgeClass}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                                                {item.items ? item.items.length : 0}
                                            </td>

                                            <td className="py-3.5 px-4 text-right font-black text-slate-900 text-xs whitespace-nowrap">
                                                {getFormattedPrice(item.totalAmount)}
                                            </td>

                                            <td className="py-3.5 px-4 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <AdminOrderDetailsModal
                                                        order={item}
                                                        refresh={fetchOrders}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Integrated Pagination Footer */}
                <div className="w-full bg-slate-50/80 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>Page Size:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-semibold text-slate-800 text-xs shadow-2xs outline-none focus:border-amber-500 cursor-pointer"
                        >
                            <option value={3}>3 rows</option>
                            <option value={5}>5 rows</option>
                            <option value={10}>10 rows</option>
                            <option value={20}>20 rows</option>
                        </select>
                        <span className="text-slate-400 ml-2">
                            Showing page {currentPage} of {totalPages} ({totalOrders} total)
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                        >
                            <FiChevronLeft className="text-sm" />
                            <span>Previous</span>
                        </button>

                        <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs shadow-xs">
                            {currentPage}
                        </span>

                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                        >
                            <span>Next</span>
                            <FiChevronRight className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

