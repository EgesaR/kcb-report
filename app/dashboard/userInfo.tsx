import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

const User = async () => {
  const session = await getServerSession();
  const response = await sql`
          SELECT username, email FROM users WHERE email=${session?.user?.email}
        `;
  return response.rows[0]
}

export default User