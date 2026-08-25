import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import UserContext from "../context/user";


export default function UserData() {

    const userData = useContext(UserContext);

    
    const [selectedOption, setSelectedOption] = useState("name")
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {

                userData.setUser(res.data.user);

            }).catch((err) => {
                toast.error("please login again");
                localStorage.removeItem("token");
                userData.setUser(null);
            });
        }
    }, []);

    const screenWidth = window.innerWidth;

    return (
        <>
            {userData.user == null ? (
                <div className="text-white p-2 hidden lg:block">
                    <Link to="/login"> Login </Link>
                    |                  |
                    <Link to="/register"> Register</Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row h-full w-[80px] lg:w-auto lg:h-auto lg:gap-2 justify-center items-center">
                    <img src={userData.user.image} alt="Avatar" className="w-[40px] h-[40px] rounded-full border border-white lg:p-2" />
                    <select
                        value="name"
                        onChange={(e) => {
                            if (e.target.value === "settings") {
                                navigate("/settings");
                            } else if (e.target.value === "my-orders") {
                                navigate("/my-orders");
                            } else if (e.target.value === "logout") {
                                localStorage.removeItem("token");
                                userData.setUser(null);
                                navigate("/login");
                            }
                        }}
                        className="lg:bg-accent text-accent lg:text-white lg:p-2 rounded text-right max-w-[80px]"
                    >
                        <option value="name">
                            {screenWidth < 1024 ? userData.user.firstName : userData.user.firstName + " " + userData.user.lastName}
                        </option>
                        <option value="settings">Settings</option>
                        <option value="my-orders">My Orders</option>
                        <option value="logout">Logout</option>
                    </select>
                </div>
            )}
        </>
    );
}