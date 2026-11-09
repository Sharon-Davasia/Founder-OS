import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="relative overflow-hidden py-10">
        <div className="flex w-max animate-marquee-slow gap-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-[11vw] font-black italic leading-none md:text-[7vw]"
            >
              <span className="text-outline">MAKE SOMETHING</span>{" "}
              <span className="text-outline-amber">PEOPLE WANT</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 border-t border-white/10 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-amber">FN/OS — FOUNDER/OS</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fog">
            A field manual for the startup game: twelve chapters from ideation to term sheets,
            checkpoint lists that fight self-deception, and an arsenal of pitch-worthy ideas.
          </p>
        </div>
        <nav className="flex gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          <Link href="/playbook" className="link-sweep hover:text-paper">Playbook</Link>
          <Link href="/ideas" className="link-sweep hover:text-paper">Ideas</Link>
          <Link href="/#map" className="link-sweep hover:text-paper">Map</Link>
          <Link href="/#downloads" className="link-sweep hover:text-paper">Documents</Link>
        </nav>
      </div>
    </footer>
  );
}
