import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../lib/api.js";
import DeleteProductModal from "../../components/deleteProductModal.jsx";
import { useLocation } from "react-router-dom";


const sampleProducts = [
  {
    productId: "PRD001",
    name: "Logitech G502 HERO Gaming Mouse",
    altNames: ["G502 HERO", "Logitech Gaming Mouse"],
    description:
      "High-performance wired gaming mouse with HERO 25K sensor, customizable RGB lighting, and 11 programmable buttons.",
    images: [
      "https://resource.logitechg.com/w_800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png"
    ],
    price: 59.99,
    labledPrice: 69.99,
    stock: 25,
    isAvailable: true,
    category: "Gaming Mouse",
    brand: "Logitech",
    model: "G502 HERO"
  },

  {
    productId: "PRD002",
    name: "Razer BlackWidow V3 Mechanical Keyboard",
    altNames: ["BlackWidow V3", "Razer Keyboard"],
    description:
      "Mechanical RGB gaming keyboard featuring Green Switches and durable aluminum construction.",
    images: [
      "https://assets3.razerzone.com/XmHkYh2p3JXqN8A6N2m5x5QfQ0A=/1500x1000/https%3A%2F%2Fmedias-p1.phoenix.razer.com%2Fsys-master-phoenix-images-container%2Fh9b%2Fh2c%2F9084250961950%2Fblackwidow-v3-hero.png"
    ],
    price: 129.99,
    labledPrice: 149.99,
    stock: 15,
    isAvailable: true,
    category: "Keyboard",
    brand: "Razer",
    model: "BlackWidow V3"
  },

  {
    productId: "PRD003",
    name: "Samsung 980 1TB NVMe SSD",
    altNames: ["Samsung SSD", "980 NVMe"],
    description:
      "Fast PCIe Gen3 NVMe SSD offering read speeds up to 3500 MB/s.",
    images: [
      "https://images.samsung.com/is/image/samsung/p6pim/lk/mz-v8v1t0bw/gallery/lk-980-nvme-mz-v8v1t0bw-530496887"
    ],
    price: 89.99,
    labledPrice: 99.99,
    stock: 30,
    isAvailable: true,
    category: "Storage",
    brand: "Samsung",
    model: "980 1TB"
  },

  {
    productId: "PRD004",
    name: "Kingston Fury Beast 16GB DDR4 RAM",
    altNames: ["Kingston RAM", "Fury Beast"],
    description:
      "16GB DDR4 3200MHz desktop memory designed for gaming and productivity.",
    images: [
      "https://www.kingston.com/datasheets/KF432C16BBK2_16.jpg"
    ],
    price: 49.99,
    labledPrice: 59.99,
    stock: 40,
    isAvailable: true,
    category: "Memory",
    brand: "Kingston",
    model: "KF432C16BB/16"
  },

  {
    productId: "PRD005",
    name: "Corsair RM750e 750W Power Supply",
    altNames: ["RM750e", "Corsair PSU"],
    description:
      "80 Plus Gold fully modular ATX power supply for gaming PCs.",
    images: [
      "https://cwsmgmt.corsair.com/pdp/rm-series-2023/images/rm750e_01.png"
    ],
    price: 119.99,
    labledPrice: 139.99,
    stock: 12,
    isAvailable: true,
    category: "Power Supply",
    brand: "Corsair",
    model: "RM750e"
  },

  {
    productId: "PRD006",
    name: "ASUS TUF Gaming VG249Q1A Monitor",
    altNames: ["ASUS Monitor", "VG249Q1A"],
    description:
      "23.8-inch Full HD IPS gaming monitor with 165Hz refresh rate.",
    images: [
      "https://dlcdnwebimgs.asus.com/gain/5C2F2A44-0E6A-4B95-86E6-40A58D3F8A08/"
    ],
    price: 189.99,
    labledPrice: 209.99,
    stock: 18,
    isAvailable: true,
    category: "Monitor",
    brand: "ASUS",
    model: "VG249Q1A"
  },

  {
    productId: "PRD007",
    name: "TP-Link Archer T3U AC1300 USB WiFi Adapter",
    altNames: ["Archer T3U", "USB WiFi Adapter"],
    description:
      "Dual-band USB WiFi adapter supporting speeds up to 1300 Mbps.",
    images: [
      "https://static.tp-link.com/upload/product-overview/2022/202209/20220930/Archer%20T3U.png"
    ],
    price: 29.99,
    labledPrice: 34.99,
    stock: 45,
    isAvailable: true,
    category: "Networking",
    brand: "TP-Link",
    model: "Archer T3U"
  },

  {
    productId: "PRD008",
    name: "SanDisk Ultra 128GB USB 3.0 Flash Drive",
    altNames: ["SanDisk USB", "128GB Flash Drive"],
    description:
      "High-speed USB 3.0 flash drive with up to 130 MB/s read speed.",
    images: [
      "https://www.westerndigital.com/content/dam/store/en-us/assets/products/usb-flash-drives/sandisk-ultra-usb-3/gallery/sandisk-ultra-usb-3-front.png"
    ],
    price: 18.99,
    labledPrice: 24.99,
    stock: 60,
    isAvailable: true,
    category: "Storage",
    brand: "SanDisk",
    model: "Ultra 128GB"
  },

  {
    productId: "PRD009",
    name: "HyperX Cloud II Gaming Headset",
    altNames: ["Cloud II", "HyperX Headset"],
    description:
      "7.1 surround sound gaming headset with memory foam ear cushions.",
    images: [
      "https://media.kingston.com/hyperx/product/hx-product-headset-cloud-ii-red-lg.jpg"
    ],
    price: 79.99,
    labledPrice: 99.99,
    stock: 22,
    isAvailable: true,
    category: "Headset",
    brand: "HyperX",
    model: "Cloud II"
  },

  {
    productId: "PRD010",
    name: "Dell MS116 Optical Mouse",
    altNames: ["Dell Mouse", "MS116"],
    description:
      "Reliable wired optical mouse suitable for office and home use.",
    images: [
      "https://i.dell.com/sites/imagecontent/products/PublishingImages/peripherals/ms116/ms116-gallery-504x350.png"
    ],
    price: 12.99,
    labledPrice: 15.99,
    stock: 100,
    isAvailable: true,
    category: "Mouse",
    brand: "Dell",
    model: "MS116"
  }
];


