import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productsPage";
import ProductOverview from "./productOverview";



export default function HomePage() {
    return (
        <div className="w-full min-h-full">
            <Header />
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/about" element={<h1>About Page</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />


            </Routes>
        </div>
    );
}