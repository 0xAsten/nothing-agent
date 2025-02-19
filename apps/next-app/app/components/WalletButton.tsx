'use client'

import { useState, useEffect, useMemo } from 'react'
import { Wallet2, ChevronDown, LogOut, User } from 'lucide-react'
import { useAccount, useConnect } from '@starknet-react/core'
import { ConnectWallet } from './ConnectWallet'
import { DisconnectWallet } from './DisconnectWallet'
import { WalletBalances } from './WalletBalances'
import { ControllerConnector } from '@cartridge/connector'

export function WalletButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const [username, setUsername] = useState<string>()

  const { connectors, connector } = useConnect()
  const controllerConnector = useMemo(
    () => ControllerConnector.fromConnectors(connectors),
    [connectors],
  )

  useEffect(() => {
    if (!address) return
    controllerConnector.username()?.then((n) => setUsername(n))
  }, [address, controllerConnector])

  useEffect(() => {
    if (!isConnected) {
      setIsDropdownOpen(false)
    }
  }, [isConnected])

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white px-4 py-2 rounded-lg transition-colors">
        <Wallet2 size={18} />
        <ConnectWallet>Connect Wallet</ConnectWallet>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Wallet2 size={18} />
        <span className="font-medium">{address ? username : ''}</span>
        <ChevronDown
          size={18}
          className={`transform transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <WalletBalances />

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#2c2c2c] rounded-lg shadow-lg py-1 border border-[#3c3c3c]">
          <button
            onClick={() =>
              controllerConnector.controller.openProfile('inventory')
            }
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-[#3c3c3c] transition-colors"
          >
            <User size={16} />
            <span>Profile</span>
          </button>
          <div className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-[#3c3c3c] transition-colors">
            <LogOut size={16} />
            <DisconnectWallet>Disconnect</DisconnectWallet>
          </div>
        </div>
      )}
    </div>
  )
}
