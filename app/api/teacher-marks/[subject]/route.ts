import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: NextRequest, context: any) {
  // Await params before accessing subject
  const { subject } = await context.params;

  try {
    const query = `
      SELECT students.*
      FROM students
      JOIN student_subjects ON students.id = student_subjects.student_id
      JOIN subjects ON student_subjects.subject_id = subjects.id
      WHERE subjects.name = $1;
    `;

    const result = await pool.query(query, [subject || "Physics"]);

    return NextResponse.json({
      params: subject,
      students: result.rows,
      status: { status: 200 },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch data", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred", details: String(error) },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { subject, updatedMarks } = await req.json();

    // Validate input
    if (!subject || typeof updatedMarks !== "object") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Refactor query to ensure JOINs are correct and simple
    const updateQuery = `
  UPDATE student_subjects
  SET mark = $3
  WHERE student_id = $2
    AND subject_id = (SELECT id FROM subjects WHERE name = $1 LIMIT 1);
`;


    // Update each student's marks
    for (const studentId of Object.keys(updatedMarks)) {
      const mark = updatedMarks[studentId];

      // Log the query and parameters for debugging
      console.log("Executing query:", updateQuery);
      console.log("With parameters:", [subject, parseInt(studentId), mark]);

      // Execute the query to update the mark for the student and subject
      await pool.query(updateQuery, [subject, parseInt(studentId), mark]);
    }

    return NextResponse.json(
      { message: "Marks updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating data:", error.message);
      return NextResponse.json(
        { error: "Failed to update data", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred", details: String(error) },
        { status: 500 }
      );
    }
  }
}
