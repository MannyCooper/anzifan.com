import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query
  const decodedUrl = decodeURIComponent(url as string)

  const response = await fetch(decodedUrl, {
    method: 'HEAD',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 200) {
    res.status(200).json({ status: 'up' })
  } else {
    res.status(200).json({ status: 'down' })
  }
}
