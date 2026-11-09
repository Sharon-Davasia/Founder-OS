"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowBigUpDash,
  ArrowUpRight,
  X,
  Gauge,
  Timer,
  Wallet,
  Target,
  Crosshair,
  Lightbulb,
  Zap,
  ShieldCheck,
  Banknote,
  Users,
} from "lucide-react";

interface IdeaRow {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  level: string;
  problem: string;
  solution: string;
  whyNow: string;
  businessModel: string;
  moat: string;
  targetUser: string;
  difficulty: number;
  capital: string;
  timeToMvp: string;
  pitchScore: number;
  votes: number;
}

const LEVELS = [
  { key: "all", label: "All Ideas" },
  { key: "university", label: "University-Ready" },
  { key: "real-world", label: "Real-World" },
];

const VOTE_KEY = "fnos.votes.v1";

export default function IdeasClient() {
  const [ideas, setIdeas] = useState<IdeaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<IdeaRow | null>(null);
  const [voted, setVoted] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VOTE_KEY);
      if (raw) setVoted(JSON.parse(raw));
    } catch {}
    (async () => {
      try {
        const res = await fetch("/api/ideas", { cache: "no-store" });
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        const rows: IdeaRow[] = data.ideas ?? [];
        setIdeas(rows);
        const slug = new URLSearchParams(window.location.search).get("open");
        if (slug) {
          const found = rows.find((r) => r.slug === slug);
          if (found) setOpen(found);
        }
      } catch {
        setError("Could not load the arsenal. Is the database awake?");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const vote = useCallback(async (idea: IdeaRow) => {
    if (voted[idea.id]) return;
    setVoted((v) => {
      const next = { ...v, [idea.id]: true };
      try {
        localStorage.setItem(VOTE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    setIdeas((prev) =>
      prev.map((p) => (p.id === idea.id ? { ...p, votes: p.votes + 1 } : p))
    );
    setOpen((o) => (o && o.id === idea.id ? { ...o, votes: o.votes + 1 } : o));
    try {
      await fetch(`/api/ideas/${idea.id}/vote`, { method: "POST" });
    } catch {}
  }, [voted]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(ideas.map((i) => i.category)))],
    [ideas]
  );

  const filtered = ideas.filter(
    (i) =>
      (level === "all" || i.level === level) &&
      (category === "All" || i.category === category)
  );

  return (
    <>
      {/* filters */}
      <div className="flex flex-col gap-6 border-y border-white/10 py-6">
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLevel(l.key)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                level === l.key
                  ? "bg-amber text-ink"
                  : "border border-white/15 text-fog hover:border-amber/50 hover:text-paper"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                category === c
                  ? "border border-amber text-amber"
                  : "border border-white/10 text-fog/80 hover:text-paper"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      {loading ? (
        <div className="grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse border border-white/10 bg-white/[0.02]" />
          ))}
        </div>
      ) : error ? (
        <p className="py-24 text-center font-mono text-sm tracking-[0.2em] text-ember">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="py-24 text-center font-mono text-sm tracking-[0.2em] text-fog">
          NO IDEAS MATCH — LOOSEN A FILTER.
        </p>
      ) : (
        <div className="grid gap-6 py-14 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((idea, idx) => (
            <motion.article
              key={idea.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
              className="group flex cursor-pointer flex-col border border-white/10 bg-coal p-7 transition-all hover:-translate-y-1 hover:border-amber/50"
              onClick={() => setOpen(idea)}
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-fog">
                <span>IDEA-{String(idea.id).padStart(2, "0")}</span>
                <span className={idea.level === "university" ? "text-amber" : idea.level === "both" ? "text-moss" : "text-paper"}>
                  {idea.level === "university" ? "UNIVERSITY" : idea.level === "both" ? "BOTH TRACKS" : "REAL-WORLD"}
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl font-black italic tracking-tight">{idea.name}</h3>
              <p className="mt-1.5 text-sm text-fog">{idea.tagline}</p>

              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-fog">
                  <span>PITCH SCORE</span>
                  <span className="text-amber">{idea.pitchScore}/100</span>
                </div>
                <div className="mt-2 h-1 w-full bg-white/10">
                  <div className="h-1 bg-amber" style={{ width: `${idea.pitchScore}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-fog">DIFFICULTY</span>
                  <span className="ml-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, d) => (
                      <span
                        key={d}
                        className={`h-1.5 w-3 ${d < idea.difficulty ? "bg-amber" : "bg-white/10"}`}
                      />
                    ))}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fog">
                  {idea.category}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    vote(idea);
                  }}
                  className={`flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] transition-colors ${
                    voted[idea.id] ? "text-amber" : "text-fog hover:text-amber"
                  }`}
                >
                  <ArrowBigUpDash className="h-4 w-4" />
                  {idea.votes}
                </button>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog transition-colors group-hover:text-amber">
                  Briefing
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* detail modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/85 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-amber/30 bg-coal"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-coal/95 px-6 py-4 backdrop-blur md:px-10">
                <span className="font-mono text-[10px] tracking-[0.25em] text-amber">
                  FULL BRIEFING — IDEA-{String(open.id).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setOpen(null)}
                  className="text-fog transition-colors hover:text-paper"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-fog">
                      {open.category.toUpperCase()} ·{" "}
                      {open.level === "both" ? "UNIVERSITY + REAL WORLD" : open.level.toUpperCase()}
                    </p>
                    <h2 className="mt-2 font-display text-4xl font-black italic tracking-tight md:text-6xl">
                      {open.name}
                    </h2>
                    <p className="mt-2 max-w-xl text-lg text-fog">{open.tagline}</p>
                  </div>
                  <button
                    onClick={() => vote(open)}
                    disabled={!!voted[open.id]}
                    className={`flex items-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-all ${
                      voted[open.id]
                        ? "border border-amber/40 text-amber"
                        : "bg-amber text-ink hover:-translate-y-0.5"
                    }`}
                  >
                    <ArrowBigUpDash className="h-4 w-4" />
                    {voted[open.id] ? "Marked pitch-worthy" : `Mark pitch-worthy · ${open.votes}`}
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
                  {[
                    { icon: Gauge, l: "DIFFICULTY", v: `${open.difficulty}/5` },
                    { icon: Wallet, l: "SEED CAPITAL", v: open.capital },
                    { icon: Timer, l: "TIME TO MVP", v: open.timeToMvp },
                    { icon: Target, l: "PITCH SCORE", v: `${open.pitchScore}/100` },
                  ].map((m) => (
                    <div key={m.l} className="bg-coal px-5 py-4">
                      <m.icon className="h-4 w-4 text-amber" />
                      <p className="mt-3 font-mono text-[9px] tracking-[0.25em] text-fog">{m.l}</p>
                      <p className="mt-1 text-sm font-semibold tracking-tight text-paper">{m.v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 space-y-0 border-t border-white/10">
                  {[
                    { icon: Crosshair, k: "THE PAIN", v: open.problem },
                    { icon: Lightbulb, k: "THE MACHINE", v: open.solution },
                    { icon: Zap, k: "WHY NOW", v: open.whyNow },
                    { icon: Banknote, k: "BUSINESS MODEL", v: open.businessModel },
                    { icon: ShieldCheck, k: "THE MOAT", v: open.moat },
                    { icon: Users, k: "TARGET USER", v: open.targetUser },
                  ].map((s) => (
                    <div key={s.k} className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[220px_1fr]">
                      <div className="flex items-center gap-3">
                        <s.icon className="h-4 w-4 shrink-0 text-amber" />
                        <span className="font-mono text-[10px] tracking-[0.25em] text-paper">
                          {s.k}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-fog md:text-[15px]">{s.v}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 border border-dashed border-white/15 p-5 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-fog">
                  EXECUTION NOTE — An idea is a multiplier of zero until it passes the gates. Run
                  this through the playbook: mine the pain (Ch.01), validate with 30 strangers
                  (Ch.02), size the beachhead bottom-up (Ch.03), then earn the right to build.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
