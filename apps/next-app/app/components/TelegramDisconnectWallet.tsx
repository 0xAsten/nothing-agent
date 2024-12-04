'use client'

import { Button } from '@cartridge/ui-next'
import React from 'react'
import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'

export function TelegramDisconnectWallet({
  children,
}: {
  children: React.ReactNode
}) {
  const { clearSession } = useTelegramAccount()

  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    clearSession()
  }

  return <Button onClick={handleDisconnect}>{children}</Button>
}
