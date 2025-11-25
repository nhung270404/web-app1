import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { AppContextProvider } from '@/context/app-context';
import {IConfig} from "@/models/config.model";
import { ReactNode } from 'react';
import { GetConfig } from '@/lib/services/config.service';
import { ThemeProvider } from '@/components/theme-provider';
import LangLayout from '@/app/lang';
export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const config: IConfig = await GetConfig();
  return {
    title: config.title || 'BaoAn - Lifestyle',
    description: config.description || 'Powered by NextJS - Author Kot',
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const config: IConfig = await GetConfig();
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Batek" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/icons/icon-256x256.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster />
          <AppContextProvider config={config}>
            <LangLayout>{children}</LangLayout>
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
