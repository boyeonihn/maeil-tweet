'use client';
import { cls } from '@/lib/client/utils';
import React from 'react';
import { Nav } from './nav';
import { Header } from './header';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <Header title={title} canGoBack={canGoBack} />
      <div className={cls('pt-12', hasTabBar ? 'pb-24' : '')}>{children}</div>
      {hasTabBar ? <Nav /> : null}
    </div>
  );
}
