'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/app/components/Header'
import { Message } from '@/app/components/Message'
import { ChatInput } from '@/app/components/ChatInput'

interface ChatMessage {
  id: number
  content: string
  timestamp: string
  isOutgoing: boolean
}

export default function Home() {
  const now = new Date()

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: '👋 Welcome to our Nothing Agent!',
      timestamp: now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOutgoing: false,
    },
  ])

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOutgoing: true,
    }
    setMessages([...messages, newMessage])
  }

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
              />
            ))}
          </div>
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </>
  )
}
