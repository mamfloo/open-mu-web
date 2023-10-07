import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const characters = await prisma.$queryRaw`select c."Id" , c."CharacterClassId", c."CurrentMapId", c."Name" , c."PlayerKillCount" 
        from "data"."Character" c 
        order by c."PlayerKillCount" desc 
        limit 30;`
    return NextResponse.json(characters);
}
