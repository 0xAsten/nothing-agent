'use client'

import { Wallet2 } from 'lucide-react'
import { TelegramConnectWallet } from './TelegramConnectWallet'
import { TelegramWalletBalances } from './TelegramWalletBalances'
import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'

export function TelegramWalletButton() {
  const { address } = useTelegramAccount()

  if (!address) {
    return (
      <div className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white text-sm px-4 py-2 rounded-lg transition-colors">
        <Wallet2 size={18} />
        <TelegramConnectWallet>Connect Wallet</TelegramConnectWallet>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white text-sm px-4 py-2 rounded-lg transition-colors">
        <Wallet2 size={18} />
        <span className="font-medium">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
        </span>
      </div>

      <TelegramWalletBalances />
    </div>
  )
}
