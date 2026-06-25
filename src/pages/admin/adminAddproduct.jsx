export default function AddProductForm() {
  return (
    <div className="w-full h-full flex p-4">

        <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between">
            <h1 className="text-2xl font-semibold text-secondary-color">Add New Product</h1>

            <div className="flex gap-2">
                <link to="/admin/products" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Cancel</link>
                <button className="p-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700">Save</button>
            </div>

        </div>
        
        </div>

    
  )}