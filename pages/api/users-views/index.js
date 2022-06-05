import { google } from "googleapis";

// import type { NextApiRequest, NextApiResponse } from 'next'
// TODO: Now is Universal Analytics. Will move to GA4 in 2023

export default async function handler(req, res) {
  const startDate = req.query.startDate || '2020-10-01';
  const slug = req.query.slug;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analytics = google.analytics({
      auth,
      version: 'v3',
    });

    const response = await analytics.data.ga.get({
      'end-date': 'today',
      ids: `ga:${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
      metrics: 'ga:users',
      dimensions: `${slug ? "ga:pagePath" : 'ga:week'}`,
      filters: `${slug ? `ga:pagePath==${slug}` : "ga:timeOnPage>=0"}`,
      'start-date': `${slug ? startDate : '365daysAgo'}`,
    });

    let usersHistory = response?.data?.rows?.map(row => parseInt(row[1]))
    const usersViews = response?.data?.totalsForAllResults['ga:users'];

    if (slug === undefined) {
      return res.status(200).json({
        usersHistory,
      });
    } else {
      return res.status(200).json({
        usersViews,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

}