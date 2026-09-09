import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import UserData from "./userData";
import { CiHome, CiBoxList, CiPhone, CiShoppingCart } from "react-icons/ci";





export default function Header() {

    return (
        <>
            <header className="w-full h-[100px] bg-accent-blue text-white flex items-center p-4  justify-center lg:justify-between font-semibold text-xl justify-between">

                <Link to="/" className="h-full flex items-center">
                    <img src="/logo.png" alt="logo" className="h-[100px] object-contain cursor-pointer" />
                </Link>
                <div className=" h-full text-primary hidden lg:flex items-center">
                    <Link to="/" className="h-full flex items-center px-4 hover:bg-accent-dark">Home</Link>
                    <Link to="/products" className="h-full flex items-center px-4 hover:bg-accent-dark">Products</Link>
                    <Link to="/about" className="h-full flex items-center px-4 hover:bg-accent-dark">About Us</Link>



                </div>
                <div className="h-full text-white hidden lg:flex items-center gap-5">
                    <Link to="/cart">
                        <HiShoppingCart className="text-white text-4xl hover:scale-105 transition-transform" />
                    </Link>
                    <UserData />
                </div>
            </header>
            <div className="fixed bottom-0 flex lg:hidden w-screen h-[80px] z-30 bg-white shadow-2xl shadow-black justify-evenly">

                <Link className="h-full aspect-square flex flex-col items-center justify-center" to="/">
                    <CiHome className="text-4xl text-accent" />
                    <span className="text-accent text-sm">Home</span>
                </Link>

                <Link className="h-full aspect-square flex flex-col items-center justify-center" to="/products">
                    <CiBoxList className="text-4xl text-accent" />
                    <span className="text-accent text-sm">Products</span>
                </Link>
                <Link className="h-full aspect-square flex flex-col items-center justify-center" to="/cart">
                    <CiPhone className="text-4xl text-accent" />
                    <span className="text-accent text-sm">Contact</span>
                </Link>

                <Link className="h-full aspect-square flex flex-col items-center justify-center" to="/cart">
                    <CiShoppingCart className="text-4xl text-accent" />
                    <span className="text-accent text-sm">Cart</span>
                </Link>
                <UserData />

            </div>


        </>
    );
}
