import GuildMember from "@/app/_models/guildMemeber";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params } : { params : { guildName: string}}) {
    try {
        //find all the guild members
        const guildMembers = await prisma.guildMember.findMany({
            where: {
                Guild: {
                    Name: params.guildName
                }
            },
            include: {
                Character: true
            }
        })
        //check if guilds exists
        if(guildMembers.length === 0){
            return NextResponse.json({messasge: "Guild wasn't found"}, {status: 400})
        }
        //map to GuildMember[]
        const gmMapped: GuildMember[] = guildMembers.map(gm => {
            return {
                Name: gm.Character.Name,
                guildStatus: gm.Status
            }
        })
        console.log(gmMapped);       
        return NextResponse.json(gmMapped, {status: 200})
    }catch (e) {
        return NextResponse.json({message: "Guild wasn't found"}, {status: 400});
    }
}