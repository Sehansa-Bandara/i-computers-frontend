import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import BlockUserModal from "../../components/blockUserModal";
import ChangeRoleOfUserModal from "../../components/ChangeRoleOfUserModal";
import getFormattedPrice from "../../lib/price-format";
import {
    FiUsers,
    FiRefreshCw,
    FiMail,
    FiChevronLeft,
    FiChevronRight,
    FiShoppingBag,
    FiSearch,
    FiX
} from "react-icons/fi";

export default function AdminUsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const url = `/users/${pageSize}/${currentPage}${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`;

        api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUsers(response.data.users || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalUsers(response.data.totalCount || 0);
            setIsLoading(false);
        }).catch((err) => {
            console.error("Failed to fetch users:", err);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, [pageSize, currentPage, searchTerm]);

    return (
        <div className="w-full min-h-full flex flex-col gap-6 p-2 sm:p-4">
            {isLoading && <LoadingAnimation />}

            {/* Top Header Card */}
            <div className="w-full bg-white shadow-sm border border-slate-200/80 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between p-5 gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shadow-xs border border-blue-100">
                        <FiUsers />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">User Management</h1>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                            Manage customer and staff accounts, permissions, and view user order history
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Search input */}
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700">
                        <FiSearch className="text-slate-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search name or email..."
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

                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        {totalUsers} Registered Users
                    </span>
                    <button
                        onClick={fetchUsers}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
                    >
                        <FiRefreshCw className={`text-base ${isLoading ? "animate-spin" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="w-full bg-white shadow-sm border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs uppercase tracking-wider font-bold">
                                <th className="py-4 px-4 w-16 text-center">Avatar</th>
                                <th className="py-4 px-4">Email Address</th>
                                <th className="py-4 px-4">First Name</th>
                                <th className="py-4 px-4">Last Name</th>
                                <th className="py-4 px-4 text-center">Role</th>
                                <th className="py-4 px-4 text-center">Orders Placed</th>
                                <th className="py-4 px-4 text-center">Email Verification</th>
                                <th className="py-4 px-4 text-center">Status</th>
                                <th className="py-4 px-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm">
                            {users.length === 0 && !isLoading ? (
                                <tr>
                                    <td colSpan="9" className="py-12 text-center text-slate-400 font-medium">
                                        {searchTerm ? `No users matching "${searchTerm}"` : "No users found."}
                                    </td>
                                </tr>
                            ) : (
                                users.map((item) => {
                                    const hasCustomImage = item.image && item.image.startsWith("http");
                                    const initials = `${(item.firstName || "U")[0] || ""}${(item.lastName || "")[0] || ""}`.toUpperCase() || "U";
                                    const colors = [
                                        "from-blue-600 to-indigo-600",
                                        "from-emerald-600 to-teal-600",
                                        "from-purple-600 to-pink-600",
                                        "from-amber-600 to-orange-600",
                                        "from-cyan-600 to-blue-600",
                                        "from-rose-600 to-red-600"
                                    ];
                                    const colorIndex = Math.abs((item.email || "a").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % colors.length;
                                    const bgGradient = colors[colorIndex];
                                    const orderCount = item.orderCount || 0;

                                    return (
                                        <tr
                                            key={item.email}
                                            className="hover:bg-blue-50/40 transition-colors duration-150"
                                        >
                                            <td className="py-3 px-4 text-center">
                                                {hasCustomImage ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.firstName || "User"}
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = "/user.jpg";
                                                        }}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-200/80 shadow-xs inline-block"
                                                    />
                                                ) : (
                                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${bgGradient} text-white font-bold flex items-center justify-center text-xs shadow-xs mx-auto tracking-wider border-2 border-white`}>
                                                        {initials}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="py-3 px-4 font-medium text-slate-800">
                                                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
                                                    <FiMail className="text-slate-400 shrink-0" />
                                                    <span>{item.email}</span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4 font-semibold text-slate-800 capitalize">
                                                {item.firstName || item.firstname || "—"}
                                            </td>

                                            <td className="py-3 px-4 font-medium text-slate-600 capitalize">
                                                {item.lastName || item.lastname || "—"}
                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                {item.isAdmin ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                                        User
                                                    </span>
                                                )}
                                            </td>

                                            {/* Orders Placed by this registered user */}
                                            <td className="py-3 px-4 text-center">
                                                {orderCount > 0 ? (
                                                    <button
                                                        onClick={() => navigate(`/admin/orders?email=${encodeURIComponent(item.email)}`)}
                                                        className="inline-flex flex-col items-center justify-center px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all shadow-2xs cursor-pointer group"
                                                        title="Click to view all orders for this user"
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            <FiShoppingBag className="text-xs text-emerald-600 group-hover:scale-110 transition-transform" />
                                                            <span>{orderCount} {orderCount === 1 ? "Order" : "Orders"}</span>
                                                        </div>
                                                        {item.totalSpent > 0 && (
                                                            <span className="text-[10px] text-emerald-600 font-medium">
                                                                {getFormattedPrice(item.totalSpent)}
                                                            </span>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200/60">
                                                        0 Orders
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                {item.isEmailVerified ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                                        Not Verified
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                {item.isBlocked ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                                        Blocked
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        Active
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <BlockUserModal refresh={fetchUsers} user={item} />
                                                    <ChangeRoleOfUserModal refresh={fetchUsers} user={item} />
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
                                setIsLoading(true);
                            }}
                            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-semibold text-slate-800 text-xs shadow-2xs outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option value={3}>3 rows</option>
                            <option value={5}>5 rows</option>
                            <option value={10}>10 rows</option>
                            <option value={20}>20 rows</option>
                        </select>
                        <span className="text-slate-400 ml-2">
                            Showing page {currentPage} of {totalPages}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage <= 1}
                            onClick={() => {
                                setCurrentPage((p) => p - 1);
                                setIsLoading(true);
                            }}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                        >
                            <FiChevronLeft className="text-sm" />
                            <span>Previous</span>
                        </button>

                        <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
                            {currentPage}
                        </span>

                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => {
                                setCurrentPage((p) => p + 1);
                                setIsLoading(true);
                            }}
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