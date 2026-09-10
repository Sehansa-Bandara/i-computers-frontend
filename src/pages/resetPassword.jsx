import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/loadingAnimation";
import toast from "react-hot-toast";
import api from "../lib/api";

export default function ResetPasswordPage() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    async function handleOTPRequest() {
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post("/users/otp", { email: email.trim() });
            setIsOtpSent(true);
            toast.success(res?.data?.message || "OTP sent successfully to your email");
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Failed to send OTP");
        }

        setIsLoading(false);
    }

    async function handlePasswordReset() {
        if (!otp.trim()) {
            toast.error("Please enter the OTP");
            return;
        }
        if (!newPassword) {
            toast.error("Please enter a new password");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post("/users/reset-password", {
                email: email.trim(),
                otp: otp.trim(),
                newPassword: newPassword
            });
            toast.success(res?.data?.message || "Password reset successful");
            navigate("/login");
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Failed to reset password");
        }
        setIsLoading(false);
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-primary">

            {
                isOtpSent ?
                    <div className="w-[420px] py-8 px-6 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
                        <p className="text-sm text-gray-500 text-center">
                            Enter the OTP sent to <span className="font-semibold text-gray-700">{email}</span>
                        </p>
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="otp" className="text-sm font-medium text-gray-700">OTP Code</label>
                            <input
                                type="text"
                                name="otp"
                                id="otp"
                                placeholder="Enter 6-digit OTP"
                                className="w-full h-10 border border-gray-300 rounded-md px-3 outline-none focus:border-accent"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                placeholder="Enter new password"
                                className="w-full h-10 border border-gray-300 rounded-md px-3 outline-none focus:border-accent"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                className="w-full h-10 border border-gray-300 rounded-md px-3 outline-none focus:border-accent"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handlePasswordReset}
                            className="w-full h-10 bg-accent text-white font-medium rounded-md hover:opacity-90 transition duration-200 cursor-pointer mt-2"
                        >
                            Reset Password
                        </button>
                        <div className="flex items-center justify-between w-full text-sm mt-1">
                            <button
                                type="button"
                                onClick={() => setIsOtpSent(false)}
                                className="text-gray-500 hover:text-accent cursor-pointer"
                            >
                                Change Email
                            </button>
                            <Link to="/login" className="text-accent font-medium hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </div> :
                    <div className="w-[420px] py-8 px-6 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
                        <p className="text-sm text-gray-500 text-center">
                            Enter your registered email address to receive a one-time verification code (OTP).
                        </p>
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full h-10 border border-gray-300 rounded-md px-3 outline-none focus:border-accent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full h-10 bg-accent text-white font-medium rounded-md hover:opacity-90 transition duration-200 cursor-pointer mt-2"
                            onClick={handleOTPRequest}
                        >
                            Send OTP
                        </button>
                        <Link to="/login" className="text-sm text-accent font-medium hover:underline mt-1">
                            Back to Login
                        </Link>
                    </div>
            }
            {
                isLoading && <LoadingAnimation />
            }
        </div>
    )
}