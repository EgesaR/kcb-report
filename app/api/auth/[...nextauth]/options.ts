import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientID: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
        })
    ],
    /*pages: {
        signIn: "/auth/signin"
    }*/
}