'use client'

import { Header } from '@/app/components/Header'
import { Message } from '@/app/components/Message'
import { ChatInput } from '@/app/components/ChatInput'
import { useAccount } from '@starknet-react/core'
import { useChat } from './hooks/useChat'

export default function Home() {
  const { address } = useAccount()
  const { messages, isLoading, handleSendMessage } = useChat(
    '👋 Welcome to our Nothing Agent!',
    address,
  )

  return (
    <>
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Header />
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
    </>
  )
}
