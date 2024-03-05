"use client"

import { getSession } from "next-auth/react";
import { useState } from "react"
import { toast } from "react-toastify"


export default function Account() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [loginName, setLoginName] = useState("")

    //set lognName
    async function setName(){
        const session = await getSession();
        setLoginName(session?.user.username!)
    }

    //request to change password
    async function changePassword(e: React.MouseEvent<HTMLElement>){
        e.preventDefault()
        await setName();
        const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/account/changepassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: loginName,
                oldPassword: oldPassword,
                newPassword: newPassword,
                repeatNewPassword: repeatNewPassword
            })
        })
        const body = await result.json()
        if(result.ok){
            toast.success(body.message)
            setOldPassword("");
            setNewPassword("");
            setRepeatNewPassword("");
        } else {
            toast.error(body.message)
        }
    }

  return (
    <div className="flex flex-col mt-10 items-center  w-full">
        <h1 className="font-bold text-2xl text-primary mb-8">Change Password</h1>
        <form className="flex flex-col gap-10 w-56 items-center text-center">
            <input onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} className="text-center bg-inherit border-b-2 border-slate-400 text-lg p-2 outline-none text-primary invalid:border-red-500" type="password" name="oldPassword" id="oldPassword" placeholder="old password" minLength={8}/>
            <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className="text-center bg-inherit border-b-2 border-slate-400 text-lg p-2 outline-none text-primary invalid:border-red-500" type="password" name="newPassword" id="newPassword" placeholder="new password" minLength={8}/>
            <input onChange={(e) => setRepeatNewPassword(e.target.value)} value={repeatNewPassword} className="text-center bg-inherit border-b-2 border-slate-400 text-lg p-2 outline-none text-primary invalid:border-red-500" type="password" name="repeatNewPassword" id="repeatNewPassword" placeholder="repeat new password" minLength={8}/>
            <button onClick={(e) => changePassword(e)} className="bg-secondary/[0.6] px-5 p-3 rounded-xl w-5/6 text-lg text-primary hover:bg-secondary/[0.9]">Change Password</button>
        </form>
    </div>
  )
}
