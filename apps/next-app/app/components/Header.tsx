'use client'

import { useState, useEffect, useRef, use } from 'react'
import { Wallet2, ChevronDown, LogOut } from 'lucide-react'
import { ConnectWallet } from './ConnectWallet'
import { DisconnectWallet } from './DisconnectWallet'
import { useAccount } from '@starknet-react/core'
import Image from 'next/image'
import {
  ETH_TOKEN_ADDRESS,
  USDC_TOKEN_ADDRESS,
  DAI_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
  LORDS_TOKEN_ADDRESS,
  STRK_TOKEN_ADDRESS,
} from '../context/StarknetProvider'
import { useBalance } from '@starknet-react/core'

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { address, isConnected } = useAccount()

  // Get balances
  const { data: usdc_data, error: usdc_error } = useBalance({
    token: USDC_TOKEN_ADDRESS,
    address: address,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: lords_data, error: lords_error } = useBalance({
    token: LORDS_TOKEN_ADDRESS,
    address: address,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: strk_data, error: strk_error } = useBalance({
    token: STRK_TOKEN_ADDRESS,
    address: address,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: usdt_data, error: usdt_error } = useBalance({
    token: USDT_TOKEN_ADDRESS,
    address: address,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: dai_data, error: dai_error } = useBalance({
    token: DAI_TOKEN_ADDRESS,
    address: address,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: eth_data, error: eth_error } = useBalance({
    token: ETH_TOKEN_ADDRESS,
    address: address,
    enabled: !!address,
    refetchInterval: 2000,
  })

  const prevUsdcBalance = useRef(usdc_data?.formatted)
  const prevLordsBalance = useRef(lords_data?.formatted)
  const prevStrkBalance = useRef(strk_data?.formatted)
  const prevEthBalance = useRef(eth_data?.formatted)
  const prevUsdtBalance = useRef(usdt_data?.formatted)
  const prevDaiBalance = useRef(dai_data?.formatted)

  useEffect(() => {
    if (!isConnected) {
      setIsDropdownOpen(false)
      return
    }
  }, [isConnected])

  useEffect(() => {
    prevUsdcBalance.current = usdc_data?.formatted
    prevLordsBalance.current = lords_data?.formatted
    prevStrkBalance.current = strk_data?.formatted
    prevEthBalance.current = eth_data?.formatted
    prevUsdtBalance.current = usdt_data?.formatted
    prevDaiBalance.current = dai_data?.formatted
  }, [usdc_data, lords_data, strk_data, eth_data, usdt_data, dai_data])

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
        <span className="text-white text-lg font-semibold">Nothing Agent</span>
      </div>

      <div className="relative">
        {!isConnected ? (
          <div className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white px-4 py-2 rounded-lg transition-colors">
            <Wallet2 size={18} />
            <ConnectWallet>Connect Wallet</ConnectWallet>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white px-4 py-2 rounded-lg transition-colors"
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

            {/* Add balance display */}
            <div className="absolute top-full mt-2 text-sm text-gray-300 space-y-1 right-0 text-right">
              {strk_data && (
                <div
                  className={`font-medium transition-colors ${
                    strk_data.formatted !== prevStrkBalance.current
                      ? 'animate-flash'
                      : ''
                  }`}
                >
                  <span className="text-white">
                    {Number(strk_data.formatted.slice(0, 6)).toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">{strk_data.symbol}</span>
                </div>
              )}
              {eth_data && (
                <div
                  className={`font-medium transition-colors ${
                    eth_data.formatted !== prevEthBalance.current
                      ? 'animate-flash'
                      : ''
                  }`}
                >
                  <span className="text-white">
                    {Number(eth_data.formatted.slice(0, 8)).toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">{eth_data.symbol}</span>
                </div>
              )}
              {lords_data && (
                <div
                  className={`font-medium transition-colors ${
                    lords_data.formatted !== prevLordsBalance.current
                      ? 'animate-flash'
                      : ''
                  }`}
                >
                  <span className="text-white">
                    {Number(lords_data.formatted.slice(0, 6)).toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {lords_data.symbol}
                  </span>
                </div>
              )}
              {usdc_data && (
                <div
                  className={`font-medium transition-colors ${
                    usdc_data.formatted !== prevUsdcBalance.current
                      ? 'animate-flash'
                      : ''
                  }`}
                >
                  <span className="text-white">
                    {Number(usdc_data.formatted.slice(0, 6)).toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">{usdc_data.symbol}</span>
                </div>
              )}
              {usdt_data && (
                <div
                  className={`font-medium transition-colors ${
                    usdt_data.formatted !== prevUsdtBalance.current
                      ? 'animate-flash'
                      : ''
                  }`}
                >
                  <span className="text-white">
                    {Number(usdt_data.formatted.slice(0, 6)).toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">{usdt_data.symbol}</span>
                </div>
              )}
              {dai_data && (
                <div
                  className={`font-medium transition-colors ${
                    dai_data.formatted !== prevDaiBalance.current
                      ? 'animate-flash'
                      : ''
                  }`}
                >
                  <span className="text-white">
                    {Number(dai_data.formatted.slice(0, 6)).toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-1">{dai_data.symbol}</span>
                </div>
              )}
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2c2c2c] rounded-lg shadow-lg py-1 border border-[#3c3c3c]">
                <div className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-[#3c3c3c] transition-colors">
                  <LogOut size={16} />
                  <DisconnectWallet>Disconnect</DisconnectWallet>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  )
}
