/**
 * FOUNDER/OS — offline document generator
 * Builds the full startup knowledge base as TXT / DOCX / PDF into public/downloads/
 *
 * Run: npx tsx scripts/generate-docs.ts
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import {
  chapters,
  totalChecklistItems,
  totalConcepts,
  totalTerms,
} from "../src/lib/playbook";
import type { Chapter } from "../src/lib/playbook/types";
import { SEED_IDEAS, type SeedIdea } from "../src/lib/seed-ideas";
import { LAWS } from "../src/lib/laws";

const OUT_DIR = path.join(process.cwd(), "public", "downloads");
fs.mkdirSync(OUT_DIR, { recursive: true });

const REV = "REV 1.0";
const DATE = new Date().toISOString().slice(0, 10);
const sortedIdeas = [...SEED_IDEAS].sort((a, b) => b.pitchScore - a.pitchScore);

const ideaCode = (i: number) => `IDEA-${String(i + 1).padStart(2, "0")}`;
const levelLabel = (l: string) =>
  l === "both"
    ? "UNIVERSITY + REAL WORLD"
    : l === "university"
      ? "UNIVERSITY TRACK"
      : "REAL-WORLD TRACK";

const RUBRIC = [
  {
    t: "Pain intensity × frequency",
    d: "Scores reward problems people already duct-tape solutions for, weekly or worse. Vitamins get buried; painkillers get funded.",
  },
  {
    t: "A dated why-now",
    d: "Every card names the specific shift — regulation, cost curve, or behavior — that made it buildable this year and not in 2019.",
  },
  {
    t: "A defensible mechanism",
    d: "Not 'network effects' as a wish — a named flywheel: proprietary data, cornered supply, switching costs, or route density.",
  },
];

const EXEC_NOTE =
  "EXECUTION NOTE — An idea is a multiplier of zero until it passes the gates. Run this through the playbook: mine the pain (Ch.01), validate with 30 strangers (Ch.02), size the beachhead bottom-up (Ch.03), then earn the right to build.";

/* =========================================================================
 * SECTION 1 — PLAIN TEXT (.txt)
 * ========================================================================= */

function chapterToText(c: Chapter): string {
  const L: string[] = [];
  const bar = "=".repeat(72);
  const thin = "─".repeat(72);
  L.push(bar);
  L.push(`CHAPTER ${c.index} — ${c.title.toUpperCase()}`);
  L.push(c.phase);
  L.push(`"${c.tagline}"`);
  L.push(bar, "");
  L.push(c.intro, "");
  L.push(thin, "CONCEPTS", thin, "");
  for (const con of c.concepts) {
    L.push(`[${con.k}] ${con.title}`);
    L.push(con.body, "");
  }
  L.push(thin, "FIELD CHECKLIST", thin, "");
  c.checklist.forEach((item) => {
    L.push(`[ ] ${item.text}`);
    if (item.note) L.push(`     ↳ ${item.note}`);
  });
  L.push("");
  L.push(thin, "LANDMINES — DON'T STEP HERE", thin, "");
  c.mistakes.forEach((m, i) => {
    L.push(`${String(i + 1).padStart(2, "0")}. ${m.title}`);
    L.push(`    ${m.body}`, "");
  });
  L.push(thin, "THE LEXICON", thin, "");
  for (const t of c.terms) L.push(`${t.term} — ${t.def}`);
  L.push("", thin, `» ${c.gate}`, thin, "", "");
  return L.join("\n");
}

function buildPlaybookTxt(): string {
  const L: string[] = [];
  L.push("FOUNDER/OS — THE COMPLETE STARTUP PLAYBOOK");
  L.push(`${REV} · GENERATED ${DATE} · PRINT FREELY`);
  L.push("Every card in the game — from first idea to signed term sheet.");
  L.push("");
  L.push(
    `${chapters.length} chapters · ${totalConcepts} concept briefs · ${totalChecklistItems} checkpoints · ${totalTerms} terms`
  );
  L.push("");
  L.push("HOW TO USE THIS MANUAL");
  L.push("Each chapter teaches the mechanics, hands you a field checklist, names");
  L.push("the landmines founders step on, builds your lexicon — then locks a gate");
  L.push("behind you. Do not read it like a novel. Run it like a machine.");
  L.push("");
  L.push("CONTENTS");
  for (const c of chapters) L.push(`  CH.${c.index}  ${c.title}`);
  L.push("  APPENDIX A  The Six Founder Laws");
  L.push("", "");
  for (const c of chapters) L.push(chapterToText(c));
  L.push("=".repeat(72), "APPENDIX A — THE SIX FOUNDER LAWS", "=".repeat(72), "");
  for (const law of LAWS) {
    L.push(`${law.n}. ${law.t} — ${law.d}`, "");
  }
  L.push("", "END OF FILE — ALL GATES PASSED. NOW GO PLAY.");
  return L.join("\n");
}

