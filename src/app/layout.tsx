import { Providers } from '@/components/providers'
import { SiteHeader } from '@/components/ui/side-header';
import { cn } from '@/lib/utils';

import './globals/styles.css'
import { Footer } from '@/components/ui/side-footer';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Asesoramiento",
    "Asesoramiento fiscal",
    "Comparador de asesorías",
    "Asesoria laboral",
  ],
  authors: [
    {
      name: "ERRENTA",
      url: "https://errenta.eus",
    },
  ],
  creator: "ERRENTA",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@errentaeus",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


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
          <div className="flex flex-col">
            <SiteHeader />
            <div className='min-h-screen'>
            {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
