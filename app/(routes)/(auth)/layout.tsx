'use client';
import React from 'react';
import LayoutComponent from '@/components/layout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <LayoutComponent>{children}</LayoutComponent>;
}
