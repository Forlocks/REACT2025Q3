import React from 'react';
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { routing
import { ColorTheme } from "../../providers/ColorTheme";
import StoreProvider from './StoreProvider';
import '../global.scss';
 
export const metadata: Metadata = {
  title: 'Star Trek Ships',
  description: 'Star trek universe ships information search engine',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <StoreProvider>
      <ColorTheme>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ColorTheme>
    </StoreProvider>
  );
};
