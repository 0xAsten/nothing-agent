'use client'

import { useState, useEffect } from 'react'
import { Wallet2, LogOut, ChevronDown } from 'lucide-react'
import { TelegramConnectWallet } from './TelegramConnectWallet'
import { TelegramWalletBalances } from './TelegramWalletBalances'
import { TelegramDisconnectWallet } from './TelegramDisconnectWallet'
import { useAccount } from '@starknet-react/core'

export function TelegramWalletButton() {
  const { address } = useAccount()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (!address) {
      setIsDropdownOpen(false)
    }
  }, [address])

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
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white text-sm px-4 py-2 rounded-lg transition-colors"
      >
        <Wallet2 size={18} />
        <span className="font-medium">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
        </span>
        <ChevronDown
          size={18}
          className={`transform transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <TelegramWalletBalances />

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-46 bg-[#2c2c2c] rounded-lg shadow-lg py-1 border border-[#3c3c3c]">
          <div className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-[#3c3c3c] transition-colors">
            <LogOut size={16} />
            <TelegramDisconnectWallet>Disconnect</TelegramDisconnectWallet>
          </div>
        </div>
      )}
    </div>
  )
}
