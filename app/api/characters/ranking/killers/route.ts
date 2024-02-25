import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const characters = await prisma.$queryRaw`select c."Id" , c."CharacterClassId", c."CurrentMapId", c."Name" , c."PlayerKillCount" 
            from "data"."Character" c 
            order by c."PlayerKillCount" desc 
            limit 30;`
        return NextResponse.json(characters);
    } catch (e) {
        console.log("error", e);
        return NextResponse.json({message: "There was a problem try again later"}, {status: 400});
    }
}
