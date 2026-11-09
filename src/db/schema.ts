import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(), // "university" | "real-world" | "both"
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  whyNow: text("why_now").notNull(),
  businessModel: text("business_model").notNull(),
  moat: text("moat").notNull(),
  targetUser: text("target_user").notNull(),
  difficulty: integer("difficulty").notNull(), // 1 - 5
  capital: text("capital").notNull(), // e.g. "$0–2K"
  timeToMvp: text("time_to_mvp").notNull(),
  pitchScore: integer("pitch_score").notNull(), // 0 - 100 pitch-worthiness
  votes: integer("votes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
