import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { ideas } from "@/db/schema";
import { SEED_IDEAS } from "@/lib/seed-ideas";

export const dynamic = "force-dynamic";

async function ensureSeeded() {
  const existing = await db.select({ c: count() }).from(ideas);
  if (existing[0]?.c === 0) {
    await db.insert(ideas).values(
      SEED_IDEAS.map((i) => ({
        slug: i.slug,
        name: i.name,
        tagline: i.tagline,
        category: i.category,
        level: i.level,
        problem: i.problem,
        solution: i.solution,
        whyNow: i.whyNow,
        businessModel: i.businessModel,
        moat: i.moat,
        targetUser: i.targetUser,
        difficulty: i.difficulty,
        capital: i.capital,
        timeToMvp: i.timeToMvp,
        pitchScore: i.pitchScore,
        votes: 0,
      }))
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureSeeded();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");

    const conditions = [];
    if (category && category !== "All") conditions.push(eq(ideas.category, category));
    if (level === "university" || level === "real-world") {
      conditions.push(eq(ideas.level, level));
    }

    const rows = await db
      .select()
      .from(ideas)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(ideas.pitchScore));

    return NextResponse.json({ ideas: rows });
  } catch (err) {
    console.error("GET /api/ideas failed", err);
    return NextResponse.json({ error: "Failed to load ideas" }, { status: 500 });
  }
}
