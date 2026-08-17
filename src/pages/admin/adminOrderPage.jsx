import { useEffect, useState } from "react";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../lib/price-format";
import formatTimestamp from "../../lib/date-format";
import AdminOrderDetailsModal from "../../components/adminOrderDetailsModal";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/orders/" + pageSize + "/" + currentPage, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (isLoading) {
                console.log(response.data);
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
                setTotalOrders(response.data.totalCount);
                setIsLoading(false);
            }
        });
    }, [isLoading]);

    return (
        <div className="w-full max-h-full  flex flex-col p-4 items-start gap-0 overflow-y-scroll">

            <div className="w-full min-h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-8">
                {isLoading && <LoadingAnimation />}
                <h1 className="text-2xl font-semibold text-secondary">Orders</h1>

                <div className="flex gap-4 justify-center items-center">
                    <span>{totalOrders} Orders</span>
                    <button
                        onClick={() => {
                            setIsLoading(true);
                        }}
                        className="bg-accent text-white px-4 py-2 rounded-md"
                    >
                        Refresh
                    </button>
                </div>
            </div>
            <table className="w-full bg-white shadow-md rounded-md overflow-hidden text-center mb-[100px]">
                <thead className="bg-accent text-white h-[60px]">
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Item count</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>



                    {orders.map((item) => {
                        return (
                            <tr key={item.orderId} className="odd:bg-gray-200 h-[50px]">

                                <td>{item.orderId}</td>
                                <td>{formatTimestamp(item.date)}</td>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.city}</td>
                                <td>{item.phone}</td>
                                <td>{item.status}</td>
                                <td>{item.items.length}</td>
                                <td>{getFormattedPrice(item.totalAmount)}</td>
                                <td>
                                    <div className="flex justify-center items-center gap-2">
                                        <AdminOrderDetailsModal order={item} refresh={() => setIsLoading(true)} />
                                    </div>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="w-[calc(100%-360px)] h-[100px]  fixed bottom-10 flex justify-center items-center">
                <div className="w-[500px] h-[50px] bg-white shadow-2xl rounded-md flex justify-between overflow-hidden"></div>

                <button className="h-full px-4 hover:bg-accent hover:text-white text-accent transition-colors duration-300 cursor-pointer"
                    disabled={currentPage == 1}
                    onClick={
                        () => {

                            const newPageNumber = currentPage - 1
                            setCurrentPage(newPageNumber)
                            setIsLoading(true)
                        }
                    }>
                    &lt;&lt; Previous
                </button>
                <div className="h-full text-accent flex justify-center items-center gap-1">
                    <label htmlFor="pageSize">Page Size:</label>
                    <select className="h-full hover:bg-accent hover:text-white text-accent transition-colors duration-300 cursor-pointer"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(e.target.value);
                            setIsLoading(true);
                        }
                        }>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>

            <div className="h-full px-4 hover:bg-accent hover:text-white text-accent transition-colors duration-300 cursor-pointer flex justify-center items-center gap-2">
                <span>Page {currentPage} of {totalPages}</span>
            </div>

            <button
                disabled={currentPage == totalPages}
                onClick={() => {
                    const newPageNumber = currentPage + 1
                    setCurrentPage(newPageNumber)
                    setIsLoading(true)
                }}
                className="h-full px-4 hover:bg-accent hover:text-white text-accent transition-colors duration-300 cursor-pointer" >
                Next &gt;&gt;
            </button>
        </div>



    );
}
