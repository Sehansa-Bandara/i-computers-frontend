import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../lib/api";
import { useGoogleLogin } from "@react-oauth/google";
import UserContext from "../context/user";

export default function LoginPage() {

    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const [password, setPassword] = useState("");
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            api.post("/users/google", {
                accessToken: response.access_token
            }).then(
                (res) => {
                    toast.success("Login successful");
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("isAdmin", res.data.isAdmin);

                    if (res.data.user && userContext?.setUser) {
                        userContext.setUser(res.data.user);
                    }

                    const destination = location.state?.from || (res.data.isAdmin ? "/admin" : "/");
                    navigate(destination, { replace: true });
                }
            ).catch(
                (err) => {
                    console.error(err);
                    const errorMessage = err.response?.data?.message || "Google login failed";
                    toast.error(errorMessage);
                }
            );
        },
        onError: (error) => {
            console.error(error);
            toast.error("Google login failed");
        }
    });

    function handleLogin() {
        if (!email.trim() || !password) {
            toast.error("Please enter your email and password");
            return;
        }

        api.post("/users/login", {
            email: email.trim().toLowerCase(),
            password: password
        })
            .then((res) => {
                toast.success(`Welcome back, ${res.data.user?.firstName || "User"}!`);

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isAdmin", res.data.isAdmin);

                if (res.data.user && userContext?.setUser) {
                    userContext.setUser(res.data.user);
                }

                const destination = location.state?.from || (res.data.isAdmin ? "/admin" : "/");
                navigate(destination, { replace: true });
            })
            .catch((err) => {
                console.error(err);
                const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
                toast.error(msg);
            });
    }

    return (
        <div className="w-full min-h-screen bg-[url('/images/bglogin.jpg')] bg-cover bg-center bg-no-repeat relative flex justify-center items-center p-4 py-8">
            {/* Crystal clear background with no blur filters */}
            <div className="w-full max-w-[450px] backdrop-blur-md bg-black/60 shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col items-center border border-white/20 relative z-10">

                <img src="/logo.png" className="w-[100px] h-[100px] object-cover bg-accent-color rounded-lg" />

                <h1 className="text-3xl font-bold text-white mt-5">Login</h1>

                {location.state?.message && (
                    <div className="w-full mt-4 p-3 bg-cyan-950/80 border border-cyan-400/60 rounded-xl text-cyan-200 text-xs font-semibold text-center backdrop-blur-sm shadow-md">
                        🔒 {location.state.message}
                    </div>
                )}

                <label className="w-full mt-5 text-sm font-bold text-white uppercase tracking-wider">Email Address</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full h-[44px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                    placeholder="user@example.com"
                />

                <label className="w-full mt-4 text-sm font-bold text-white uppercase tracking-wider">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full h-[44px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                    placeholder="••••••••"
                />

                <p className="w-full text-right mt-2.5 text-xs text-white">
                    Forgot password? <Link to="/reset-password" className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline">Reset here</Link>
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full h-[44px] bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl mt-5 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-98 cursor-pointer"
                >
                    Login
                </button>

                <p className="w-full text-center mt-3.5 text-xs text-white">
                    Don't have an account? <Link to="/register" state={{ from: location.state?.from }} className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline">Sign up</Link>
                </p>

                <button
                    onClick={() => googleLogin()}
                    className="w-full h-[44px] bg-slate-900/90 hover:bg-slate-800 text-white rounded-xl mt-4 border border-slate-700 transition duration-300 flex items-center justify-center gap-2.5 font-semibold text-sm cursor-pointer shadow-md"
                >
                    <FcGoogle className="text-lg" />
                    <span>Login with Google</span>
                </button>

            </div>
        </div>
    );
}