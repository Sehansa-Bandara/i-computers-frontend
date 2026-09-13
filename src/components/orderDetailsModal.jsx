import { useState } from "react";
import { FiEye, FiX, FiPackage, FiMapPin, FiPhone, FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import Modal from "react-modal";
import getFormattedPrice from "../lib/price-format";
import formatTimestamp from "../lib/date-format";

export default function OrderDetailsModal({ order }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!order) return null;

    const statusStr = (order.status || "").toLowerCase();
    const statusConfig = {
        pending: { bg: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
        processing: { bg: "bg-sky-50 text-sky-700 border-sky-200", label: "Processing" },
        shipped: { bg: "bg-indigo-50 text-indigo-700 border-indigo-200", label: "Shipped" },
        delivered: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Delivered" },
        completed: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Completed" },
        cancelled: { bg: "bg-rose-50 text-rose-700 border-rose-200", label: "Cancelled" },
    }[statusStr] || { bg: "bg-slate-50 text-slate-700 border-slate-200", label: order.status || "Unknown" };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-accent text-accent hover:text-white border border-sky-200/80 hover:border-accent text-xs font-semibold transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
                title="View order details"
            >
                <FiEye className="text-sm" />
                <span>Details</span>
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                        backdropFilter: "blur(4px)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem"
                    },
                    content: {
                        position: "relative",
                        inset: "auto",
                        maxWidth: "580px",
                        width: "100%",
                        padding: "0px",
                        backgroundColor: "transparent",
                        border: "none",
                        maxHeight: "90vh",
                        borderRadius: "1.25rem",
                        overflow: "hidden"
                    }
                }}
            >
                <div className="w-full bg-white rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border border-slate-100">
                    {/* Header */}
                    <div className="w-full bg-gradient-to-r from-[#000066] via-[#000080] to-[#0a1b4d] text-white p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                                <FiPackage className="text-xl text-sky-200" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-bold text-white tracking-tight">Order Details</h2>
                                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/20 text-sky-200 border border-white/20">
                                        {order.orderId}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                                    <FiCalendar className="text-[11px]" />
                                    <span>{formatTimestamp(order.date)}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                        >
                            <FiX className="text-lg" />
                        </button>
                    </div>

                    {/* Modal Scrollable Body */}
                    <div className="p-6 overflow-y-auto space-y-5">
                        {/* Status & Summary Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 font-medium">Order Status:</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.bg}`}>
                                    {statusConfig.label}
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                                Total Items: <strong className="text-slate-900">{order.items?.length || 0}</strong>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
                                <FiMapPin className="text-blue-600" />
                                <span>Shipping Destination</span>
                            </div>
                            <div className="text-sm text-slate-800 font-semibold">
                                {order.firstName} {order.lastName}
                            </div>
                            <div className="text-xs text-slate-600 leading-relaxed">
                                {[order.addressLine1, order.addressLine2, order.city, order.district, order.postalCode, order.country]
                                    .filter(Boolean)
                                    .join(", ")}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-600">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <FiPhone className="text-blue-500 text-xs" />
                                    {order.phone}
                                    {order.secondaryPhone && ` / ${order.secondaryPhone}`}
                                </span>
                                {order.email && (
                                    <span className="text-slate-400">
                                        • {order.email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Purchased Items ({order.items?.length || 0})
                            </h3>
                            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="p-3.5 flex items-center gap-3.5 bg-white hover:bg-slate-50/50 transition-colors">
                                        <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center p-1">
                                            {item.product?.image ? (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product?.name || "Product"}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <FiPackage className="text-slate-400 text-xl" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-slate-900 truncate">
                                                {item.product?.name || "Item"}
                                            </h4>
                                            <div className="text-xs text-slate-500 mt-0.5">
                                                {getFormattedPrice(item.product?.price || 0)} × {item.qty}
                                            </div>
                                        </div>
                                        <div className="text-right font-bold text-sm text-slate-900">
                                            {getFormattedPrice((item.product?.price || 0) * (item.qty || 1))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customer Notes (if present) */}
                        {order.customerNotes && (
                            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
                                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                                    <FiFileText />
                                    <span>Special Instructions / Notes:</span>
                                </div>
                                <p className="italic text-slate-700 pl-5">
                                    "{order.customerNotes}"
                                </p>
                            </div>
                        )}

                        {/* Price Breakdown */}
                        <div className="pt-2 border-t border-slate-200 space-y-2">
                            {order.diliveryFee !== undefined && order.diliveryFee > 0 && (
                                <div className="flex justify-between text-xs text-slate-600">
                                    <span>Delivery Fee</span>
                                    <span>{getFormattedPrice(order.diliveryFee)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center text-base font-bold text-slate-900 pt-1">
                                <span>Total Paid</span>
                                <span className="text-lg font-extrabold text-blue-900">
                                    {getFormattedPrice(order.totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex justify-end">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-5 py-2 rounded-xl bg-accent hover:bg-blue-900 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}