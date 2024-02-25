import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {

        const {name, str, agi, vit, ene, lead} = await req.json();
        const total = str+agi+vit+ene+lead;
    
        //CHECKS
        //check if the right user is sending the request
        const session = await getServerSession(authOptions);
        if(session){
            const verifica = await prisma.character.findMany({
                where: {
                    AccountId: session?.user.id
                }
            })
            if(verifica && !verifica.map(c => c.Name).includes(name)){
                return NextResponse.json({message: "You can't do this!"}, {status: 500})
            }
        } else {
            return NextResponse.json({message: "You can't do this!"}, {status: 500})
        }
        //check if character is online
        const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/status`);
        if(result.ok){
          const online = await result.json();
          if(online && online.playersList.includes(name)){
              return NextResponse.json({message: "Disconnect from your account!"}, {status: 400})
          };
        } else {
          return NextResponse.json({message: "Couldn't reach the server, try again later"},{status: 500});
        }
    
        //check if user has enough points to add
        const character = await prisma.character.findUnique({
            where: {
                Name: name
            }
        })
        //check if characters has enoug points
        if(character?.LevelUpPoints! < total){
            return NextResponse.json({message: "You don't have enough points!"}, {status: 400});
        }
    
        await prisma.$transaction([
            prisma.statAttribute.updateMany({
                where: {
                Character: {
                    Name: name,
                },
                AND: [
                    { DefinitionId: '123282fe-fead-448e-ad2c-baece939b4b1' },
                ],
                },
                data: {
                Value: {
                    increment: str
                }
                },
            }),
            prisma.statAttribute.updateMany({
                where: {
                Character: {
                    Name: name,
                },
                AND: [
                    { DefinitionId: '1ae9c014-e3cd-4703-bd05-1b65f5f94ceb' },
                ],
                },
                data: {
                Value: {
                    increment: agi
                }
                },
            }),
            prisma.statAttribute.updateMany({
                where: {
                Character: {
                    Name: name,
                },
                AND: [
                    { DefinitionId: '6ca5c3a6-b109-45a5-87a7-fdcb107b4982' },
                ],
                },
                data: {
                Value: {
                    increment: vit
                }
                },
            }),
            prisma.statAttribute.updateMany({
                where: {
                Character: {
                    Name: name,
                },
                AND: [
                    { DefinitionId: '01b0ef28-f7a0-46b5-97ba-2b624a54cd75' },
                ],
                },
                data: {
                Value: {
                    increment: ene
                }
                },
            }),
            prisma.statAttribute.updateMany({
                where: {
                Character: {
                    Name: name,
                },
                AND: [
                    { DefinitionId: '6af2c9df-3ae4-4721-8462-9a8ec7f56fe4' },
                ],
                },
                data: {
                Value: {
                    increment: lead
                }
                },
            }),
            prisma.character.update({
                where: {
                  Name: name,
                },
                data: {
                  LevelUpPoints: {
                    decrement: total, // Decrement LevelUpPoints based on the provided total
                  },
                },
              }),
        ])
        return NextResponse.json({message: "Character points added succesfuly"}, {status: 200})
    } catch (e) {
        console.log("error", e);
        return NextResponse.json({message: "There was a problem try again later"}, {status: 400});
    }
}