function ideaToText(idea: SeedIdea, i: number): string {
  const L: string[] = [];
  const bar = "=".repeat(72);
  L.push(bar);
  L.push(`${ideaCode(i)} — ${idea.name.toUpperCase()}  ·  PITCH SCORE ${idea.pitchScore}/100`);
  L.push(`${idea.tagline}`);
  L.push(`${idea.category} · ${levelLabel(idea.level)}`);
  L.push(bar);
  L.push(
    `DIFFICULTY: ${idea.difficulty}/5   ·   CAPITAL: ${idea.capital}   ·   TIME TO MVP: ${idea.timeToMvp}`
  );
  L.push("");
  L.push("THE PAIN");
  L.push(idea.problem, "");
  L.push("THE MACHINE");
  L.push(idea.solution, "");
  L.push("WHY NOW");
  L.push(idea.whyNow, "");
  L.push("BUSINESS MODEL");
  L.push(idea.businessModel, "");
  L.push("THE MOAT");
  L.push(idea.moat, "");
  L.push("TARGET USER");
  L.push(idea.targetUser, "", "");
  return L.join("\n");
}

function buildArsenalTxt(): string {
  const L: string[] = [];
  L.push("FOUNDER/OS — THE IDEA ARSENAL");
  L.push(`${REV} · GENERATED ${DATE} · ${SEED_IDEAS.length} SCORED CARDS`);
  L.push("Not another list of apps. Each card is a thesis: a real pain, a dated");
  L.push("why-now, a moat with a mechanism, and the capital it takes to start.");
  L.push("");
  L.push("HOW THE CARDS ARE SCORED");
  for (const r of RUBRIC) L.push(`  ✦ ${r.t} — ${r.d}`);
  L.push("", "");
  sortedIdeas.forEach((idea, i) => L.push(ideaToText(idea, i)));
  L.push(EXEC_NOTE);
  L.push("", "END OF FILE.");
  return L.join("\n");
}

/* =========================================================================
 * SECTION 2 — DOCX
 * ========================================================================= */

const INK = "1A1A16";
const AMBER = "9A6B17";
const MUTED = "6E6E60";
const EMBER = "9C3D28";

const run = (text: string, opts: Record<string, unknown> = {}) =>
  new TextRun({ text, ...opts });

const para = (
  children: TextRun[],
  opts: Record<string, unknown> = {}
) => new Paragraph({ children, ...opts });

const spacer = (pts = 120) =>
  para([run("")], { spacing: { after: pts } });

function chapterToDocx(c: Chapter): Paragraph[] {
  const P: Paragraph[] = [];
  P.push(
    para(
      [
        run(`CHAPTER ${c.index} — ${c.title.toUpperCase()}`, {
          bold: true, size: 34, font: "Georgia", color: INK,
        }),
      ],
      {
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 120 },
        pageBreakBefore: true,
      }
    )
  );
  P.push(
    para([run(c.phase, { font: "Consolas", size: 18, color: AMBER })], {
      spacing: { after: 80 },
    })
  );
  P.push(
    para(
      [run(`"${c.tagline}"`, { italics: true, size: 24, font: "Georgia", color: MUTED })],
      { spacing: { after: 240 } }
    )
  );
  P.push(para([run(c.intro, { size: 23 })], { spacing: { after: 320, line: 320 } }));
  P.push(
    para([run("CONCEPTS", { bold: true, font: "Consolas", size: 20, color: AMBER })], {
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 200 },
    })
  );
  for (const con of c.concepts) {
    P.push(
      para([run(con.k, { font: "Consolas", size: 16, color: AMBER })], { spacing: { after: 40 } })
    );
    P.push(
      para(
        [run(con.title, { bold: true, size: 28, font: "Georgia", color: INK })],
        { heading: HeadingLevel.HEADING_3, spacing: { after: 100 } }
      )
    );
    P.push(para([run(con.body, { size: 23 })], { spacing: { after: 260, line: 300 } }));
  }
  P.push(
    para(
      [
        run(`FIELD CHECKLIST — ${c.checklist.length} CHECKPOINTS`, {
          bold: true, font: "Consolas", size: 20, color: AMBER,
        }),
      ],
      { heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 } }
    )
  );
  for (const item of c.checklist) {
    P.push(
      para([run(`☐  ${item.text}`, { size: 23 })], {
        bullet: { level: 0 },
        spacing: { after: 80 },
      })
    );
    if (item.note) {
      P.push(
        para([run(`↳ ${item.note}`, { font: "Consolas", size: 18, color: MUTED })], {
          indent: { left: 720 },
          spacing: { after: 120 },
        })
      );
    }
  }
  P.push(
    para(
      [run("LANDMINES — DON'T STEP HERE", { bold: true, font: "Consolas", size: 20, color: EMBER })],
      { heading: HeadingLevel.HEADING_2, spacing: { before: 320, after: 160 } }
    )
  );
  c.mistakes.forEach((m, i) => {
    P.push(
      para(
        [
          run(`${String(i + 1).padStart(2, "0")}  `, { font: "Consolas", size: 20, color: EMBER }),
          run(m.title, { bold: true, size: 24, color: INK }),
        ],
        { spacing: { before: 160, after: 60 } }
      )
    );
    P.push(para([run(m.body, { size: 22, color: MUTED })], { spacing: { after: 120, line: 300 } }));
  });
  P.push(
    para([run("THE LEXICON", { bold: true, font: "Consolas", size: 20, color: INK })], {
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 320, after: 160 },
    })
  );
  for (const t of c.terms) {
    P.push(
      para(
        [
          run(t.term, { bold: true, font: "Consolas", size: 21, color: AMBER }),
          run(`  —  ${t.def}`, { size: 22, color: "3A3A32" }),
        ],
        { bullet: { level: 0 }, spacing: { after: 90 } }
      )
    );
  }
  P.push(
    para([run(gateText(c), { bold: true, font: "Consolas", size: 21, color: AMBER })], {
      spacing: { before: 360, after: 200 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 6, color: AMBER },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: AMBER },
      },
      indent: { left: 120, right: 120 },
    })
  );
  return P;
}
const gateText = (c: Chapter) => `»  ${c.gate}`;

