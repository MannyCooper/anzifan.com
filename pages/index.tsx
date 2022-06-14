import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { getDatabase } from '../lib/notion'
import PostList from '../components/PostList'
import { Post } from '../lib/types'

import { getPlaiceholder } from "plaiceholder";
import { WidgetMeMedium, WidgetMeSmall } from '../components/widget/WidgetMe'
import ListLayout from '../components/layout/ListLayout'
import { WidgetOverViewMedium, WidgetOverViewSmall } from '../components/widget/WidgetOverview'
import { Media, MediaContextProvider } from '../components/utility/Breakpoints'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { me } from '../config/me'

// type PostResult = QueryDatabaseResponse['results'][number];

// export type Posts = {
//   posts: Post[];
// }

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const mainPosts = posts.slice(0, 17)
  const router = useRouter();
  const { locale } = router;
  const description = "异次元de机智君的个人博客"
  const featuredImage = {
    url: `${me.site}/static/images/og.png`,
    alt: description,
}
  return (
    <>
    {/* <NextSeo
        canonical={router.asPath}
        description={description}
        openGraph={{
          description,
          locale,
          images: [featuredImage],
          url: `${router.asPath}`,
        }}
      /> */}
      <ListLayout>
        <MediaContextProvider >
          <Media greaterThanOrEqual="md" className="grid grid-cols-2 gap-6.5 lg:gap-10">
            <WidgetMeMedium />
            <WidgetOverViewMedium posts={posts} />
          </Media>
          <Media lessThan="md" className="grid grid-cols-2 gap-4">
            <WidgetMeSmall />
            <WidgetOverViewSmall posts={posts} />
          </Media>
        </MediaContextProvider>
      </ListLayout>
      <PostList posts={mainPosts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await getDatabase()
  for (let post of db) {
    if (post) {
      try {
        post.cover.blurLight = (await getPlaiceholder(post.cover.light, {
          size: 10,
        })).base64
        post.cover.blurDark = (await getPlaiceholder(post.cover.dark, {
          size: 10,
        })).base64
      } catch (e) {
        post.cover.blurLight = ''
        post.cover.blurDark = ''
      }
    }
  }

  return {
    props: {
      posts: db,
    },
    revalidate: 60 * 60,
  }
}

export default Home
