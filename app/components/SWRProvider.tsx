'use client';

import React from 'react';
import { SWRConfig } from 'swr';

interface SWRProps {
  children: React.ReactNode;
}
export default function SWRProvider({ children }: SWRProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
