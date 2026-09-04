import LoadingAnimation from "../components/loadingAnimation";



export default function TestPage(){

    return(
        <div className="w-screen h-screen ">

            <div className="w-[200px] h-[200px] bg-red-700 md:bg-blue-600 lg:bg-green-600">

            </div>
            
        </div>
    )
    
}


// import { useState } from "react"

// import toast from "react-hot-toast"
// import uploadMedia from "../lib/uploadMedia"
// export default function TestPage(){

//     const [file , setFile] = useState(null)

//     function uploadFile(){

//         uploadMedia(file).then(
//             (res)=>{
//                 console.log(res)
//             }
//         ).catch(
//             (err)=>{
//                 console.log(err)
//                 toast.error("Upload failed")
//             }
//         )

//     }

//     // async function uploadFileAsync(){
//     //     try{
//     //         const fileUrl = await uploadMedia(file)
//     //         console.log(fileUrl)
//     //     }
//     //     catch(err){
//     //         console.log(err)
//     //         toast.error("Upload failed")
//     //     }
//     // }

//     return(
//         <div className="w-full h-full flex items-center justify-center">

//             <input type="file"
            
//             onChange={
//                 (e)=>{
//                     setFile(e.target.files[0])
//                 }
                
//             }/>

//             <button onClick={uploadFile} className="bg-green-600 text-white p-2 rounded-lg">Submit</button>
//         </div>
//     )

// }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpc3lmcXBzcmh5eXhoYW5xa2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDE4MjUsImV4cCI6MjA5NzAxNzgyNX0.sagKhV72cFOwxElLB56dehDDFfUQXGxGvGIqlxyOia0
//https://iisyfqpsrhyyxhanqkkl.supabase.co


// import { useState } from "react";
// import toast from "react-hot-toast";


// export default function TestPage(){
    
//     const [status , setStatus] = useState("Off")
//     const [level, setLevel] = useState("1")

    

//     return(
//         <div className="w-full h-full flex flex-col  items-center justify-center">
            
//             <h1 className="text-3xl font-bold">{status}</h1>

//             <div className="w-75 h-[50px] flex justify-center items-center">

//                 <button onClick={
//                     ()=>{
//                         // status = "On"
//                         setStatus("On")
//                         toast.success("The system is now on")
//                     }
//                 } className="p-2 text-white m-2 bg-green-600">Turn On</button>

//                 <button onClick={
//                     ()=>{
//                         setStatus("Off")
//                         toast.error("The system is now off")
//                     }
//                 } className="p-2 text-white m-2 bg-red-600">Turn Off</button>

//                 <button onClick={
//                     ()=>{
//                         setStatus("Idle")
//                         alert("The system is now idle")
//                     }
//                 } className="p-2 text-white m-2 bg-yellow-600">Idle</button>

//             </div>

//             <h1 className="text-3xl font-bold">{level}</h1>
//             <div className="w-75 h-[50px] flex justify-center items-center">

//                 <button onClick={
//                     ()=>{
//                       setLevel("1")
//                     }
//                 } className="p-2 text-white m-2 bg-green-600">1</button>
//                 <button onClick={
//                     ()=>{
//                         setLevel("2")
//                     }
//                 } className="p-2 text-white m-2 bg-red-600">2</button>
//                 <button onClick={
//                     ()=>{
//                         setLevel("3")
//                         setLoading(true)
//                     }
//                 } className="p-2 text-white m-2 bg-yellow-600">3</button>
//             </div>
            
//         </div>
//     )
// }
// export default function TestPage(){
//     return(
//         <div className="w-full h-full ">
//             <div className="w-[280px] h-[280px] m-4 bg-yellow-300 pr-[13px] ">
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit fugiat ipsam minima quam, hic fuga? Tenetur, sit minus distinctio voluptatem commodi molestiae vel alias enim ipsum rem in non nobis totam explicabo ratione doloribus dolore corporis laborum incidunt dignissimos amet laboriosam facilis harum?
//             </div>
//             <div className="w-[280px] h-[280px] mb-[30px] bg-yellow-300 pr-[13px] ">
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit fugiat ipsam minima quam, hic fuga? Tenetur, sit minus distinctio voluptatem commodi molestiae vel alias enim ipsum rem in non nobis totam explicabo ratione doloribus dolore corporis laborum incidunt dignissimos amet laboriosam facilis harum?
//             </div>
//             <div className="w-[280px] h-[280px] bg-yellow-300 pr-[13px] ">
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit fugiat ipsam minima quam, hic fuga? Tenetur, sit minus distinctio voluptatem commodi molestiae vel alias enim ipsum rem in non nobis totam explicabo ratione doloribus dolore corporis laborum incidunt dignissimos amet laboriosam facilis harum?
//             </div>
//             <div className="w-[280px] h-[280px] bg-yellow-300 pr-[13px] ">
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit fugiat ipsam minima quam, hic fuga? Tenetur, sit minus distinctio voluptatem commodi molestiae vel alias enim ipsum rem in non nobis totam explicabo ratione doloribus dolore corporis laborum incidunt dignissimos amet laboriosam facilis harum?
//             </div>
//             <div className="w-[280px] h-[280px] bg-yellow-300 pr-[13px] ">
//                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit fugiat ipsam minima quam, hic fuga? Tenetur, sit minus distinctio voluptatem commodi molestiae vel alias enim ipsum rem in non nobis totam explicabo ratione doloribus dolore corporis laborum incidunt dignissimos amet laboriosam facilis harum?
//             </div>
//         </div>
//     )
// }
// Alignemts and positions in css
// export default function TestPage(){
//     return(
//         <div className="w-full h-full ">
//             <div className="flex flex-col relative items-center justify-center w-[600px] h-[600px]  bg-yellow-300">

//                 <div className="w-[100px] h-[100px] bg-red-600">
//                 </div>
//                 <div className="fixed right-10 bottom-10 w-[100px] h-[100px] bg-green-600">
//                 </div>
//                 <div className="absolute right-0 top-0 w-[100px] h-[100px] bg-blue-600">
//                 </div>
//                 <div className="w-[100px] h-[100px] bg-white">
//                 </div>
//                 <div className="w-[100px] h-[100px] bg-black">
//                 </div>

//             </div>
//         </div>
//     )
// }