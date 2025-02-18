'use client'

import { Button } from '@cartridge/ui-next'
import React from 'react'
import { useDisconnect } from '@starknet-react/core'

// import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'

export function TelegramDisconnectWallet({
  children,
}: {
  children: React.ReactNode
}) {
  // const { clearSession } = useTelegramAccount()

  const { disconnect } = useDisconnect()

  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    disconnect()
  }

  return <Button onClick={handleDisconnect}>{children}</Button>
}
