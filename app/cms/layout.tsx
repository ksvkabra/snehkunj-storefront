import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Holicraft CMS',
  description: 'Content Management System for Holicraft',
}

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
} 