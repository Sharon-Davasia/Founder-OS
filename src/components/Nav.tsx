"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "/playbook", label: "The Playbook" },
  { href: "/ideas", label: "Idea Arsenal" },
  { href: "/#map", label: "The Map" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.25em] text-amber">FN/OS</span>
            <span className="hidden font-display text-lg italic tracking-tight text-paper sm:block">
              Founder/OS
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-sweep font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  pathname === l.href ? "text-amber" : "text-fog hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/playbook#the-game"
              className="group flex items-center gap-1.5 border border-amber/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber transition-colors hover:bg-amber hover:text-ink"
            >
              Start Ch. 00
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="text-paper md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-col gap-2"
            >
              {[
                { href: "/", label: "Home" },
                ...LINKS,
                { href: "/playbook#the-game", label: "Start Chapter 00" },
              ].map((l, i) => (
                <motion.div
                  key={l.href}
                  variants={{
                    closed: { opacity: 0, x: -24 },
                    open: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4"
                  >
                    <span className="font-mono text-[11px] text-amber">0{i}</span>
                    <span className="font-display text-3xl italic text-paper">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
