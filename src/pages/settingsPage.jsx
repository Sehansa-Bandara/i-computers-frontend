import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiCamera, FiMail, FiCheck, FiShield, FiCheckCircle } from "react-icons/fi";
import UserContext from "../context/user";
import uploadMedia from "../lib/uploadMedia";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(userInfo.user?.firstName || userInfo.user?.firstname || "");
    const [lastName, setLastName] = useState(userInfo.user?.lastName || userInfo.user?.lastname || "");
    const [image, setImage] = useState(null);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Auth guard & User data synchronization
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to access account settings");
            navigate("/login", { replace: true });
            return;
        }

        if (userInfo.user) {
            setFirstName(userInfo.user.firstName || userInfo.user.firstname || "");
            setLastName(userInfo.user.lastName || userInfo.user.lastname || "");
        }
    }, [userInfo.user, navigate]);

    // Dynamic avatar preview URL
    const avatarUrl = image 
        ? URL.createObjectURL(image) 
        : (userInfo.user?.image && userInfo.user.image !== "/images/default-profile.png"
            ? userInfo.user.image
            : "/userGirl.jpg");

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    async function handleProfileUpdate() {
        const token = localStorage.getItem("token");

        if (token != null) {
            try {
                setIsLoading(true);

                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    image: userInfo.user?.image
                };

                if (image != null) {
                    data.image = await uploadMedia(image);
                }

                await api.put("/users/update", data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (userInfo.setUser && userInfo.user) {
                    userInfo.setUser({
                        ...userInfo.user,
                        firstName: firstName,
                        lastName: lastName,
                        image: data.image
                    });
                }

                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 800);

            } catch (err) {
                console.log(err);
                toast.error("Failed to update profile");
                setIsLoading(false);
            }
        }
    }

    async function handlePasswordUpdate() {
        const token = localStorage.getItem("token");

        if (token != null) {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            try {
                setIsLoading(true);

                const data = {
                    password: password
                };

                await api.put("/users/password", data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                localStorage.removeItem("token");
                userInfo.setUser(null);
                toast.success("Password updated successfully. Please login again.");

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);

            } catch (err) {
                console.log(err);
                toast.error("Failed to update password");
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="min-h-[calc(100vh-100px)] w-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-10 px-4 md:px-8 flex flex-col items-center">
            {/* Header Section with User Profile Banner */}
            <div className="w-full max-w-5xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-md">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                        <FiShield className="text-accent" />
                        Account &amp; Profile Settings
                    </h1>
                    <p className="text-slate-500 mt-1.5 text-sm sm:text-base">
                        Signed in as <span className="font-bold text-blue-700">{firstName ? `${firstName} ${lastName}`.trim() : (userInfo.user?.email || "Valued User")}</span>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        <FiCheckCircle className="text-emerald-500" />
                        {userInfo.user?.isAdmin ? "Administrator" : "Active Member"}
                    </span>
                    {userInfo.user?.email && (
                        <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                            {userInfo.user.email}
                        </span>
                    )}
                </div>
            </div>

            {/* Grid Layout */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Profile Card */}
                <div className="bg-white border border-slate-200/60 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl hover:border-accent/10 transition-all duration-300 relative group">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                            <FiUser className="text-accent" />
                            Profile Settings
                        </h2>
                        
                        {/* Profile Picture Uploader */}
                        <div className="flex flex-col items-center mb-8">
                            <div 
                                onClick={triggerFileInput}
                                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer group/avatar transition-transform duration-300 hover:scale-105"
                            >
                                <img 
                                    src={avatarUrl} 
                                    referrerPolicy="no-referrer"
                                    alt="Profile Avatar" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200">
                                    <FiCamera className="text-2xl mb-1" />
                                    <span className="text-xs font-medium">Upload Photo</span>
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={triggerFileInput}
                                className="mt-3 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                            >
                                Change Profile Picture
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={(e) => setImage(e.target.files[0])}
                                className="hidden" 
                                accept="image/*"
                            />
                        </div>

                        {/* Inputs */}
                        <div className="space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700">First Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors group-focus-within:text-accent" />
                                    <input 
                                        type="text" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        placeholder="First Name"
                                        className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 text-slate-800 outline-none text-base font-medium" 
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700">Last Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors" />
                                    <input 
                                        type="text" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        placeholder="Last Name"
                                        className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 text-slate-800 outline-none text-base font-medium" 
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 opacity-70">
                                <label className="text-sm font-semibold text-slate-700">Email Address (Read-only)</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                                    <input 
                                        type="email" 
                                        value={userInfo.user?.email || "user@example.com"} 
                                        disabled 
                                        className="w-full h-12 pl-11 pr-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 outline-none text-base cursor-not-allowed font-medium" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button 
                            className="w-full py-3.5 bg-gradient-to-r from-accent to-blue-900 text-white font-semibold rounded-xl hover:from-accent-dark hover:to-blue-950 shadow-md hover:shadow-accent/10 hover:scale-[1.01] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-medium" 
                            onClick={handleProfileUpdate}
                        >
                            <FiCheck className="text-lg" />
                            Save Profile Changes
                        </button>
                    </div>
                </div>

                {/* Password Card */}
                <div className="bg-white border border-slate-200/60 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col hover:shadow-2xl hover:border-accent/10 transition-all duration-300 relative group justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                            <FiLock className="text-accent" />
                            Security Settings
                        </h2>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700">New Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors" />
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="••••••••"
                                        className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 text-slate-800 outline-none text-base" 
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors" />
                                    <input 
                                        type="password" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        placeholder="••••••••"
                                        className="w-full h-12 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200 text-slate-800 outline-none text-base" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0">
                        <button 
                            className="w-full py-3.5 bg-gradient-to-r from-accent to-blue-900 text-white font-semibold rounded-xl hover:from-accent-dark hover:to-blue-950 shadow-md hover:shadow-accent/10 hover:scale-[1.01] active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-medium" 
                            onClick={handlePasswordUpdate}
                        >
                            <FiLock className="text-lg" />
                            Update Password
                        </button>
                    </div>
                </div>

            </div>

            {isLoading && <LoadingAnimation />}
        </div>
    );
}