function coverDocx(title: string, sub: string, meta: string, contents: string[]): Paragraph[] {
  const P: Paragraph[] = [];
  P.push(spacer(1200));
  P.push(
    para([run("FN/OS — FIELD MANUAL · " + REV, { font: "Consolas", size: 20, color: AMBER })], {
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
    })
  );
  P.push(
    para(
      [run(title, { bold: true, size: 88, font: "Georgia", color: INK })],
      { heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 240 } }
    )
  );
  P.push(
    para(
      [run(sub, { italics: true, size: 28, font: "Georgia", color: MUTED })],
      { alignment: AlignmentType.CENTER, spacing: { after: 480 } }
    )
  );
  P.push(
    para([run(meta, { font: "Consolas", size: 19, color: MUTED })], {
      alignment: AlignmentType.CENTER,
      spacing: { after: 960 },
    })
  );
  P.push(
    para([run("CONTENTS", { bold: true, font: "Consolas", size: 20, color: INK })], {
      alignment: AlignmentType.CENTER,
      spacing: { before: 480, after: 200 },
    })
  );
  for (const line of contents) {
    P.push(
      para([run(line, { font: "Consolas", size: 20, color: "3A3A32" })], {
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      })
    );
  }
  P.push(spacer(600));
  P.push(
    para(
      [run(`GENERATED ${DATE} · PRINT FREELY · FOUNDER/OS KNOWLEDGE BASE`, {
        font: "Consolas", size: 16, color: MUTED,
      })],
      { alignment: AlignmentType.CENTER }
    )
  );
  return P;
}

function buildPlaybookDocx(): Promise<Buffer> {
  const children: Paragraph[] = [];
  children.push(
    ...coverDocx(
      "The Complete Startup Playbook",
      "Every card in the game — from first idea to signed term sheet.",
      `${chapters.length} CHAPTERS · ${totalConcepts} CONCEPT BRIEFS · ${totalChecklistItems} CHECKPOINTS · ${totalTerms} TERMS`,
      [...chapters.map((c) => `CH.${c.index}  ${c.title}`), "APPENDIX A  THE SIX FOUNDER LAWS"]
    )
  );
  children.push(
    para(
      [
        run("HOW TO USE THIS MANUAL — ", { bold: true, size: 22, color: INK }),
        run(
          "Each chapter teaches the mechanics, hands you a field checklist, names the landmines founders step on, builds your lexicon — then locks a gate behind you. Do not read it like a novel. Run it like a machine.",
          { size: 22, color: MUTED }
        ),
      ],
      { spacing: { before: 480, after: 200 }, pageBreakBefore: true }
    )
  );
  for (const c of chapters) children.push(...chapterToDocx(c));
  children.push(
    para(
      [
        run("APPENDIX A — THE SIX FOUNDER LAWS", {
          bold: true, size: 34, font: "Georgia", color: INK,
        }),
      ],
      { heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 280 }, pageBreakBefore: true }
    )
  );
  LAWS.forEach((law) => {
    children.push(
      para(
        [
          run(`${law.n}  `, { font: "Consolas", size: 22, color: AMBER }),
          run(law.t, { bold: true, size: 26, font: "Georgia", color: INK }),
        ],
        { spacing: { before: 200, after: 60 } }
      )
    );
    children.push(para([run(law.d, { size: 22, color: MUTED })], { spacing: { after: 140 } }));
  });
  children.push(spacer(400));
  children.push(
    para(
      [run("END OF FILE — ALL GATES PASSED. NOW GO PLAY.", { bold: true, font: "Consolas", size: 22, color: AMBER })],
      { alignment: AlignmentType.CENTER }
    )
  );
  const doc = new Document({
    creator: "Founder/OS",
    title: "Founder/OS — The Complete Startup Playbook",
    description: "Twelve chapters from ideation to term sheets.",
    styles: { default: { document: { run: { font: "Calibri", size: 22, color: INK } } } },
    sections: [{ children }],
  });
  return Packer.toBuffer(doc);
}

