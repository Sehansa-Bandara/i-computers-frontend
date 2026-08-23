import { useState } from "react";
import toast from "react-hot-toast";
import { GoShieldCheck, GoShieldSlash } from "react-icons/go";
import Modal from "react-modal";
import api from "../lib/api";
export default function ChangeRoleOfUserModal(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = props.user;
    const refresh = props.refresh;

    async function changeUserRole() {

        const token = localStorage.getItem("token");
        try {

            await api.put("/users/role", {
                email: user.email,
                isAdmin: !user.isAdmin
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success("User role changed successfully");
            refresh();
            setIsModalOpen(false);

        } catch (err) {
            console.log(err);
            toast.error("Failed to change user role");
            setIsModalOpen(false);
        }

    }

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="m-2">
                {user.isAdmin ? (
                    <GoShieldSlash className="text-xl text-red-600" />
                ) : (
                    <GoShieldCheck className="text-xl text-green-600" />
                )}
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false);
                }}
                style={{
                    content: {
                        backgroundColor: "transparent",
                        border: "none",
                    }
                }}

            >
                <div className="w-full h-full flex justify-center items-center">

                    <div className="w-[450px] h-[300px] shadow-2xl rounded-md bg-white ">
                        <div className="h-[50px] w-full bg-accent rounded-t-md flex justify-between px-4">
                            <h1 className="text-white text-lg font-semibold flex justify-center items-center ">Update User Role</h1>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                className="text-white text-lg font-semibold hover:text-red-600 transition-colors duration-300 cursor-pointer"
                            >
                                X
                            </button>
                        </div>
                        <p className="text-center text-lg font-semibold mt-10">
                            Are you sure you want to change the role of the user with {user.email} to {user.isAdmin ? "Customer" : "Admin"}?
                        </p>

                        <div className="w-full flex justify-center gap-4 mt-10">
                            <button
                                onClick={changeUserRole}

                                className="bg-accent text-white px-4 py-2 rounded-md"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                            >
                                No
                            </button>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    );
}