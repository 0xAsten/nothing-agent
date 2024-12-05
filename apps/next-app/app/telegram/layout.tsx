'use client'

import { TelegramAccountProvider } from '@/app/context/TelegramAccountProvider'

export default function TelegramLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <TelegramAccountProvider>{children}</TelegramAccountProvider>
}
