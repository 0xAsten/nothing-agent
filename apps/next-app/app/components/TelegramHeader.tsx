'use client'

import Image from 'next/image'
import { TelegramWalletButton } from './TelegramWalletButton'

export function TelegramHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1c1c1c] text-white p-4 flex justify-between items-center z-50">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="App Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-white text-sm font-semibold">Nothing Agent</span>
      </div>

      <TelegramWalletButton />
    </header>
  )
}
