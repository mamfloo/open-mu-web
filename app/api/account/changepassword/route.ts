import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {name, oldPassword, newPassword, repeatNewPassword} = await req.json()

    //CHECKS
    //check if the right user is sending the request
    const session = await getServerSession(authOptions);
    if(session){
        if(session.user.username !== name){
            return NextResponse.json({message: "You can't do this!"}, {status: 400})
        }
    }
    //check if old pass and new pass aren't the same
    console.log(oldPassword)
    console.log(newPassword)
    if(oldPassword === newPassword){
        return NextResponse.json({message: "New password and old password are the same!"}, {status: 400});
    }
    //check if newpass and repeatnewpass match
    if(newPassword !== repeatNewPassword){
        return NextResponse.json({message: "New password and Reapeat password should match!"}, {status: 400});
    }
    //check if oldPassword correspond to the account
    const account = await prisma.account.findFirst({
        where: {
            LoginName: name
        }
    })
    const passwordMatch = await compare(oldPassword, account?.PasswordHash!)
    if(!passwordMatch){
        return NextResponse.json({message: "The old password you inserted isn't correct!"}, {status: 400});
    }

    const hashedPassword = await hash(newPassword, 10);
    const result = await prisma.account.updateMany({
        where: {
            LoginName: name
        },
        data: {
            PasswordHash: hashedPassword
        }
    })
    return NextResponse.json({message: "Password changes successfully"}, {status: 200});
}