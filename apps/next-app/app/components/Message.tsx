interface MessageProps {
  content: string
  timestamp: string
  isOutgoing?: boolean
  isLoading?: boolean
  sender?: 'user' | 'brian'
  executable?: boolean
}

export function Message({
  content,
  timestamp,
  isOutgoing = false,
  isLoading = false,
  sender = 'brian',
  executable = false,
}: MessageProps) {
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

          {sender === 'brian' && executable && (
            <button className="bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600">
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
