import { NextResponse } from "next/server";

async function getStatus() {
    try{
        const result = await fetch(`${process.env.GAMESERVER_URL}/api/status`, {next: {revalidate: 0}});
        return result;
    } catch (e) {
        console.log("Couldn't connect to the gameserver, make sure the GAMESERVER_URL is set correctly(route)");
    }
}

export async function GET(){
    const result = await getStatus();
    if(result !== undefined){
        return NextResponse.json(await result.json(), {status: 201});
    } else {
        return NextResponse.json({message: "Couldn't connect to the gameserver, make sure the GAMESERVER_URL is set correctly"}, {status: 500});
    }
}