import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        api.post("/users/register", {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        })
            .then((res) => {
                console.log(res.data);

                toast.success("Registration successful");

                localStorage.setItem("token", res.data.token);

                if (res.data.isAdmin !== undefined) {
                    localStorage.setItem(
                        "isAdmin",
                        JSON.stringify(res.data.isAdmin)
                    );
                }

                if (res.data.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error(err);

                toast.error(
                    err?.response?.data?.message || "Registration failed"
                );
            });
    }

    return (
        <div className="w-full h-full bg-[url('/bgReg2.jpg')] bg-cover bg-center flex justify-center items-center">
            <div className="w-[450px] backdrop-blur-md shadow-2xl rounded-lg p-6 flex flex-col items-center">

                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[100px] h-[100px] object-cover bg-accent-color rounded-lg"
                />

                <h1 className="text-3xl font-bold text-yellow-950 mt-5">
                    Register
                </h1>

                <div className="w-full flex flex-row gap-3">

                    <div className="w-1/2 flex flex-col">
                        <label className="w-full mt-5 text-lg text-secondary-color font-semibold">
                            First Name
                        </label>

                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                            placeholder="John"
                        />
                    </div>

                    <div className="w-1/2 flex flex-col">
                        <label className="w-full mt-5 text-lg text-secondary-color font-semibold">
                            Last Name
                        </label>

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <label className="w-full mt-5 text-lg text-secondary-color font-semibold">
                    Email
                </label>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                    placeholder="user@gmail.com"
                />

                <label className="w-full mt-5 text-lg text-secondary-color font-semibold">
                    Password
                </label>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                    placeholder="••••••••"
                />

                <label className="w-full mt-5 text-lg text-secondary-color font-semibold">
                    Confirm Password
                </label>

                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color px-3 text-white"
                    placeholder="••••••••"
                />

                <button
                    onClick={handleRegister}
                    className="w-full h-[40px] bg-accent-color text-white rounded-lg mt-5 hover:bg-accent-color/90 transition duration-300"
                >
                    Register
                </button>

                <p className="w-full text-right mt-2 text-white cursor-pointer">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                <button className="w-full h-[40px] bg-gray-800 text-white rounded-lg mt-5 hover:bg-gray-700 transition duration-300 flex items-center justify-center gap-2">
                    <FcGoogle />
                    Login with Google
                </button>
            </div>
        </div>
    );
}