function ideaToDocx(idea: SeedIdea, i: number): Paragraph[] {
  const P: Paragraph[] = [];
  P.push(
    para(
      [run(`${ideaCode(i)} — ${idea.name.toUpperCase()}`, { bold: true, size: 34, font: "Georgia", color: INK })],
      { heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 60 }, pageBreakBefore: true }
    )
  );
  P.push(
    para([run(idea.tagline, { italics: true, size: 24, font: "Georgia", color: MUTED })], {
      spacing: { after: 100 },
    })
  );
  P.push(
    para(
      [
        run(`${idea.category.toUpperCase()} · ${levelLabel(idea.level)}`, {
          font: "Consolas", size: 18, color: AMBER,
        }),
      ],
      { spacing: { after: 160 } }
    )
  );
  P.push(
    para(
      [
        run(`DIFFICULTY ${idea.difficulty}/5   ·   CAPITAL ${idea.capital}   ·   TIME TO MVP ${idea.timeToMvp}   ·   PITCH SCORE ${idea.pitchScore}/100`, {
          bold: true, font: "Consolas", size: 20, color: INK,
        }),
      ],
      {
        spacing: { after: 360 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 4, color: AMBER },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: AMBER },
        },
      }
    )
  );
  const fields: [string, string][] = [
    ["THE PAIN", idea.problem],
    ["THE MACHINE", idea.solution],
    ["WHY NOW", idea.whyNow],
    ["BUSINESS MODEL", idea.businessModel],
    ["THE MOAT", idea.moat],
    ["TARGET USER", idea.targetUser],
  ];
  for (const [k, v] of fields) {
    P.push(
      para([run(k, { bold: true, font: "Consolas", size: 20, color: AMBER })], {
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 220, after: 80 },
      })
    );
    P.push(para([run(v, { size: 23 })], { spacing: { after: 160, line: 300 } }));
  }
  return P;
}

function buildArsenalDocx(): Promise<Buffer> {
  const children: Paragraph[] = [];
  children.push(
    ...coverDocx(
      "The Idea Arsenal",
      "Fourteen scored, pitch-worthy startup cards — not another list of apps.",
      `${SEED_IDEAS.length} CARDS · RANKED BY PITCH SCORE · FULL BRIEFINGS`,
      sortedIdeas.map((idea, i) => `${ideaCode(i)}  ${idea.name} — ${idea.tagline.slice(0, 44)}… — ${idea.pitchScore}/100`)
    )
  );
  children.push(
    para([run("HOW THE CARDS ARE SCORED", { bold: true, size: 30, font: "Georgia", color: INK })], {
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 220 },
      pageBreakBefore: true,
    })
  );
  for (const r of RUBRIC) {
    children.push(para([run(r.t, { bold: true, size: 24, color: INK })], { spacing: { after: 60 } }));
    children.push(para([run(r.d, { size: 22, color: MUTED })], { spacing: { after: 200, line: 300 } }));
  }
  sortedIdeas.forEach((idea, i) => children.push(...ideaToDocx(idea, i)));
  children.push(
    para([run(EXEC_NOTE, { font: "Consolas", size: 20, color: EMBER })], {
      spacing: { before: 480 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: EMBER } },
    })
  );
  const doc = new Document({
    creator: "Founder/OS",
    title: "Founder/OS — The Idea Arsenal",
    description: "Fourteen scored startup ideas with full briefings.",
    styles: { default: { document: { run: { font: "Calibri", size: 22, color: INK } } } },
    sections: [{ children }],
  });
  return Packer.toBuffer(doc);
}

/* =========================================================================
 * SECTION 3 — PDF (pdfkit, DejaVu fonts for full Unicode)
 * ========================================================================= */

