"use client"

import { SyntheticEvent, useState } from "react";
import TopPlayers from "./(tables)/TopPlayers";
import TopGuilds from "./(tables)/TopGuilds";
import TopKillers from "./(tables)/TopKillers";
import OnlinePlayers from "./(tables)/OnlinePlayers";

export default function Ranking() {
  const [selectedRanking, setSelectedRanking] = useState<string>('topLevel')

  //on clicke cheanges the current ranking showing
  const changeRanking = (event: SyntheticEvent) => {
    const id = (event.target as HTMLElement).id;
    setSelectedRanking(id);
  }

  return ( 
    <div className="flex flex-col mb-2 w-full px-20">
      <h2 className="text-primary text-lg">Top Rankings</h2>
      <hr className="border-t-2 border-t-primary"/>
      <div className="mt-2 flex gap-1">
          <button className="border-primary border-2 py-1 px-3 font-thin text-primary" id="topLevel" onClick={changeRanking}>Top Characters</button>
          <button className="border-primary border-2 py-1 px-3 font-thin text-primary" id="topKillers" onClick={changeRanking}>Top Killers</button>
          <button className="border-primary border-2 py-1 px-3 font-thin text-primary" id="topGuilds" onClick={changeRanking}>Top Guilds</button>
          <button className="border-primary border-2 py-1 px-3 font-thin text-primary" id="online" onClick={changeRanking}>Online Players</button>
      </div>
      {selectedRanking === 'topLevel' && <TopPlayers />}
      {selectedRanking === 'topGuilds' && <TopGuilds />}
      {selectedRanking === 'topKillers' && <TopKillers />}
      {selectedRanking === 'online' && <OnlinePlayers />}
    </div>
  )
}
