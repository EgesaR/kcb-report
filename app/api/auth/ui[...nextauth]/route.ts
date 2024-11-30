import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

// Define the authentication options
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for session management
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
          // Query the database for the user
          const response = await sql`SELECT * FROM users WHERE username=${credentials?.username}`;
          const user = response.rows[0];

          // Validate the provided password
          if (user && (await compare(credentials?.password || "", user.password))) {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
            };
          } else {
            throw new Error("Invalid username or password");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Optional: Custom sign-in page
    error: "/auth/error", // Optional: Custom error page
  },
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
