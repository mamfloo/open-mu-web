import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const guilds = await prisma.guild.findMany({
        take: 30,
        orderBy: {
          Score: "desc"
        }
      })
    return NextResponse.json(guilds);
}