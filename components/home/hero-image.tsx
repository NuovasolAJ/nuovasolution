import { ArrowDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's picture (the owner's line of 05.11.2026: HERO = A): the 3D lane's render `hero_A` of handoff_2026-11-05 (3840 × 2160,
 * Cycles, the furnished living room of the fictional demo house in the late afternoon; sha256 b59710aa…), served as WebP in three
 * widths (2560 / 1920 / 1280) with the 960 px poster for the smallest screens, dimmed by the same two gradients as the film
 * before it. A slow drift of 24 s gives it life (CSS); with reduced motion it stands. The lane's mandatory mark stands small
 * at the picture's foot; the alt is the lane's. The wall painting in the render is the lane's own placeholder art and will be
 * replaced by the lane with public-domain art (the owner's order of 05.11.); the file then changes under the same name.
 */
export function HeroImage({ alt, mark }: { alt: string; mark: string }) {
  return (
    <div className="hf-media" data-hf-image="a">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/3d/hero-a-1920.webp"
        srcSet="/media/3d/hero-a-poster-960.webp 960w, /media/3d/hero-a-1280.webp 1280w, /media/3d/hero-a-1920.webp 1920w, /media/3d/hero-a-2560.webp 2560w"
        sizes="100vw"
        alt={alt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="hf-image"
        data-hero-image
      />
      <div className="hf-shade" aria-hidden="true" />
      <p className="hf-mark" data-hero-mark>{mark}</p>
    </div>
  );
}

/** The three benefits that appear one after another (CSS delays; static with reduced motion). */
export function HeroBenefits({ benefits }: { benefits: string[] }) {
  return (
    <ul className="hf-benefits" data-hf-benefits>
      {benefits.map((b, i) => (
        <li key={b} className={cn("hf-benefit")} style={{ ["--i" as string]: i }} data-hf-benefit={i + 1}>
          <span className="hf-benefit-mark" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
          {b}
        </li>
      ))}
    </ul>
  );
}

/** The arrow under the hero's words: scrolls to the demonstration. */
export function HeroScrollHint({ label }: { label: string }) {
  return (
    <a href="#demo" className="hf-scroll" data-hero-cta="scroll" aria-label={label}>
      <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
