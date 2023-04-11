import { Providers } from '@/components/providers'
import {notFound} from 'next/navigation';
import { SiteHeader } from '@/components/ui/side-header';
import { cn } from '@/lib/utils';

import './globals/styles.css'
import { Footer } from '@/components/ui/side-footer';
import { NextIntlClientProvider } from 'next-intl';

// export async function generateStaticParams() {
//   return [{ lang: 'es' }, { lang: 'en' }];
// }


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let messages;
  try {
    messages = (await import(`../../dictionaries/es.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang="es">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
          className={cn(
            " bg-white font-sans text-slate-900 antialiased dark:bg-black dark:text-slate-50"
          )}>
        <Providers>
        <NextIntlClientProvider locale="es" messages={messages}>
          <div className="flex flex-col">
            <SiteHeader />
            <div className='min-h-screen'>
            {children}
            </div>
            <Footer />
          </div>
        </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
