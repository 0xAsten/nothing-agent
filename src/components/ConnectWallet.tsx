import { useConnect } from '@starknet-react/core'
import ControllerConnector from '@cartridge/connector/controller'
import { Button } from '@cartridge/ui-next'

export function ConnectWallet({ children }: { children: React.ReactNode }) {
  const { connect, connectors } = useConnect()

  const controller = connectors[0] as ControllerConnector

  const handleConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('connecting')
    e.preventDefault()
    connect({ connector: controller })
  }

  return <Button onClick={handleConnect}>{children}</Button>
}
