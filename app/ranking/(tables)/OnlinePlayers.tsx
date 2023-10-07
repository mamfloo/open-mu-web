"use client"
import { CharacterOnline } from "@/app/_models/characterOnline"
import { useEffect, useState } from "react"
import { getImage } from '@/app/_utils/characterAvatarReturn';
import  Image  from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import MapsEnum from "@/app/_utils/mapEnum";
import { toast } from "react-toastify";

export default function OnlinePlayers() {
    const [characters, setCharacters] = useState<CharacterOnline[]>([])

    //call the online player api to see how many players there are on
    useEffect(() => {
        const fetchData = async () => {
          const status = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/status`);
          if(status.ok){
            const serverStatus =  await status.json();
            const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/ranking/online`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(serverStatus)
            })
            const final = await result.json();
            setCharacters(final)
          } else {
            toast.error("There was a problem trying to find the online users. Try again later.")
          }    
        }
        fetchData()
    },[])


  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-2">
      <table className='w-full m-0'>
        <thead className="m-5 bg-primary text-white">
          <tr className="mb-5">
            <th className='text-start pl-3 pb-3.5'>#</th>
            <th className='text-start  pb-3.5'>Name</th>
            <th className=' pb-3.5'>Map</th>
            <th className=' pb-3.5'>Position</th>
          </tr>
        </thead>
        <tbody>
        {characters.map((c, i) => (
          <tr key={c.Name} className="border-b-2 border-slate-300">
            <td className='text-start text-slate-700 font-bold pb-3.5 pl-3 pt-3'>{i+1}</td>
            <td className='text-start font-normal text-primary pb-3.5 pt-3'><Image className="inline-block mr-2 rounded-lg shadow-lg shadow-black" src={(getImage(c.CharacterClassId) as StaticImport)} width={35} alt="character_avatar"/> {c.Name}</td>
            <td className='pb-3.5 font-normal text-center text-primary text-lg pt-3'>{Object.values(MapsEnum)[Object.keys(MapsEnum).indexOf(c.CurrentMapId!)]}</td>
            <td className='pb-3.5 font-normal text-center text-primary text-lg pt-3'>{c.PositionX}, {c.PositionY}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
