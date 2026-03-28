'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Reads the `?ref=` URL parameter and stores it in sessionStorage.
 * Mounted globally in layout.tsx so every page captures the referral code.
 */
export default function RefCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref && ref.trim()) {
      sessionStorage.setItem('robustta-ref', ref.trim().toUpperCase());
    }
  }, [searchParams]);

  return null;
}
