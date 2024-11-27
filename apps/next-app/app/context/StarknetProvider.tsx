'use client'

import React from 'react'

import { sepolia, mainnet, Chain } from '@starknet-react/chains'
import { StarknetConfig, voyager, Connector } from '@starknet-react/core'
import { RpcProvider } from 'starknet'

import ControllerConnector from '@cartridge/connector/controller'

const ETH_TOKEN_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

const USDC_TOKEN_ADDRESS =
  '0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8'

const SWAP_USDC_STRK_ADDRESS =
  '0x4270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f'

const connector = new ControllerConnector({
  policies: [
    {
      target: USDC_TOKEN_ADDRESS,
      method: 'approve',
      description: 'Approve USDC token for the swap.',
    },
    {
      target: SWAP_USDC_STRK_ADDRESS,
      method: 'multi_route_swap',
      description: 'Swap USDC to STRK.',
    },
  ],
  rpc: 'https://api.cartridge.gg/x/starknet/mainnet',
})

function provider(chain: Chain) {
  switch (chain) {
    case mainnet:
      return new RpcProvider({
        nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet',
      })
    case sepolia:
    default:
      return new RpcProvider({
        nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia',
      })
  }
}

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={provider}
      connectors={[connector as never as Connector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  )
}