/**
 * DejaVu fonts are searched across common Linux/macOS/Windows locations so the
 * script also runs on a local laptop. Override with the DEJAVU_DIR env var that
 * points at a folder containing DejaVuSerif.ttf / DejaVuSans.ttf / etc.
 * (Download: https://dejavu-fonts.github.io — extracted 'ttf' folder works.)
 */
const FONT_CANDIDATE_DIRS = [
  process.env.DEJAVU_DIR,
  "/usr/share/fonts/truetype/dejavu", // Debian/Ubuntu
  "/usr/share/fonts/dejavu", // Fedora/RHEL
  "/usr/local/share/fonts",
  `${process.env.HOME ?? ""}/.fonts`, // Linux user fonts
  `${process.env.HOME ?? ""}/Library/Fonts`, // macOS user fonts
  "/Library/Fonts", // macOS system fonts
].filter(Boolean) as string[];

const FONT_FILES = [
  "DejaVuSerif.ttf",
  "DejaVuSerif-Bold.ttf",
  "DejaVuSans.ttf",
  "DejaVuSans-Bold.ttf",
  "DejaVuSansMono.ttf",
] as const;

function findFontDir(): string | null {
  for (const dir of FONT_CANDIDATE_DIRS) {
    if (FONT_FILES.every((f) => fs.existsSync(path.join(dir, f)))) return dir;
  }
  return null;
}

const FONTS_DIR = findFontDir();
const PDFS_ENABLED = FONTS_DIR !== null;

const FONT = {
  serif: path.join(FONTS_DIR ?? "", "DejaVuSerif.ttf"),
  serifBold: path.join(FONTS_DIR ?? "", "DejaVuSerif-Bold.ttf"),
  sans: path.join(FONTS_DIR ?? "", "DejaVuSans.ttf"),
  sansBold: path.join(FONTS_DIR ?? "", "DejaVuSans-Bold.ttf"),
  mono: path.join(FONTS_DIR ?? "", "DejaVuSansMono.ttf"),
};

const P = {
  ink: "#1A1A16",
  body: "#33332C",
  muted: "#6E6E60",
  line: "#D9D4C8",
  amber: "#8F6516",
  ember: "#9C3D28",
  moss: "#5F7A2E",
};

type PDFDoc = InstanceType<typeof PDFDocument>;

function newPdf(title: string): { doc: PDFDoc; done: Promise<void>; file: string } {
  const file = path.join(OUT_DIR, `${title}.pdf`);
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 64, bottom: 78, left: 60, right: 60 },
    bufferPages: true,
    info: { Title: `Founder/OS — ${title}`, Author: "Founder/OS" },
  });
  const stream = fs.createWriteStream(file);
  const done = new Promise<void>((res) => stream.on("finish", () => res()));
  doc.pipe(stream);
  doc.registerFont("serif", FONT.serif);
  doc.registerFont("serifB", FONT.serifBold);
  doc.registerFont("sans", FONT.sans);
  doc.registerFont("sansB", FONT.sansBold);
  doc.registerFont("mono", FONT.mono);
  return { doc, done, file };
}

function finishPdf(doc: PDFDoc, footerTitle: string) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc
      .font("mono")
      .fontSize(6.5)
      .fillColor(P.muted)
      .text(
        `FOUNDER/OS — ${footerTitle}   ·   ${i - range.start + 1} / ${range.count}`,
        60,
        doc.page.height - 46,
        { align: "center", width: doc.page.width - 120, lineBreak: false }
      );
  }
  doc.end();
}

function ensureSpace(doc: PDFDoc, needed: number) {
  const limit = doc.page.height - doc.page.margins.bottom;
  if (doc.y + needed > limit) doc.addPage();
}

function rule(doc: PDFDoc, color: string = P.line, width = 1) {
  const x0 = doc.page.margins.left;
  const x1 = doc.page.width - doc.page.margins.right;
  doc.moveTo(x0, doc.y).lineTo(x1, doc.y).lineWidth(width).stroke(color);
  doc.moveDown(0.6);
}

function label(doc: PDFDoc, text: string, color: string = P.amber) {
  ensureSpace(doc, 40);
  doc.font("mono").fontSize(8).fillColor(color).text(text, { characterSpacing: 1.2 });
  doc.moveDown(0.35);
}

function bodyText(doc: PDFDoc, text: string, size = 9.8, color: string = P.body) {
  doc.font("serif").fontSize(size).fillColor(color).text(text, {
    width: doc.page.width - 120,
    lineGap: 3.6,
  });
}

