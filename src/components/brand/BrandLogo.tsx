import Image from "next/image";
import { BRAND_LABELS, BRAND_LOGOS } from "@/lib/constants";

type Brand = keyof typeof BRAND_LOGOS;

type BrandLogoProps = {
  brand: Brand;
  layout?: "header" | "footer" | "inline";
  variant?: "default" | "on-dark" | "card";
  className?: string;
  priority?: boolean;
};

const LAYOUT = {
  header: {
    slot: "h-9 w-[5.75rem] sm:h-10 sm:w-[6.5rem]",
    ahorro: "max-h-full max-w-full",
    centro: "max-h-full max-w-full",
  },
  footer: {
    slot: "h-11 w-[7rem] sm:h-12 sm:w-[7.75rem]",
    ahorro: "max-h-full max-w-full",
    centro: "max-h-full max-w-full",
  },
  inline: {
    slot: "h-9 w-[5.5rem] sm:h-10 sm:w-[6.25rem]",
    ahorro: "max-h-full max-w-full",
    centro: "max-h-full max-w-full",
  },
} as const;

const VARIANT_CLASS = {
  default: "drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]",
  "on-dark": "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] brightness-110",
  card: "drop-shadow-[0_1px_0_rgba(255,255,255,0.95)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]",
} as const;

const DIMENSIONS = {
  EL_AHORRO: { width: 120, height: 64 },
  DEL_CENTRO: { width: 180, height: 64 },
} as const;

export function BrandLogo({
  brand,
  layout = "header",
  variant = "default",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const config = LAYOUT[layout];

  return (
    <div
      className={`flex shrink-0 items-center justify-center ${config.slot} ${className}`}
    >
      <Image
        src={BRAND_LOGOS[brand]}
        alt={BRAND_LABELS[brand]}
        width={DIMENSIONS[brand].width}
        height={DIMENSIONS[brand].height}
        priority={priority}
        className={`object-contain object-center ${config[brand === "EL_AHORRO" ? "ahorro" : "centro"]} ${VARIANT_CLASS[variant]}`}
      />
    </div>
  );
}
