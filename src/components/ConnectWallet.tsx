import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import ControllerConnector from '@cartridge/connector/controller'
import { Button } from '@cartridge/ui-next'

export function ConnectWallet() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()

  const controller = connectors[0] as ControllerConnector

  const [username, setUsername] = useState<string>()
  useEffect(() => {
    if (!address) return
    controller.username()?.then((n) => setUsername(n))
  }, [address, controller])

  return (
    <div>
      {address && (
        <>
          <p>Account: {address} </p>
          {username && <p>Username: {username}</p>}
        </>
      )}

      {address ? (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      ) : (
        <div className="flex gap-1">
          <Button onClick={() => connect({ connector: controller })}>
            Connect
          </Button>
          {/* <Button onClick={() => connect({ connector: session })}>
            Create Session
          </Button> */}
          {/* <Button onClick={openRegisterSessionUrl}>Register Session</Button> */}
        </div>
      )}
    </div>
  )
}
