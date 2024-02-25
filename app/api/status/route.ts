import { NextResponse } from "next/server";


export async function GET(){
    try{
        const result = await fetch(`${process.env.GAMESERVER_URL}/api/status`, {next: {revalidate: 0}});
        if(result.ok){
            const res = await result.json();
            return NextResponse.json(res, {status: 201});
        } else {
            return NextResponse.json({message: "Couldn't connect to the gameserver"}, {status: 500});
        }
    } catch (e) {
        console.log("Couldn't connect to the gameserver, make sure the GAMESERVER_URL is set correctly(route)");
        return NextResponse.json({message: "There was an error"}, {status: 500});
    }

}