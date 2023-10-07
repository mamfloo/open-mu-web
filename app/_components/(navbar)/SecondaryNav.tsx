"use client"

import Image from "next/image"
import DownloadIcon from "../../../public/img/download.png"
import RegisterIcon from "../../../public/img/register.png"
import { useRouter } from "next/navigation"

export default function SecondaryNav() {

  const router = useRouter();
  const navigate = (location: string) =>{
    router.push(location);
  } 

  return (
    <div className="mt-[350px] w-2/4 flex justify-center gap-44">
      <button className="text-3xl p-7 pr-10 text-teal-900 font-bold bg-secondary/[.7] rounded-[70px] border-4 border-white shadow-xl shadow-slate-500 hover:border-teal-600 inline-flex"
        onClick={() => navigate("/download")}>
        <Image className="mr-1" src={DownloadIcon} alt="downlaod-icons" width={40}/> <span className=""> Download</span>
      </button>
      <button className="text-3xl p-7 pr-10 text-teal-900 font-bold bg-secondary/[.7] rounded-[70px] border-4 border-white shadow-xl shadow-slate-500 hover:border-teal-600 inline-flex"
        onClick={() => navigate("/register")}>
        <Image className="mr-1" src={RegisterIcon} alt="downlaod-icons" width={43}/> <span className="ml-1 mt-0.5"> Register</span>
      </button>
    </div>
  )
}
