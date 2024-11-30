import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json();

    // Input validation
    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { message: "User with this username or email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Insert new user into the database
    await sql`
      INSERT INTO users (username, password, email)
      VALUES (${username}, ${hashedPassword}, ${email})
    `;

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
