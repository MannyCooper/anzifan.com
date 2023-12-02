import type { AppProps, NextWebVitalsMetric } from 'next/app'
import '../styles/globals.css'

import CONFIG from '@/blog.config'
import BlogLayout from '@/src/components/layout/BlogLayout'
import { Analytics } from '@vercel/analytics/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { event, GoogleAnalytics } from 'nextjs-google-analytics'
import NextNprogress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { NextPageWithLayout } from '../types/blog'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function BlogApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <BlogLayout>{page}</BlogLayout>)

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      duration: 500,
    })
  }, [])

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>安子璠的个人主页</title>
        <meta name="description" content="异次元の机智君" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NextNprogress
        color={CONFIG.PROGRESS_BAR_COLOR}
        options={{ showSpinner: false }}
      />
      <GoogleAnalytics trackPageViews />
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </ThemeProvider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { id, name, label, value } = metric
  event(name, {
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  })
}

export default BlogApp
