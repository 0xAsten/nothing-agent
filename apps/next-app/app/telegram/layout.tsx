'use client'

import { SessionProvider } from '@/app/context/SessionProvider'

export default function TelegramLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SessionProvider>{children}</SessionProvider>
}
