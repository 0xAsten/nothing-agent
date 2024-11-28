'use client'

import React from 'react'

import { sepolia, mainnet, Chain } from '@starknet-react/chains'
import { StarknetConfig, voyager, Connector } from '@starknet-react/core'
import { RpcProvider } from 'starknet'

import ControllerConnector from '@cartridge/connector/controller'
import { POLICIES, RPC_URL, SEPOLIA_RPC_URL } from '../../constants'

const connector = new ControllerConnector({
  policies: POLICIES,
  rpc: RPC_URL,
})

function provider(chain: Chain) {
  switch (chain) {
    case mainnet:
      return new RpcProvider({
        nodeUrl: RPC_URL,
      })
    case sepolia:
    default:
      return new RpcProvider({
        nodeUrl: SEPOLIA_RPC_URL,
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
