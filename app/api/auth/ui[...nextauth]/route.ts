import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configuring the Google OAuth provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in the .env file
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  pages: {
    signIn: "/auth/signin", // Optional: Customize the sign-in page
    error: "/auth/error", // Optional: Customize the error page
  },
  callbacks: {
    async jwt({ token, account }) {
      // Attach additional information to the JWT token (e.g., user details)
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the JWT token to the session object
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



/*
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", // Ensure this matches the expected type
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Customize error redirect
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

          // Compare passwords and return the user if valid
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
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
        }

        // Return null if authorization fails
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// Helper function to handle NextAuth with parsed query parameters
async function nextAuthHandlerWrapper(req: NextRequest, method: "GET" | "POST") {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries()); // Parse query parameters
  const handler = NextAuthHandler(authOptions);

  return handler(
    {
      ...req, // Pass the request object
      query,  // Attach parsed query params
    } as any, // Type casting due to limitations with NextAuth types
    { method }
  );
}

// Split GET and POST handlers for Next.js app directory API routes
export async function GET(req: NextRequest) {
  return nextAuthHandlerWrapper(req, "GET");
}

export async function POST(req: NextRequest) {
  return nextAuthHandlerWrapper(req, "POST");
}*/