function pdfCover(
  doc: PDFDoc,
  titleLines: string[],
  sub: string,
  meta: string[],
  contents: { code: string; name: string; note?: string }[]
) {
  doc.y = 180;
  doc.font("mono").fontSize(8).fillColor(P.amber)
    .text("FN/OS — FIELD MANUAL · " + REV, { align: "center", characterSpacing: 2 });
  doc.moveDown(2.4);
  doc.font("serifB").fontSize(42).fillColor(P.ink);
  for (const line of titleLines) doc.text(line, { align: "center", lineGap: 6 });
  doc.moveDown(1.2);
  rule(doc, P.amber, 2);
  doc.moveDown(0.4);
  doc.font("serif").fontSize(12.5).fillColor(P.muted).text(sub, { align: "center", lineGap: 3 });
  doc.moveDown(0.8);
  doc.font("mono").fontSize(7.5).fillColor(P.muted);
  for (const m of meta) doc.text(m, { align: "center", characterSpacing: 1 });
  doc.moveDown(3);
  doc.font("mono").fontSize(8.5).fillColor(P.ink).text("C O N T E N T S", {
    align: "center", characterSpacing: 2,
  });
  doc.moveDown(1);
  for (const c of contents) {
    doc.font("mono").fontSize(8).fillColor(P.amber).text(c.code, 60, doc.y, {
      width: 70,
      continued: true,
    });
    doc.font("serifB").fontSize(9.5).fillColor(P.ink).text(`  ${c.name}`, { continued: !!c.note });
    if (c.note) doc.font("serif").fontSize(8).fillColor(P.muted).text(`   —  ${c.note}`);
    doc.moveDown(0.55);
  }
  doc.moveDown(2);
  doc.font("mono").fontSize(7).fillColor(P.muted).text(
    `GENERATED ${DATE} · PRINT FREELY · READ ON A PLANE · QUOTE IT AT JUDGES`,
    { align: "center", characterSpacing: 1 }
  );
}

function chapterToPdf(doc: PDFDoc, c: Chapter) {
  doc.addPage();
  label(doc, c.phase);
  doc.font("serifB").fontSize(10).fillColor(P.amber)
    .text(c.index, { continued: true, characterSpacing: 0 });
  doc.font("serifB").fontSize(24).fillColor(P.ink).text(`  ${c.title}`, { lineGap: 2 });
  doc.moveDown(0.35);
  doc.font("serif").fontSize(11).fillColor(P.muted).text(`“${c.tagline}”`, { lineGap: 3, oblique: false });
  doc.moveDown(0.8);
  rule(doc);
  doc.moveDown(0.4);
  bodyText(doc, c.intro, 10.4, P.ink);
  doc.moveDown(1.6);

  label(doc, `CONCEPTS — ${c.concepts.length} BRIEFS`);
  rule(doc);
  for (const con of c.concepts) {
    ensureSpace(doc, 120);
    doc.font("mono").fontSize(7.5).fillColor(P.amber).text(con.k, { characterSpacing: 1.4 });
    doc.moveDown(0.2);
    doc.font("serifB").fontSize(12.5).fillColor(P.ink).text(con.title, { lineGap: 2 });
    doc.moveDown(0.4);
    bodyText(doc, con.body);
    doc.moveDown(1.2);
    rule(doc, P.line, 0.75);
    doc.moveDown(0.55);
  }

  doc.moveDown(0.4);
  label(doc, `FIELD CHECKLIST — ${c.checklist.length} CHECKPOINTS`);
  rule(doc);
  for (const item of c.checklist) {
    ensureSpace(doc, 34);
    doc.font("sans").fontSize(9.5).fillColor(P.amber)
      .text("☐  ", { continued: true });
    doc.font("sans").fontSize(9.5).fillColor(P.body).text(item.text, { lineGap: 2.5 });
    if (item.note) {
      doc.font("mono").fontSize(7).fillColor(P.muted)
        .text(`      ↳ ${item.note}`, { characterSpacing: 0.6 });
    }
    doc.moveDown(0.55);
  }

  doc.moveDown(1);
  label(doc, "LANDMINES — DON'T STEP HERE", P.ember);
  rule(doc, P.ember, 0.75);
  c.mistakes.forEach((m, i) => {
    ensureSpace(doc, 70);
    doc.font("mono").fontSize(8).fillColor(P.ember)
      .text(`${String(i + 1).padStart(2, "0")}  `, { continued: true });
    doc.font("sansB").fontSize(10).fillColor(P.ink).text(m.title, { lineGap: 2 });
    doc.moveDown(0.25);
    doc.font("serif").fontSize(9.3).fillColor(P.muted).text(m.body, { lineGap: 3 });
    doc.moveDown(0.85);
  });

  doc.moveDown(0.6);
  label(doc, "THE LEXICON", P.ink);
  rule(doc);
  for (const t of c.terms) {
    ensureSpace(doc, 34);
    doc.font("mono").fontSize(8).fillColor(P.amber).text(t.term, { characterSpacing: 0.5 });
    doc.font("sans").fontSize(9).fillColor(P.body).text(`    ${t.def}`, {
      indent: 14,
      lineGap: 2.5,
    });
    doc.moveDown(0.5);
  }

  // GATE box
  doc.moveDown(1.2);
  ensureSpace(doc, 90);
  const gx = doc.page.margins.left;
  const gw = doc.page.width - gx * 2;
  const gy = doc.y;
  const gh = doc.heightOfString(c.gate, { width: gw - 24 }) + 22;
  doc.rect(gx, gy, gw, gh).lineWidth(1.2).stroke(P.amber);
  doc.font("mono").fontSize(8.4).fillColor(P.amber).text(c.gate, gx + 12, gy + 11, {
    width: gw - 24,
    characterSpacing: 0.8,
    lineGap: 2.5,
  });
  doc.y = gy + gh + 12;
}

