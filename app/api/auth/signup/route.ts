import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { username, password, email } = await request.json();
    console.log({ username, password, email });

    const hashedPassword = await hash(password, 12);

    const response = await sql`
    INSERT INTO users (username, password, email)
    VALUES (${username}, ${hashedPassword}, ${email})
      `;
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
