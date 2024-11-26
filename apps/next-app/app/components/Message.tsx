interface MessageProps {
  content: string
  timestamp: string
  isOutgoing?: boolean
  isLoading?: boolean
}

export function Message({
  content,
  timestamp,
  isOutgoing = false,
  isLoading = false,
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

        <p
          className={`text-xs mt-1 ${
            isOutgoing ? 'text-[#e3f2fd]' : 'text-gray-400'
          }`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  )
}
