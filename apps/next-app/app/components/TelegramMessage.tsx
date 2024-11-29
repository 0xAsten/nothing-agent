'use client'

import { useTelegramAccount } from '@/app/context/TelegramAccountProvider'
import { ArrowBigRight } from 'lucide-react'
import { useState } from 'react'

interface MessageProps {
  content: string
  timestamp: string
  isOutgoing?: boolean
  isLoading?: boolean
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

export function TelegramMessage({
  content,
  timestamp,
  isOutgoing = false,
  isLoading = false,
  sender = 'brian',
  executable = false,
  transactionData,
}: MessageProps) {
  const { account } = useTelegramAccount()
  const [txnHash, setTxnHash] = useState<string | undefined>(undefined)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleExecute = async () => {
    console.log('transactionData:' + JSON.stringify(transactionData))
    if (!account || !transactionData) return

    setSubmitted(true)
    setTxnHash(undefined)

    try {
      const { transaction_hash } = await account.execute(transactionData.steps)
      setTxnHash(transaction_hash)
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitted(false)
    }
  }

  return (
    <div
      className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isOutgoing
            ? 'bg-[#2ea6ff] text-white rounded-br-sm'
            : 'bg-[#212121] text-white rounded-bl-sm'
        }`}
      >
        <p className="text-sm">
          {content}
          {isLoading && (
            <span className="inline-flex ml-2">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          )}
        </p>
        <div className="flex justify-between">
          <p
            className={`text-xs mt-1 ${
              isOutgoing ? 'text-[#e3f2fd]' : 'text-gray-400'
            }`}
          >
            {timestamp}
          </p>

          <div>
            {sender === 'brian' && executable && (
              <button
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                onClick={handleExecute}
                disabled={submitted}
              >
                {submitted ? 'Submitted' : 'Confirm'}
              </button>
            )}

            {txnHash && (
              <a
                href={`https://starkscan.co/tx/${txnHash}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center ml-2 text-blue-500 hover:text-blue-600"
              >
                <ArrowBigRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
