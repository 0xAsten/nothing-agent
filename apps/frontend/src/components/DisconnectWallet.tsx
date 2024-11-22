import { useDisconnect } from '@starknet-react/core'
import { Button } from '@cartridge/ui-next'
import React from 'react'

export function DisconnectWallet({ children }: { children: React.ReactNode }) {
  const { disconnect } = useDisconnect()

  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    disconnect()
  }

  return <Button onClick={handleDisconnect}>{children}</Button>
}
