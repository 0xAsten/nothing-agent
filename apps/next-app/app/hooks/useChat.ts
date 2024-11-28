import { useState, useEffect } from 'react'

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

export function useChat(initialContent: string, address?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMessages([
      {
        id: 1,
        content: initialContent,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOutgoing: false,
        sender: 'brian',
      },
    ])
  }, [initialContent])

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

  return {
    messages,
    isLoading,
    handleSendMessage,
  }
}
