"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

/** After a log out the public root says so once (AUTHENTICATED_SURFACE_SYSTEM §5.3), then clears the flag from the address. */
export function SignedOutNotice({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const u = new URL(window.location.href);
    if (u.searchParams.get("signedout") !== "1") return;
    setShow(true);
    u.searchParams.delete("signedout");
    window.history.replaceState(null, "", u.pathname + (u.search ? u.search : "") + u.hash);
  }, []);
  if (!show) return null;
  return (
    <div role="status" data-signed-out className="border-b border-line-hairline bg-sage-100">
      <p className="container-default flex items-center gap-2 py-2 t-caption text-text-primary"><Check size={14} className="text-signal-positive" aria-hidden="true" />{text}</p>
    </div>
  );
}
