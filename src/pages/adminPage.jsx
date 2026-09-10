import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { BsBox } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import AdminProducts from "./admin/adminProducts";
import AddProductForm from "./admin/adminAddproduct";
import AdminEditProductForm from "./admin/adminEditProductform";
import AdminOrdersPage from "./admin/adminOrderPage";
import AdminUsersPage from "./admin/adminUsers";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


export default function AdminPage() {

  const userData = useContext(UserContext);
  const navigate = useNavigate()
  const location = useLocation();

  if (!userData.user || !userData.user.isAdmin) {
    navigate("/login")
  }

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar - Rich Blue Gradient */}
      <div className="w-[320px] bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white shadow-2xl flex flex-col justify-between border-r border-blue-800/40">
        <div>
          <div className="w-full p-6 border-b border-blue-800/50 flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 p-1.5 bg-white/10 rounded-xl object-cover backdrop-blur-md border border-white/20 shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Admin Dashboard</h1>
              <p className="text-xs text-blue-300 font-medium">I-Computers Store</p>
            </div>
          </div>

          <nav className="p-4 space-y-2 mt-2">
            <Link
              to="/admin"
              className={`w-full flex items-center p-3.5 text-lg font-medium rounded-xl gap-3.5 transition-all duration-200 ${isActive("/admin") && location.pathname === "/admin"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                }`}
            >
              <GiShoppingCart className="text-2xl" />
              Orders
            </Link>

            <Link
              to="/admin/products"
              className={`w-full flex items-center p-3.5 text-lg font-medium rounded-xl gap-3.5 transition-all duration-200 ${isActive("/admin/products") || location.pathname.includes("/admin/addproduct")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                }`}
            >
              <BsBox className="text-2xl" />
              Products
            </Link>

            <Link
              to="/admin/users"
              className={`w-full flex items-center p-3.5 text-lg font-medium rounded-xl gap-3.5 transition-all duration-200 ${isActive("/admin/users")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 font-semibold"
                : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                }`}
            >
              <FaRegUser className="text-2xl" />
              Users
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-blue-800/40 text-xs text-blue-300 text-center">
          © 2026 I-Computers Admin
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-slate-100 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminOrdersPage />} />
          <Route path="/dashboard" element={<AdminOrdersPage />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/addproduct" element={<AddProductForm />} />
          <Route path="/editproduct" element={<AdminEditProductForm />} />
        </Routes>
      </div>
    </div>
  );
}