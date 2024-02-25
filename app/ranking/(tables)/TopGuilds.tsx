"use client"

import GuildPopUp from "@/app/_components/(popUps)/GuildPopUp";
import { Guild } from "@prisma/client";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TopGuilds() {
  const [guilds, setGuilds] = useState<Guild[]>([])
  //filled with all false
  const [currentShowingGuild, setCurrentShowingGuild] = useState(-1);
  const [mousePosition, setMousePosition] = useState({x: 0, y:0});

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

  function handleMouseEnter(i: number, event: React.MouseEvent) {
    setCurrentShowingGuild(i);
    setMousePosition({x: event.clientX, y: event.clientY})
  }

  function handleMouseLeave(){

  }

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
            <tr key={g.Name} className="border-b-2 border-slate-300" onMouseEnter={(event) => handleMouseEnter(i, event)} onMouseLeave={() => setCurrentShowingGuild(-1)} >
              <th className=' text-slate-700 text-lg font-semibold pb-1.5 text-start pl-5 pt-3'>{i+1}</th>
              <th className=' text-primary text-lg pb-1.5 pt-3' >{g.Name}</th>
              <th className=' text-primary text-lg  pb-1.5 pt-3'>{g.Score} {currentShowingGuild === i && <GuildPopUp guildName={g.Name} style={{left: mousePosition.x, top: mousePosition.y}}/>}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
