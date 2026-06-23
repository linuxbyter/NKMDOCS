import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) {
      return NextResponse.json({ success: false, message: "Database not configured" }, { status: 500 });
    }

    const sql = neon(url);
    const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 100`;

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
