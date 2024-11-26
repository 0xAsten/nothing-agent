'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/app/components/Header'
import { Message } from '@/app/components/Message'
import { ChatInput } from '@/app/components/ChatInput'
import WebApp from '@twa-dev/sdk'

interface ChatMessage {
  id: number
  content: string
  timestamp: string
  isOutgoing: boolean
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: '👋 Welcome to our Telegram Mini App!',
      timestamp: '12:00',
      isOutgoing: false,
    },
    {
      id: 2,
      content: 'Connect your wallet to get started with crypto transactions.',
      timestamp: '12:01',
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

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
  }, [])

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
        {/* <ChatInput onSend={handleSendMessage} /> */}
      </div>
    </>
  )
}

export default App
