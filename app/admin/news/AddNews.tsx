"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddNews() {
    const[title, setTitle] = useState("");
    const[body, setBody] = useState("");
    const router = useRouter();

    
    useEffect(() => {
        const role = localStorage.getItem("role");
        console.log(role);
        if(role !== "GAME_MASTER"){
            router.push("/");
        }
    },[])

    async function addNews(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        const request = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/addnews`, {
            method: "POST",
            body: JSON.stringify({title, body})
        })
        const bodyy = await request.json();
        if(request.ok){
            toast.success(bodyy.message);
            setTitle("");
            setBody("");
        } else {
            toast.error(bodyy.message);
        }
    }


  return (
    <div className='flex flex-col mt-10 items-center w-full'>
        <h1 className='font-bold text-2xl text-primary mb-8'>Add News</h1>
        <form className='flex flex-col gap-10 w-10/12'>
            <input onChange={(e) => setTitle(e.target.value)} maxLength={200} value={title} type="text" className="text-center bg-inherit border-b-2 border-slate-400 text-lg p-2 outline-none text-primary invalid:border-red-500" placeholder='title'/>
            <textarea onChange={(e) => setBody(e.target.value)} maxLength={3000} value={body} className="text-center bg-inherit border-2 border-slate-400 text-lg p-2 outline-none text-primary invalid:border-red-500" ></textarea>
            <button onClick={addNews} className='mt-4 bg-secondary/[0.6] hover:bg-secondary/[0.9] p-3 rounded-lg w-44 mx-auto shadow-xl text-xl text-primary'>Add News</button>
        </form>
    </div>
  )
}
