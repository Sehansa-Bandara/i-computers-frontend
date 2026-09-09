import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import { getCartTotal, getCart } from "../lib/cart";
import getFormattedPrice from "../lib/price-format";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";



const deliveryCostPerDisctrict = {
    colombo: 500,
    gampaha: 700,
    kalutara: 800,
    other: 1000
};

export default function OrderModal(props) {

    
    const userData = useContext(UserContext);
    const cart = props.cart || getCart();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [firstName, setFirstName] = useState(userData?.user?.firstName || "");
    const [lastName, setLastName] = useState(userData?.user?.lastName || "");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [district, setDistrict] = useState("colombo");
    const [diliveryFee, setDiliveryFee] = useState(deliveryCostPerDisctrict["colombo"]);
    const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("");
    const [specialNotes, setSpecialNotes] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userData?.user) {
            if (!firstName && userData.user.firstName) {
                setFirstName(userData.user.firstName);
            }
            if (!lastName && userData.user.lastName) {
                setLastName(userData.user.lastName);
            }
        }
    }, [userData]);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    async function handleConfirmOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place an order");
            navigate("/login");
            return;
        }

        if (!firstName.trim()) {
            toast.error("Please enter your first name");
            return;
        }
        if (!addressLine1.trim()) {
            toast.error("Please enter your address");
            return;
        }
        if (!city.trim()) {
            toast.error("Please enter your city");
            return;
        }
        if (!district.trim()) {
            toast.error("Please enter your district");
            return;
        }
        if (!phoneNumber.trim()) {
            toast.error("Please enter your phone number");
            return;
        }

        const orderData = {
            firstName: firstName,
            lastName: lastName,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            postalCode: postalCode,
            district: district,
            diliveryFee: diliveryFee,
            phone: phoneNumber,
            secondaryPhone: secondaryPhoneNumber,
            customerNotes: specialNotes,
            items: []
        };

        for (let i = 0; i < props.cart.length; i++) {
            orderData.items.push({
                productId: props.cart[i].product.productId,
                qty: props.cart[i].qty
            });
        }

        try {
            await api.post("/orders", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Order placed successfully");
            setModalIsOpen(false);
            navigate("/products");
        } catch (err) {
            console.log(err);
            toast.error("Failed to place order");
        }
    }
    

    return (
        <>
            <button
                onClick={openModal}
                className="bg-accent-blue/80 hover:bg-accent transition-colors duration-300 text-white px-6 py-2.5 rounded-md font-semibold cursor-pointer"
            >
                Order
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px'
                    },
                    content: {
                        position: 'relative',
                        inset: 'auto',
                        margin: 'auto',
                        padding: '0px',
                        border: 'none',
                        background: 'transparent',
                        maxWidth: '860px',
                        width: '100%',
                        maxHeight: '94vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }
                }}
            >
                {/* Modal Container */}
                <div className="w-full max-w-[860px] max-h-[94vh] bg-[#eef0f6] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
                    {/* 1. Header Banner */}
                    <div className="w-full py-3.5 sm:py-4 bg-[#000080] rounded-t-2xl flex items-center justify-center relative shadow-sm px-4">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                            Order Summary
                        </h1>
                        <button
                            onClick={closeModal}
                            aria-label="Close modal"
                            className="absolute right-3 sm:right-4 text-white/70 hover:text-white text-xl font-bold transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                        >
                            ✕
                        </button>
                    </div>

                    {/* 2. Total & Items Bar */}
                    <div className="w-full py-2.5 sm:py-3.5 px-4 sm:px-6 md:px-8 bg-[#6f72b9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-4 text-white">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm md:text-base font-bold">
                            <span>Total :</span>
                            <span>{getFormattedPrice(getCartTotal(cart))}</span>
                            <span className="text-white/80">+ Delivery Fee :</span>
                            <span>{getFormattedPrice(diliveryFee)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-bold">
                            <span className="text-white/80">Items :</span>
                            <span>{cart?.length || 0}</span>
                        </div>
                    </div>

                    {/* 3. Form Content - Responsive Grid */}
                    <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 sm:gap-y-4 text-slate-800">
                            {/* First Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    First Name
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Last Name
                                </label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Address Line 1 */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Address Line 1
                                </label>
                                <input
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    placeholder="123 Main St"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Address Line 2 */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Address Line 2
                                </label>
                                <input
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    placeholder="Apt 4B"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* City */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    City
                                </label>
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Colombo"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* District */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    District
                                </label>
                                <select
                                    value={district}
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                        setDiliveryFee(deliveryCostPerDisctrict[e.target.value]);
                                    }}
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm cursor-pointer"
                                >
                                    <option value="colombo">Colombo</option>
                                    <option value="gampaha">Gampaha</option>
                                    <option value="kalutara">Kalutara</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Postal Code */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Postal Code
                                </label>
                                <input
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="12345"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Phone
                                </label>
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+94 123 456 789"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Secondary Phone */}
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Secondary Phone
                                </label>
                                <input
                                    value={secondaryPhoneNumber}
                                    onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
                                    placeholder="+94 987 654 321"
                                    className="w-full h-[42px] rounded-lg border border-gray-400 bg-white px-3.5 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Special Notes - Full Width across 2 columns in landscape */}
                            <div className="flex flex-col md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 mb-1.5">
                                    Special Notes
                                </label>
                                <textarea
                                    value={specialNotes}
                                    onChange={(e) => setSpecialNotes(e.target.value)}
                                    placeholder="Any special instructions for delivery..."
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-400 bg-white p-3 text-slate-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#000080] focus:border-transparent transition-all resize-none shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Footer Bar with Confirm Order & Cancel Buttons */}
                    <div className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#6f72b9] rounded-b-2xl flex flex-row justify-center items-center gap-3 sm:gap-5 shadow-md">
                        <button
                            onClick={handleConfirmOrder}
                            className="flex-1 sm:flex-none bg-[#000080] hover:bg-[#00005a] text-white font-bold px-5 sm:px-8 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 text-sm sm:text-base text-center"
                        >
                            Confirm Order
                        </button>
                        <button
                            onClick={closeModal}
                            className="text-white hover:text-gray-200 font-semibold px-4 sm:px-6 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}


