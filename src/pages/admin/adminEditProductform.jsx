import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import uploadMedia from "../../lib/uploadMedia.js";
import { CiCircleInfo } from "react-icons/ci";
import api from "../../lib/api.js";
import LoadingAnimation from "../../components/loadingAnimation.jsx";
import { useLocation } from "react-router-dom";


export default function AdminEditProductForm() {
    const location = useLocation();
    
    const product = location?.state?.product || location?.state;

    const [productId, setProductId] = useState(product?.productId || "");
    const [name, setName] = useState(product?.name || "");
    const [altName, setAltName] = useState(product?.altNames ? (Array.isArray(product.altNames) ? product.altNames.join(", ") : product.altNames) : "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price !== undefined && product?.price !== null ? product.price : "");
    const [stock, setStock] = useState(product?.stock !== undefined && product?.stock !== null ? product.stock : "");
    const [labledPrice, setLabledPrice] = useState(product?.labledPrice !== undefined && product?.labledPrice !== null ? product.labledPrice : "");
    const [isAvailable, setIsAvailable] = useState(product?.isAvailable !== undefined ? String(product.isAvailable) : "true");
    const [category, setCategory] = useState(product?.category || "Laptop");
    const [brand, setBrand] = useState(product?.brand || "");
    const [model, setModel] = useState(product?.model || "");
    const [existingImages, setExistingImages] = useState(product?.images || []);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    if(location.state==null){
        toast.error("Product not found")
        navigate("/admin/products")
    } 

    useEffect(() => {
        if (product) {
            setProductId(product.productId || "");
            setName(product.name || "");
            setAltName(product.altNames ? (Array.isArray(product.altNames) ? product.altNames.join(", ") : product.altNames) : "");
            setDescription(product.description || "");
            setPrice(product.price !== undefined && product.price !== null ? product.price : "");
            setStock(product.stock !== undefined && product.stock !== null ? product.stock : "");
            setLabledPrice(product.labledPrice !== undefined && product.labledPrice !== null ? product.labledPrice : "");
            setIsAvailable(product.isAvailable !== undefined ? String(product.isAvailable) : "true");
            setCategory(product.category || "Laptop");
            setBrand(product.brand || "");
            setModel(product.model || "");
            setExistingImages(product.images || []);
        }
    }, [location.state]);

    useEffect(
        () => {
            api.get("/products").then((response) => {
                if (isLoading) {
                    console.log(response.data);
                    setProducts(response.data);
                    setIsLoading(false);
                }
            });
        },
        [isLoading]
    );

    async function handleUpdate() {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You are not logged in");
            navigate("/login");
            return;
        }

        try {
            const imageUploadPromises = [];

            for (let i = 0; i < images.length; i++) {
                imageUploadPromises[i] = uploadMedia(images[i]);
            }

            const imageUrls = await Promise.all(imageUploadPromises);
            const finalImages = imageUrls.length > 0 ? imageUrls : existingImages;

            const productData = {
                productId: productId,
                name: name,
                altNames: altName ? altName.split(",").map((s) => s.trim()).filter(Boolean) : [],
                description: description,
                images: finalImages,
                price: Number(price),
                stock: Number(stock),
                labledPrice: Number(labledPrice),
                isAvailable: isAvailable === "true" || isAvailable === true,
                category: category,
                brand: brand,
                model: model,
            };

            const res = await api.put("/products/" + productId, productData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            console.log(res);
            toast.success(res.data?.message || "Product updated successfully");
            navigate("/admin/products");
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error(err?.response?.data?.message || "Failed to update product");
        }
    }
    return (

        <div className="w-full max-h-full flex flex-wrap p-6 item-start gap-0 overflow-y-scroll bg-white rounded-2xl shadow-sm border border-slate-200/80">
            {loading && <LoadingAnimation />}


            <div className="w-full h-[90px] bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/70 shadow-sm rounded-xl flex items-center p-5 justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Edit Product</h1>
                    <p className="text-xs text-blue-600/80 font-medium mt-0.5">Update product details and information</p>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <span className="text-xs text-slate-600 font-medium">{products.length} products</span>
                    <button type="button" onClick={() => setIsLoading(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer shadow-sm transition-all active:scale-[0.98]">
                        Refresh
                    </button>
                </div>

                <div className="flex gap-3">
                    <Link to="/admin/products" className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 shadow-sm transition-all">
                        Cancel
                    </Link>
                    <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 shadow-sm transition-all active:scale-[0.98]" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>

            <div className="w-[15%] flex flex-col h-[85px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Product ID</label>
                <input type="text" value={productId} disabled className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm bg-slate-100 text-slate-500 cursor-not-allowed" />

            </div>
            <div className="w-[40%] flex flex-col h-[85px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />

            </div>
            <div className="w-[45%] flex flex-col h-[85px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5 flex items-center gap-2">Alternative Names <span className="flex items-center gap-1 text-xs text-slate-400 italic font-normal"><CiCircleInfo className="text-blue-600" /> Comma separated</span></label>
                <input type="text" value={altName} onChange={(e) => setAltName(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />
            </div>
            <div className="w-full flex flex-col p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-[100px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50 resize-none" />

            </div>
            <div className="w-[45%] flex flex-col min-h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Images</label>
                <input type="file" multiple onChange={(e) => setImages(e.target.files)} className="w-full h-[42px] rounded-lg border border-slate-300 p-1.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 bg-slate-50/50" />
                {existingImages && existingImages.length > 0 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                        {existingImages.map((img, index) => (
                            <img key={index} src={img} alt={`Existing ${index}`} className="w-12 h-12 object-cover rounded-md border border-slate-200" />
                        ))}
                    </div>
                )}
            </div>

            <div className="w-[30%] flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />
            </div>

            <div className="w-[25%] flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Labelled Price</label>
                <input type="number" value={labledPrice} onChange={(e) => setLabledPrice(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />
            </div>
            <div className="w-1/4 flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />
            </div>

            <div className="w-1/4 flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Availability</label>
                <select value={String(isAvailable)} onChange={(e) => setIsAvailable(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50">
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>

            <div className="w-1/4 flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50">
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Graphic Card">Graphic Card</option>
                    <option value="Processor">Processor</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="RAM">RAM</option>

                </select>
            </div>
            <div className="w-1/4 flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Brand</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />
            </div>
            <div className="w-1/4 flex flex-col h-[105px] p-2">
                <label className="text-slate-700 text-sm font-semibold mb-1.5">Model</label>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />
            </div>

        </div >




    );
}