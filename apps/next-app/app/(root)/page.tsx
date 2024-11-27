'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/app/components/Header'
import { Message } from '@/app/components/Message'
import { ChatInput } from '@/app/components/ChatInput'
import { useAccount } from '@starknet-react/core'

interface ChatMessage {
  id: number
  content: string
  timestamp: string
  isOutgoing: boolean
  sender?: 'user' | 'brian'
  executable?: boolean
  transactionData?: {
    steps: {
      contractAddress: string
      entrypoint: string
      calldata: string[]
    }[]
  }
}

export default function Home() {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

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
      sender: 'brian',
    },
  ])

  const handleSendMessage = async (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOutgoing: true,
      sender: 'user',
    }
    setMessages((prev) => [...prev, newMessage])

    // Prepare messages for API
    const apiMessages = messages.slice(1).map(({ content, sender }) => ({
      sender: sender,
      content,
    }))

    console.log('api messages: ' + JSON.stringify(apiMessages))

    try {
      setIsLoading(true)

      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: content,
          address: address,
          messages: apiMessages,
        }),
      })

      const data = await response.json()

      // Add Brian's response to the chat
      if (data.result?.[0]?.conversationHistory) {
        const lastMessage = data.result[0].conversationHistory.at(-1)
        if (lastMessage && lastMessage.sender === 'brian') {
          const brianResponse: ChatMessage = {
            id: Date.now(),
            content: lastMessage.content,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            isOutgoing: false,
            sender: 'brian',
            executable: true,
            transactionData: data.result[0].data,
          }
          setMessages((prev) => [...prev, brianResponse])
        }
      } else if (data.error) {
        const brianResponse: ChatMessage = {
          id: Date.now(),
          content: data.error,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isOutgoing: false,
          sender: 'brian',
          executable: false,
        }
        setMessages((prev) => [...prev, brianResponse])
      }
    } catch (error) {
      console.error('Failed to fetch response:', error)
    } finally {
      setIsLoading(false)
    }
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
