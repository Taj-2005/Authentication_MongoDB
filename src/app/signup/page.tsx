"use client";
import React,{ useState} from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

const SignUp = () => {
    const router = useRouter();  
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const onSignUp = async (e: React.FormEvent) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('/api/users/signup', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            router.push('/login');
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || "Signup failed. Try again.";
            toast.error(message);
        }
    };
    return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <div className='w-1/2 h-1/2 border-1 shadow-2xl border-slate-300 flex flex-col justify-center items-center p-10 rounded-3xl'>
            <h1 className='text-3xl pb-5 font-geist-mono'>SignUp Page</h1>
            <form onSubmit={onSignUp} className='flex flex-col justify-center items-center gap-2'>
                <input 
                id="username" 
                onChange={(e => setUser({...user, username: e.target.value}))}
                value={user.username} 
                type="text" 
                placeholder='Username' 
                className='border-b-2 border-slate-300 py-2 my-2 pr-10 mx-5' 
                required
                />

                <input 
                id="password" 
                onChange={(e => setUser({...user, password: e.target.value}))}
                value={user.password} 
                type="password" 
                placeholder='Password' 
                className='border-b-2 border-slate-300 py-2 my-2 pr-10 mx-5' 
                required
                />

                <input 
                id="email" 
                onChange={(e => setUser({...user, email: e.target.value}))}
                value={user.email} 
                type="email" 
                placeholder='Email' 
                className='border-b-2 border-slate-300 py-2 my-2 pr-10 mx-5' 
                required
                />

                <button type='submit' className='bg-blue-500 text-white py-2 px-6 rounded-md my-2'>SignUp</button>
            </form >
        </div>
    </div>
    )
}

export default SignUp
