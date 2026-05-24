import { NextResponse } from "next/server";
import { searchDocuments } from "@/lib/documents";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? undefined;
  const product = searchParams.get("product") ?? undefined;
  const results = searchDocuments(q, category, product);
  return NextResponse.json({ data: results });
}
