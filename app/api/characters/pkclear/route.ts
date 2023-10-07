import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {name} = await req.json();

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
            return NextResponse.json({message: "You can't do this!"}, {status: 500})
        }
    } else {
        return NextResponse.json({message: "You can't do this!"}, {status: 500})
    }
    //check if character is online
    const online = await (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/status`)).json()
    if(online.playersList.includes(name)){
        return NextResponse.json({message: "Disconnect from your account!"}, {status: 400})
    };

    const zen = +process.env.ZEN_TO_PKCLEAR!
    //check if has enough money and subtract the amount to reset
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

    if(!enoughMoney){
        return NextResponse.json({message: "You don't have enough zen: " + zen}, {status: 400});
    }

    await prisma.$transaction([
        //subtracting the zen
        prisma.itemStorage.updateMany({
            where: {
                Character: {
                    Name: name
                }
            },
            data: {
                Money: {
                    decrement: zen
                }
            }
        }),
        //executing the pkclear
        prisma.character.update({
        where: {
            Name: name
        },
        data: {
            State: 0,
            StateRemainingSeconds: 0
        }
        })
    ])
    return NextResponse.json({message: "PkClear successfully"}, {status: 200})
}