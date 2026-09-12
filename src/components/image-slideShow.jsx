import { useState } from "react";

export default function ImageSlideShow(props) {
    const images = props.images || [];
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <div className="w-full max-w-[480px] flex flex-col items-center">
            <div className="w-full aspect-square max-h-[420px] bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex justify-center items-center overflow-hidden">
                {images[activeImageIndex] ? (
                    <img
                        src={images[activeImageIndex]}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                        alt="Product active view"
                    />
                ) : (
                    <div className="text-gray-400 font-medium">No Image Available</div>
                )}
            </div>
            <div className="w-full mt-4 flex justify-center items-center gap-3 overflow-x-auto p-2">
                {images.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            className={
                                "w-[70px] h-[70px] object-contain cursor-pointer rounded-2xl border-2 transition-all p-1.5 bg-white shadow-xs " +
                                (index === activeImageIndex
                                    ? "border-blue-600 ring-4 ring-blue-500/20 scale-105"
                                    : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300")
                            }
                            onClick={() => {
                                setActiveImageIndex(index);
                            }}
                            alt={`Thumbnail ${index + 1}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}