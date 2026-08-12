import { useState, useContext } from "react";
import Modal from "react-modal";
import { getCartTotal } from "../lib/cart";
import getFormattedPrice from "../lib/price-format";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

export default function OrderModal(props) {
    const userData = useContext(UserContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [firstName, setFirstName] = useState(userData?.user?.firstName || "");
    const [lastName, setLastName] = useState(userData?.user?.lastName || "");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("");
    const [specialNotes, setSpecialNotes] = useState("");
    // const [file, setFile] = useState(null)
    const navigate = useNavigate();

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            <button
                onClick={openModal}
                className="bg-accent-blue/70 hover:bg-accent transition-colors duration-300 text-white px-6 py-2.5 rounded-md font-semibold cursor-pointer"
            >
                Order
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        margin: 'auto',
                        padding: '0px',
                        paddingBottom: '0px',
                        backgroundColor: 'transparent',
                        border: 'none'
                    }
                }}
            >
                <div className="w-full min-h-full bg-primary rounded-2xl flex flex-col z-50">
                    <div className="w-full h-[70px] bg-accent rounded-t-2xl flex">
                        {/*  order summary */}
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <h1 className="text-xl font-semibold text-white">Order Summary</h1>
                        </div>
                    </div>
                    {/* total */}
                    <div className="w-full h-[70px] bg-[#7979b8] flex sticky top-0">
                        <div className="w-1/2 h-full flex flex-row justify-center items-center gap-2">
                            <h1 className="text-lg font-semibold text-white">Total : </h1>
                            <span className="text-lg font-semibold text-white">
                                {getFormattedPrice(getCartTotal(props.cart || []))}
                            </span>
                        </div>
                        <div className="w-1/2 h-full flex flex-row justify-center items-center gap-2">
                            <h1 className="text-lg font-semibold text-white">Items : </h1>
                            <span className="text-lg font-semibold text-white">{props.cart?.length || 0}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-row flex-wrap text-secondary">
                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">
                            <label className="">First Name</label>
                            <input
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value); }}
                                placeholder="John"
                                className="w-full h-[40px] rounded-md outline-0 border-gray-500 border px-2 text-black bg-white"
                            />
                        </div>
                        <div className="w-1/2 h-[100px] flex flex-col justify-center p-4">
                            <label className="">Last Name</label>
                            <input
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value); }}
                                placeholder="Doe"
                                className="w-full h-[40px] rounded-md outline-0 border-gray-500 border px-2 text-black bg-white"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
