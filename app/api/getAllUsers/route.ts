import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import auth options from your NextAuth handler
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions); // Access the session

  if (!session || !session.user) {
    // If no session or user exists, return an error response
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }
  const response = await sql`
          SELECT * FROM users
  `;
  // If session exists, return user data
  return NextResponse.json({
    users: response.rows,
  });
}
