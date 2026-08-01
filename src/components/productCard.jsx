import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const product = props.product;

    return (
        <div className="bg-white w-[390px] h-[500px] m-6 shadow-2xl rounded-xl hover:[&_.primary-image]:opacity-0  overflow-hidden flex flex-col hover:bg-red-700 transition-colors duration-700">
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
                    <h1 className="text-xl font-bold text-slate-800 line-clamp-1">{product?.name}</h1>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{product?.description}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-emerald-600">Rs. {product?.price}</span>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition-all cursor-pointer">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}