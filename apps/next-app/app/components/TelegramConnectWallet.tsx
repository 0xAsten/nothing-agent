'use client'

import ControllerConnector from '@cartridge/connector/controller'
import { Button } from '@cartridge/ui-next'
import { useConnect } from '@starknet-react/core'

export function TelegramConnectWallet({
  children,
}: {
  children: React.ReactNode
}) {
  const { connect, connectors } = useConnect()

  const controller = connectors[0] as ControllerConnector

  const handleConnect = () => {
    console.log('connecting')
    connect({ connector: controller })
  }

  return <Button onClick={handleConnect}>{children}</Button>
}
