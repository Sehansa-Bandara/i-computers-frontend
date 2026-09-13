import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../lib/api";
import UserContext from "../context/user";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleRegister() {
        if (!firstName.trim()) {
            toast.error("Please enter your first name");
            return;
        }
        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }
        if (!password) {
            toast.error("Please enter a password");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsSubmitting(true);

        api.post("/users/register", {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            confirmPassword: confirmPassword,
        })
            .then((res) => {
                setIsSubmitting(false);
                toast.success(`Welcome, ${res.data.user?.firstName || firstName.trim()}! Account created successfully.`);

                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("isAdmin", res.data.isAdmin);

                    if (res.data.user && userContext?.setUser) {
                        userContext.setUser(res.data.user);
                    }

                    const destination = location.state?.from || (res.data.isAdmin ? "/admin" : "/");
                    navigate(destination, { replace: true });
                } else {
                    navigate("/login", { replace: true });
                }
            })
            .catch((err) => {
                setIsSubmitting(false);
                console.error(err);
                const message = err?.response?.data?.message || "Registration failed. Please try again.";
                toast.error(message);

                // If already registered, assist the user to log in
                if (message.toLowerCase().includes("already registered") || message.toLowerCase().includes("exists")) {
                    setTimeout(() => {
                        navigate("/login", { state: { email: email.trim() } });
                    }, 1200);
                }
            });
    }

    return (
        <div className="w-full min-h-screen bg-[url('/bgReg2.jpg')] bg-cover bg-center flex justify-center items-center p-4 py-8">
            <div className="w-full max-w-[450px] backdrop-blur-md bg-black/40 shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col items-center border border-white/20">

                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[100px] h-[100px] object-cover bg-accent-color rounded-lg"
                />

                <h1 className="text-3xl font-bold text-white mt-5">
                    Register
                </h1>

                <div className="w-full flex flex-row gap-3">

                    <div className="w-1/2 flex flex-col">
                        <label className="w-full mt-4 text-sm sm:text-base text-white font-semibold">
                            First Name
                        </label>

                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            className="w-full h-[42px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                            placeholder="John"
                        />
                    </div>

                    <div className="w-1/2 flex flex-col">
                        <label className="w-full mt-4 text-sm sm:text-base text-white font-semibold">
                            Last Name
                        </label>

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            className="w-full h-[42px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <label className="w-full mt-4 text-sm sm:text-base text-white font-semibold">
                    Email Address
                </label>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full h-[42px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                    placeholder="user@gmail.com"
                />

                <label className="w-full mt-4 text-sm sm:text-base text-white font-semibold">
                    Password
                </label>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full h-[42px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                    placeholder="••••••••"
                />

                <label className="w-full mt-4 text-sm sm:text-base text-white font-semibold">
                    Confirm Password
                </label>

                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="w-full h-[42px] mt-1.5 rounded-xl outline-none border border-slate-600 focus:border-cyan-400 bg-slate-950/70 focus:bg-slate-950 placeholder:text-slate-400 px-3.5 text-white font-medium transition-all"
                    placeholder="••••••••"
                />

                <button
                    onClick={handleRegister}
                    disabled={isSubmitting}
                    className="w-full h-[44px] bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl mt-5 shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-98 cursor-pointer disabled:opacity-60"
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p className="w-full text-center mt-3 text-sm text-white">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                <button className="w-full h-[44px] bg-slate-900/90 hover:bg-slate-800 text-white rounded-xl mt-4 border border-slate-700 transition duration-300 flex items-center justify-center gap-2.5 font-semibold text-sm cursor-pointer shadow-md">
                    <FcGoogle className="text-lg" />
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
}