import { ServerStatus } from "@/app/_models/serverStatus";
import { prisma } from "@/lib/prisma";
import { Character } from "@prisma/client";
import {NextResponse} from "next/server"

export async function POST(req: Request) {
    const params: ServerStatus = await req.json()
    const result: Character[] = await prisma.character.findMany({
        where : {
            Name : {
                in: params.playersList
            }
        }
    })
    if(result.length == 0) {
        return NextResponse.json(result);
    }
    const final = result.map(p => {
        return {
            Name: p.Name, 
            CurrentMapId: p.CurrentMapId, 
            CharacterClassId: p.CharacterClassId, 
            PositionX: p.PositionX, 
            PositionY: p.PositionY
        }
    });
    return NextResponse.json(final);
}