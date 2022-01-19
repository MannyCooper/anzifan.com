import type { NextApiRequest, NextApiResponse } from 'next'
import { unfurl } from 'unfurl.js'

type Data = Awaited<ReturnType<typeof unfurl>>

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { url } = req.query
    const decodedUrl = decodeURIComponent(url as string)

    const linkPreview = await unfurl(decodedUrl, {
        // userAgent:
            // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Safari/605.1.15',
    })

    res.status(200).json(linkPreview)
}