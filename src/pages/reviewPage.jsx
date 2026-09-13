import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    FaStar,
    FaRegStar,
    FaQuoteLeft,
    FaCheckCircle,
    FaRegSmile,
    FaRegMeh,
    FaRegFrown,
    FaRegGrinStars,
    FaRegSmileBeam,
} from "react-icons/fa";
import {
    HiOutlineChatBubbleBottomCenterText,
    HiOutlinePaperAirplane,
    HiOutlineSparkles,
    HiOutlineUser,
    HiOutlineEnvelope,
    HiOutlineShieldCheck,
    HiOutlineBuildingStorefront,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import api from "../lib/api";
import UserContext from "../context/user";

export default function ReviewPage() {
    const userData = useContext(UserContext);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const preselectedProductId = searchParams.get("productId") || "";

    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [ratingFilter, setRatingFilter] = useState(0);

    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [productId, setProductId] = useState(preselectedProductId);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (userData?.user) {
            const userFullName = `${userData.user.firstName || ""} ${userData.user.lastName || ""}`.trim() || userData.user.name || "";
            if (userFullName && !name) setName(userFullName);
            if (userData.user.email && !email) setEmail(userData.user.email);
        }
    }, [userData]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await api.get("/reviews");
            setReviews(res.data || []);
        } catch (err) {
            console.error("Failed to load reviews:", err);
            toast.error("Could not load reviews.");
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data || []);
        } catch (err) {
            console.error("Failed to fetch products list:", err);
        }
    };

    useEffect(() => {
        fetchReviews();
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (!rating || rating < 1 || rating > 5) {
            toast.error("Please select a star rating between 1 and 5.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please enter your review comment.");
            return;
        }

        if (comment.trim().length < 10) {
            toast.error("Please write a comment with at least 10 characters.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                name: name.trim(),
                email: email.trim() || undefined,
                rating: Number(rating),
                comment: comment.trim(),
                productId: productId || undefined,
            };

            const response = await api.post("/reviews", payload);

            toast.success("Thank you! Your review has been submitted successfully.");

            setComment("");
            setRating(5);
            setHoverRating(0);
            if (!userData?.user) {
                setName("");
                setEmail("");
            }
            setProductId("");

            if (response.data?.review) {
                setReviews((prev) => [response.data.review, ...prev]);
            } else {
                fetchReviews();
            }

            const reviewListEl = document.getElementById("reviews-feed");
            if (reviewListEl) {
                reviewListEl.scrollIntoView({ behavior: "smooth" });
            }
        } catch (err) {
            console.error("Failed to submit review:", err);
            const errMsg = err.response?.data?.message || "Failed to submit review. Please try again.";
            toast.error(errMsg);
        } finally {
            setSubmitting(false);
        }
    };

    const getRatingLabel = (stars) => {
        switch (stars) {
            case 5:
                return { text: "Excellent! 5/5", icon: FaRegGrinStars, color: "text-amber-500", bg: "bg-amber-50 border-amber-200" };
            case 4:
                return { text: "Very Good! 4/5", icon: FaRegSmileBeam, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200" };
            case 3:
                return { text: "Average / Good 3/5", icon: FaRegSmile, color: "text-sky-500", bg: "bg-sky-50 border-sky-200" };
            case 2:
                return { text: "Fair 2/5", icon: FaRegMeh, color: "text-orange-500", bg: "bg-orange-50 border-orange-200" };
            case 1:
                return { text: "Poor 1/5", icon: FaRegFrown, color: "text-rose-500", bg: "bg-rose-50 border-rose-200" };
            default:
                return { text: "Select Rating", icon: FaStar, color: "text-slate-400", bg: "bg-slate-50 border-slate-200" };
        }
    };

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / totalReviews).toFixed(1)
        : "5.0";

    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
        const star = Math.round(Number(r.rating)) || 5;
        if (ratingCounts[star] !== undefined) ratingCounts[star]++;
    });

    const filteredReviews = ratingFilter === 0
        ? reviews
        : reviews.filter((r) => Math.round(Number(r.rating)) === ratingFilter);

    const activeRatingDisplay = hoverRating || rating;
    const currentRatingInfo = getRatingLabel(activeRatingDisplay);
    const RatingIcon = currentRatingInfo.icon;

    return (
        <div className="w-full min-h-screen bg-[#f0f7ff] text-slate-800 pb-20">

            <section className="relative w-full border-b border-sky-100 py-16 lg:py-20 px-6 lg:px-12 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/images/background1.jpg"
                        alt="i-Computers"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-slate-900/80 to-[#f0f7ff]" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-blue-900 border border-white/60 shadow-md backdrop-blur-md mb-4">
                        <HiOutlineSparkles className="text-amber-500 text-sm" />
                        <span>Customer Experience &amp; Reviews</span>
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                        What Our Customers <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-200">Say About Us</span>
                    </h1>

                    <p className="mt-3 text-base sm:text-lg text-sky-100/90 max-w-2xl mx-auto leading-relaxed">
                        Read verified experiences from gamers, creators, and professionals who trust i-Computers for their custom PC builds, laptops, and original components.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#review-form-section"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/30 hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
                        >
                            <HiOutlineChatBubbleBottomCenterText className="text-lg" />
                            <span>Write a Review</span>
                        </a>

                        <a
                            href="#reviews-feed"
                            className="px-6 py-3 rounded-xl bg-white/90 text-slate-800 font-semibold text-sm border border-white hover:bg-white transition-all duration-200 shadow-md flex items-center gap-2"
                        >
                            <span>Read All Reviews ({totalReviews})</span>
                        </a>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">

                <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        
                        <div className="md:col-span-4 text-center md:border-r border-sky-100 md:pr-6">
                            <div className="inline-flex items-baseline gap-1">
                                <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                                    {averageRating}
                                </span>
                                <span className="text-lg font-bold text-slate-400">/ 5.0</span>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xl my-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <FaStar
                                        key={s}
                                        className={
                                            s <= Math.round(Number(averageRating))
                                                ? "text-amber-400 drop-shadow-xs"
                                                : "text-slate-200"
                                        }
                                    />
                                ))}
                            </div>

                            <p className="text-xs font-semibold text-slate-500">
                                Based on <span className="font-bold text-slate-800">{totalReviews}</span> verified customer reviews
                            </p>

                            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                                <HiOutlineShieldCheck className="text-base" />
                                <span>100% Genuine Distributor Warranty</span>
                            </div>
                        </div>

                        <div className="md:col-span-8 space-y-2.5">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ratingCounts[star] || 0;
                                const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : (star === 5 ? 100 : 0);
                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                                        className={`w-full flex items-center gap-3 text-xs font-medium group text-left p-1 rounded-lg transition-colors ${
                                            ratingFilter === star ? "bg-sky-50" : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <span className="w-14 font-semibold text-slate-700 flex items-center gap-1">
                                            <span>{star}</span>
                                            <FaStar className="text-amber-400 text-xs" />
                                        </span>
                                        <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden relative">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${
                                                    star >= 4
                                                        ? "bg-gradient-to-r from-blue-600 to-sky-400"
                                                        : star === 3
                                                        ? "bg-amber-400"
                                                        : "bg-rose-400"
                                                }`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <span className="w-10 text-right text-slate-500 text-xs font-semibold">
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Submit Review Section Form */}
                <div id="review-form-section" className="scroll-mt-28">
                    <div className="bg-white rounded-3xl border border-sky-200/80 shadow-md p-6 sm:p-10 relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="max-w-3xl mx-auto relative z-10">
                            <div className="text-center mb-8">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 mb-2">
                                    <HiOutlineChatBubbleBottomCenterText className="text-sm text-sky-600" />
                                    <span>Your Feedback Matters</span>
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                    Submit Your Customer Review
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                                    Used a product or service from i-Computers? Tell us how your experience was!
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                <div className="bg-gradient-to-b from-sky-50/50 to-white rounded-2xl border border-sky-100 p-5 sm:p-6 text-center shadow-xs">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                        Select Your Star Rating <span className="text-red-500">*</span>
                                    </label>

                                    <div className="flex items-center justify-center gap-2 sm:gap-3 my-3">
                                        {[1, 2, 3, 4, 5].map((starValue) => {
                                            const isFilled = (hoverRating || rating) >= starValue;
                                            return (
                                                <button
                                                    key={starValue}
                                                    type="button"
                                                    onClick={() => setRating(starValue)}
                                                    onMouseEnter={() => setHoverRating(starValue)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    className="p-2 sm:p-2.5 rounded-2xl transition-all duration-150 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-sky-300"
                                                    aria-label={`Rate ${starValue} stars`}
                                                >
                                                    {isFilled ? (
                                                        <FaStar className="text-3xl sm:text-4xl text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)] transition-colors" />
                                                    ) : (
                                                        <FaRegStar className="text-3xl sm:text-4xl text-slate-300 hover:text-amber-300 transition-colors" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 mt-1 shadow-2xs"
                                        style={{ backgroundColor: "white" }}
                                    >
                                        <RatingIcon className={`text-base ${currentRatingInfo.color}`} />
                                        <span className={currentRatingInfo.color}>{currentRatingInfo.text}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Your Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <HiOutlineUser className="text-lg" />
                                            </div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Kasun Jayawardena"
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Email Address <span className="text-xs font-normal text-slate-400">(Optional)</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                                <HiOutlineEnvelope className="text-lg" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="kasun@example.com"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        What did you purchase / use? <span className="text-xs font-normal text-slate-400">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <HiOutlineBuildingStorefront className="text-lg" />
                                        </div>
                                        <select
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
                                        >
                                            <option value="">General Store Experience &amp; Service</option>
                                            {products.map((prod) => (
                                                <option key={prod._id || prod.productId} value={prod._id}>
                                                    Product: {prod.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Comment Textarea */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-bold text-slate-700">
                                            Your Review / Feedback <span className="text-red-500">*</span>
                                        </label>
                                        <span className="text-[11px] font-semibold text-slate-400">
                                            {comment.length} characters
                                        </span>
                                    </div>
                                    <textarea
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us about the build quality, delivery speed, product condition, and customer care you received..."
                                        required
                                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-sky-100 transition-all resize-none leading-relaxed font-medium"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-sm shadow-md shadow-sky-500/25 hover:shadow-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Saving Review to Database...</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlinePaperAirplane className="text-lg" />
                                            <span>Submit Review</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews Feed / List */}
                <div id="reviews-feed" className="space-y-6 scroll-mt-24">
                    
                    {/* Filter Tabs Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-sky-100">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                Customer Testimonials
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Showing {filteredReviews.length} of {totalReviews} total reviews
                            </p>
                        </div>

                        {/* Star Rating Filter Pills */}
                        <div className="flex flex-wrap items-center gap-1.5">
                            <button
                                onClick={() => setRatingFilter(0)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    ratingFilter === 0
                                        ? "bg-blue-600 text-white shadow-xs"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                All ({totalReviews})
                            </button>
                            {[5, 4, 3, 2, 1].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setRatingFilter(s)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                        ratingFilter === s
                                            ? "bg-blue-600 text-white shadow-xs"
                                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                    }`}
                                >
                                    <span>{s}</span>
                                    <FaStar className="text-amber-400 text-[10px]" />
                                    <span>({ratingCounts[s] || 0})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="py-16 text-center">
                            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-sm font-semibold text-slate-500">Loading verified reviews...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredReviews.length === 0 && (
                        <div className="bg-white rounded-3xl border border-dashed border-sky-200 p-12 text-center max-w-lg mx-auto">
                            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-blue-600 flex items-center justify-center text-3xl mx-auto mb-4">
                                <FaStar className="text-amber-400" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800">
                                {ratingFilter === 0 ? "No Reviews Yet" : `No ${ratingFilter}-Star Reviews`}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                                {ratingFilter === 0
                                    ? "Be the first customer to share your experience with i-Computers! Fill out the form above to submit your review."
                                    : `There are currently no ${ratingFilter}-star reviews. Try viewing all reviews or submit a new one!`}
                            </p>
                            <a
                                href="#review-form-section"
                                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
                            >
                                <HiOutlineChatBubbleBottomCenterText className="text-base" />
                                <span>Write the First Review</span>
                            </a>
                        </div>
                    )}

                    {/* Review Cards Grid */}
                    {!loading && filteredReviews.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredReviews.map((rev, idx) => {
                                const reviewRating = Number(rev.rating) || 5;
                                const initial = (rev.name || "C").charAt(0).toUpperCase();
                                const reviewDate = rev.createdAt
                                    ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      })
                                    : "Recently";

                                return (
                                    <div
                                        key={rev._id || idx}
                                        className="bg-white rounded-2xl border border-sky-100/90 p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* Top Row: User Avatar, Name, Rating */}
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 text-white font-black text-lg flex items-center justify-center shadow-xs">
                                                        {initial}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <h4 className="font-extrabold text-slate-900 text-sm">
                                                                {rev.name}
                                                            </h4>
                                                            <span title="Verified Customer" className="text-blue-600">
                                                                <FaCheckCircle className="text-xs" />
                                                            </span>
                                                        </div>
                                                        <span className="text-[11px] font-medium text-slate-400">
                                                            {reviewDate}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Golden Stars */}
                                                <div className="flex items-center gap-1 text-amber-400 text-sm">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <FaStar
                                                            key={s}
                                                            className={
                                                                s <= reviewRating
                                                                    ? "text-amber-400"
                                                                    : "text-slate-200"
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Optional Product Tag */}
                                            {rev.productId && (
                                                <div className="mb-3">
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                                                        <span>Product:</span>
                                                        <span className="truncate max-w-[200px]">
                                                            {rev.productId.name || "Custom PC Component"}
                                                        </span>
                                                    </span>
                                                </div>
                                            )}

                                            {/* Review Comment */}
                                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                                                &ldquo;{rev.comment}&rdquo;
                                            </p>
                                        </div>

                                        {/* Bottom Verified Badge */}
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                                            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                                                <FaCheckCircle className="text-[10px]" />
                                                <span>Verified Customer Review</span>
                                            </span>
                                            <span className="text-slate-300 font-mono">
                                                ★ {reviewRating}.0
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
