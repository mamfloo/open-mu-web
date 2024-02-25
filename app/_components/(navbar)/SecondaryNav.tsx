"use client"

import Image from "next/image"
import DownloadIcon from "../../../public/img/download.png"
import RegisterIcon from "../../../public/img/register.png"
import DiscordIcon from "@/public/img/discord.png"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SecondaryNav() {

  const router = useRouter();
  const navigate = (location: string) =>{
    router.push(location);
  } 

  return (
    <div className="mt-[350px] w-[1250px] relative">
      <div className="flex justify-center gap-44">
        <button className="text-3xl p-7 pr-10 text-teal-900 font-bold bg-secondary/[.7] rounded-[70px] border-4 border-white shadow-xl shadow-slate-500 hover:border-teal-600 inline-flex"
          onClick={() => navigate("/download")}>
          <Image className="mr-1" src={DownloadIcon} alt="downlaod-icons" width={40}/> <span className=""> Download</span>
        </button>
        <button className="text-3xl p-7 pr-10 text-teal-900 font-bold bg-secondary/[.7] rounded-[70px] border-4 border-white shadow-xl shadow-slate-500 hover:border-teal-600 inline-flex"
          onClick={() => navigate("/register")}>
          <Image className="mr-1" src={RegisterIcon} alt="downlaod-icons" width={43}/> <span className="ml-1 mt-0.5"> Register</span>
        </button>
      </div>
      <div className="w-fit absolute right-10 mt-10">
        <Link href={process.env.NEXT_PUBLIC_DISCORD_LINK || ""} target="_blank"><Image src={DiscordIcon} width={60} alt="discord_logo" /></Link>
      </div>
    </div>
  )
}
