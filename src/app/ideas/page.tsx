import { Suspense } from "react";
import type { Metadata } from "next";
import { Flame, Clock, Fingerprint } from "lucide-react";
import IdeasClient from "@/components/ideas/IdeasClient";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Idea Arsenal — Founder/OS",
  description:
    "Fourteen scored, pitch-worthy startup ideas across climate, deeptech, health, govtech and circular economy — with moats, capital needs and execution briefings.",
};

export const dynamic = "force-dynamic";

export default function IdeasPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-28 md:px-8 md:pt-36">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
          14 CARDS · SCORED & BRIEFED · LIVE FROM THE DATABASE
        </p>
        <h1 className="mt-5 font-display text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
          The Idea
          <br />
          <em className="italic text-outline">Arsenal</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
          Not another list of apps. Each card is a thesis: a real pain, a dated &quot;why
          now&quot;, a moat with a mechanism, and the capital it takes to start. Filter by track,
          open a briefing, and mark the ones you&apos;d pitch — votes persist for every founder
          who visits after you.
        </p>
      </Reveal>

      {/* rubric */}
      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {[
            {
              icon: Flame,
              t: "Pain intensity × frequency",
              d: "Scores reward problems people already duct-tape solutions for, weekly or worse. Vitamins get buried; painkillers get funded.",
            },
            {
              icon: Clock,
              t: "A dated why-now",
              d: "Every card names the specific shift — regulation, cost curve, or behavior — that made it buildable this year and not in 2019.",
            },
            {
              icon: Fingerprint,
              t: "A defensible mechanism",
              d: "Not 'network effects' as a wish — a named flywheel: proprietary data, cornered supply, switching costs, or route density.",
            },
          ].map((c) => (
            <div key={c.t} className="bg-ink p-7">
              <c.icon className="h-5 w-5 text-amber" />
              <h3 className="mt-4 font-display text-lg font-black italic">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{c.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-14">
        <Suspense fallback={null}>
          <IdeasClient />
        </Suspense>
      </div>
    </div>
  );
}
