import { NextPage } from "next";
import Image from "next/image";
import Link from 'next/link';
import { Post } from "../lib/types";
import ListLayout from "./layout/ListLayout"
import Moment from "react-moment";
import { Colors } from "../lib/colors"
// import { useState } from "react";
import CategoriesIcon from '../assets/categories.svg'
import PostMore from "./PostMore";
import ThemedImage from "./ThemedImage";

interface PostListProps {
  posts: Post[],
  filter?: string,
  color?: string,
  count?: number
}

const PostList: NextPage<{ posts: Post[], filter?: string; color?: string, count?: number }> = ({ posts, filter, color, count }: PostListProps) => {

  const mainPosts = posts.slice(0, 9)
  const morePosts = posts.slice(9, 17)

  const postSize = {
    big: filter == undefined ? {
      cardSize: 'w-full col-span-6 h-117 md:(flex flex-row h-65) lg:h-90',
      imgSize: 'h-6/8 md:(h-full w-115) lg:w-160',
      title: 'line-clamp-2 text-2xl md:(text-xl leading-tight line-clamp-3) lg:text-3xl',
    } : {
      cardSize: 'h-90 w-full col-span-6 md:(col-span-3 h-85) lg:(h-90 col-span-6 flex flex-row)',
      imgSize: 'h-3/5 md:h-5/9 lg:(h-full w-160)',
      title: 'line-clamp-2 md:line-clamp-5 lg:line-clamp-6 text-xl leading-tight md:(text-lg leading-tight) lg:text-3xl',
    },
    medium: {
      cardSize: 'col-span-6 md:(col-span-3 h-85) h-90 lg:h-107',
      imgSize: 'h-3/5 md:h-5/9 lg:h-3/5',
      title: 'line-clamp-2 text-xl leading-tight md:(text-lg leading-tight) lg:(text-2xl leading-tight)',
    },
    small: {
      cardSize: 'col-span-6 md:col-span-3 lg:col-span-2 h-90 md:h-85',
      imgSize: 'h-3/5 md:h-5/9',
      title: 'line-clamp-2 text-xl leading-tight md:(text-lg leading-tight)',
    },
  }


  function itemSizeSwitch(index: Number) {
    switch (true) {
      case index == 0:
        return postSize.big
      case index < 3:
        return filter == undefined ? postSize.medium : postSize.small
      default:
        return postSize.small
    }
  }

  // const [ready, setReady] = useState(false);

  // const handleLoad = (event: any) => {
  //   event.persist();
  //   if (event.target.srcset) {
  //     setReady(true);
  //   }
  // };
  // console.log(count)
  return (
    <>
      <ListLayout>
        <div className="pb-10" data-aos="fade-up" data-aos-delay={filter == undefined ? "250" : "0"}>
          {filter == undefined ? "" : <p className="my-2 text-xs font-semibold text-true-gray-400">LATEST POSTS</p>}
          <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8"
          //  data-aos="fade-up"
          >
            {filter == undefined ? "Latest Posts💫" :
              <div className="flex justify-between">
                <div>
                  <span
                  // className={color == undefined ? "" : `${Colors[color]?.text.normal ?? Colors['gray'].text.normal}`}
                  >{filter}</span>
                  <span>🌟</span>
                </div>
                <span className={`${color == undefined ? "" : `${Colors[color]?.bg.msg ?? Colors['gray'].bg.msg} text-white`} text-center rounded-full px-2 h-full`}>
                  {count}
                </span>
              </div>
            }
          </h1>
          <div className="grid grid-cols-6 gap-6.5 lg:gap-10">
            {mainPosts.map((post: Post, index: Number) => {
              const size = itemSizeSwitch(index)              
              return (
                <div key={post.id} className={`${size.cardSize}`}
                  data-aos="fade-up"
                // {index === 0 ? `` : `fade-up`}            
                >
                  <Link href="/post/[slug]" as={`/post/${post.slug}`} >
                    <a className="w-full">
                      <div className={`bg-white rounded-3xl overflow-hidden shadow-lg md:shadow-none shadow-true-gray-200 ${size.cardSize} flex flex-col group transition duration-500 ease-in-out transform-gpu mobile-hover:hover:scale-95
                    md:hover:shadow-lg hover:rotate-0 hover:active:scale-95`} dark="bg-true-gray-900 shadow-none">
                        <header className={`relative ${size.imgSize} duration-500 ease-in-out md:(filter group-hover:brightness-90) transition`}>
                          <ThemedImage post={post} quality={100} className="transition-all duration-500 ease-in-out opacity-100 md:(group-hover:scale-105 group-hover:opacity-90) transform-gpu" />
                        </header>
                        <div className="flex flex-col justify-between flex-1 p-6">
                          <article
                            className="flex flex-col justify-between items-start"
                          >
                            <Link href="/category/[{Category}]" as={`/category/${post.category.name}`} passHref>
                              <p className={`mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[post.category.color].text.normal}`}>{post.category.name}</p>
                            </Link>
                            <h2 className={`${size.title} font-bold`}>{post.title}</h2>
                          </article>
                          <Moment className="block mt-2 text-sm font-semibold text-true-gray-600 dark:text-true-gray-400" date={post.date} fromNow
                            // format="MMM DD, yy"
                            format="yyyy 年 MM 月 DD 日"
                            local />
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              )
            }
            )}
          </div>
        </div>
      </ListLayout>
      {
        morePosts.length > 0 ?
          <div className="bg-white" dark="bg-true-gray-900">
            <ListLayout>
              <PostMore posts={morePosts} />
            </ListLayout>
          </div> :
          <div  data-aos="fade-up" className="text-center mb-10">
            <Link href={"/archive"}>
              <a>
                <p className="text-center border-2 border-black inline-block py-2 px-5 rounded-full hover:(bg-black  text-white) transition ease-in-out duration-400" dark="hover:(bg-white text-black) border-white">View Archive</p>
              </a>
            </Link>
          </div>
      }
    </>
  )
}

export default PostList