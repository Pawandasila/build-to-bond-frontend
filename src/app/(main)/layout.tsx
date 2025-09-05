'use client';

import { usePathname } from 'next/navigation';
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isChatRoute = pathname.startsWith('/chat');

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!isChatRoute && <Footer />}
    </div>
  );
}