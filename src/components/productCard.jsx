import { Link } from "react-router-dom";
import getFormattedPrice from "../lib/price-format";

export default function ProductCard(props) {
    const product = props.product || {};
    const labelledPrice = product.labelledPrice ?? product.labledPrice ?? product.labeledPrice;
    const priceNum = Number(product.price) || 0;
    const images = Array.isArray(product.images) ? product.images : (product.image ? [product.image] : []);

    return (
        <Link
            to={"/overview/" + (product.productId || "")}
            state={product}
            className="bg-white w-[390px] h-[500px] m-6 shadow-2xl rounded-xl hover:[&_.primary-image]:opacity-0 overflow-hidden flex flex-col hover:bg-blue-100 transition-colors duration-700"
        >
            <div className="w-full h-[350px] relative bg-slate-100">
                {images[0] ? (
                    <img
                        src={images[0]}
                        className="w-full h-full absolute object-cover"
                        alt={product.name || "Product"}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        No Image
                    </div>
                )}
                {images[1] && (
                    <img
                        src={images[1]}
                        className="w-full h-full absolute bg-white primary-image transition-opacity duration-700 object-cover"
                        alt={product.name || "Product"}
                    />
                )}
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h1 className="text-sm text-gray-600 font-thin px-4">{product.productId}</h1>
                    <h1 className="text-xl font-bold text-slate-800 line-clamp-1 mt-1">{product.name || "Unnamed Product"}</h1>
                </div>
                <div className="flex justify-between items-center mt-2 px-4">
                    <div className="flex flex-col">
                        {Number(labelledPrice) > priceNum && (
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