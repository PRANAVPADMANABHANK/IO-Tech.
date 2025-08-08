import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LawFirm - Professional Legal Services',
  description: 'Comprehensive legal services including corporate law, criminal defense, real estate law, family law, personal injury, and immigration law.',
  icons: {
    icon: '/favicon.svg',
  },
  keywords: 'law firm, legal services, corporate law, criminal defense, family law, real estate law, personal injury, immigration law',
  authors: [{ name: 'LawFirm Legal Team' }],
  openGraph: {
    title: 'LawFirm - Professional Legal Services',
    description: 'Comprehensive legal services including corporate law, criminal defense, real estate law, family law, personal injury, and immigration law.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
