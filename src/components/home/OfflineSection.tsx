import { FileText, FileType2, FileDown, BookMarked, Layers3 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { chapters, totalConcepts, totalChecklistItems, totalTerms } from "@/lib/playbook";
import { SEED_IDEAS } from "@/lib/seed-ideas";

const FORMATS = [
  { icon: FileType2, ext: "PDF", label: "Print-ready, type-set with cover & TOC" },
  { icon: FileText, ext: "DOCX", label: "Editable — Word, Docs, LibreOffice" },
  { icon: FileDown, ext: "TXT", label: "Raw plain text — search anywhere" },
];

function DocCard({
  icon: Icon,
  code,
  title,
  desc,
  meta,
  base,
}: {
  icon: typeof BookMarked;
  code: string;
  title: string;
  desc: string;
  meta: string;
  base: string;
}) {
  return (
    <div className="border border-white/10 bg-coal p-8 transition-colors hover:border-amber/40">
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6 text-amber" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-fog">{code}</span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-black italic">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fog">{desc}</p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">{meta}</p>
      <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
        {FORMATS.map((f) => (
          <a
            key={f.ext}
            href={`/downloads/${base}.${f.ext.toLowerCase()}`}
            download
            className="group flex items-center justify-between py-3.5"
          >
            <span className="flex items-center gap-3">
              <f.icon className="h-4 w-4 text-amber" />
              <span>
                <span className="link-sweep font-mono text-[12px] tracking-[0.2em] text-paper">
                  {f.ext}
                </span>
                <span className="mt-0.5 block text-[11px] text-fog">{f.label}</span>
              </span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-fog transition-colors group-hover:text-amber">
              DOWNLOAD ↓
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function OfflineSection() {
  return (
    <section id="downloads" className="border-t border-white/10 bg-coal/60 scroll-mt-16">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
              CARRY IT OFFLINE
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              The whole doctrine,
              <br />
              <span className="text-outline">as documents.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fog">
            Every chapter, checkpoint, landmine, term and idea card — type-set for print and
            plain reading. PDF for the flight, DOCX to mark up, TXT to grep. No accounts, no
            watermarks.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <DocCard
              icon={BookMarked}
              code="DOC-01"
              title="The Complete Startup Playbook"
              desc="All twelve chapters verbatim: concept briefs, field checklists, landmines, lexicons and gates — plus the six founder laws as an appendix."
              meta={`${chapters.length} chapters · ${totalConcepts} concepts · ${totalChecklistItems} checkpoints · ${totalTerms} terms`}
              base="founder-os-playbook"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <DocCard
              icon={Layers3}
              code="DOC-02"
              title="The Idea Arsenal"
              desc="All fourteen scored startup cards with full briefings — the pain, the machine, why-now, business model, moat, capital and MVP time."
              meta={`${SEED_IDEAS.length} ideas · ranked by pitch score · 6 fields per card`}
              base="founder-os-idea-arsenal"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
