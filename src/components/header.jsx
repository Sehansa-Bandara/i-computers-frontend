import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import UserData from "./userData";




export default function Header() {
    
    return (
        <header className="w-full h-[100px] bg-accent-blue text-white flex items-center p-4  font-semibold text-xl justify-between">

            <Link to="/" className="h-full flex items-center">
                <img src="/logo.png" alt="logo" className="h-[100px] object-contain cursor-pointer" />
            </Link>
            <div className=" h-full text-primary flex items-center">
                <Link to="/" className="h-full flex items-center px-4 hover:bg-accent-dark">Home</Link>
                <Link to="/products" className="h-full flex items-center px-4 hover:bg-accent-dark">Products</Link>
                <Link to="/about" className="h-full flex items-center px-4 hover:bg-accent-dark">About Us</Link>



            </div>
            <div className="w-[200px] h-full border border-white text-white flex items-center">
                <Link to="/cart">
                    <HiShoppingCart className="text-white text-4xl" />
                </Link>
                <UserData />

            </div>
        </header>
    );
}
