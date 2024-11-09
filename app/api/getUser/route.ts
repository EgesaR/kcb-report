import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

/*export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession();
    const response = await sql`
          SELECT username, email FROM users WHERE email=${session?.user?.email}
        `; 
      return NextResponse.json({ message: "success", data: response.rows[0] });
  } catch (e) {
    console.log({ e });
  }  
}*/

export async function GET(req: Request, res: Response) {
  const data = { message: "Hello from Next.js API!" };
  return NextResponse.json({data});
}
