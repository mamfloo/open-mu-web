"use client"
import Image from "next/image"
import AccountIcon from "@/public/img/account/account.png"
import ResetIcon from "@/public/img/account/reset.png"
import {signOut} from "next-auth/react"
import Link from "next/link"
import AddNews from "@/public/img/account/add-news.png"
import { useEffect } from "react"

export default function UserPanel({role} : {role: string}) {

  useEffect(() => {
    localStorage.setItem("role", role);
  },[])
  const isGm = role === "GAME_MASTER";

  function onSignOut(){
    localStorage.removeItem("role");
    signOut();
  }

  return (
    <div className="flex flex-col content-start ">
        <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
          <Link href={"/account"}><p className=" text-primary text-xl font-semibold text-start"><Image src={AccountIcon} width={30} alt={"account_icon"} className="inline-block mb-1">
                  </Image> Account</p></Link>
        </button>
        <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
          <Link href={"/characters"}><p className=" text-primary text-xl font-semibold text-start"><Image src={ResetIcon} width={30} alt={"character_icon"} className="inline-block mb-1">
                  </Image> Characters</p></Link>
        </button>
        {isGm && <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
          <Link href={"/admin/news"}><p className=" text-primary text-xl font-semibold text-start"><Image src={AddNews} width={28} alt={"add_news_icon"} className="inline-block mb-1">
                  </Image> News</p></Link>
        </button>}
        

{/*         <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
            <p className=" text-primary text-xl font-semibold text-start"><Image src={AddStatsIcon} width={30} alt={"add_stats_icon"} className="inline-block mb-1">
                </Image> Add Stats</p>
        </button>
        <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
            <p className=" text-primary text-xl font-semibold text-start"><Image src={ClearPkIcon} width={30} alt={"add_stats_icon"} className="inline-block mb-1">
                </Image> Clear Pk</p>
        </button> */}

        <button className="mt-10 bg-secondary/[0.6] hover:bg-secondary/[0.9] p-3 rounded-lg w-44 
            mx-auto shadow-xl text-xl text-primary" onClick={() => onSignOut()}
          >Sign Out</button>
    </div>
  )
}
