import { SessionPolicies } from '@cartridge/controller'

export const KEYCHAIN_URL = 'https://x.cartridge.gg'
export const RPC_URL = 'https://api.cartridge.gg/x/starknet/mainnet'
export const SEPOLIA_RPC_URL = 'https://api.cartridge.gg/x/starknet/sepolia'
export const REDIRECT_URI = 'https://t.me/NothingAgent_bot/NothingAgent'

export const ETH_TOKEN_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'

export const USDC_TOKEN_ADDRESS =
  '0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8'

export const STRK_TOKEN_ADDRESS =
  '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d'

export const DAI_TOKEN_ADDRESS =
  '0xda114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3'

export const USDT_TOKEN_ADDRESS =
  '0x68f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8'

export const LORDS_TOKEN_ADDRESS =
  '0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49'

export const SWAP_USDC_STRK_ADDRESS =
  '0x4270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f'

export const POLICIES: SessionPolicies = {
  contracts: {
    [USDC_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
        },
      ],
    },
    [ETH_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
        },
      ],
    },
    [STRK_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
        },
      ],
    },
    [DAI_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
        },
      ],
    },
    [USDT_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
        },
      ],
    },
    [LORDS_TOKEN_ADDRESS]: {
      methods: [
        {
          name: 'approve',
          entrypoint: 'approve',
        },
      ],
    },
    [SWAP_USDC_STRK_ADDRESS]: {
      methods: [
        {
          name: 'multi_route_swap',
          entrypoint: 'multi_route_swap',
        },
      ],
    },
  },
}
