import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../lib/api";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const navigate = useNavigate();

    function handleLogin() {
        api.post("/users/login", {
            email: email,
            password: password
        })
            .then((res) => {
                console.log(res.data);
                toast.success("Login successful");
                console.log(res.data.token);
                console.log(res.data.isAdmin);

                // browser local storage to store the token and isAdmin
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isAdmin", res.data.isAdmin);

                if (res.data.isAdmin) {
                    // redirect to admin dashboard
                    navigate("/admin", { replace: true });
                } else {
                    // redirect to home page
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Login failed");
            });
    }

    return (
        <div className="w-full h-full bg-[url('/bg5.jpg')] bg-cover bg-center flex justify-center items-center">
            <div className="w-[450px] h-[580px] backdrop-blur-md shadow-2xl rounded-lg p-6 flex flex-col items-center">

                <img src="/logo.png" className="w-[100px] h-[100px] object-cover bg-accent-color rounded-lg" />

                <h1 className="text-3xl font-bold text-white mt-5">Login</h1>


                <label className="w-full mt-5 text-lg text-secondary-color font-semibold">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                    placeholder="user@gmail.com"
                />


                <label className="w-full mt-5 text-lg text-secondary-color font-semibold">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                    placeholder="••••••••"
                />

                <p className="w-full text-right mt-2 text-accent-color cursor-pointer">
                    Forgot password? reset <Link to="/reset-password" className="text-accent-color font-bold hover:underline">here</Link>
                </p>

                <button onClick={handleLogin} className="w-full h-[40px] bg-accent-color text-white rounded-lg mt-5 hover:bg-accent-color/90 transition duration-300">
                    Login
                </button>

                <p className="w-full text-right mt-2 text-accent-color cursor-pointer">
                    Dont have an account? register here <Link to="/register" className="text-accent-color font-bold hover:underline">Sign up</Link>
                </p>


                <button onClick={() => googleLogin()} className="w-full h-[40px] bg-gray-800 text-white rounded-lg mt-5 hover:bg-gray-700 transition duration-300 flex items-center justify-center gap-2">
                    Login with Google <FcGoogle />
                </button>

            </div>
        </div>
    );
}