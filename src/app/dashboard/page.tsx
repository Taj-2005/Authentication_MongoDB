"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => { 
    const router = useRouter();
    const [data, setData] = useState(" ")
    const logout = async () => {
        try{
            await axios.get('/api/users/signout');
            toast.success("Logout successful!");
            router.push("/login");
        }catch(err : any){
            console.log(err);
            toast.error(err.message);
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data.username);
    }
  return (
    <div className="font-geist-mono min-h-screen flex flex-col justify-center items-center text-center text-4xl gap-4">
        <div>Hello World!</div>
        <button onClick={logout} className="text-2xl p-2 bg-red-500 rounded-2xl font-geist-sans">Log out !</button>
        <div className="bg-slate-300 text-black text-2xl">{data === "" ? "" : <Link href={`/dashboard/${data}`}>{data}</Link>}</div> 
        <button onClick={getUserDetails} className="text-2xl p-2 bg-purple-500 rounded-2xl font-geist-sans ">Get User Details</button>
    </div>
  )
}

export default page