async function buildPlaybookPdf() {
  const { doc, done, file } = newPdf("founder-os-playbook");
  pdfCover(
    doc,
    ["The Complete", "Startup Playbook"],
    "Every card in the game — from first idea to signed term sheet.",
    [
      `${chapters.length} CHAPTERS · ${totalConcepts} CONCEPT BRIEFS`,
      `${totalChecklistItems} CHECKPOINTS · ${totalTerms} TERMS · 12 GATES`,
    ],
    [
      ...chapters.map((c) => ({ code: `CH.${c.index}`, name: c.title, note: c.phase })),
      { code: "APP.A", name: "The Six Founder Laws", note: "CODIFIED" },
    ]
  );
  doc.addPage();
  label(doc, "HOW TO USE THIS MANUAL", P.ink);
  bodyText(
    doc,
    "Each chapter teaches the mechanics, hands you a field checklist, names the landmines founders step on, builds your lexicon — then locks a gate behind you. Do not read it like a novel. Run it like a machine. Tick the checkboxes on paper; pass every gate in real life.",
    10.4
  );
  for (const c of chapters) chapterToPdf(doc, c);
  // Appendix
  doc.addPage();
  label(doc, "APPENDIX A · CODIFIED");
  doc.font("serifB").fontSize(22).fillColor(P.ink).text("The Six Founder Laws", { lineGap: 2 });
  doc.moveDown(0.6);
  rule(doc);
  for (const law of LAWS) {
    ensureSpace(doc, 70);
    doc.moveDown(0.4);
    doc.font("mono").fontSize(8.5).fillColor(P.amber).text(law.n, { continued: true });
    doc.font("serifB").fontSize(12).fillColor(P.ink).text(`  ${law.t}`, { lineGap: 2 });
    doc.moveDown(0.3);
    doc.font("serif").fontSize(9.3).fillColor(P.muted).text(law.d, { indent: 22, lineGap: 3 });
  }
  doc.moveDown(2.4);
  doc.font("mono").fontSize(8.5).fillColor(P.amber)
    .text("END OF FILE — ALL GATES PASSED. NOW GO PLAY.", { align: "center", characterSpacing: 1.2 });
  finishPdf(doc, "THE COMPLETE STARTUP PLAYBOOK");
  await done;
  return file;
}

function ideaToPdf(doc: PDFDoc, idea: SeedIdea, i: number) {
  doc.addPage();
  label(doc, `${ideaCode(i)} · ${idea.category.toUpperCase()} · ${levelLabel(idea.level)}`);
  doc.font("serifB").fontSize(26).fillColor(P.ink).text(idea.name, { lineGap: 2 });
  doc.moveDown(0.3);
  doc.font("serif").fontSize(11).fillColor(P.muted).text(idea.tagline, { lineGap: 3 });
  doc.moveDown(0.9);

  // meta strip
  const gx = doc.page.margins.left;
  const gw = doc.page.width - gx * 2;
  const gy = doc.y;
  const cols = [
    ["DIFFICULTY", `${idea.difficulty}/5`],
    ["SEED CAPITAL", idea.capital],
    ["TIME TO MVP", idea.timeToMvp],
    ["PITCH SCORE", `${idea.pitchScore}/100`],
  ];
  const cellW = gw / 4;
  doc.rect(gx, gy, gw, 44).lineWidth(0.75).stroke(P.line);
  cols.forEach((col, ci) => {
    const cx = gx + ci * cellW + 8;
    doc.font("mono").fontSize(6).fillColor(P.muted).text(col[0], cx, gy + 7, { width: cellW - 16, characterSpacing: 0.8 });
    doc.font("sansB").fontSize(8.4).fillColor(ci === 3 ? P.amber : P.ink).text(col[1], cx, gy + 21, {
      width: cellW - 16,
      lineGap: 1.5,
    });
    if (ci > 0) doc.moveTo(gx + ci * cellW, gy).lineTo(gx + ci * cellW, gy + 44).lineWidth(0.75).stroke(P.line);
  });
  doc.y = gy + 58;

  const fields: [string, string, string][] = [
    ["THE PAIN", idea.problem, P.amber],
    ["THE MACHINE", idea.solution, P.amber],
    ["WHY NOW", idea.whyNow, P.amber],
    ["BUSINESS MODEL", idea.businessModel, P.amber],
    ["THE MOAT", idea.moat, P.moss],
    ["TARGET USER", idea.targetUser, P.ink],
  ];
  for (const [k, v, col] of fields) {
    ensureSpace(doc, 80);
    doc.moveDown(0.5);
    doc.font("mono").fontSize(7.5).fillColor(col).text(k, { characterSpacing: 1.2 });
    doc.moveDown(0.25);
    bodyText(doc, v, 9.6);
    doc.moveDown(0.55);
    rule(doc, P.line, 0.5);
  }
}

