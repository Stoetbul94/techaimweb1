import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    services: [
      { name: "Cloud Sync", status: "operational" },
      { name: "API", status: "operational" },
      { name: "Documentation Portal", status: "operational" },
    ],
    updated_at: new Date().toISOString(),
  });
}
