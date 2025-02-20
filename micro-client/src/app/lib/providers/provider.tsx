'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { Header } from '@/components/navbars/navbar';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="bg-[#D6DBDC]"
          themes={['light']}
        >
         {session?.user&& <Header />}
          <main className="text-foreground bg-[#D6DBDC]">
          {children}
          </main>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}