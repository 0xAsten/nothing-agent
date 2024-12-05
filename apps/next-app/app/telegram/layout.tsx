'use client'

import { StarknetProvider } from '@/app/context/StarknetProvider'

import dynamic from 'next/dynamic'

// import { TelegramAccountProvider } from '@/app/context/TelegramAccountProvider'

const TelegramAccountProvider = dynamic(
  () =>
    import('@/app/context/TelegramAccountProvider').then(
      (mod) => mod.TelegramAccountProvider,
    ),
  {
    ssr: false,
  },
)

export default function TelegramLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StarknetProvider>
      <TelegramAccountProvider>{children}</TelegramAccountProvider>
    </StarknetProvider>
  )
}
