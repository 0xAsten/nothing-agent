'use client'

import { TelegramAccountProvider } from '../context/TelegramAccountProvider'
import '../globals.css'

export default function TelegramLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <TelegramAccountProvider>{children}</TelegramAccountProvider>
      </body>
    </html>
  )
}
