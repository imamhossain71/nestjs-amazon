import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '@/lib/constants'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/shared/client-providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: `%s |${APP_NAME}`,
    template: `${APP_NAME}. ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders> {children}</ClientProviders>
      </body>
    </html>
  )
}
