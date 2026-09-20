"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { UNAUTHORIZED_EVENT } from "@/shared/lib/auth";

export function SessionWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const goToLogin = () => {
      const next = query ? `${pathname}?${query}` : pathname;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    };

    window.addEventListener(UNAUTHORIZED_EVENT, goToLogin);

    return () => window.removeEventListener(UNAUTHORIZED_EVENT, goToLogin);
  }, [router, pathname, query]);

  return null;
}
