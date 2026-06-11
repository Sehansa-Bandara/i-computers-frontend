import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AdminPage() {
    return (
        <div className="w-full h-full flex">
            <div className="w-[360px] h-full bg-red-900 text-white flex flex-col gap-4 p-4">
                <a href="/admin">Admin Dashboard</a>
                <a href="/admin/products">Products</a>
                <a href="/admin/users">Users</a>

                <h1 className="text-2xl font-bold m-4">Using 'Link'tags</h1>
                <Link to="/admin">Admin Dashboard</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>

            </div>
            <div className="w-[calc(100%-360px)] bg-yellow-500 h-full">
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>} />
                    <Route path="/products" element={<h1>Products Page</h1>} />
                    <Route path="/users" element={<h1>Users Page</h1>} />
                </Routes>
            </div>
            
        </div>
    );
}