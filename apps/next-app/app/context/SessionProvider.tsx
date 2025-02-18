import SessionConnector from '@cartridge/connector/session'
import { constants } from 'starknet'
import { jsonRpcProvider, StarknetConfig } from '@starknet-react/core'
import { mainnet } from '@starknet-react/chains'
import { sepolia } from '@starknet-react/chains'

import { RPC_URL, POLICIES, REDIRECT_URI } from '@/constants'
import { PropsWithChildren } from 'react'

const connector = new SessionConnector({
  policies: POLICIES,
  rpc: RPC_URL,
  chainId: constants.StarknetChainId.SN_MAIN,
  redirectUrl: REDIRECT_URI,
})

const provider = jsonRpcProvider({
  rpc: () => ({ nodeUrl: RPC_URL }),
})

export function SessionProvider({ children }: PropsWithChildren) {
  return (
    <StarknetConfig
      autoConnect
      chains={[mainnet, sepolia]}
      connectors={[connector]}
      provider={provider}
    >
      {children}
    </StarknetConfig>
  )
}
