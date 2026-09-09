import { useState } from "react"
import { IoEyeOutline } from "react-icons/io5"
import Modal from 'react-modal';
import getFormattedPrice from "../lib/price-format";
import formatTimestamp from "../lib/date-format";
export default function OrderDetailsModal(props) {
    const order = props.order
    const [isModalOpen, setIsModalOpen] = useState(false)


    return (
        <>
            <IoEyeOutline className="text-secondary hover:text-accent cursor-pointer text-xl"
                onClick={() => setIsModalOpen(true)} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => { setIsModalOpen(false) }}
                style={
                    {
                        content: {
                            maxWidth: '450px',
                            width: '95%',
                            margin: 'auto',
                            padding: '0px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            maxHeight: '90vh'
                        }
                    }
                }
            >
                <div className='w-full min-h-full bg-primary rounded-2xl flex flex-col'>
                    <div className='w-full h-[70px] bg-accent rounded-t-2xl flex'>
                        {/*  order summary*/}
                        <div className='w-full h-full flex flex-col justify-center items-center'>
                            <h1 className='text-xl font-semibold text-white'>Order Summary</h1>
                        </div>
                    </div>
                    {/* total */}
                    <div className='w-full bg-[#7979b8]  flex flex-wrap justify-center sticky top-0 px-2'>
                        <div className='w-1/3   flex flex-row justify-center items-center gap-2'>
                            <span className='text-lg  text-white'>{order.orderId}</span>
                        </div>
                        <div className='w-1/3   flex flex-row justify-center items-center gap-2'>
                            <span className='text-lg  text-white'>{getFormattedPrice(order.totalAmount)}</span>
                        </div>
                        <div className='w-1/3   flex flex-row justify-center items-center gap-2'>
                            <h1 className='text-lg  text-white'>{order.items.length} Items</h1>
                        </div>
                        <div className='w-full   flex flex-row justify-center items-center gap-2 border-t-2 border-white'>
                            <h1 className='text-lg  text-white'>{formatTimestamp(order.date)}</h1>
                        </div>
                        <div className='w-full   flex flex-row justify-center items-center gap-2 text-center border-t-2 border-white '>
                            <h1 className='text-lg  text-white'>
                                {order.firstName} {order.lastName}, {order.addressLine1}, {order.addressLine2}, {order.city}, {order.postalCode}, {order.country}
                                ({order.phone} / {order.secondaryPhone})
                            </h1>
                        </div>
                        <div className='w-full   flex flex-row justify-center items-center gap-2 text-center border-t-2 border-white text-white'>
                            Order Status : {order.status}

                        </div>
                    </div>
                    <div className="h-[100px] w-full">
                        Notes : {order.customerNotes}
                    </div>
                    {
                        order.items.map((item, index) => (
                            <div key={index} className='w-full   flex flex-row text-secondary'>
                                <img src={item.product.image} className='w-[100px] h-[100px] object-cover' />
                                <div className='w-full h-full flex flex-col justify-center items-start px-2'>
                                    <h1 className='text-lg font-semibold '>{item.product.name}</h1>
                                    <h1 className='text-md '>{getFormattedPrice(item.product.price)} x {item.qty} = {getFormattedPrice(item.product.price * item.qty)}</h1>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>

        </>
    )

}