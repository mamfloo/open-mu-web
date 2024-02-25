import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: ""
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.username || !credentials?.password){
                return null;
            }
            const existingUser = await prisma.account.findUnique({
                where: {
                    LoginName: credentials.username
                }
            })
            if(!existingUser) {
                return null;
            }
            const passwordMatch = await compare(credentials.password, existingUser.PasswordHash)
            if(!passwordMatch){
                return null;
            }
            return {
                id: existingUser.Id,
                username: existingUser.LoginName,
                email: existingUser.EMail
            }
        }
    })
    ],
    callbacks: {
          async jwt({ token, user }) {
            if(user) {
                return {
                    ...token,
                    username: user.username,
                    id: user.id
                }
            }
            return token
          },
          async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                }
            }
          },
    }
}