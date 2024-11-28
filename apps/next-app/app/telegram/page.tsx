'use client'

import { TelegramHeader } from '@/app/components/TelegramHeader'
import { Message } from '@/app/components/Message'
import { ChatInput } from '@/app/components/ChatInput'
import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'
import { useChat } from '@/app/hooks/useChat'

export default function TelegramPage() {
  const { address } = useTelegramAccount()
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
            <Message
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
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}
