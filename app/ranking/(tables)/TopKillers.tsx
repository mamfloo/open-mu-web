"use client"

import MapsEnum from "@/app/_utils/mapEnum";
import { Character } from "@prisma/client";
import { useEffect, useState } from "react"
import { getImage } from "@/app/_utils/characterAvatarReturn";
import Image from "next/image"
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function TopKillers() {
  const [characters, setCharacters] = useState<Character[]>([])

  //calls the top killers api
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/ranking/killers`);
      const res = await response.json();
      setCharacters(res);
    }
    fetchData();
  }, [])

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-2">
      <table className='w-full m-0'>
        <thead className="p-3 bg-primary text-white">
          <tr>
            <th className='text-start pl-3 pb-3'>#</th>
            <th className='text-start  pb-3'>Name</th>
            <th className=' pb-3'>Kill Count</th>
            <th className="pb-3">Location</th>
          </tr>
        </thead>
        <tbody>
        {characters.map((c, i) => (
          <tr key={c.Name} className="border-b-2 border-slate-300">
            <td className='text-start text-slate-700 font-bold pb-3.5 pl-3 pt-3 '>{i+1}</td>
            <td className='text-start font-normal text-primary pb-3.5 pt-3'><Image className="inline-block rounded-lg shadow-lg shadow-black" src={(getImage(c.CharacterClassId) as StaticImport)} width={35} alt="character_avatar"/>  {c.Name}</td>
            <td className='pb-3.5 font-semibold text-center text-red-500 text-lg pt-3'>{c.PlayerKillCount}</td>
            <td className='text-center font-normal text-primary pb-3.5 pt-3'>{Object.values(MapsEnum)[Object.keys(MapsEnum).indexOf(c.CurrentMapId!)]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
