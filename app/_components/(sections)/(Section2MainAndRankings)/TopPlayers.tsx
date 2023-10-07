import React from 'react'
import { prisma } from "@/lib/prisma"
import { CharacterRanking } from '@/app/_models/character';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from "next/image"
import { getImage } from '@/app/_utils/characterAvatarReturn';

export default async function TopPlayers() {

  const characters: CharacterRanking[] = await getTop10Characters();

  return (
    <div className="w-72 flex flex-col gap-5 mx-auto mt-2">
      <h2 className='text-2xl font-semibold  text-primary p-3 text-center rounded-lg bg-gradient-to-r
      from-oceanic via-secondary/[0.5] to-oceanic'>Characters Ranking</h2>
      <table className='w-full m-0'>
        <thead>
          <tr>
            <th className='text-start text-primary pb-3'>#</th>
            <th className='text-start text-primary pb-3'>Name</th>
            <th className='text-primary pb-3'>Level</th>
            <th className='text-primary pb-3'>Resets</th>
          </tr>
        </thead>
        <tbody className='text-start'>
        {characters.map((c, i) => (
          <tr key={c.Name} >
            <td className='text-start font-normal text-primary pb-3'>{i+1}</td>
            <td className='text-start font-normal text-primary pb-3'><Image className="inline-block rounded-md shadow-md shadow-black" src={(getImage(c.CharacterClassId) as StaticImport)} width={25} alt="character_avatar"/> {c.Name}</td>
            <td className='pb-3 font-normal text-primary text-center'>{c.lvl} <span className='text-red-500 text-xs align-text-top'>{c.masterlvl}</span></td>
            <td className='pb-3 font-normal text-primary text-center'>{c.resets}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

async function getTop10Characters () {
  const statAttribute: CharacterRanking[] = 
  await prisma.$queryRaw`SELECT sa."CharacterId", c."Name" , c."CharacterClassId" ,
    MAX(CASE WHEN sa."DefinitionId"  = '89a891a7-f9f9-4ab5-af36-12056e53a5f7' THEN sa."Value"  ELSE 0 END) AS resets,
    MAX(CASE WHEN sa."DefinitionId"  = '560931ad-0901-4342-b7f4-fd2e2fcc0563' THEN sa."Value"  ELSE 0 END) AS lvl,
    MAX(CASE WHEN sa."DefinitionId"  = '70cd8c10-391a-4c51-9aa4-a854600e3a9f' THEN sa."Value"  ELSE 0 END) AS masterlvl
  FROM 
  data."StatAttribute" sa
  inner join data."Character" c   on  sa."CharacterId" = c."Id" 
  GROUP BY sa."CharacterId", c."Name" , c."CharacterClassId"
  ORDER BY resets DESC, lvl desc, masterlvl desc
  limit 10;`
  return statAttribute;                                        
}
