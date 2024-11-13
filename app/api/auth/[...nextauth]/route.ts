import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

// Define the authentication options
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
        try {
          // Fetch user from database
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

// Named export for GET method (Request handler)
export async function GET(req: Request, res: Response) {
  try {
    return NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("GET request error:", error);
    res.status(500).json({ error: "Server error during authentication" });
  }
}

// Named export for POST method (Request handler)
export async function POST(req: Request, res: Response) {
  try {
    return NextAuth(req, res, authOptions);
  } catch (error) {
    console.error("POST request error:", error);
    res.status(500).json({ error: "Server error during authentication" });
  }
}
