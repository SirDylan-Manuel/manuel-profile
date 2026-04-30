import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Laurent Dylan P. Manuel | Portfolio',
  description: 'Computer Engineering Graduate, IT Instructor, IoT & Robotics Developer. Building smart systems, teaching future innovators, and designing connected technologies.',
  keywords: ['Computer Engineering', 'IT Instructor', 'IoT Developer', 'Robotics', 'Arduino', 'ESP32', 'Portfolio'],
  authors: [{ name: 'Laurent Dylan P. Manuel' }],
  openGraph: {
    title: 'Laurent Dylan P. Manuel | Portfolio',
    description: 'Computer Engineering Graduate, IT Instructor, IoT & Robotics Developer',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
