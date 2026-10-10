"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageOff } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

/**
 * The listing's image on Screen B (SOCIAL_UI_CONTRACT_v2 `cover_url`, Social 2026-10-09 gap 3): a signed https
 * link that is good for 15 minutes. While it is valid the image is shown; once it has expired the frame says so
 * and offers to read the page again (which signs a fresh link). Without an image the frame is an honest
 * placeholder, never a stock picture. No storage path and no tenant key are in the link the browser gets.
 */
export function ListingCover({ url, expiresAt, alt, labels }: { locale: Locale; url: string | null; expiresAt: string | null; alt: string; labels: { none: string; expired: string; reload: string } }) {
  const router = useRouter();
  const [expired, setExpired] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!url || !expiresAt) return;
    const ms = Date.parse(expiresAt) - Date.now();
    if (ms <= 0) { setExpired(true); return; }
    const id = window.setTimeout(() => setExpired(true), ms);
    return () => window.clearTimeout(id);
  }, [url, expiresAt]);

  const frame = "flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-line-hairline bg-surface-sunken";
  if (!url) {
    return <div className={frame} data-listing-cover="none"><p className="flex flex-col items-center gap-1 px-2 text-center t-caption text-text-muted"><ImageOff size={18} aria-hidden="true" />{labels.none}</p></div>;
  }
  if (expired || failed) {
    return (
      <div className={frame} data-listing-cover={expired ? "expired" : "failed"}>
        <p className="flex flex-col items-center gap-1 px-2 text-center t-caption text-text-muted">
          <span>{labels.expired}</span>
          <button type="button" onClick={() => { setExpired(false); setFailed(false); router.refresh(); }} className="min-h-[32px] font-medium text-text-primary underline underline-offset-4">{labels.reload}</button>
        </p>
      </div>
    );
  }
  return (
    <div className={frame} data-listing-cover="shown">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="h-full w-full object-cover" />
    </div>
  );
}
