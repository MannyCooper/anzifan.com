import { config } from '@fortawesome/fontawesome-svg-core'
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

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  
  const getLayout = Component.getLayout || ((page: any) => <BlogLayout>{page}</BlogLayout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>异次元电台⚡️</title>
      </Head>
      <NextNprogress color="#ff375f"  options={{ showSpinner: false }}/>      
      {getLayout(
        <Component {...pageProps} />
      )}      
    </>
  )
}

export default MyApp
