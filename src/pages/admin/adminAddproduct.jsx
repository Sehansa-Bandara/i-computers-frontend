import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadMedia from "../../lib/uploadMedia";
import { CiCircleInfo } from "react-icons/ci";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [labledPrice, setLabledPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState("Laptop");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
  //Dependancy array
  //make a backend call to get all products
  //update the products variable's value with response from backend

  async function handleSave() {
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

      const productData = {
        productId: productId,
        name: name,
        altNames: altName ? altName.split(",").map((s) => s.trim()) : [],
        description: description,
        images: imageUrls,
        price: Number(price),
        stock: Number(stock),
        labledPrice: Number(labledPrice),
        isAvailable: isAvailable === "true" || isAvailable === true,
        category: category,
        brand: brand,
        model: model,
      };

      const res = await api.post("/products", productData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(res);
      toast.success(res.data?.message || "Product created successfully");
      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to add product");
    }
  }
  return (

    <div className="w-full max-h-full flex flex-wrap p-6 item-start gap-0 overflow-y-scroll bg-white rounded-2xl shadow-sm border border-slate-200/80">
      {loading && <LoadingAnimation />}


      <div className="w-full h-[90px] bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/70 shadow-sm rounded-xl flex items-center p-5 justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Add New Product</h1>
          <p className="text-xs text-blue-600/80 font-medium mt-0.5">Enter product specifications and catalog information</p>
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
          <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 shadow-sm transition-all active:scale-[0.98]" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="w-[15%] flex flex-col h-[85px] p-2">
        <label className="text-slate-700 text-sm font-semibold mb-1.5">Product ID</label>
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50" />

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
      <div className="w-[45%] flex flex-col h-[105px] p-2">
        <label className="text-slate-700 text-sm font-semibold mb-1.5">Images</label>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} className="w-full h-[42px] rounded-lg border border-slate-300 p-1.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 bg-slate-50/50" />

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
        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)} className="w-full h-[42px] rounded-lg border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50">
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
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