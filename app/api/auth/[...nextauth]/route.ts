import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

export const authOptions: AuthOptions = {
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
        const response = await sql`
          SELECT * FROM users WHERE username=${credentials?.username}
        `;
        const user = response.rows[0];

        if (
          user &&
          (await compare(credentials?.password || "", user.password))
        ) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
