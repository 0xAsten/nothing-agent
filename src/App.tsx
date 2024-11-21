import './App.css'
import { StarknetProvider } from './context/StarknetProvider.tsx'

import { ConnectWallet } from './components/ConnectWallet.tsx'
import { TransferEth } from './components/TransferEth.tsx'

function App() {
  return (
    <>
      <StarknetProvider>
        <ConnectWallet />
        <TransferEth />
      </StarknetProvider>
    </>
  )
}

export default App
