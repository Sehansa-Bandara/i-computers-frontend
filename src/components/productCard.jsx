import { Link } from "react-router-dom";
import getFormattedPrice from "../lib/price-format";



export default function ProductCard(props) {
    const product = props.product;
    const labelledPrice = product?.labelledPrice ?? product?.labledPrice ?? product?.labeledPrice;

    return (
        <Link to={"/overview/" + product.productId} state={product} className="bg-white w-[390px] h-[500px] m-6 shadow-2xl rounded-xl hover:[&_.primary-image]:opacity-0  overflow-hidden flex flex-col hover:bg-blue-100 transition-colors duration-700">
            <div className="w-full h-[350px]  relative">
                {product?.images?.[0] && (
                    <img src={product.images[0]} className="w-full h-full absolute object-cover" alt={product?.name || "Product"} />
                )}
                {product?.images?.[1] && (
                    <img src={product.images[1]} className="w-full h-full absolute bg-whit primary-image transition-opacity duration-700 " alt={product?.name || "Product"} />
                )}
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h1 className="text-sm text-gray-600 font-thin mt-4 px-4 ">{product.productId}</h1>


                    <h1 className="text-xl font-bold text-slate-800 line-clamp-1">{product?.name}</h1>

                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                        {Number(labelledPrice) > Number(product?.price.toFixed(2)) && (
                            <span className="text-sm text-gray-400 line-through">
                                {getFormattedPrice(labelledPrice)}
                            </span>
                        )}
                        <span className="text-lg font-bold text-emerald-600">
                            {getFormattedPrice(product.price)}
                        </span>
                    </div>


                </div>
            </div>


        </Link>
    );
}