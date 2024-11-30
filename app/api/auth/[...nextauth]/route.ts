import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

// NextAuth configuration
const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Fetch user from the database
          const response = await sql`
            SELECT * FROM users WHERE username=${credentials?.username}
          `;
          const user = response.rows[0];

          if (user && (await compare(credentials?.password || "", user.password))) {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
            };
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
        }

        return null;
      },
    }),
  ],
};

// Default export for the Next.js API route
const handler = NextAuth(authOptions);
export default handler;
