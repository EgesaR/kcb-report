import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

// GET method handler
export async function GET(req: NextRequest) {
  try {
    const result = await pool.query("SELECT * FROM marks");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST method handler
export async function POST(req: NextRequest) {
  const { name, subject, mark, year, term, className, stream } =
    await req.json();
  try {
    await pool.query(
      "INSERT INTO marks (name, subject, mark, year, term, class_name, stream) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, subject, mark, year, term, className, stream]
    );
    return NextResponse.json(
      { message: "Record added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add record" },
      { status: 500 }
    );
  }
}

// PUT method handler
export async function PUT(req: NextRequest) {
  const { id, name, subject, mark, year, term, className, stream } =
    await req.json();
  try {
    await pool.query(
      "UPDATE marks SET name=$1, subject=$2, mark=$3, year=$4, term=$5, class_name=$6, stream=$7 WHERE id=$8",
      [name, subject, mark, year, term, className, stream, id]
    );
    return NextResponse.json(
      { message: "Record updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}

// DELETE method handler
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await pool.query("DELETE FROM marks WHERE id=$1", [id]);
    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
