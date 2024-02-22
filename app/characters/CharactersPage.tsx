"use client"

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image"
import AddStatsIcon from "@/public/img/account/add-stats.png"
import ClearPkIcon from "@/public/img/account/clear-pk.png"
import ResetStats from "@/public/img/account/reset-stats.png"
import ResetIcon from "@/public/img/account/reset.png"
import AddStatsCard from "./AddStatsCard";
import { useState } from "react";
import { getImage } from "@/app/_utils/characterAvatarReturn";
import { CharacterEdit } from "../_models/characterEdit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CharactersPage({result}: {result: CharacterEdit[]}) {
    //track which cards are open
    const [characters, setCharacters] = useState([false, false, false, false, false]);
    //if last one click is the same as the one clicked now close it
    const [lastClicked, setLastClicked] = useState(-1);

    //open/close accordion
    function openStatistic(index: number) {
        const arr = Array(5).fill(false);
        if(lastClicked != index){ 
            arr[index] = true;   
            setLastClicked(index); 
        } else {
            arr[index] = false;
            setLastClicked(-1);
        }
        setCharacters(arr);     
    }

    const router = useRouter();
    //request the reset of the character
    async function resetCharacter(name: string, clasId: string){
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                clasId: clasId
            })
        })
        const body = await response.json();
        if(response.ok){
            toast.success(body.message);
            router.refresh();
        } else {
            toast.error(body.message);
        }
    }

    //request pk clear of character
    async function pkClear(name: string){
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/pkclear`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        })
        const body = await response.json();
        if(response.ok){
            toast.success(body.message);
        } else {
            toast.error(body.message);
        }
    }

    //request reset stats of character
    async function resetStats(name: string, clasId: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/resetStats`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                clasId      
            })
        })
        const body = await response.json();
        if(response.ok){
            toast.success(body.message);
            openStatistic(-1);
            router.refresh();
        } else {
            toast.error(body.message);
        }
    }

  return (
    <div className="flex flex-col gap-3 mx-auto w-full px-20">
        {result.length === 0 && <h1 className="text-primary text-xl p-2 bg-secondary/[.2] w-fit px-3 rounded-lg self-center">There are no created characters at the moment</h1>}
       {result?.map((c, i) => (
        <div key={c.name}>
            <div className="p-4 bg-secondary/[0.2] rounded-lg flex gap-2 justify-between">
                <div className="flex flex-col text-primary">
                    <p className="text-xl text-primary"><Image src={getImage(c.characterClassId) as StaticImport} alt={"character_avatar"} width={40} 
                    className="inline-block rounded-lg shadow-lg shadow-slate-600" /> {c.name} </p>
                    <p className="mt-3"> Resets: <span className=" font-semibold ml-1 text-primary">{c.resets}</span></p>
                    <p>Lvl: <span className=" font-semibold ml-1 text-primary">{c.lvl}</span></p>
                    <p>Master Lvl: <span className=" font-semibold ml-1 text-primary">{c.masterlvl}</span></p>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between mr-2 gap-2">
                        <button className="h-fit bg-primary/[0.1] p-2 rounded-lg px-4 shadow-md shadow-slate-400 text-slate-800 font-sans hover:bg-secondary/[0.5]" onClick={() => resetCharacter(c.name, c.characterClassId)}>
                            <Image src={ResetIcon} width={25} alt={"reset_icon"} className="inline-block mb-1"></Image> Reset
                        </button>   
                        <button className="h-fit bg-primary/[0.2] p-2 rounded-lg px-4 shadow-md shadow-slate-400 text-slate-800 font-sans hover:bg-secondary/[0.5]" onClick={() => openStatistic(i)}>
                            <Image src={AddStatsIcon} width={25} alt={"add_stats_icon"} className="inline-block mb-1"></Image> Add Stats
                        </button>
                        <button className="h-fit bg-primary/[0.3] p-2 rounded-lg px-4 shadow-md shadow-slate-400 text-slate-800 font-sans hover:bg-secondary/[0.5]" onClick={() => pkClear(c.name)}>
                            <Image src={ClearPkIcon} width={25} alt={"add_stats_icon"} className="inline-block mb-1"></Image> Pk Clear
                        </button>
                        <button className="h-fit bg-primary/[0.4] p-2 rounded-lg px-4 shadow-md shadow-slate-400 text-slate-800 font-sans hover:bg-secondary/[0.5]" onClick={() => resetStats(c.name, c.characterClassId)}>
                            <Image src={ResetStats} width={25} alt={"add_stats_icon"} className="inline-block mb-1"></Image> Reset Stats
                        </button>
                    </div>
                </div>
            </div>
            {characters[i] && <AddStatsCard characterEdit={c} key={i} />}
        </div>
        ))}
    </div>
  )
}
