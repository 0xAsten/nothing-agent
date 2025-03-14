'use client'

import React from 'react'

import { sepolia, mainnet, Chain } from '@starknet-react/chains'
import { StarknetConfig, voyager, Connector } from '@starknet-react/core'
import { RpcProvider, constants } from 'starknet'

import ControllerConnector from '@cartridge/connector/controller'
import { POLICIES, RPC_URL, SEPOLIA_RPC_URL } from '../../constants'
import { ColorMode } from '@cartridge/controller'
import {
  USDC_TOKEN_ADDRESS,
  USDT_TOKEN_ADDRESS,
  LORDS_TOKEN_ADDRESS,
} from '@/constants'

const colorMode: ColorMode = 'dark'
const connector = new ControllerConnector({
  policies: POLICIES,
  defaultChainId: constants.StarknetChainId.SN_MAIN,
  chains: [{ rpcUrl: RPC_URL }],
  colorMode,
  tokens: {
    erc20: [LORDS_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS],
  },
  slot: 'warpacks-sepolia-0-2-3-torii',
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
      connectors={[connector]}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  )
}
