import { useEffect, useState } from "react";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../lib/price-format";
import formatTimestamp from "../../lib/date-format";
import AdminOrderDetailsModal from "../../components/AdminOrderDetailsModal";
import { FiShoppingBag, FiRefreshCw, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/orders/" + pageSize + "/" + currentPage, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (isLoading) {
                console.log(response.data);
                setOrders(response.data.orders || []);
                setTotalPages(response.data.totalPages || 1);
                setTotalOrders(response.data.totalCount || 0);
                setIsLoading(false);
            }
        }).catch((err) => {
            console.error(err);
            setIsLoading(false);
        });
    }, [isLoading, pageSize, currentPage]);

    return (
        <div className="w-full h-full flex flex-col p-4 overflow-y-auto">
            {isLoading && <LoadingAnimation />}

            {/* Top Header Card */}
            <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
                        <FiShoppingBag className="text-2xl" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Orders</h1>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
                                {totalOrders} {totalOrders === 1 ? "Order" : "Orders"}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Track, fulfill, and monitor customer orders and transaction details
                        </p>
                    </div>
                </div>

                {/* Right Action Section */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span>Page {currentPage} of {totalPages}</span>
                    </div>

                    <button
                        onClick={() => {
                            setIsLoading(true);
                        }}
                        disabled={isLoading}
                        className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/90 text-amber-800 border border-amber-200/90 hover:border-amber-300 text-sm font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 disabled:opacity-60"
                        title="Refresh orders list"
                    >
                        <FiRefreshCw className={`text-base text-amber-600 ${isLoading ? "animate-spin" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Orders Table Container */}
            <div className="w-full bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden mb-28">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800 text-white text-center text-sm font-semibold h-[48px]">
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">City</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Items</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center p-8 text-slate-500 font-medium">
                                    Loading orders...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center p-8 text-slate-500 font-medium">
                                    No orders found.
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
                                        className="border-b border-slate-100 hover:bg-slate-50 text-center text-sm text-slate-700 transition-colors"
                                    >
                                        <td className="p-3 font-semibold text-blue-900 font-mono">
                                            {item.orderId}
                                        </td>
                                        <td className="p-3 text-xs text-slate-500">
                                            {formatTimestamp(item.date)}
                                        </td>
                                        <td className="p-3 text-left">
                                            <div className="font-semibold text-slate-900 text-xs">
                                                {item.firstName} {item.lastName}
                                            </div>
                                            <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
                                                {item.email}
                                            </div>
                                        </td>
                                        <td className="p-3 text-xs">{item.city || "-"}</td>
                                        <td className="p-3 text-xs">{item.phone || "-"}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2.5 py-1 text-xs rounded-full font-semibold border ${statusBadgeClass}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 font-semibold">
                                            {item.items ? item.items.length : 0}
                                        </td>
                                        <td className="p-3 font-bold text-emerald-700">
                                            {getFormattedPrice(item.totalAmount)}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center items-center gap-2">
                                                <AdminOrderDetailsModal
                                                    order={item}
                                                    refresh={() => setIsLoading(true)}
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

            {/* Bottom Pagination Bar */}
            <div className="w-[calc(100%-320px)] h-[80px] fixed bottom-0 left-[320px] flex justify-center items-center pointer-events-none z-50">
                <div className="w-[620px] h-[52px] bg-white shadow-2xl rounded-2xl flex justify-between items-center px-4 overflow-hidden pointer-events-auto border border-slate-200 backdrop-blur-md">
                    <button
                        className="px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 disabled:text-slate-300 disabled:hover:bg-transparent transition-colors cursor-pointer font-semibold text-xs flex items-center gap-1.5"
                        disabled={currentPage === 1}
                        onClick={() => {
                            const newPageNumber = currentPage - 1;
                            setCurrentPage(newPageNumber);
                            setIsLoading(true);
                        }}
                    >
                        <FiChevronLeft className="text-base" />
                        <span>Previous</span>
                    </button>

                    <div className="flex justify-center items-center gap-2 font-semibold text-xs text-slate-700">
                        <span>
                            Page <b className="text-blue-600">{currentPage}</b> of {totalPages}
                        </span>
                    </div>

                    <div className="text-slate-700 flex justify-center items-center gap-2 text-xs font-semibold">
                        <label htmlFor="pageSize" className="text-slate-500">Page Size:</label>
                        <select
                            id="pageSize"
                            className="h-8 border border-slate-200 rounded-lg px-2 text-xs font-medium outline-none cursor-pointer focus:border-blue-600 bg-slate-50 text-slate-800"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value, 10));
                                setIsLoading(true);
                            }}
                        >
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => {
                            const newPageNumber = currentPage + 1;
                            setCurrentPage(newPageNumber);
                            setIsLoading(true);
                        }}
                        className="px-3 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 disabled:text-slate-300 disabled:hover:bg-transparent transition-colors cursor-pointer font-semibold text-xs flex items-center gap-1.5"
                    >
                        <span>Next</span>
                        <FiChevronRight className="text-base" />
                    </button>
                </div>
            </div>
        </div>
    );
}
