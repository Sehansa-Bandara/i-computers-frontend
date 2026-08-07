import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";


export default function HomePage() {
    return (
        <div className="w-full min-h-full">
            <Header />
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/about" element={<h1>About Page</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />


            </Routes>
        </div>
    );
}