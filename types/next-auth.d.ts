import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        username: string;
        id: string;
        role: string;
    }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {  
      username: string;
    }
    token: {
        username: string;
        role: string;
    }
  }
}