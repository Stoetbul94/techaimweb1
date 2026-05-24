import { NextResponse } from "next/server";
import { documents } from "@/lib/documents";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = documents.find((d) => d.slug === slug);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: doc });
}
