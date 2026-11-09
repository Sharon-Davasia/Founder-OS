import { chaptersEarly } from "./chapters-00-03";
import { chaptersMid } from "./chapters-04-07";
import { chaptersLate } from "./chapters-08-11";
import type { Chapter } from "./types";

export const chapters: Chapter[] = [
  ...chaptersEarly,
  ...chaptersMid,
  ...chaptersLate,
];

export const totalChecklistItems = chapters.reduce(
  (acc, c) => acc + c.checklist.length,
  0
);

export const totalConcepts = chapters.reduce(
  (acc, c) => acc + c.concepts.length,
  0
);

export const totalTerms = chapters.reduce((acc, c) => acc + c.terms.length, 0);
