import { StarknetProvider } from '@/app/context/StarknetProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <StarknetProvider>{children}</StarknetProvider>
    </main>
  )
}
