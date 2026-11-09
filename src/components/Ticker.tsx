const TERMS = [
  "PRODUCT-MARKET FIT",
  "TAM / SAM / SOM",
  "CAC < LTV",
  "7 POWERS",
  "SAFE NOTES",
  "VESTING 4Y / 1Y CLIFF",
  "AARRR FUNNEL",
  "DILUTION MATH",
  "FLAT RETENTION CURVE",
  "WHY NOW",
  "BEACHHEAD",
  "DEFAULT ALIVE",
  "TERM SHEET",
  "CONCIERGE MVP",
  "GROWTH LOOPS",
  "THE MOM TEST",
];

export function Ticker() {
  const row = [...TERMS, ...TERMS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-coal py-3.5">
      <div className="flex w-max animate-marquee items-center gap-8">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-fog"
          >
            {t}
            <span className="text-amber">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
