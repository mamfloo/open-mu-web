"use client"

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify"

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);

    //calls the register api
    const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {  
        e.preventDefault();
        if(password != repeatPassword){
            toast.error("The passwords must coincide")
            return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/account/register`, {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({LoginName: username, EMail: email, Password: password, RepeatPassword: repeatPassword})
        }).then( resp => resp.text()).then(text => JSON.parse(text));
        
        if(response.user === null){
            toast.error(response.message);
        } else {
            toast.success(response.message);
            setEmail("");
            setUsername("");
            setPassword("");
            setRepeatPassword("");
        }
    }

  return (
    <div className="flex items-center flex-col text-center mx-auto mt-10 w-full">
        <h2 className="text-2xl font-semibold text-primary mb-8">Registration</h2>
        <form className="w-72">
            <input type="text" placeholder="username" minLength={4} onChange={(e) => setUsername(e.target.value)} value={username}
                className="border-b-2 p-2 invalid:border-red-500  border-slate-400 outline-none bg-inherit text-lg text-center mb-2 text-primary " />
            <input type="email" placeholder="email" minLength={8} onChange={(e) => setEmail(e.target.value)} value={email}
                className="mt-6 border-b-2 p-2 invalid:border-red-500  border-slate-400 outline-none bg-inherit text-lg text-center mb-2 text-primary" />
            <input type="password" placeholder="password" minLength={8} onChange={(e) => setPassword(e.target.value)} value={password}
                className="mt-6 border-b-2 p-2 invalid:border-red-500  border-slate-400 outline-none bg-inherit text-lg text-center mb-2 text-primary" />
            <input type="password" placeholder="repeat password" minLength={8} onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword}
                className="mt-6 border-b-2 p-2 invalid:border-red-500  border-slate-400 outline-none bg-inherit text-lg text-center mb-8 text-primary" />
            <label htmlFor="terms" className="text-primary inline-block"><input onClick={() => setIsDisabled(!isDisabled)} type="checkbox" id="terms" name="terms" className="w-4 h-4 bg-gray-100 rounded-md focus:ring-blue-400 focus:ring-2"/> Accept 
            <Link href={"/terms-and-conditions"} className="italic text-primary">Terms and Conditions</Link></label>
            <button disabled={isDisabled} onClick={onSubmit} className="mt-8 bg-secondary/[0.6] disabled:bg-slate-300/[0.9] hover:bg-secondary/[0.9] p-3 rounded-lg text-primary w-44 mx-auto shadow-xl text-xl" >Register</button>
        </form>
        
    </div>
  )
}
