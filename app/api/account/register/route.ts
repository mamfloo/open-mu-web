import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt"
import { randomUUID } from "crypto";
import * as z from "zod"

const registerSchema = z.object({
    LoginName: z.string().min(4, "Username is required").max(10, "Username must not be longer than 10 characters"),
    EMail: z.string().min(5, "Email is required").max(30, "Email must not be longer than 10 characters").email('Invalid mail'),
    Password: z.string().min(8, "Password needs at least 8 characters")
        .max(20, "Password needs to be less tha 20 characters"),
    RepeatPassword: z.string().min(8, "Password needs at least 8 characters")
}).refine((data) => data.Password === data.RepeatPassword, {
    path: ["RepeatPassword"],
    message: "Pasword do not match"
})


export async function POST(req: Request) {
    console.log(req.body);
    try {
        const body = await req.json();
        const {LoginName, EMail, Password} = registerSchema.parse(body);

        const existingEmail = await prisma.account.findUnique({
            where: {
                EMail: EMail
            }
        })
        if(existingEmail){
            return NextResponse.json({user: null, message: "Email already in use!"}, {status: 409})
        }
        const existingUsername = await prisma.account.findFirst({
            where: {
                LoginName: LoginName
            }
        })
        if(existingUsername){
            return NextResponse.json({user: null, message: "Username already in use!"}, {status: 409})
        }
        const PasswordHash = await hash(Password, 10);
        const created = await prisma.account.create({
            data: {
                Id: randomUUID(),
                LoginName,
                EMail,
                PasswordHash,
                SecurityCode: "",
                //RegistrationDate: Date.now().toString(),
                State: 0,
                TimeZone: 0,
                VaultPassword: "",
                IsVaultExtended: false
            }
        })

        return NextResponse.json({user: created.LoginName, message: "User created succesfully!"}, {status: 201})

    } catch(error){
        return NextResponse.json({message: "Something went wrong!", error}, {status: 500})
    }
    
}