const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' rx='6' fill='%23f1f5f9'/%3E%3Cpath d='M19 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-9 17h30l-9-12-6 8-4.5-6-10.5 10z' fill='%2394a3b8'/%3E%3C/svg%3E";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleDelete(productId) {
    toast(
      (t) => (
        <div className="w-[250px] h-[150px] flex flex-col justify-center items-center gap-3">
          <h1 className="text-lg font-semibold text-slate-800 text-center">
            Are you sure you want to delete this product?
          </h1>
          <div className="flex gap-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer shadow-sm transition-all"
              onClick={async () => {
                toast.dismiss(t.id);
                const token = localStorage.getItem("token");
                try {
                  await api.delete(`/products/${productId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                  toast.success("Product deleted successfully");
                  fetchProducts();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 cursor-pointer shadow-sm transition-all"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: Infinity,
      }
    );
  }

  // make a backend call to get all products
  // update the product variables value with response from backend
  const fetchProducts = () => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products from backend:", err);
        toast.error("Failed to load products from server");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-4 overflow-y-auto">
      <div className="w-full h-[80px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>

        <div className="flex items-center gap-3">
          <span className="text-slate-600 font-medium">{products.length} Products</span>
          <button
            onClick={fetchProducts}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white text-center text-sm font-semibold h-[48px]">
              <th className="p-3">Image</th>
              <th className="p-3">ID</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Category</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Model</th>
              <th className="p-3">Is Available</th>
              <th className="p-3">Labeled Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center p-6 text-slate-500 font-medium">
                  Loading products from backend...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-6 text-slate-500 font-medium">
                  No products found in backend catalog.
                </td>
              </tr>
            ) : (
              products.map((item) => {
                const imageSrc =
                  item.images && item.images.length > 0 && item.images[0]
                    ? item.images[0]
                    : PLACEHOLDER_IMAGE;

                return (
                  <tr
                    key={item.productId || item._id}
                    className="border-b border-slate-100 hover:bg-slate-50 text-center text-sm text-slate-700 transition-colors"
                  >
                    <td className="p-2 flex justify-center">
                      <img
                        src={imageSrc}
                        alt={item.name}
                        className="w-[50px] h-[50px] object-cover rounded-md border border-slate-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </td>
                    <td className="p-2 font-semibold text-blue-900">{item.productId}</td>
                    <td className="p-2 font-medium text-slate-900 max-w-[200px] truncate">{item.name}</td>
                    <td className="p-2 font-bold text-emerald-700">Rs. {item.price}</td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.brand}</td>
                    <td className="p-2">{item.model}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${item.isAvailable
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                          }`}
                      >
                        {item.isAvailable ? "Available" : "Not available"}
                      </span>
                    </td>
                    <td className="p-2 text-slate-500">Rs. {item.labledPrice || item.price}</td>
                    <td className="p-2">
                      {/* icons only */}
                      <div className="flex gap-2 justify-center items-center text-lg">
                        <Link to="/admin/editproduct" state={item}>
                          <CiEdit
                            className="hover:text-blue-600 cursor-pointer transition-colors"
                            title="Edit Product"
                          />
                        </Link>
                        {/* <CiTrash
                          className="hover:text-red-600 cursor-pointer transition-colors"
                          title="Delete Product"
                          onClick={() => handleDelete(item.productId)}
                        /> */}
                        {/* DELETE BUTTON USING MODAL  */}
                        <DeleteProductModal />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Link
        to="/admin/addproduct"
        className="w-[60px] h-[60px] bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl hover:bg-blue-700 fixed right-[35px] bottom-[35px] shadow-lg transition-all"
      >
        <MdAdd className="text-2xl" />
      </Link>
    </div>
  );
}

