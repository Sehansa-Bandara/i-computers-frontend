import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import getFormattedPrice from "../../lib/price-format";
import formatTimestamp from "../../lib/date-format";
import LoadingAnimation from "../../components/loadingAnimation";
import AdminOrderDetailsModal from "../../components/AdminOrderDetailsModal";
import { UserContext } from "../../context/user";
import {
    FiUsers,
    FiShoppingBag,
    FiTrendingUp,
    FiBox,
    FiRefreshCw,
    FiMail,
    FiArrowRight,
    FiCheckCircle,
    FiClock,
    FiFilter,
    FiX
} from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";

export default function AdminDashboard() {
    const userData = useContext(UserContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [selectedUserFilter, setSelectedUserFilter] = useState(null);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            // Try fetching from the overview/stats endpoint
            const res = await api.get("/orders/overview/stats", { headers });
            if (res.data) {
                setStats(res.data.stats || {
                    totalUsers: 0,
                    totalOrders: 0,
                    totalProducts: 0,
                    totalRevenue: 0,
                    pendingOrders: 0,
                    completedOrders: 0
                });
                setRecentUsers(res.data.recentUsers || []);
                setRecentOrders(res.data.recentOrders || []);
            }
        } catch (err) {
            console.warn("Overview stats endpoint error, falling back to separate calls:", err);
            // Fallback: fetch users, orders, and products separately
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };

                const [usersRes, ordersRes, productsRes] = await Promise.all([
                    api.get("/users/8/1", { headers }),
                    api.get("/orders/8/1", { headers }),
                    api.get("/products", { headers })
                ]);

                const usersList = usersRes.data.users || [];
                const ordersList = ordersRes.data.orders || [];
                const productsList = Array.isArray(productsRes.data) ? productsRes.data : [];

                const totalRev = ordersList.reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0);
                const pending = ordersList.filter(o => (o.status || "").toLowerCase().includes("pending")).length;
                const completed = ordersList.filter(o => 
                    (o.status || "").toLowerCase().includes("delivered") || 
                    (o.status || "").toLowerCase().includes("completed")
                ).length;

                setStats({
                    totalUsers: usersRes.data.totalCount || usersList.length,
                    totalOrders: ordersRes.data.totalCount || ordersList.length,
                    totalProducts: productsList.length,
                    totalRevenue: totalRev,
                    pendingOrders: pending,
                    completedOrders: completed
                });
                setRecentUsers(usersList);
                setRecentOrders(ordersList);
            } catch (fallbackErr) {
                console.error("Fallback fetch also failed:", fallbackErr);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Filter orders if a user is clicked
    const displayedOrders = selectedUserFilter
        ? recentOrders.filter(
              (o) => (o.email || "").toLowerCase() === selectedUserFilter.toLowerCase()
          )
        : recentOrders;

    return (
        <div className="w-full min-h-full flex flex-col gap-6 p-2 sm:p-4 text-slate-800 font-sans">
            {isLoading && <LoadingAnimation />}

            {/* Header Welcome Bar */}
            <div className="w-full bg-white shadow-sm border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-3xl shadow-md shadow-blue-500/20">
                        <MdOutlineDashboard />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Overview Dashboard
                            </h1>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Live
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">
                            Welcome back, <span className="font-semibold text-slate-700">{userData?.user?.firstName || "Admin"}</span>. Monitor registered users and store orders in real-time.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchDashboardData}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                        title="Reload latest statistics"
                    >
                        <FiRefreshCw className={`text-base text-blue-600 ${isLoading ? "animate-spin" : ""}`} />
                        <span>Refresh Data</span>
                    </button>
                </div>
            </div>

            {/* 4 KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* 1. Registered Users */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Users</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl border border-blue-100">
                            <FiUsers />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                        {stats.totalUsers}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 font-medium">Customer accounts</span>
                        <Link
                            to="/admin/users"
                            className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                            <span>Manage</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                {/* 2. Total Orders */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl border border-amber-100">
                            <FiShoppingBag />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                        {stats.totalOrders}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                            <FiClock className="text-xs" />
                            {stats.pendingOrders} Pending
                        </span>
                        <Link
                            to="/admin/orders"
                            className="text-amber-600 hover:text-amber-800 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                            <span>View All</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                {/* 3. Total Revenue */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Store Revenue</span>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl border border-emerald-100">
                            <FiTrendingUp />
                        </div>
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-black text-emerald-700 tracking-tight mb-1 truncate" title={getFormattedPrice(stats.totalRevenue)}>
                        {getFormattedPrice(stats.totalRevenue)}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <FiCheckCircle className="text-xs" />
                            {stats.completedOrders} Delivered
                        </span>
                        <span className="text-slate-400 font-medium">All-time sales</span>
                    </div>
                </div>

                {/* 4. Active Products */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Store Products</span>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl border border-indigo-100">
                            <FiBox />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                        {stats.totalProducts}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 font-medium">Catalog items</span>
                        <Link
                            to="/admin/products"
                            className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                            <span>Products</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Filter Notice Banner (if user filter is active) */}
            {selectedUserFilter && (
                <div className="w-full bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between gap-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shadow-xs">
                            <FiFilter />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Filter Applied</p>
                            <p className="text-sm font-semibold text-slate-800">
                                Showing orders placed by: <span className="text-blue-900 font-mono font-bold">{selectedUserFilter}</span> ({displayedOrders.length} {displayedOrders.length === 1 ? "order" : "orders"} found)
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setSelectedUserFilter(null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                    >
                        <FiX className="text-sm" />
                        <span>Clear Filter</span>
                    </button>
                </div>
            )}

            {/* Split View: Registered Users & Customer Orders */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left: Registered Users Panel (5 Cols on XL) */}
                <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg border border-blue-100">
                                <FiUsers />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    Recent Registered Users
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Latest accounts and customer order history
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/admin/users"
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 hover:underline"
                        >
                            <span>View All ({stats.totalUsers})</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[560px]">
                        {recentUsers.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-sm font-medium">
                                No registered users found yet.
                            </div>
                        ) : (
                            recentUsers.map((u) => {
                                const hasCustomImage = u.image && u.image.startsWith("http");
                                const initials = `${(u.firstName || "U")[0] || ""}${(u.lastName || "")[0] || ""}`.toUpperCase() || "U";
                                const colors = [
                                    "from-blue-600 to-indigo-600",
                                    "from-emerald-600 to-teal-600",
                                    "from-purple-600 to-pink-600",
                                    "from-amber-600 to-orange-600",
                                    "from-cyan-600 to-blue-600",
                                    "from-rose-600 to-red-600"
                                ];
                                const colorIndex = Math.abs((u.email || "a").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % colors.length;
                                const bgGradient = colors[colorIndex];
                                const isSelected = selectedUserFilter === u.email;
                                const userOrderCount = u.orderCount || 0;

                                return (
                                    <div
                                        key={u.email}
                                        className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                                            isSelected ? "bg-blue-50/70 border-l-4 border-blue-600" : "hover:bg-slate-50/80"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {hasCustomImage ? (
                                                <img
                                                    src={u.image}
                                                    alt={u.firstName || "User"}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "/user.jpg";
                                                    }}
                                                    className="w-11 h-11 rounded-full object-cover border-2 border-slate-200/90 shadow-2xs shrink-0"
                                                />
                                            ) : (
                                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${bgGradient} text-white font-bold flex items-center justify-center text-xs shadow-2xs shrink-0 tracking-wider border-2 border-white`}>
                                                    {initials}
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-bold text-slate-900 text-sm truncate capitalize">
                                                        {u.firstName || "User"} {u.lastName || ""}
                                                    </span>
                                                    {u.isAdmin && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                                                            Admin
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-slate-500 font-mono truncate">
                                                    <FiMail className="text-slate-400 text-[10px] shrink-0" />
                                                    <span className="truncate">{u.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Orders Badge & Action */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => {
                                                    if (selectedUserFilter === u.email) {
                                                        setSelectedUserFilter(null);
                                                    } else {
                                                        setSelectedUserFilter(u.email);
                                                    }
                                                }}
                                                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                                    userOrderCount > 0
                                                        ? isSelected
                                                            ? "bg-blue-600 text-white shadow-xs"
                                                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                                                        : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                                                }`}
                                                title={userOrderCount > 0 ? "Click to filter orders from this user" : "No orders yet"}
                                            >
                                                <FiShoppingBag className="text-xs" />
                                                <span>{userOrderCount} {userOrderCount === 1 ? "Order" : "Orders"}</span>
                                            </button>

                                            {userOrderCount > 0 && (
                                                <button
                                                    onClick={() => navigate(`/admin/orders?email=${encodeURIComponent(u.email)}`)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Open in full Orders manager"
                                                >
                                                    <FiArrowRight className="text-sm" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                        <Link
                            to="/admin/users"
                            className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                        >
                            <span>Manage All Registered Users & Permissions</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                {/* Right: Customer Orders Panel (7 Cols on XL) */}
                <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg border border-amber-100">
                                <FiShoppingBag />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    Recent Customer Orders
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Incoming orders, buyer details, and fulfillment statuses
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/admin/orders"
                            className="text-xs font-bold text-amber-600 hover:text-amber-800 inline-flex items-center gap-1 hover:underline"
                        >
                            <span>View All ({stats.totalOrders})</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">Customer</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4 text-center">Status</th>
                                    <th className="py-3 px-4 text-right">Total</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 text-sm">
                                {displayedOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-slate-400 font-medium">
                                            {selectedUserFilter
                                                ? `No orders found for ${selectedUserFilter}`
                                                : "No customer orders recorded yet."}
                                        </td>
                                    </tr>
                                ) : (
                                    displayedOrders.map((item) => {
                                        const statusStr = (item.status || "").toLowerCase();
                                        const statusBadgeClass =
                                            statusStr === "delivered" || statusStr === "completed"
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                : statusStr === "pending" || statusStr === "processing"
                                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                                : statusStr === "cancelled" || statusStr === "rejected"
                                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                                : "bg-blue-50 text-blue-700 border-blue-200";

                                        return (
                                            <tr
                                                key={item.orderId}
                                                className="hover:bg-slate-50/70 transition-colors"
                                            >
                                                <td className="py-3.5 px-4 font-mono font-bold text-blue-700 text-xs">
                                                    {item.orderId}
                                                </td>

                                                <td className="py-3.5 px-4">
                                                    <div className="font-semibold text-slate-900 text-xs">
                                                        {item.firstName || "Customer"} {item.lastName || ""}
                                                    </div>
                                                    <div
                                                        className="text-[11px] text-slate-400 font-mono truncate max-w-[170px] hover:text-blue-600 cursor-pointer"
                                                        onClick={() => setSelectedUserFilter(item.email)}
                                                        title="Filter by this user"
                                                    >
                                                        {item.email}
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                                                    {formatTimestamp(item.date)}
                                                </td>

                                                <td className="py-3.5 px-4 text-center">
                                                    <span
                                                        className={`px-2.5 py-1 text-xs rounded-full font-bold border inline-block ${statusBadgeClass}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-xs whitespace-nowrap">
                                                    {getFormattedPrice(item.totalAmount)}
                                                </td>

                                                <td className="py-3.5 px-4 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <AdminOrderDetailsModal
                                                            order={item}
                                                            refresh={fetchDashboardData}
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

                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center mt-auto">
                        <Link
                            to="/admin/orders"
                            className="text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
                        >
                            <span>Open Full Orders Management & Tracking</span>
                            <FiArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
