"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check, Flag, Bomb, BookOpen, ClipboardList } from "lucide-react";
import type { Chapter } from "@/lib/playbook/types";

const STORAGE_KEY = "fnos.progress.v1";

type Progress = Record<string, Record<number, boolean>>;

export default function PlaybookClient({ chapters }: { chapters: Chapter[] }) {
  const [progress, setProgress] = useState<Progress>({});
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const { scrollYProgress } = useScroll();
  const barX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [chapters]);

  const toggle = (chapterId: string, idx: number) => {
    setProgress((prev) => {
      const next: Progress = {
        ...prev,
        [chapterId]: { ...prev[chapterId], [idx]: !prev[chapterId]?.[idx] },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const { doneTotal, grandTotal } = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const c of chapters) {
      total += c.checklist.length;
      done += Object.values(progress[c.id] ?? {}).filter(Boolean).length;
    }
    return { doneTotal: done, grandTotal: total };
  }, [progress, chapters]);

  const pct = grandTotal ? Math.round((doneTotal / grandTotal) * 100) : 0;

  return (
    <>
      {/* scroll progress hairline */}
      <motion.div
        style={{ scaleX: barX }}
        className="fixed inset-x-0 top-14 z-40 h-px origin-left bg-amber"
      />

      <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-28 md:px-8 md:pt-36 lg:grid lg:grid-cols-[250px_1fr] lg:gap-14">
        {/* ------ sidebar ------ */}
        <aside className="mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-[10px] tracking-[0.3em] text-amber">PLAYBOOK PROGRESS</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-black">{pct}%</span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-fog">
                {doneTotal}/{grandTotal} CHECKPOINTS
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-white/10">
              <div
                className="h-1 bg-amber transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>

            <nav className="mt-8 hidden flex-col lg:flex">
              {chapters.map((c) => {
                const done = Object.values(progress[c.id] ?? {}).filter(Boolean).length;
                const isActive = active === c.id;
                return (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className={`group flex items-baseline gap-3 border-l-2 py-2 pl-4 transition-colors ${
                      isActive
                        ? "border-amber text-paper"
                        : "border-white/10 text-fog hover:border-white/30 hover:text-paper"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] ${isActive ? "text-amber" : "text-fog"}`}
                    >
                      {c.index}
                    </span>
                    <span className="flex-1 text-sm tracking-tight">{c.title}</span>
                    <span className="font-mono text-[10px] text-fog/70">
                      {done}/{c.checklist.length}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ------ chapters ------ */}
        <div>
          <header className="mb-20 border-b border-white/10 pb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
              12 CHAPTERS · 4 PHASES · SURVIVAL-GRADED
            </p>
            <h1 className="mt-5 font-display text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
              The
              <br />
              <em className="italic text-outline">Playbook</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              Read it like a manual, run it like a machine. Each chapter teaches the mechanics,
              gives you an interactive field checklist, names the landmines, builds your lexicon —
              then locks a gate behind you. Tick checkpoints as you earn them; they persist in
              this browser.
            </p>
          </header>

          <div className="space-y-32">
            {chapters.map((c) => (
              <ChapterSection
                key={c.id}
                chapter={c}
                checked={progress[c.id] ?? {}}
                onToggle={(idx) => toggle(c.id, idx)}
              />
            ))}
          </div>

          <div className="mt-32 border border-amber/40 bg-coal p-10 text-center md:p-16">
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber">END OF FILE</p>
            <h2 className="mt-4 font-display text-3xl font-black italic md:text-5xl">
              All gates passed.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-fog">
              The map ends here; the territory is yours. Take the play into the arsenal, pick a
              card worth pitching — or bring your own through every gate you just survived.
            </p>
            <a
              href="/ideas"
              className="mt-8 inline-flex items-center gap-2 bg-amber px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5"
            >
              Enter the Idea Arsenal
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= CHAPTER ================= */

function ChapterSection({
  chapter: c,
  checked,
  onToggle,
}: {
  chapter: Chapter;
  checked: Record<number, boolean>;
  onToggle: (idx: number) => void;
}) {
  const done = Object.values(checked).filter(Boolean).length;
  const complete = done === c.checklist.length;

  return (
    <section id={c.id} className="scroll-mt-24">
      {/* header */}
      <div className="flex items-start gap-6">
        <span className="font-display text-6xl font-black italic text-outline md:text-8xl">
          {c.index}
        </span>
        <div className="pt-2 md:pt-4">
          <p className="font-mono text-[10px] tracking-[0.3em] text-amber">{c.phase}</p>
          <h2 className="mt-2 font-display text-4xl font-black tracking-tight md:text-6xl">
            {c.title}
          </h2>
          <p className="mt-3 max-w-xl font-display text-lg italic text-fog md:text-xl">
            {c.tagline}
          </p>
        </div>
      </div>

      <p className="mt-8 max-w-3xl text-base leading-relaxed text-paper/90 md:text-lg">{c.intro}</p>

      {/* concepts */}
      <div className="mt-12 border-t border-white/10">
        {c.concepts.map((con, i) => (
          <div key={i} className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-[200px_1fr]">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-amber">{con.k}</span>
              <h3 className="mt-2 font-display text-xl font-black italic leading-snug md:text-2xl">
                {con.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-fog md:pt-0.5 md:text-[15px]">{con.body}</p>
          </div>
        ))}
      </div>

      {/* checklist */}
      <div
        className={`mt-12 border transition-colors ${
          complete ? "border-moss/60" : "border-amber/30"
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4 ${
            complete ? "border-moss/40 bg-moss/10" : "border-amber/30 bg-amber/5"
          }`}
        >
          <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em]">
            <ClipboardList className="h-4 w-4 text-amber" />
            FIELD CHECKLIST — CH.{c.index}
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-fog">
            {complete ? "✓ " : ""}
            {done}/{c.checklist.length} CLEARED
          </span>
        </div>
        <ul className="divide-y divide-white/5">
          {c.checklist.map((item, i) => {
            const isChecked = !!checked[i];
            return (
              <li key={i}>
                <button
                  onClick={() => onToggle(i)}
                  className="group flex w-full items-start gap-4 px-6 py-4 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span
                    data-checked={isChecked}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-all ${
                      isChecked
                        ? "border-amber bg-amber"
                        : "border-white/25 group-hover:border-amber/60"
                    }`}
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                      <path
                        className="tick-path"
                        d="M3 8.5 6.5 12 13 4"
                        fill="none"
                        stroke="#0a0a0b"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <span
                      className={`block text-sm tracking-tight transition-colors md:text-[15px] ${
                        isChecked ? "text-fog line-through decoration-amber/60" : "text-paper"
                      }`}
                    >
                      {item.text}
                    </span>
                    {item.note && (
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-fog/70">
                        {item.note}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* mistakes + terms */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="border border-ember/30">
          <div className="flex items-center gap-3 border-b border-ember/30 bg-ember/5 px-6 py-4">
            <Bomb className="h-4 w-4 text-ember" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-ember">
              LANDMINES — DON&apos;T STEP HERE
            </span>
          </div>
          <ul className="divide-y divide-white/5">
            {c.mistakes.map((m, i) => (
              <li key={i} className="px-6 py-5">
                <p className="text-sm font-semibold tracking-tight text-paper">
                  <span className="mr-2 font-mono text-[10px] text-ember">{String(i + 1).padStart(2, "0")}</span>
                  {m.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fog">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-white/10">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-6 py-4">
            <BookOpen className="h-4 w-4 text-paper" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-paper">
              THE LEXICON
            </span>
          </div>
          <ul className="divide-y divide-white/5">
            {c.terms.map((t) => (
              <li key={t.term} className="px-6 py-3.5">
                <span className="font-mono text-[12px] font-medium text-amber">{t.term}</span>
                <span className="ml-3 text-[13px] leading-relaxed text-fog">{t.def}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* gate */}
      <div className="mt-14 flex items-center gap-5 border-y border-white/10 py-7">
        <Flag className="h-6 w-6 shrink-0 text-amber" />
        <p className="font-mono text-[12px] uppercase leading-relaxed tracking-[0.18em] text-paper md:text-sm">
          {c.gate}
        </p>
      </div>
    </section>
  );
}
