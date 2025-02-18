'use client'

import { TelegramHeader } from '@/app/components/TelegramHeader'
import { TelegramMessage } from '@/app/components/TelegramMessage'
import { TelegramChatInput } from '@/app/components/TelegramChatInput'
import { useChat } from '@/app/hooks/useChat'
import { useAccount } from '@starknet-react/core'

export default function TelegramPage() {
  const { address } = useAccount()
  const { messages, isLoading, handleSendMessage } = useChat(
    '👋 Welcome to our Nothing Agent on Telegram!',
    address,
  )

  return (
    <div className="min-h-screen bg-[#17212b] text-white">
      <TelegramHeader />
      <div className="pt-20 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {messages.map((message) => (
            <TelegramMessage
              key={message.id}
              content={message.content}
              timestamp={message.timestamp}
              isOutgoing={message.isOutgoing}
              isLoading={isLoading}
              sender={message.sender}
              executable={message.executable}
              transactionData={message.transactionData}
            />
          ))}
        </div>
      </div>
      <TelegramChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}
