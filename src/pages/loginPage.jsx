import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {

    
        //toast.success("Login successful");
    }// backend http request to login the user

     return (
    
           <div className="w-full h-full bg-[url('/bg5.jpg')] bg-cover bg-center flex justify-center items-center">

            <div className="w-[450px] h-[580px] backdrop-blur-md shadow-2xl rounded-lg p-6 flex flex-col items-center">

                <img src="/logo.png" className="w-[100px] h-[100px] object-cover bg-accent-color  rounded-lg"/>

                <h1 className="text-3xl font-bold text-white mt-5">Login</h1>

                <lable className="w-full mt-5 text-lg text-secondary-color font-semibold">Email</lable>


                <input
                onChange={
                    (e) =>{
                       // toast.success("Email updated successfully")
                       setEmail(e.target.value)
                    } 
                }
                
                type="email" className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color" placeholder="user@gmail.com"/>

                <lable className="w-full mt-5 text-lg text-secondary-color font-semibold">Password</lable>
                <input
                onChange={
                    (e) => {
                        setPassword(e.target.value);
                    }
                }
                type="password" className="w-full h-[40px] rounded-lg outline-none border-2 border-accent-color/50 focus:border-accent-color placeholder:text-secondary-color" placeholder="••••••••"/>
                <p className="w-full text-right mt-2  text-right text-accent-color cursor-pointer">Forgot password? reset <Link to="/reset-password" className="text-accent-color text-bold hover:underline">here</Link></p>

                <button onClick={handleLogin} className="w-full h-[40px] bg-accent-color text-white rounded-lg mt-5 hover:bg-accent-color/90 transition duration-300">Login</button>

                
                <p className="w-full text-right mt-2  text-right text-accent-color cursor-pointer">Dont have an account?register here <Link to="/register" className="text-accent-color text-bold hover:underline">Sign up</Link></p>
                <button className="w-full h-[40px] bg-gray-800 text-white rounded-lg mt-5 hover:bg-gray-700 transition-duration-300 flex items-center justify-center gap-2"><FcGoogle />Login with Google</button>


                
                 </div>


           </div>
        
    );
}