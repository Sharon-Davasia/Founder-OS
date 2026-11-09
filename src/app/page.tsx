import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  TrendingUp,
  Coins,
  ClipboardCheck,
  Bomb,
  BookOpen,
  Flag,
  Search,
  Users,
  Rocket,
  Banknote,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/Ticker";
import { Reveal } from "@/components/Reveal";
import { chapters, totalChecklistItems, totalTerms } from "@/lib/playbook";
import { SEED_IDEAS } from "@/lib/seed-ideas";
import { LAWS } from "@/lib/laws";
import { OfflineSection } from "@/components/home/OfflineSection";

const PHASE_ICONS = [Compass, Search, Search, Search, Users, Coins, Rocket, Rocket, Rocket, Banknote, Banknote, TrendingUp];

export default function Home() {
  const featured = [...SEED_IDEAS].sort((a, b) => b.pitchScore - a.pitchScore).slice(0, 3);

  return (
    <>
      <Hero />
      <Ticker />

      {/* ---------- THE GAME IN ONE SCREEN ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">THE GAME IN ONE SCREEN</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            A startup is a <em className="italic text-amber">search</em>, not a small business.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
            You are searching for a repeatable, scalable model before the money runs out. Three
            forces govern everything in this manual — master them and the board makes sense.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {[
            {
              icon: Compass,
              k: "FORCE 01",
              t: "Search, don't execute",
              d: "Unknown model = you search for it. Proven model = you execute it. Confusing the two — building factories for a product nobody validated — is the standard way to die young.",
            },
            {
              icon: TrendingUp,
              k: "FORCE 02",
              t: "Growth as physics",
              d: "Weekly growth rate is the only metric that can't be argued with. Investors extrapolate it; customers create it; everything else the company does exists to protect it.",
            },
            {
              icon: Coins,
              k: "FORCE 03",
              t: "Equity as fuel",
              d: "Ownership is the rocket fuel you trade for speed. Sell too much too early and you work for tourists; refuse to sell and you walk while competitors fly. Learn the instruments.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1} className="group bg-ink p-8 transition-colors duration-500 hover:bg-panel">
              <c.icon className="h-6 w-6 text-amber" />
              <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-fog">{c.k}</p>
              <h3 className="mt-2 font-display text-2xl font-black italic">{c.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-fog">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- THE MAP ---------- */}
      <section id="map" className="border-y border-white/10 bg-coal">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">THE MAP</p>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight md:text-6xl">
                Twelve chapters.
                <br />
                <span className="text-outline">Zero skipped gates.</span>
              </h2>
            </div>
            <p className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-fog">
              {totalChecklistItems} checkpoints · {totalTerms} terms · each chapter ends at a gate you must pass
            </p>
          </Reveal>

          <div className="mt-16 border-t border-white/10">
            {chapters.map((c, i) => {
              const Icon = PHASE_ICONS[i] ?? Compass;
              return (
                <Reveal key={c.id} delay={Math.min(i * 0.04, 0.3)}>
                  <Link
                    href={`/playbook#${c.id}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.03] md:gap-10"
                  >
                    <span className="w-14 font-display text-2xl font-black italic text-white/20 transition-colors group-hover:text-amber md:text-3xl">
                      {c.index}
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] tracking-[0.3em] text-fog transition-colors group-hover:text-amber">
                        {c.phase}
                      </span>
                      <span className="mt-1.5 flex items-center gap-3 text-xl font-semibold tracking-tight text-paper md:text-2xl">
                        {c.title}
                      </span>
                      <span className="mt-1 hidden max-w-xl text-sm text-fog md:block">{c.tagline}</span>
                    </span>
                    <span className="flex items-center gap-4">
                      <Icon className="hidden h-5 w-5 text-fog sm:block" />
                      <ArrowUpRight className="h-5 w-5 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER ANATOMY ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">DISSECTION</p>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight md:text-6xl">
            Anatomy of a chapter
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ClipboardCheck,
              t: "Field Checklists",
              d: "Interactive checkpoints per chapter — tick them off and your browser remembers. Self-deception's kryptonite.",
            },
            {
              icon: Bomb,
              t: "Landmines",
              d: "The four ways founders reliably blow up each stage — named before you step on one with your own runway.",
            },
            {
              icon: BookOpen,
              t: "The Lexicon",
              d: "Every term you need before the room asks for it: SAFE caps, NDR, vesting cliffs — plain-English sharp.",
            },
            {
              icon: Flag,
              t: "The Gate",
              d: "Each chapter closes with a single sentence you should be able to say out loud. If you can't, loop back.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08} className="bg-ink p-8 transition-colors hover:bg-panel">
              <c.icon className="h-6 w-6 text-amber" />
              <h3 className="mt-6 font-display text-xl font-black italic">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SIX LAWS ---------- */}
      <section className="border-y border-white/10 bg-coal">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-32">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">CODIFIED</p>
            <h2 className="mt-4 font-display text-4xl font-black leading-none tracking-tight md:text-6xl">
              The six
              <br />
              founder laws
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-fog">
              Distilled from twelve chapters and a hundred autopsies. Print them. Argue with them.
              Break them knowingly, never accidentally.
            </p>
          </Reveal>
          <div>
            {LAWS.map((l, i) => (
              <Reveal key={l.n} delay={i * 0.05} className="group flex gap-6 border-b border-white/10 py-6 first:border-t">
                <span className="font-mono text-xs text-amber">{l.n}</span>
                <div>
                  <h3 className="font-display text-xl font-black italic text-paper md:text-2xl">{l.t}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{l.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IDEA TEASER ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">THE ARSENAL</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Fourteen ideas worth
              <br />
              an actual pitch night.
            </h2>
          </div>
          <Link
            href="/ideas"
            className="group flex items-center gap-2 border border-amber/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber transition-colors hover:bg-amber hover:text-ink"
          >
            Open the arsenal
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((idea, i) => (
            <Reveal key={idea.slug} delay={i * 0.1}>
              <Link
                href={`/ideas?open=${idea.slug}`}
                className="group flex h-full flex-col border border-white/10 bg-coal p-7 transition-all hover:-translate-y-1 hover:border-amber/50"
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-fog">
                  <span>{idea.category.toUpperCase()}</span>
                  <span className="text-amber">{idea.pitchScore}/100</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-black italic">{idea.name}</h3>
                <p className="mt-2 text-sm text-fog">{idea.tagline}</p>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-fog/80">{idea.problem}</p>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                    MVP {idea.timeToMvp}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-fog transition-all group-hover:text-amber" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- OFFLINE DOCUMENTS ---------- */}
      <OfflineSection />
    </>
  );
}
