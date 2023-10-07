import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const { name, clasId } = await req.json()
    
    //CHECKS
    //check if the right user is sending the request
    const session = await getServerSession(authOptions);
    if(session){
        const verifica = await prisma.character.findMany({
            where: {
                AccountId: session?.user.id
            }
        })
        if(!verifica.map(c => c.Name).includes(name)){
            return NextResponse.json({message: "You can't do this!"}, {status: 400})
        }
    } else {
        return NextResponse.json({message: "You can't do this!"}, {status: 400})
    }
    //check if character is online
    const online = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/status`)).json()
    if(online.playersList.includes(name)){
        return NextResponse.json({message: "Disconnect from your account!"}, {status: 400})
    };

    //select the right map and coordinates x,y to reset the character to
    const elfAray = ["00000040-000b-0000-0000-000000000000", "00000040-000a-0000-0000-000000000000", "00000040-0008-0000-0000-000000000000"];
    const sumArray = ["00000040-0017-0000-0000-000000000000", "00000040-0016-0000-0000-000000000000", "00000040-0014-0000-0000-000000000000"];
    const lorenciaMap = "00000300-0000-0000-0000-000000000000";
    const noriaMap = "00000300-0003-0000-0000-000000000000";
    const elbelandMap = "00000300-0033-0000-0000-000000000000";
    const finalMap = elfAray.includes(clasId) ? noriaMap : sumArray.includes(clasId) ? elbelandMap : lorenciaMap;
    console.log(clasId)
    console.log(finalMap);
    const posX = finalMap == noriaMap ? 176 : finalMap == elbelandMap ? 51 : 141;
    const posY = finalMap == noriaMap ? 116 : finalMap == elbelandMap ? 226 : 121;
    //RESET AND ZEN TO RESET SETTED IN .ENV
    const lvlToReset = +process.env.LVL_TO_RESET!
    const zen = +process.env.ZEN_TO_RESET!
    const maxReset = +process.env.MAX_RESET!
    //check if character HAS THE RIGHT LVL TO RESET greater or equals to and if has reached max reset
    const charToReset = await prisma.statAttribute.count({
        where: {
          OR: [
            {
              Character: {
                Name: name
              },
              DefinitionId: "560931ad-0901-4342-b7f4-fd2e2fcc0563",
              Value: {
                gte: lvlToReset
              }
            },
            {
              Character: {
                Name: name
              },
              DefinitionId: "89a891a7-f9f9-4ab5-af36-12056e53a5f7",
              Value: {
                lt: maxReset
              }
            }
          ]
        }
      });
    //check 
    if(charToReset === 2) {
        //check if has enough money
        const enoughMoney = await prisma.itemStorage.findFirst({
            where: {
              Character: {
                Name: name
              },
              Money: {
                gte: zen
              }
            }
        });
        if(!enoughMoney) {
            return NextResponse.json({message: "You don't have enough zen: " + zen}, {status: 400})
        }
        //do the transaction subtract the zen + reset the character
        await prisma.$transaction([
            prisma.itemStorage.updateMany({
                where: {
                  Character: {
                    Name: name
                  },
                  Money: {
                    gte: zen
                  }
                },
                data: {
                    Money: {
                        decrement: zen
                    }
                }
            }),
            //set lvl to 1 and reset to + 1
            prisma.$queryRaw`UPDATE "data"."StatAttribute" sa
            SET "Value" = 
                CASE 
                    WHEN "DefinitionId" = '89a891a7-f9f9-4ab5-af36-12056e53a5f7' THEN sa."Value" + 1
                    WHEN "DefinitionId" = '560931ad-0901-4342-b7f4-fd2e2fcc0563' THEN 1
                    ELSE sa."Value"
                END
            FROM "data"."Character" c
            WHERE sa."CharacterId" = c."Id" 
              AND c."Name" = ${name};`,
            //set the map to lorencia/noria/embeland
            prisma.character.updateMany({
              where: {
                Name: name
              },
              data: {
                CurrentMapId: finalMap,
                PositionX: posX,
                PositionY: posY
              }
            })
        ])
    } else {
        return NextResponse.json({message: "You aren't lvl " + lvlToReset + " or you are at maximum reset " + maxReset}, {status: 400});
    }
    return NextResponse.json({message: "Character reseted successfully!"}, {status: 200})

}