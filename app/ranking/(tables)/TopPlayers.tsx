"use client"

import { CharacterRanking } from "@/app/_models/character";
import { useEffect, useState } from "react";
import Image from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { getImage } from "@/app/_utils/characterAvatarReturn";


export default function TopPlayers() {
  const [characters, setCharacters]= useState<CharacterRanking[]>([])

  //cals the top players api
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/ranking/reset`);
      const res = await response.json();
      setCharacters(res);
    }
    fetchData();
  }, [])

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-2">
      <table className='w-full m-0'>
        <thead className="m-5 bg-primary text-white">
          <tr className="mb-5">
            <th className='text-start pl-3 pb-3.5'>#</th>
            <th className='text-start  pb-3.5'>Name</th>
            <th className=' pb-3.5'>Level</th>
            <th className=' pb-3.5'>Master Level</th>
            <th className=' pb-3.5'>Resets</th>
          </tr>
        </thead>
        <tbody>
        {characters.map((c, i) => (
          <tr key={c.Name} className="border-b-2 border-slate-300">
            <td className='text-start text-slate-700 font-bold pb-3.5 pl-3 pt-3'>{i+1}</td>
            <td className='text-start font-normal text-primary pb-3.5 pt-3'><Image className="inline-block mr-2 rounded-lg shadow-lg shadow-black" src={(getImage(c.CharacterClassId) as StaticImport)} width={35} alt="character_avatar"/> {c.Name}</td>
            <td className='pb-3.5 font-normal text-center text-primary text-lg pt-3'>{c.lvl}</td>
            <td className='pb-3.5 font-normal text-center text-primary text-lg pt-3'>{c.masterlvl}</td>
            <td className='pb-3.5 font-normal text-primary text-center pt-3'>{c.resets}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}



