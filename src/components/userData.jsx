import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import toast from "react-hot-toast";
import UserContext from "../context/user";
import { CiUser } from "react-icons/ci";

export default function UserData() {

    const userData = useContext(UserContext)

    console.log(userData)

    const [selectedOption, setSelectedOption] = useState("name");
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 1024 : false
    );
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const firstName = userData?.user?.firstName || "User";
    const fullName = userData?.user
        ? `${userData.user.firstName || ""} ${userData.user.lastName || ""}`.trim() || "User"
        : "";

    const displayName = isMobile ? firstName : fullName;

    const avatarUrl =
        userData?.user?.image ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName || "User")}`;

    return (
        <>
            {userData?.user == null ? (
                <>
                    <div className="text-white p-2 hidden lg:block text-base">
                        <Link to="/login" className="hover:underline">Login</Link>
                        {" | "}
                        <Link to="/register" className="hover:underline">Register</Link>
                    </div>
                    <Link className="h-full aspect-square flex flex-col items-center justify-center lg:hidden" to="/login">
                        <CiUser className="text-4xl text-accent" />
                        <span className="text-accent text-sm">Login</span>
                    </Link>
                </>
            ) : (
                <div className="h-full aspect-square flex flex-col justify-center items-center lg:h-auto lg:w-auto lg:flex-row lg:gap-3">
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-[34px] h-[34px] lg:w-[42px] lg:h-[42px] rounded-full border-2 border-accent lg:border-white object-cover"
                    />
                    <select
                        value={selectedOption}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "settings") {
                                navigate("/settings");
                            } else if (val === "my-orders") {
                                navigate("/my-orders");
                            } else if (val === "logout") {
                                localStorage.removeItem("token");
                                userData.setUser(null);
                                navigate("/login");
                            }
                            setSelectedOption("name");
                        }}
                        className="bg-transparent text-accent lg:text-white font-medium text-xs lg:text-lg cursor-pointer outline-none border-none py-0.5 text-center lg:text-left max-w-[75px] lg:max-w-none appearance-auto"
                    >
                        <option value="name" className="bg-[#000080] text-white">
                            {displayName}
                        </option>
                        <option value="settings" className="bg-[#000080] text-white">
                            Settings
                        </option>
                        <option value="my-orders" className="bg-[#000080] text-white">
                            My Orders
                        </option>
                        <option value="logout" className="bg-[#000080] text-white">
                            Logout
                        </option>
                    </select>
                </div>
            )}
        </>
    );
}