'use client'

import ControllerConnector from '@cartridge/connector/controller'
import { Button } from '@cartridge/ui-next'
import { useConnect } from '@starknet-react/core'

// import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'

export function TelegramConnectWallet({
  children,
}: {
  children: React.ReactNode
}) {
  // const { openConnectionPage } = useTelegramAccount()

  const { connect, connectors } = useConnect()

  const controller = connectors[0] as ControllerConnector

  const handleConnect = () => {
    console.log('connecting')
    connect({ connector: controller })
  }

  return <Button onClick={handleConnect}>{children}</Button>
}
