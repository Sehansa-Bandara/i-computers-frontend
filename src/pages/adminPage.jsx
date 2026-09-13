import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { BsBox } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import AdminDashboard from "./admin/adminDashboard";
import AdminProducts from "./admin/adminProducts";
import AddProductForm from "./admin/adminAddproduct";
import AdminEditProductForm from "./admin/adminEditProductform";
import AdminOrdersPage from "./admin/adminOrderPage";
import AdminUsersPage from "./admin/adminUsers";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/user";


export default function AdminPage() {

  const userData = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userData.userLoadingFinished) {
      if (!userData.user || !userData.user.isAdmin) {
        navigate("/login");
      }
    }
  }, [userData.userLoadingFinished, userData.user, navigate]);

  if (!userData.userLoadingFinished) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData.user || !userData.user.isAdmin) {
    return null;
  }

  const isDashboardActive = location.pathname === "/admin" || location.pathname === "/admin/dashboard";
  const isOrdersActive = location.pathname.startsWith("/admin/orders");
  const isProductsActive = location.pathname.startsWith("/admin/products") || location.pathname.includes("/admin/addproduct") || location.pathname.includes("/admin/editproduct");
  const isUsersActive = location.pathname.startsWith("/admin/users");

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (userData.setUser) {
      userData.setUser(null);
    }
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar - Rich Blue Gradient */}
      <div className="w-[300px] sm:w-[320px] bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white shadow-2xl flex flex-col justify-between border-r border-blue-800/40 shrink-0">
        <div>
          <div className="w-full p-6 border-b border-blue-800/50 flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 p-1.5 bg-white/10 rounded-xl object-cover backdrop-blur-md border border-white/20 shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Admin Portal</h1>
              <p className="text-xs text-blue-300 font-medium">I-Computers Store</p>
            </div>
          </div>

          <nav className="p-4 space-y-2 mt-2">
            {/* Dashboard Overview */}
            <Link
              to="/admin"
              className={`w-full flex items-center p-3.5 text-base font-medium rounded-xl gap-3.5 transition-all duration-200 ${
                isDashboardActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                  : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
              }`}
            >
              <MdOutlineDashboard className="text-2xl" />
              <span>Dashboard</span>
            </Link>

            {/* Orders */}
            <Link
              to="/admin/orders"
              className={`w-full flex items-center p-3.5 text-base font-medium rounded-xl gap-3.5 transition-all duration-200 ${
                isOrdersActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                  : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
              }`}
            >
              <GiShoppingCart className="text-2xl" />
              <span>Orders</span>
            </Link>

            {/* Products */}
            <Link
              to="/admin/products"
              className={`w-full flex items-center p-3.5 text-base font-medium rounded-xl gap-3.5 transition-all duration-200 ${
                isProductsActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                  : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
              }`}
            >
              <BsBox className="text-2xl" />
              <span>Products</span>
            </Link>

            {/* Registered Users */}
            <Link
              to="/admin/users"
              className={`w-full flex items-center p-3.5 text-base font-medium rounded-xl gap-3.5 transition-all duration-200 ${
                isUsersActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                  : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
              }`}
            >
              <FaRegUser className="text-2xl" />
              <span>Users</span>
            </Link>
          </nav>
        </div>

        {/* User profile card & quick actions */}
        <div className="p-4 border-t border-blue-800/40 bg-black/10">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={userData?.user?.image && userData.user.image !== "/images/default-profile.png" ? userData.user.image : "/userGirl.jpg"}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-xs"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/userGirl.jpg";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate capitalize">
                {userData?.user?.firstName || "Admin"} {userData?.user?.lastName || ""}
              </p>
              <p className="text-[11px] text-blue-300 font-mono truncate">
                {userData?.user?.email || "admin@store.com"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 text-xs font-semibold transition-colors"
            >
              <FiHome className="text-sm" />
              <span>Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/20 text-xs font-semibold transition-colors cursor-pointer"
              title="Logout from Admin"
            >
              <FiLogOut className="text-sm" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-slate-100 p-4 sm:p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/addproduct" element={<AddProductForm />} />
          <Route path="/editproduct" element={<AdminEditProductForm />} />
        </Routes>
      </div>
    </div>
  );
}