"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {toast} from "react-toastify"

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  function sUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }
  function sPassword(e: React.ChangeEvent<HTMLInputElement>){
    setPassword(e.target.value)
  }

  //try to login
  async function login(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false
    })
    setUsername("");
    setPassword("");
    if(signInData?.error){
      toast.error(" Invalid Username or Password");
    }else {
      router.refresh();
      toast.success("Welcome back " + username)
    }
  }

  return (
    <>
    <form className="flex flex-col w-72 gap-7 text-primary  text-center">
        <h3 className="text-2xl">Account Login</h3>
        <input type="text" minLength={4} placeholder="userename" className="pb-2 mt-1 bg-inherit focus:outline-none text-center text-xl placeholder:text-slate-500 placeholder:text-xl
          border-b-2 border-slate-400 invalid:border-red-500"
          onChange={sUsername} value={username}/>
        <input type="password" minLength={4} placeholder="password" className="pb-2 bg-inherit focus:outline-none text-center text-xl placeholder:text-slate-500 placeholder:text-xl
          border-b-2 border-slate-400 invalid:border-red-500"
         onChange={sPassword} value={password}/>
        <button className="mt-2 bg-secondary/[0.6] hover:bg-secondary/[0.9] p-3 rounded-lg w-44 mx-auto shadow-xl text-xl text-primary"
          onClick={login}>Sign In</button>
        <p><Link href="/recoverpassword">Lost password?</Link> | <Link href="/register">Register</Link></p>
    </form>
    </>
  )
}
