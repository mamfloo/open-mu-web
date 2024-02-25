"use client"

import GuildMember from "@/app/_models/guildMemeber"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function GuildPopUp({guildName, style} : {guildName: string, style: {}}){
    const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);

    const guildPositions: {[index: number]: string} = {0: "", 1: "", 2: "Guild Master"}

    useEffect(() => {
        const fetchData = async() => {         
            //call the api to find all the guild info(member/gm/...)
            const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/guilds/`+guildName);
            if(result.ok){
                const data: [] = await result.json();
                setGuildMembers(data.reverse());
            } else {
                toast.error("There was en error!")
            }
        }
        fetchData();
    }, [])


    return (
        <div className="flex flex-col bg-slate-100 z-10 fixed shadow-md" style={style}>
            <div className="text-2xl font-semibold  text-primary p-3 text-center bg-gradient-to-r from-oceanic via-secondary/[0.5] to-oceanic mb-2">
                {guildName}
            </div>
            <div className="flex gap-2 text-base w-64 mb-2">
                <div className="w-1/2">
                    Name
                </div>
                <div className="w-1/2">
                    Status
                </div>
            </div>
            {Array.isArray(guildMembers) && guildMembers.map((gm, i) => (
                <div key={i} className="flex gap-2 w-full text-primary text-base font-light my-1">
                    <div className="w-1/2">{gm.Name}</div>
                    <div className="w-1/2">{guildPositions[gm.guildStatus]}</div>
                </div>
            ))}
        </div>
    )

}