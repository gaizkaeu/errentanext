import { Providers } from '@/components/providers'
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import { SiteHeader } from '@/components/ui/side-header';
import { cn } from '@/lib/utils';

import './globals/styles.css'
import { Footer } from '@/components/ui/side-footer';

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  let messages;
  try {
    messages = (await import(`../../../dictionaries/${params.lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.lang}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
          className={cn(
            "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50"
          )}>
        <Providers>
        <NextIntlClientProvider locale={params.lang} messages={messages}>
          <div className="min-h-screen">
            <SiteHeader />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
