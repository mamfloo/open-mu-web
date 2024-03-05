import { News } from "@/app/_models/news";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const news: News = await req.json();
        let gmName;

        const GM_ROLE_CODE = 32;

        //CHECKS
        //check if the right user is sending the request
        const session = await getServerSession(authOptions);
        if(session){
            const verifica = await prisma.character.findMany({
                where: {
                    AccountId: session?.user.id
                }
            })
            //check if account has a GM character
            if(verifica && !verifica.map(c=>c.CharacterStatus).includes(GM_ROLE_CODE)){
                return NextResponse.json({message: "You can't do this!"}, {status: 500})
            }
            gmName = verifica.find(c => c.CharacterStatus === GM_ROLE_CODE)?.Name;
        } else {
            return NextResponse.json({message: "You can't do this!"}, {status: 500})
        }

        await prisma.openMuWeb_News.create({
            data: {
                author: gmName!,
                title: news.title,
                body: news.body,
            }
        })
        return NextResponse.json({message: "News added successfully"}, {status: 200});
    } catch (e){
        console.log("error", e);
        return NextResponse.json({message: "There was a problem try again later"}, {status: 400});
    }



} 