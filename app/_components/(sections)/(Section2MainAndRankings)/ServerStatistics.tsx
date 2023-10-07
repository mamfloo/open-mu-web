import React from 'react'
import Image from 'next/image'
import OnlineStatus from "../../../../public/img/online.png"
import OfflineStatus from "../../../../public/img/offline.png"
import { ServerStatus } from '@/app/_models/serverStatus';

async function getServerStatus() {
  //try to call the api to see if server is on and how many players there are
  try {
    const status = await fetch(`${process.env.GAMESERVER_URL}/api/status`, {next: {revalidate: 0}});
    return await status.json();
  } catch (e){
    console.log("Couldn't connect to the gameserver, make sure the GAMESERVER_URL is set correctly");
  }
}

export default async function ServerStatistics() {

  const status: ServerStatus = await getServerStatus();
  /* const maxOnlinePlayers = 120 //SET THE NUMBER OF MAX PLAYERS ONLINE (abbandoned for now)
  const percentage = "w-3/12" */ 

  return (
    <div className="w-72 h-52 flex flex-col gap-3 align-middle mx-auto">
      <h2 className='text-2xl font-semibold  text-primary p-3 text-center rounded-lg bg-gradient-to-r
      from-oceanic via-secondary/[0.5] to-oceanic'>Server Statistics</h2>
      <div className='flex justify-center text-center flex-col'>
        <div className='mt-3'>
          <h2 className='text-primary font-semibold text-xl ml-6 inline-block align-text-bottom'>OpenMUWeb</h2>
          <Image src={status?.state === "Online" ? OnlineStatus : OfflineStatus} alt='online_status' className='inline-block align-top -mt-2'/>
        </div>
      </div>
      {/* <div className='w-full h-2 bg-gray-500 flex items-center'>
        <div className={`ml-[2px] ${percentage} h-1 bg-green-400`}></div>
      </div> */}
      <div className='text-center'>
        <p className='text-primary text-lg'>Online Users: <span className='text-xl'>{status?.players | 0}</span></p>
      </div>
    </div>
  )
}
