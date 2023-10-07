import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const statAttribute = await prisma.$queryRaw`SELECT sa."CharacterId", c."Name" , c."CharacterClassId" ,
                                                  MAX(CASE WHEN sa."DefinitionId"  = '89a891a7-f9f9-4ab5-af36-12056e53a5f7' THEN sa."Value"  ELSE 0 END) AS resets,
                                                  MAX(CASE WHEN sa."DefinitionId"  = '560931ad-0901-4342-b7f4-fd2e2fcc0563' THEN sa."Value"  ELSE 0 END) AS lvl,
                                                  MAX(CASE WHEN sa."DefinitionId"  = '70cd8c10-391a-4c51-9aa4-a854600e3a9f' THEN sa."Value"  ELSE 0 END) AS masterlvl
                                                FROM 
                                                data."StatAttribute" sa
                                                inner join data."Character" c   on  sa."CharacterId" = c."Id" 
                                                GROUP BY sa."CharacterId", c."Name" , c."CharacterClassId"
                                                ORDER BY resets DESC, lvl desc, masterlvl desc
                                                limit 50;`
  return NextResponse.json(statAttribute);    
}