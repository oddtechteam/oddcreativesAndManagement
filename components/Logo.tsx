import Image from "next/image";

// The "odd" mark, as transparent PNGs generated from public/logo-odd.png:
// navy for light surfaces, white for dark ones.
const RATIO = 374 / 240;

export default function Logo({ size = 34, light = false }: { size?: number; light?: boolean }) {
  return (
    <Image
      src={light ? "/logo-odd-white.png" : "/logo-odd-navy.png"}
      alt="Odd Creatives & Management"
      width={Math.round(size * RATIO)}
      height={size}
      priority
      className="flex-shrink-0"
      style={{ height: size, width: "auto" }}
    />
  );
}
