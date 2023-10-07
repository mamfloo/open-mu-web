"use client"
import Image from "next/image"
import AccountIcon from "@/public/img/account/account.png"
import ResetIcon from "@/public/img/account/reset.png"
import {signOut} from "next-auth/react"
import Link from "next/link"

export default function UserPanel() {

  return (
    <div className="flex flex-col content-start ">
        <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
          <Link href={"/account"}><p className=" text-primary text-xl font-semibold text-start"><Image src={AccountIcon} width={30} alt={"reset_icon"} className="inline-block mb-1">
                  </Image> Account</p></Link>
        </button>
        <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
          <Link href={"/characters"}><p className=" text-primary text-xl font-semibold text-start"><Image src={ResetIcon} width={30} alt={"reset_icon"} className="inline-block mb-1">
                  </Image> Characters</p></Link>
        </button>
        

{/*         <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
            <p className=" text-primary text-xl font-semibold text-start"><Image src={AddStatsIcon} width={30} alt={"add_stats_icon"} className="inline-block mb-1">
                </Image> Add Stats</p>
        </button>
        <button className=" p-1 pt-2 hover:bg-secondary/[0.2]">
            <p className=" text-primary text-xl font-semibold text-start"><Image src={ClearPkIcon} width={30} alt={"add_stats_icon"} className="inline-block mb-1">
                </Image> Clear Pk</p>
        </button> */}

        <button className="mt-10 bg-secondary/[0.6] hover:bg-secondary/[0.9] p-3 rounded-lg w-44 
            mx-auto shadow-xl text-xl text-primary" onClick={() => signOut()}
          >Sign Out</button>
    </div>
  )
}
