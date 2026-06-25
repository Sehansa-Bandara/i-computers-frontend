import { Routes, Route, Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { BsBox } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import AdminProducts from "./admin/adminProducts";
import AddProductForm from "./admin/adminAddproduct";

export default function AdminPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[360px] shadow-2xl text-secondary-color flex flex-col">
        <div className="w-full p-4 border-b">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[100px] h-[100px] p-2 bg-accent-color rounded-lg mb-2"
          />
          <span className="text-2xl font-bold">Admin Dashboard</span>
        </div>

        <Link
          to="/admin"
          className="w-full flex items-center p-3 text-xl gap-3 hover:bg-accent-color hover:text-white"
        >
          <GiShoppingCart className="text-2xl" />
          Orders
        </Link>

        <Link
          to="/admin/products"
          className="w-full flex items-center p-3 text-xl gap-3 hover:bg-accent-color hover:text-white"
        >
          <BsBox className="text-2xl" />
          Products
        </Link>

        <Link
          to="/admin/users"
          className="w-full flex items-center p-3 text-xl gap-3 hover:bg-accent-color hover:text-white"
        >
          <FaRegUser className="text-2xl" />
          Users
        </Link>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-primary p-6">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl">Orders Page</h1>} />
          <Route
            path="/products"
            element={<AdminProducts className="text-3xl" />}
          />
          <Route
            path="/users"
            element={<h1 className="text-3xl">Users Page</h1>}
        
          />
          <Route path="/addproduct" element={<AddProductForm />} />
        </Routes>
      </div>
    </div>
  );
}