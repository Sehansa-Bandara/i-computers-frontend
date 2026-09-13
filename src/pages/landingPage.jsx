import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTruck, FiCpu, FiStar } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function LandingPage() {
    return (
        <div className="w-full min-h-[calc(100dvh-72px-75px)] lg:min-h-[calc(100vh-90px)] bg-[#070b19] flex flex-col justify-center items-center relative overflow-hidden py-8 sm:py-14 px-4 sm:px-6">
            {/* Background Video with playsInline for mobile iOS/Android support */}
            <video
                src="/720p3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover absolute inset-0 z-0 opacity-45 sm:opacity-50 pointer-events-none"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="w-full h-full absolute inset-0 z-10 bg-gradient-to-b from-[#070b19]/80 via-black/45 to-[#070b19]/95 pointer-events-none" />

            {/* Glowing Accent Spheres */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 sm:w-[480px] h-72 sm:h-[480px] bg-cyan-500/20 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none z-10" />
            <div className="absolute -bottom-20 right-4 w-60 sm:w-80 h-60 sm:h-80 bg-blue-600/20 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-10" />

            {/* Hero Main Content */}
            <div className="relative z-20 w-full max-w-4xl flex flex-col items-center text-center space-y-4 sm:space-y-6 my-auto">
                {/* Store Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md animate-pulse">
                    <HiOutlineSparkles className="text-cyan-400 text-sm" />
                    <span>Sri Lanka's Premier PC Hardware Store</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-black tracking-tight leading-tight sm:leading-[1.15] max-w-3xl">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                        i-Computers
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-base md:text-xl text-slate-200 font-normal max-w-lg sm:max-w-2xl px-2 leading-relaxed">
                    Your one-stop shop for genuine computer parts, gaming rigs, monitors, and laptops with official agent warranty across Sri Lanka.
                </p>

                {/* CTA Action Buttons */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <Link
                        to="/products"
                        className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 active:scale-95 group text-center cursor-pointer"
                    >
                        <span>Shop Hardware</span>
                        <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to="/reviews"
                        className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer"
                    >
                        <FiStar className="text-amber-400 text-base" />
                        <span>Customer Reviews</span>
                    </Link>
                </div>

                {/* Mobile Responsive Value-Props Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 w-full pt-5 sm:pt-8">
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 text-center sm:text-left backdrop-blur-xs transition-all">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm sm:text-base">
                            <FiShield />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Agent Warranty</h4>
                            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">100% Genuine SL</p>
                        </div>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 text-center sm:text-left backdrop-blur-xs transition-all">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-sm sm:text-base">
                            <FiTruck />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Fast Delivery</h4>
                            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">Island-wide 2-3 Days</p>
                        </div>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 text-center sm:text-left backdrop-blur-xs transition-all">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 text-sm sm:text-base">
                            <FiCpu />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Custom Builds</h4>
                            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">Gaming &amp; Workstation</p>
                        </div>
                    </div>

                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 text-center sm:text-left backdrop-blur-xs transition-all">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-sm sm:text-base">
                            <FiStar />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Top Rated</h4>
                            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">Verified Feedback</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}