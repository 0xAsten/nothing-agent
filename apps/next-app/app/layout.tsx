import './globals.css'
import { StarknetProvider } from '@/app/context/StarknetProvider'
import Script from 'next/script'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <StarknetProvider>{children}</StarknetProvider>
      </body>
    </html>
  )
}
