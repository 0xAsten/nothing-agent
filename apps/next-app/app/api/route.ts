export const GET = async () => {
  return Response.json({ message: 'Hello, World!' })
}

export interface Message {
  sender: 'user' | 'brian'
  content: string
}

const API_URL = 'https://api.brianknows.org/api/v0/agent'
const API_KEY = process.env.BRIAN_API_KEY

export const POST = async (request: Request) => {
  const body = await request.json()

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-Brian-Api-Key': API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: body.prompt,
      address: body.address,
      messages: body.messages,
    }),
  })

  const data = await response.json()

  return Response.json(data)
}
