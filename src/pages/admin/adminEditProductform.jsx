import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import uploadMedia from "../../lib/uploadMedia.js";
import api from "../../lib/api.js";
import LoadingAnimation from "../../components/loadingAnimation.jsx";
import {
  FiPackage,
  FiDollarSign,
  FiImage,
  FiCheck,
  FiX,
  FiUploadCloud,
  FiTrash2,
  FiArrowLeft,
  FiRefreshCw,
  FiTag,
  FiLayers,
  FiHash,
  FiInfo,
  FiCheckCircle,
  FiEdit3
} from "react-icons/fi";

export default function AdminEditProductForm() {
  const location = useLocation();
  const product = location?.state?.product || location?.state;

  const [productId, setProductId] = useState(product?.productId || "");
  const [name, setName] = useState(product?.name || "");
  const [altName, setAltName] = useState(
    product?.altNames
      ? Array.isArray(product.altNames)
        ? product.altNames.join(", ")
        : product.altNames
      : ""
  );
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(
    product?.price !== undefined && product?.price !== null ? product.price : ""
  );
  const [stock, setStock] = useState(
    product?.stock !== undefined && product?.stock !== null ? product.stock : ""
  );
  const [labledPrice, setLabledPrice] = useState(
    product?.labledPrice !== undefined && product?.labledPrice !== null
      ? product.labledPrice
      : ""
  );
  const [isAvailable, setIsAvailable] = useState(
    product?.isAvailable !== undefined ? product.isAvailable : true
  );
  const [category, setCategory] = useState(product?.category || "Laptop");
  const [brand, setBrand] = useState(product?.brand || "");
  const [model, setModel] = useState(product?.model || "");
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const categories = [
    "Laptop",
    "Desktop",
    "Monitor",
    "Accessories",
    "Keyboard",
    "Mouse",
    "Graphic Card",
    "Processor",
    "Motherboard",
    "RAM",
    "Storage",
    "Power Supply",
    "Casing"
  ];

  useEffect(() => {
    if (!product) {
      toast.error("Product not found");
      navigate("/admin/products");
    }
  }, [product, navigate]);

  useEffect(() => {
    if (product) {
      setProductId(product.productId || "");
      setName(product.name || "");
      setAltName(
        product.altNames
          ? Array.isArray(product.altNames)
            ? product.altNames.join(", ")
            : product.altNames
          : ""
      );
      setDescription(product.description || "");
      setPrice(
        product.price !== undefined && product.price !== null
          ? product.price
          : ""
      );
      setStock(
        product.stock !== undefined && product.stock !== null
          ? product.stock
          : ""
      );
      setLabledPrice(
        product.labledPrice !== undefined && product.labledPrice !== null
          ? product.labledPrice
          : ""
      );
      setIsAvailable(
        product.isAvailable === "true" || product.isAvailable === true
      );
      setCategory(product.category || "Laptop");
      setBrand(product.brand || "");
      setModel(product.model || "");
      setExistingImages(product.images || []);
    }
  }, [product]);

  useEffect(() => {
    if (isLoading) {
      api
        .get("/products")
        .then((response) => {
          setProducts(response.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load products count:", err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeNewImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Discount calculation
  const numericPrice = Number(price) || 0;
  const numericLabledPrice = Number(labledPrice) || 0;
  const discountAmount =
    numericLabledPrice > numericPrice ? numericLabledPrice - numericPrice : 0;
  const discountPercent =
    numericLabledPrice > 0 && discountAmount > 0
      ? Math.round((discountAmount / numericLabledPrice) * 100)
      : 0;

  // Stock status
  const numericStock = Number(stock) || 0;
  const getStockStatus = () => {
    if (numericStock > 10)
      return {
        label: "In Stock",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200"
      };
    if (numericStock > 0)
      return {
        label: "Low Stock",
        color: "text-amber-700 bg-amber-50 border-amber-200"
      };
    return {
      label: "Out of Stock",
      color: "text-rose-700 bg-rose-50 border-rose-200"
    };
  };
  const stockStatus = getStockStatus();

  // Alternative names chips preview
  const altNameChips = altName
    ? altName
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  async function handleUpdate() {
    if (!name.trim()) {
      toast.error("Product Name is required");
      return;
    }
    if (!price || Number(price) < 0) {
      toast.error("Please enter a valid price");
      return;
    }

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

      const newUploadedUrls = await Promise.all(imageUploadPromises);
      const finalImages = [...existingImages, ...newUploadedUrls];

      const productData = {
        productId: productId,
        name: name.trim(),
        altNames: altName
          ? altName
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        description: description.trim(),
        images: finalImages,
        price: Number(price),
        stock: Number(stock) || 0,
        labledPrice: Number(labledPrice) || Number(price),
        isAvailable: isAvailable === "true" || isAvailable === true,
        category: category,
        brand: brand.trim(),
        model: model.trim()
      };

      const res = await api.put("/products/" + productId, productData, {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      toast.success(res.data?.message || "Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update product");
    }
  }


  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {loading && <LoadingAnimation />}

      {/* Top Header & Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <Link
              to="/admin/products"
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-semibold">Edit Product</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
              <FiEdit3 className="text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Edit Product
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Update specifications, pricing, inventory and media for{" "}
                <span className="font-mono text-blue-600 font-semibold">
                  {productId}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Button 1: Catalog Count (Amber / Gold) */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-amber-50 hover:bg-amber-100/80 rounded-xl border border-amber-200/90 text-xs text-amber-800 font-semibold shadow-xs transition-all">
            <span>{products.length} Products</span>
            <button
              type="button"
              onClick={() => setIsLoading(true)}
              title="Refresh catalog count"
              className="text-amber-600 hover:text-amber-900 transition-colors cursor-pointer"
            >
              <FiRefreshCw
                className={`text-xs ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          {/* Button 2: Cancel (Rose / Red) */}
          <Link
            to="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100/90 border border-rose-200 hover:border-rose-300 text-rose-700 text-sm font-semibold transition-all flex items-center gap-2 shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <FiArrowLeft className="text-base text-rose-600" />
            <span>Cancel</span>
          </Link>

          {/* Button 3: Update Product (Emerald Green) */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-[0.98] flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FiCheck className="text-base" />
            <span>{loading ? "Updating..." : "Update Product"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) - Basic Details & Pricing */}
        <div className="xl:col-span-2 space-y-6">
          {/* Card 1: General Information */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  <FiInfo className="text-base" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    General Information
                  </h2>
                  <p className="text-xs text-slate-500">
                    Core identity, naming, category and specifications
                  </p>
                </div>
              </div>
              <span className="text-xs text-rose-500 font-medium">* Required</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Product ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FiHash className="text-blue-500" />
                  Product ID
                </label>
                <input
                  type="text"
                  value={productId}
                  disabled
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              {/* Product Name */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FiTag className="text-blue-500" />
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Samsung Odyssey G7 27'' QHD Curved Gaming Monitor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Category, Brand, Model */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FiLayers className="text-blue-500" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="e.g. Samsung, Logitech"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. LC27G75TQSEXXP"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Alternative Names */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  Alternative Names / Search Keywords
                </label>
                <span className="text-[11px] text-slate-400 italic">
                  Comma separated keywords
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. Samsung Odyssey G7, 240Hz Curved Monitor, 27 inch Gaming Monitor"
                value={altName}
                onChange={(e) => setAltName(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />

              {/* Tag Chips Preview */}
              {altNameChips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {altNameChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100 flex items-center gap-1"
                    >
                      <FiTag className="text-[10px]" />
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Product Description
                </label>
                <span className="text-[11px] text-slate-400">
                  {description.length} characters
                </span>
              </div>
              <textarea
                rows={4}
                placeholder="Write a clear and comprehensive product description (specifications, display, ports, warranty, etc.)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-y min-h-[110px]"
              />
            </div>
          </div>

          {/* Card 2: Pricing & Inventory */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                <FiDollarSign />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Pricing & Inventory
                </h2>
                <p className="text-xs text-slate-500">
                  Manage retail pricing, discounts, stock and active visibility
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Selling Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Selling Price (LKR) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Rs.
                  </span>
                  <input
                    type="number"
                    placeholder="195000.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Labelled Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Labelled / Original Price (LKR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Rs.
                  </span>
                  <input
                    type="number"
                    placeholder="215000.00"
                    value={labledPrice}
                    onChange={(e) => setLabledPrice(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Live Discount Callout Banner */}
            {discountAmount > 0 && (
              <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
                <div className="flex items-center gap-2 font-medium">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md font-bold text-[11px]">
                    {discountPercent}% OFF
                  </span>
                  <span>Customer Savings:</span>
                  <span className="font-bold text-emerald-800">
                    Rs. {discountAmount.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 italic hidden sm:inline">
                  Discount applied automatically
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Stock Quantity */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Stock Quantity
                  </label>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${stockStatus.color}`}
                  >
                    {stockStatus.label}
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Availability Status Toggle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Storefront Availability
                </label>
                <div className="grid grid-cols-2 gap-2 h-11">
                  <button
                    type="button"
                    onClick={() => setIsAvailable(true)}
                    className={`rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isAvailable === true || isAvailable === "true"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <FiCheckCircle className="text-sm" />
                    <span>Available</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAvailable(false)}
                    className={`rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isAvailable === false || isAvailable === "false"
                        ? "bg-rose-50 border-rose-300 text-rose-700 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <FiX className="text-sm" />
                    <span>Not Available</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) - Media Upload & Live Store Preview */}
        <div className="space-y-6">
          {/* Card 3: Media Upload */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  <FiImage />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Product Images
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage current and new image assets
                  </p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md border border-slate-200">
                {existingImages.length + images.length} total
              </span>
            </div>

            {/* Existing Images Gallery */}
            {existingImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Current Uploaded Images
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {existingImages.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50 group/thumb shadow-xs"
                    >
                      <img
                        src={imgUrl}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                          title="Remove image"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modern Drag & Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-blue-50/30 hover:bg-blue-50/60 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FiUploadCloud className="text-2xl" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Click to add new images
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, WEBP or AVIF up to 10MB each
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* New Selected Files Previews */}
            {images.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  New Images To Be Uploaded
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {images.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl border-2 border-blue-400 overflow-hidden bg-slate-50 group/thumb shadow-xs"
                      >
                        <img
                          src={previewUrl}
                          alt={`New preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                            title="Remove new image"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold">
                          New
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}