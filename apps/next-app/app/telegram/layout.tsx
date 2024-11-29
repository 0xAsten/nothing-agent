'use client'

import { TelegramAccountProvider } from '@/app/context/TelegramAccountProvider'
import '@/app/globals.css'

export default function TelegramLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <TelegramAccountProvider>{children}</TelegramAccountProvider>
}
