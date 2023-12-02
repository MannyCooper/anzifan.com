import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { NextApiRequest, NextApiResponse } from 'next'

const propertyId = process.env.GOOGLE_PROPERTY_ID
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
})

const sumArray = (arr: number[] | undefined, chunkSize = 8) => {
  if (!arr) return []
  return arr.reduce((acc, val, i) => {
    const chunkIndex = Math.floor(i / chunkSize)
    acc[chunkIndex] = (acc[chunkIndex] || 0) + val
    return acc
  }, [] as number[])
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '383daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'eventCount',
        },
        {
          name: 'totalUsers',
        },
      ],
    })

    const pvArray = response.rows?.map((row) =>
      parseInt(row['metricValues']?.[0].value as string)
    )
    const uvArray = response.rows?.map((row) =>
      parseInt(row['metricValues']?.[1].value as string)
    )

    const result = {
      pv: sumArray(pvArray),
      uv: sumArray(uvArray),
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    res.status(500).json({ message: 'Error fetching analytics data' })
  }
}
