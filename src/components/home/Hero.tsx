"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const WORDS = ["IDEATION", "VALIDATION", "EQUITY SPLITS", "THE MVP", "THE PITCH", "TERM SHEETS", "COMPOUNDING"];

const STATS = [
  { n: "12", l: "CHAPTERS" },
  { n: "130+", l: "CHECKPOINTS" },
  { n: "14", l: "SCORED IDEAS" },
  { n: "07", l: "MOAT POWERS" },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Image
        src="/images/atlas.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pb-14 pt-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fog"
        >
          <span className="text-amber">FIELD MANUAL // REV 1.0</span>
          <span>UNIVERSITY LAB → DEMO DAY → TERM SHEET</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[13.5vw] font-black leading-[0.88] tracking-tight md:text-[9vw]"
        >
          Every card
          <br />
          <span className="italic text-outline-amber">in the game.</span>
        </motion.h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em]">
              <span className="text-fog">FROM</span>
              <span className="relative inline-block h-[1.4em] w-56 overflow-hidden text-amber">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[i]}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {WORDS[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-fog">TO CHECK WRITTEN</span>
            </div>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fog md:text-lg">
              The complete startup playbook — twelve chapters of minute detail: how ideas are mined,
              validated, priced, built, launched, pitched, and funded. Zero vague advice. Then an
              arsenal of fourteen pitch-worthy ideas, scored and battle-ready.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/playbook"
              className="group flex items-center gap-2 bg-amber px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5"
            >
              Enter the Playbook
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ideas"
              className="group flex items-center gap-2 border border-white/25 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-amber hover:text-amber"
            >
              Browse 14 Ideas
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.l} className="bg-ink/80 px-5 py-4 backdrop-blur-sm">
              <div className="font-display text-3xl font-black text-paper md:text-4xl">{s.n}</div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.25em] text-fog">{s.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex justify-center"
        >
          <ArrowDown className="h-4 w-4 animate-bounce text-fog" />
        </motion.div>
      </div>
    </section>
  );
}
