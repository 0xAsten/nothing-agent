import { StarknetProvider } from '@/app/context/StarknetProvider'

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <StarknetProvider>{children}</StarknetProvider>
}
