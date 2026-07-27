import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";

export default function DeleteProductModal(props) {
    const [showModal, setShowModal] = useState(false);
    const refresh = props.refresh;
    const productId = props.productId;

    async function handleDelete(productId) {
        const token = localStorage.getItem("token");
        try {
            await api.delete(`product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Product deleted successfully");
            refresh();

        } catch (error) {
            toast.error("Failed to delete product");

        } finally {
            setShowModal(false);
        }
    }


    return (
        <>
            <CiTrash
                onClick={() => setShowModal(true)}
                className="hover:text-red-600 cursor-pointer transition-colors"
            />
            {showModal && (
                <div className="w-screen h-screen bg-black/50 flex justify-center items-center fixed left-0 top-0 z-50">
                    <div className="w-[400px] bg-white rounded-md shadow-md flex flex-col items-center justify-between overflow-hidden">
                        <div className="w-full h-[50px] bg-blue-600 flex items-center justify-between text-white text-lg font-bold px-4">
                            <h1>Delete confirmation</h1>
                            <button
                                onClick={() => setShowModal(false)}
                                className="hover:text-red-300 cursor-pointer font-semibold"
                            >
                                X
                            </button>
                        </div>
                        <div className="p-5 text-center">
                            <p className="text-slate-700 font-medium">Are you sure you want to delete this product with productId?</p>
                        </div>
                        <div className="flex gap-3 pb-5">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer font-semibold"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 cursor-pointer font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}