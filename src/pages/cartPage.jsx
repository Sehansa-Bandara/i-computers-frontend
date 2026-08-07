import { useState } from "react";
import { getCart } from "../lib/cart";
import { Link } from "react-router-dom";
import getFormattedPrice from "../lib/price-format";
import { toast } from "react-hot-toast";
import { addToCart } from "../lib/cart";


export default function CartPage() {

    const [cart, setCart] = useState(getCart())

    return (
        <div className="w-full h-[calc(100vh-100px)]  overflow-y-scroll flex flex-col items-center pb-[180px]">
            {
                cart.map(
                    (item,index)=>{
                        return(
                            <div key={index} className="w-[550px] min-h-[130px] bg-white my-4 shadow-md rounded-md overflow-hidden flex flex-row">
                            <img src={item.product.image} className="h-full w-[130px] object-cover"/>
                             <div className="w-[420px] h-full p-1 flex flex-col">
                                <h1 className="font-semibold">{item.product.name}</h1>
                                    {
                                        item.product.labelledPrice > item.product.price &&
                                        <span className="text-lg font-normal line-through text-gray-500">{getFormattedPrice(item.product.labelledPrice)}</span>
                                    }
                                    <span className="text-lg font-semibold text-accent-blue">{getFormattedPrice(item.product.price)}</span>
                                    <div className="w-full h-[40px] flex justify-between items-center pr-2">
                                        <div className="w-[120px] h-[40px] border border-accent-blue rounded-md overflow-hidden flex flex-row items-center bg-white">
                                            <button
                                            onClick={
                                                ()=>{
                                                    addToCart(item.product,-1)
                                                    setCart(getCart())
                                                }
                                            }
                                            className="w-[40px] h-full text-accent-blue hover:bg-accent-blue hover:text-white cursor-pointer font-bold flex justify-center items-center transition-colors duration-300">-</button>
                                            <span className="w-[40px] h-full flex justify-center items-center text-slate-800 font-semibold">{item.qty}</span>
                                            <button
                                            onClick={
                                                ()=>{
                                                    addToCart(item.product,1)
                                                    setCart(getCart())
                                                }
                                            }
                                            className="w-[40px] h-full text-accent-blue hover:bg-accent-blue hover:text-white cursor-pointer font-bold flex justify-center items-center transition-colors duration-300">+</button>
                                        </div>
                                        <p className="text-lg font-normal text-gray-600">{getFormattedPrice(item.product.price*item.qty)}</p>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        )
                    }
                )
            }


        </div>
    );
}
