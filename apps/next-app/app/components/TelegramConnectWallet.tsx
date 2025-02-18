'use client'

import ControllerConnector from '@cartridge/connector/controller'
import SessionConnector from '@cartridge/connector/session'
import { Button } from '@cartridge/ui-next'
import { useConnect } from '@starknet-react/core'

export function TelegramConnectWallet({
  children,
}: {
  children: React.ReactNode
}) {
  const { connect, connectors } = useConnect()

  const controller = connectors[0] as SessionConnector

  const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('connecting')
    e.preventDefault()
    connect({ connector: controller })
  }

  return <Button onClick={handleConnect}>{children}</Button>
}
