import OddMascot from "@/components/sections/OddMascot";

// The Odd Creatives logo mark, drawn in theme colours (no image file).
// `light` = for dark backgrounds (white letters); otherwise dark letters.
export default function Logo({ size = 34, light = false }: { size?: number; light?: boolean }) {
  return (
    <span role="img" aria-label="Odd Creatives & Management" className="inline-flex flex-shrink-0">
      <span style={{ height: size }} className="inline-flex">
        <OddMascot compact accent={light ? "text-aqua" : "text-brand"} className={`h-full w-auto ${light ? "text-white" : "text-night"}`} />
      </span>
    </span>
  );
}
