import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { ideas } from "@/db/schema";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ideaId = Number(id);
    if (!Number.isInteger(ideaId) || ideaId <= 0) {
      return NextResponse.json({ error: "Invalid idea id" }, { status: 400 });
    }

    const updated = await db
      .update(ideas)
      .set({ votes: sql`${ideas.votes} + 1` })
      .where(eq(ideas.id, ideaId))
      .returning({ votes: ideas.votes });

    if (!updated.length) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({ votes: updated[0].votes });
  } catch (err) {
    console.error("POST /api/ideas/[id]/vote failed", err);
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
