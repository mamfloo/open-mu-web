"use client"

import { Guild } from "@prisma/client";
import { use, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TopGuilds() {
  const [guilds, setGuilds] = useState<Guild[]>([])

  //calls the tp guild api
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/guilds`);
        const res = await response.json();
        setGuilds(res);
      } catch (e) {
        toast.error("There was a problem! Try again later")
      }
    }
    fetchData();
  }, [])
    

  return (
    <div className="w-full flex flex-col gap-5 mx-auto mt-3">
      <table>
        <thead className="p-3 bg-primary text-white text-center">
          <tr>
            <th className='font-bold text-white pb-3 pl-3 text-start'></th>
            <th className='font-bold text-white pb-3 text-center'>Name</th>
            <th className='font-bold text-white pb-3 text-center'>Score</th>
          </tr>
        </thead>
        <tbody>
          {guilds.map((g, i) => (
            <tr key={g.Name} className="border-b-2 border-slate-300">
              <th className=' text-slate-700 text-lg font-semibold pb-1.5 text-start pl-5 pt-3'>{i+1}</th>
              <th className=' text-primary text-lg pb-1.5 pt-3'>{g.Name}</th>
              <th className=' text-primary text-lg  pb-1.5 pt-3'>{g.Score}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
