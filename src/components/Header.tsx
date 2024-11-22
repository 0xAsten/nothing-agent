import { Wallet2 } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1c1c1c] text-white p-4 flex justify-between items-center z-50">
      <h1 className="text-lg font-medium">Mini App</h1>
      <button
        onClick={() => alert('Wallet connection coming soon!')}
        className="flex items-center gap-2 bg-[#2ea6ff] hover:bg-[#2495e7] text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Wallet2 size={18} />
        <span>Connect Wallet</span>
      </button>
    </header>
  )
}
