"use client";
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const onLogin = async (e : React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/users/login', user);
            console.log("Login Successful", response.data);
            toast.success("Login successful!");
            router.push("/dashboard");  
        }catch(err : any){
            console.log(err);
            toast.error(err.message);
        }  
    }
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className='w-1/2 h-1/2 border-1 shadow-2xl border-slate-300 flex flex-col justify-center items-center p-10 rounded-3xl'>
                <h1 className='text-3xl pb-5 font-geist-mono'>Login Page</h1>
                <form onSubmit={onLogin} className='flex flex-col justify-center items-center gap-2'>
                    <input
                    id='username'
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    type="text" 
                    placeholder='Username' 
                    className='border-b-2 border-slate-300 py-2 my-2 pr-10 mx-5' 
                    required
                    />

                    <input
                    id='password'
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    type="password" 
                    placeholder='Password' 
                    className='border-b-2 border-slate-300 py-2 my-2 pr-10 mx-5' 
                    required
                    />

                    <button type='submit' className='bg-blue-500 text-white py-2 px-6 rounded-md my-2'>Login</button>
                </form>
            </div>
        </div>
    )
    }

export default Login
