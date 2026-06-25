
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  return (
    <div className="w-full h-full flex flex-col"> 
       <Link to="/admin/addproduct" className="w-[60px] h-[60px] bg-accent-color text-white rounded-full flex items-center justify-center text-3xl
        hover:bg-blue-600 fixed right-[35px] bottom-[35px]" >
            <MdAdd text-2xl />
       </Link>
    
    
      </div>

  )}
