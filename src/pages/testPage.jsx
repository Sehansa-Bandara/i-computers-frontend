import { useState } from "react";
import { uploadMedia } from "../lib/uploadMedia";
import { toast } from "react-hot-toast";


export default function TestPage() {

  const [file, setFile] = useState(null)

  function uploadFile() {
      
   uploadMedia(file)
   

      
  }
    return (
        <div className="w-full h-full flex items-center justify-center">
            <input type="file" onChange={
              (e) => {
                setFile(e.target.files[0])
              }
            } />
               
            
            <button className="bg-green-600 text-white p-2 rounded-lg ml-2" onClick={uploadFile}>Upload</button>
        </div>
    );
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1dmhibmpqeWZhd2JoYnpic3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTgxMzMsImV4cCI6MjA5Nzc5NDEzM30.3jezo0TelDf_bbwnt5kSMIMyLnEAk83OArhDbG6r0xY
//https://cuvhbnjjyfawbhbzbsqr.supabase.co



// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function TestPage() {

//     const [status, setStatus] = useState("on");
//     const [level, setLevel] = useState("1");
        
//     return (
//         <div className="w-full h-full flex flex-col items-center justify-center">

//             <h1 className="text-3xl font-bold">{status}</h1>
          

//             <div className="w-75 h-[50px] flex justify-center item-center">

//             <button onClick={() => {setStatus("on"); toast.success("Turned on");}} className="p-2  text-white m-2 bg-green-600">Turn On</button>
//             <button onClick={() => {setStatus("off"); toast.error("Turned off");}} className="p-2 text-white m-2 bg-red-800">Turn Off</button>
//             <button onClick={() => {setStatus("idle"); toast.info("Set to idle");}} className="p-2 text-white m-2 bg-yellow-600">Idle</button>


//           <h1 className="text-3xl font-bold">{level}</h1>
//           <div className="w-75 h-[50px] flex justify-center item-center">
//             <button onClick={() => {setLevel("1"); toast.success("Level set to 1");}} className="p-2  text-white m-2 bg-green-600">1</button>
//             <button onClick={() => {setLevel("2"); toast.success("Level set to 2");}} className="p-2 text-white m-2 bg-red-800">2</button>
//             <button onClick={() => {setLevel("3"); toast.success("Level set to 3");}} className="p-2 text-white m-2 bg-yellow-600">3</button>
// </div>
// </div>
    
//  </div>    );
// }













// //export default function TestPage() {
//     //return (
//       //  <div className="w-screen h-screen">
//         //    <div className="w-[600px] h-[600px] bg-green-900">
//           //  <div className="w-[100px] h-[100px] bg-yellow-400"></div>
//             //<div className="w-[100px] h-[100px] bg-red-500"></div>
//             //<div className="w-[100px] h-[100px] bg-blue-500"></div>
//            // <div className="w-[100px] h-[100px] bg-pink-500"></div>
//             //</div>
//        // </div>
//     //);
// //}