import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  showWordmark?: boolean;
  iconSize?: number;
};

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading font-bold tracking-wide text-brand-text-primary", className)}>
      TECH<span className="text-brand-crimson"> AIM</span>
    </span>
  );
}

export default function BrandLogo({ className, showWordmark = true, iconSize = 28 }: BrandLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label={`${BRAND_NAME} home`}>
      <Image
        src="/favicon-32x32.png"
        alt={BRAND_NAME}
        width={iconSize}
        height={iconSize}
        className="shrink-0"
        priority
        aria-hidden={showWordmark}
      />
      {showWordmark ? <BrandWordmark className="text-[18px] lg:text-[20px]" /> : null}
    </Link>
  );
}
