import { Link } from "react-router-dom";
import getFormattedPrice from "../lib/price-format";

export default function ProductCard(props) {
    const product = props.product;
    const labelledPrice = product?.labelledPrice ?? product?.labledPrice ?? product?.labeledPrice;

    return (
        <Link
            to={"/overview/" + product.productId}
            state={product}
            className="bg-white w-full max-w-[360px] sm:w-[370px] h-[490px] rounded-2xl border border-sky-100/90 shadow-[0_4px_20px_rgba(2,132,199,0.06)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.15)] hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group relative"
        >
            {/* Image Container with hover transition */}
            <div className="w-full h-[320px] relative bg-white flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
                {product?.images?.[0] && (
                    <img
                        src={product.images[0]}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        alt={product?.name || "Product"}
                    />
                )}
                {product?.images?.[1] && (
                    <img
                        src={product.images[1]}
                        className="w-full h-full absolute inset-0 object-contain bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4"
                        alt={product?.name || "Product"}
                    />
                )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono font-semibold uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                            {product.productId}
                        </span>
                        {product.category && (
                            <span className="text-[11px] font-medium text-slate-400 capitalize">
                                {product.category}
                            </span>
                        )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product?.name}
                    </h3>
                </div>

                <div className="flex justify-between items-end mt-3 pt-2.5 border-t border-slate-100">
                    <div className="flex flex-col">
                        {Number(labelledPrice) > Number(product?.price) && (
                            <span className="text-xs text-slate-400 line-through">
                                {getFormattedPrice(labelledPrice)}
                            </span>
                        )}
                        <span className="text-lg font-extrabold text-emerald-600">
                            {getFormattedPrice(product.price)}
                        </span>
                    </div>

                    <span className="text-xs font-bold text-blue-600 group-hover:text-sky-600 group-hover:translate-x-1 transition-all flex items-center gap-1">
                        <span>View</span>
                        <span>&rarr;</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}