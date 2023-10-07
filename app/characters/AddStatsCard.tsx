"use client"

import React, { useState } from 'react'
import { CharacterEdit } from '../_models/characterEdit'
import { toast } from 'react-toastify';

export default function AddStatsCard({characterEdit}: {characterEdit: CharacterEdit} ) {
    //set the base values of points left and all the other stats
    const [basePoints, setBasePoints] = useState(characterEdit.levelUpPoints)
    const [baseStr, setBaseStr] = useState(characterEdit.strength);
    const [baseAgi, setBaseAgi] = useState(characterEdit.agility);
    const [baseVit, setBaseVit] = useState(characterEdit.vitality);
    const [baseEne, setBaseEne] = useState(characterEdit.energy);
    const [baseLead, setBaseLead] = useState(characterEdit.leadership);

    //set the points that are gonna be added
    const [str, setStr] = useState(0);
    const [agi, setAgi] = useState(0);
    const [vit, setVit] = useState(0);
    const [ene, setEne] = useState(0);
    const [lead, setLead] = useState(0);

    //dl codes that are gonna be cked toshow leadership or not
    const dlCodes = ["00000040-0011-0000-0000-000000000000", "00000040-0010-0000-0000-000000000000"]

    //send the request to add points
    async function addStats(){
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/characters/addstats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: characterEdit.name,
                str: str,
                agi: agi,
                vit: vit,
                ene: ene,
                lead: lead  
            })
        })
        const responseFinal = await response.json();
        if( response.ok ){
            //if ok change the base values that are showed in the character card
            setBasePoints(basePoints - (str+agi+vit+ene+lead))
            setBaseStr(str + baseStr);
            setBaseAgi(agi + baseAgi);
            setBaseVit(vit + baseVit);
            setBaseEne(ene + baseEne);
            setBaseLead(lead + baseLead);
            //reset all the points that were added previously
            setStr(0);
            setAgi(0);
            setVit(0);
            setEne(0);
            setLead(0);
            toast.success(responseFinal.message);  
        } else {
            toast.error(responseFinal.message);
        }
    }

  return (
    <div className=' px-8 p-3 bg-green-300/[0.2] rounded-md mt-2 gap-3 flex flex-col'>
        <div>
            <p className='font-semibold'>Free Points: {basePoints}</p>
        </div>
        <div className='flex'>
            <div className='flex flex-col gap-6'>
                <p>Strength: <span className='font-semibold ml-2'>{baseStr}</span></p>
                <p>Agility: <span className='font-semibold ml-2'>{baseAgi}</span></p>
                <p>Vitality: <span className='font-semibold ml-2'>{baseVit}</span></p>
                <p>Energy: <span className='font-semibold ml-2'>{baseEne}</span></p>
                {dlCodes.includes(characterEdit.characterClassId) &&  <p>Leadership: <span className='font-semibold ml-2'>{baseLead}</span></p>}
            </div>
            <div className='flex flex-col gap-5 ml-5'>
                <input type="number" value={str} onChange={(e) => setStr(+e.target.value)} className='bg-green-300/[0.2] remove-arrow border-2 placeholder:text-slate-700 
                    w-32 border-green-300/[0.3] rounded-lg text-center focus:outline-none focus:border-2 focus:border-green-300' placeholder='+'/>
                <input type="number" value={agi} onChange={(e) => setAgi(+e.target.value)} className='bg-green-300/[0.2] remove-arrow border-2 placeholder:text-slate-700 
                    w-32 border-green-300/[0.3] rounded-lg text-center focus:outline-none focus:border-2 focus:border-green-300' placeholder='+'/>
                <input type="number" value={vit} onChange={(e) => setVit(+e.target.value)} className='bg-green-300/[0.2] remove-arrow border-2 placeholder:text-slate-700 
                    w-32 border-green-300/[0.3] rounded-lg text-center focus:outline-none focus:border-2 focus:border-green-300' placeholder='+'/>
                <input type="number" value={ene} onChange={(e) => setEne(+e.target.value)} className='bg-green-300/[0.2] remove-arrow border-2 placeholder:text-slate-700 
                    w-32 border-green-300/[0.3] rounded-lg text-center focus:outline-none focus:border-2 focus:border-green-300' placeholder='+'/>
                {dlCodes.includes(characterEdit.characterClassId) && <input type="number" value={lead} onChange={(e) => setLead(+e.target.value)} className='bg-green-300/[0.2] remove-arrow border-2 placeholder:text-slate-700 
                    w-32 border-green-300/[0.3] rounded-lg text-center focus:outline-none focus:border-2 focus:border-green-300' placeholder='+'/> }
            </div>
        </div>
        <button onClick={addStats} className='bg-green-400/[0.2] w-fit mx-auto p-3 px-4 rounded-lg hover:bg-green-400/[0.3]'>Add Points</button>
    </div>
  )
}
