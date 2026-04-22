"use client";

import { useEffect, useState } from "react";
import { getLaunchTimestamp, isSignupOpen } from "@/lib/service-launch";

export function useServiceLaunch() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOpen(isSignupOpen());

    const diff = getLaunchTimestamp() - Date.now();
    if (diff <= 0 || diff > 2_147_000_000) return;

    const timer = setTimeout(() => setIsOpen(true), diff + 100);
    return () => clearTimeout(timer);
  }, []);

  return { isOpen, mounted };
}
