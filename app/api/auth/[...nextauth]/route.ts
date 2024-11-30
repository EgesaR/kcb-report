import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

// Ensure authOptions matches the AuthOptions type
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // 'jwt' is a valid value for SessionStrategy
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

const handler = NextAuth(authOptions);
export default handler;
