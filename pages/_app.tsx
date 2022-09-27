import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

import 'windi.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BlogLayout from '../components/layout/BlogLayout'
import Head from 'next/head'

import AOS from 'aos';
import 'aos/dist/aos.css';
import type { ReactElement, ReactNode } from "react";
import { useEffect } from 'react';
import NextNprogress from 'nextjs-progressbar';
import type { NextPage } from 'next'
import { pageview } from '../lib/gtag'
import { ThemeProvider } from 'next-themes'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

config.autoAddCss = false
library.add(fab)

declare global {
  interface Window {
    _hmt: any;
  }
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    const handleRouteChange = (url: string) => {
      pageview(url, document.title);
      try {
        window._hmt.push(['_trackPageview', url]);
      } catch (e) { }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const getLayout = Component.getLayout || ((page: any) => <BlogLayout>{page}</BlogLayout>);

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>安子璠的个人主页</title>
        <meta name="description" content="异次元の机智君" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NextNprogress color="#ff9500" options={{ showSpinner: false }} />
      {getLayout(
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  )
}

export default MyApp
