import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BarbaInitializer } from '../components/BarbaInitializer';

export const metadata: Metadata = {
  title: 'DevSpace - Your All-in-One Developer Environment',
  description: 'A modern workspace designed for developers and tech teams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col" data-barba="wrapper">
        <Navbar />
        <main className="flex-grow" data-barba="container" data-barba-namespace="default">{children}</main>
        <Footer />
        <BarbaInitializer />
      </body>
    </html>
  );
}
