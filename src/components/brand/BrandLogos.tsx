import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

type BrandLogosProps = {
  layout?: "header" | "footer" | "inline";
  variant?: "default" | "on-dark";
  linked?: boolean;
  className?: string;
};

export function BrandLogos({
  layout = "header",
  variant = "default",
  linked = false,
  className = "",
}: BrandLogosProps) {
  const content = (
    <div
      className={`inline-flex items-center gap-3 sm:gap-4 ${className}`}
      aria-label="Supermercados El Ahorro y Del Centro"
    >
      <BrandLogo brand="EL_AHORRO" layout={layout} variant={variant} priority={linked} />
      <div
        className={`h-8 w-px shrink-0 ${
          variant === "on-dark" ? "bg-white/20" : "bg-border"
        }`}
        aria-hidden
      />
      <BrandLogo brand="DEL_CENTRO" layout={layout} variant={variant} priority={linked} />
    </div>
  );

  if (linked) {
    return (
      <Link href="/" className="inline-flex transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
