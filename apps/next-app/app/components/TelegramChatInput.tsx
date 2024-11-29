'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { TelegramConnectWallet } from './TelegramConnectWallet'
import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export function TelegramChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const { address } = useTelegramAccount()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-[#1c1c1c] border-t border-[#2c2c2c] p-4"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#2c2c2c] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ea6ff]"
          disabled={isLoading}
        />
        {!address ? (
          <TelegramConnectWallet>Connect Wallet</TelegramConnectWallet>
        ) : (
          <button
            type="submit"
            className="bg-[#2ea6ff] hover:bg-[#2495e7] text-white p-2 rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Send size={20} />
            )}
          </button>
        )}
      </div>
    </form>
  )
}
