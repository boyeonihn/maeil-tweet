'use client';
import { cls } from '@/lib/client/utils';
import React from 'react';
import { Nav } from './nav';
import { Header } from './header';
import { SwitchTheme } from './switchTheme';

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
      <div className={cls('pt-12 w-full', hasTabBar ? 'pb-24' : '')}>
        <div className="flex items-center justify-center pt-5">
          <SwitchTheme />
        </div>
        {children}
      </div>
      {hasTabBar ? <Nav /> : null}
    </div>
  );
}
