'use client';

import '@/i18n';
import { ReactNode } from 'react';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      {children}
    </div>
  );
}