import { useState } from "react";

export default function ImageSlideShow(props) {
    const images = props.images || [];
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <div className="w-[500px] flex flex-col items-center">
            <div className="w-full h-[420px] bg-white rounded-2xl shadow-md p-4 flex justify-center items-center overflow-hidden">
                {images[activeImageIndex] ? (
                    <img
                        src={images[activeImageIndex]}
                        className="w-full h-full object-contain"
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
                                "w-[75px] h-[75px] object-contain cursor-pointer rounded-xl border-2 transition-all p-1 bg-white shadow-sm " +
                                (index === activeImageIndex
                                    ? "border-blue-600 ring-2 ring-blue-400/30 scale-105"
                                    : "border-gray-200 opacity-70 hover:opacity-100")
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