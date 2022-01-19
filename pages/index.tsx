import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { getDatabase } from '../lib/notion'
import PostList from '../components/PostList'
import { Post } from '../lib/types'

import { getPlaiceholder } from "plaiceholder";

// type PostResult = QueryDatabaseResponse['results'][number];

// export type Posts = {
//   posts: Post[];
// }


const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {

  return (
    <>
      <PostList posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await getDatabase()

  for (let post of db) {    
    if (post) {
      (post).cover.blurLight = (await getPlaiceholder(post.cover.light, {
        size: 10,
      })).base64;
      (post).cover.blurDark = (await getPlaiceholder(post.cover.dark, {
        size: 10,       
      })).base64; 
    }
  }

  return {
    props: {
      posts: db,
    },
    revalidate: 10,
  }
}

export default Home
