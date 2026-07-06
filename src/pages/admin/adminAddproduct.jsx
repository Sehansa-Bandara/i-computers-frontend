import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { uploadMedia } from "../../lib/uploadMedia.js";



export default function AddProductForm() {
    const[productId, setProductId] = useState("");
    const[name, setName] = useState("");
    const[altName, setAltName] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    const[stock, setStock] = useState("");
    const[labledPrice, setLabledPrice] = useState("");
    const[isAvailable, setIsAvailable] = useState(true);
    const[category, setCategory] = useState("Laptop");
    const[brand, setBrand] = useState("");
    const[model, setModel] = useState("");
    const[images, setImages] = useState([]);

     const navigate = useNavigate()

    async function handleSave() {
        const token = localStorage.getItem("token")
        if (token==null){
          toast.error("You are not logged in")
          navigate("/login")
          return
        }

        try {
          const imageUploadPromises = []

            for(let i=0; i<images.length; i++){
              imageUploadPromises[i] = uploadMedia(images[i])

              
            }
            console.log(imageUploadPromises)
            const imageUrls = await Promise.all(imageUploadPromises)
          //  const fasterUploadedImageUrl = await.Promise.race(imageUploadPromises)


            
        } catch(err){
          console.log(err)
          toast.error("Failed to add product")
        }




    }
  return (
    <div className="w-full max-h-full flex  flex-wrap p-4 item-start  gap-0 overflow-y-scroll">

        { <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-6">
            <h1 className="text-2xl font-semibold text-secondary-color">Add New Product</h1>

            <div className="flex gap-2">
                <Link to="/admin/products" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Cancel</Link>
                <button className="p-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700" onClick={handleSave}>
                    Save
                </button>
            </div>

        </div> }
          <div className="w-[15%]flex flex-col h-[80px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Product ID</label>
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        
        </div>
           <div className="w-[40%]flex flex-col h-[80px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        
        </div>
        <div className="w-[45%] flex flex-col h-[80px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Alternative Names</label>
          <input type="text" value={altName} onChange={(e) => setAltName(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div>
         <div className="w-full flex flex-col p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className=" w-full h-[100px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        
        </div>
        <div className="w-[45%] flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Images</label>
          <input type="file" multiple onChange={(e) => setImages(e.target.files)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />

        </div>

        <div className="w-[30%] flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div>

        <div className="w-[30%] flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Labelled Price</label>
          <input type="number" value={labledPrice} onChange={(e) => setLabledPrice(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div>
         <div className="w-1/4 flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div>
       {/* <div className="w-[30%] flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Availability</label>
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div> */}

        <div className="w-1/4 flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Availability</label>
          <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4">
               <option value={true}>Available</option>
               <option value={false}>Not Available</option>
          </select>
        </div>

        <div className="w-1/4 flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4">
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
        <div className="w-1/4 flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Brand</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div>
        <div className="w-1/4 flex flex-col h-[100px] p-2">
          <label className="text-secondary-color text-lg font-semibold mb-2">Model</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className=" w-full h-[40px] rounded-md border-2 border-gray-300 p-2 mb-4" />
        </div>

                </div>

          
    
        
  );
  }