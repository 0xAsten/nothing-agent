import React from 'react'

import { sepolia, mainnet, Chain } from '@starknet-react/chains'
import { StarknetConfig, voyager, Connector } from '@starknet-react/core'
import { RpcProvider } from 'starknet'

import ControllerConnector from '@cartridge/connector/controller'

const ETH_TOKEN_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

const connector = new ControllerConnector({
  policies: [
    {
      target: ETH_TOKEN_ADDRESS,
      method: 'approve',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      target: ETH_TOKEN_ADDRESS,
      method: 'transfer',
    },
  ],
  rpc: 'https://api.cartridge.gg/x/starknet/sepolia',
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
