import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

// Define the authentication options
export const authOptions = {
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

          // If user exists and password is correct
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

        return null; // Return null if no user or password doesn't match
      },
    }),
  ],
};

// Correctly export the NextAuth handler for the App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