async function buildArsenalPdf() {
  const { doc, done, file } = newPdf("founder-os-idea-arsenal");
  pdfCover(
    doc,
    ["The Idea", "Arsenal"],
    "Fourteen scored, pitch-worthy startup cards — not another list of apps.",
    [
      `${SEED_IDEAS.length} CARDS · RANKED BY PITCH SCORE`,
      "FULL BRIEFINGS · CAPITAL NEEDS · MOAT MECHANISMS",
    ],
    sortedIdeas.map((idea, i) => ({
      code: ideaCode(i),
      name: idea.name,
      note: `${idea.tagline}  ·  ${idea.pitchScore}/100`,
    }))
  );
  doc.addPage();
  label(doc, "HOW THE CARDS ARE SCORED", P.ink);
  rule(doc);
  for (const r of RUBRIC) {
    doc.moveDown(0.5);
    doc.font("serifB").fontSize(12.5).fillColor(P.ink).text(r.t, { lineGap: 2 });
    doc.moveDown(0.3);
    doc.font("serif").fontSize(9.8).fillColor(P.muted).text(r.d, { lineGap: 3.2 });
  }
  doc.moveDown(1.2);
  bodyText(
    doc,
    "Scores rank how well a card would survive a university pitch night AND a real investor room: the pain must be frequent and duct-taped today, the why-now must be dated and checkable, and the moat must name its mechanism. Every card below passes all three filters.",
    10
  );
  sortedIdeas.forEach((idea, i) => ideaToPdf(doc, idea, i));
  // exec note
  doc.addPage();
  doc.y = 300;
  label(doc, "BEFORE YOU PITCH ANY OF THESE", P.ember);
  doc.font("serifB").fontSize(14).fillColor(P.ink).text(
    "An idea is a multiplier of zero until it passes the gates.",
    { lineGap: 4, align: "center" }
  );
  doc.moveDown(1);
  doc.font("serif").fontSize(10.5).fillColor(P.muted).text(
    "Run your card through the playbook: mine the pain (Ch.01), validate with 30 strangers (Ch.02), size the beachhead bottom-up (Ch.03), assemble the team on paper (Ch.04) — then earn the right to build.",
    { align: "center", width: doc.page.width - 180, lineGap: 4 }
  );
  finishPdf(doc, "THE IDEA ARSENAL");
  await done;
  return file;
}

/* =========================================================================
 * RUN
 * ========================================================================= */

async function main() {
  const txt1 = path.join(OUT_DIR, "founder-os-playbook.txt");
  fs.writeFileSync(txt1, buildPlaybookTxt(), "utf8");
  console.log("✓ playbook.txt");

  const txt2 = path.join(OUT_DIR, "founder-os-idea-arsenal.txt");
  fs.writeFileSync(txt2, buildArsenalTxt(), "utf8");
  console.log("✓ idea-arsenal.txt");

  fs.writeFileSync(
    path.join(OUT_DIR, "founder-os-playbook.docx"),
    await buildPlaybookDocx()
  );
  console.log("✓ playbook.docx");

  fs.writeFileSync(
    path.join(OUT_DIR, "founder-os-idea-arsenal.docx"),
    await buildArsenalDocx()
  );
  console.log("✓ idea-arsenal.docx");

  if (PDFS_ENABLED) {
    console.log(await buildPlaybookPdf());
    console.log(await buildArsenalPdf());
  } else {
    console.warn(
      "⚠ DejaVu fonts not found — TXT/DOCX written, PDFs skipped.\n" +
        "  Install DejaVu (https://dejavu-fonts.github.io) or set DEJAVU_DIR=/path/to/fonts and re-run."
    );
  }

  console.log("\nRESULT:");
  for (const f of fs.readdirSync(OUT_DIR)) {
    const s = fs.statSync(path.join(OUT_DIR, f)).size;
    console.log(`  ${f}  ${(s / 1024).toFixed(1)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
