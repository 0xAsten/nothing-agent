'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount, useBalance } from '@starknet-react/core'
// import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'
import {
  ETH_TOKEN_ADDRESS,
  USDC_TOKEN_ADDRESS,
  DAI_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
  LORDS_TOKEN_ADDRESS,
  STRK_TOKEN_ADDRESS,
} from '@/constants'

interface BalanceDisplayProps {
  data: any
  prevBalance: any
}

const BalanceDisplay = ({ data, prevBalance }: BalanceDisplayProps) => {
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    if (data) {
      const tmp = prevBalance.current
      prevBalance.current = data.formatted

      if (data.formatted !== tmp) {
        setIsChanged(true)
        const timer = setTimeout(() => setIsChanged(false), 2000) // Adjust duration as needed
        return () => clearTimeout(timer)
      }
    }
  }, [data, prevBalance])

  return (
    <div
      className={`font-medium transition-colors ${
        isChanged ? 'animate-flash' : ''
      }`}
    >
      <span className="text-white text-xs">
        {Number(data?.formatted.slice(0, 6)).toLocaleString()}
      </span>
      <span className="text-gray-400 ml-1 text-xs">{data?.symbol}</span>
    </div>
  )
}

export function TelegramWalletBalances() {
  const { address } = useAccount()

  // Get balances
  const { data: usdc_data } = useBalance({
    token: USDC_TOKEN_ADDRESS,
    address: address as `0x${string}`,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: lords_data } = useBalance({
    token: LORDS_TOKEN_ADDRESS,
    address: address as `0x${string}`,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: strk_data } = useBalance({
    token: STRK_TOKEN_ADDRESS,
    address: address as `0x${string}`,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: usdt_data } = useBalance({
    token: USDT_TOKEN_ADDRESS,
    address: address as `0x${string}`,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: dai_data } = useBalance({
    token: DAI_TOKEN_ADDRESS,
    address: address as `0x${string}`,
    enabled: !!address,
    refetchInterval: 2000,
  })
  const { data: eth_data } = useBalance({
    token: ETH_TOKEN_ADDRESS,
    address: address as `0x${string}`,
    enabled: !!address,
    refetchInterval: 2000,
  })

  const prevUsdcBalance = useRef(usdc_data?.formatted)
  const prevLordsBalance = useRef(lords_data?.formatted)
  const prevStrkBalance = useRef(strk_data?.formatted)
  const prevEthBalance = useRef(eth_data?.formatted)
  const prevUsdtBalance = useRef(usdt_data?.formatted)
  const prevDaiBalance = useRef(dai_data?.formatted)

  return (
    <div className="absolute top-full mt-2 text-sm text-gray-300 space-y-1 right-0 text-right">
      <BalanceDisplay data={usdc_data} prevBalance={prevUsdcBalance} />
      <BalanceDisplay data={lords_data} prevBalance={prevLordsBalance} />
      <BalanceDisplay data={strk_data} prevBalance={prevStrkBalance} />
      <BalanceDisplay data={eth_data} prevBalance={prevEthBalance} />
      <BalanceDisplay data={usdt_data} prevBalance={prevUsdtBalance} />
      <BalanceDisplay data={dai_data} prevBalance={prevDaiBalance} />
    </div>
  )
}
