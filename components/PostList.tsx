import { NextPage } from "next";
import Image from "next/image";
import Link from 'next/link';
import { Post } from "../lib/types";
import ListLayout from "./layout/ListLayout"
import Moment from "react-moment";
import { Colors } from "../lib/colors"
// import { useState } from "react";

const PostList: NextPage<{ posts: Post[] }> = ({ posts }) => {

  const mainPosts = posts.slice(0, 9)

  const postSize = {
    big: {
      cardSize: 'w-full col-span-6 h-117 md:(flex flex-row h-65) lg:h-90',
      imgSize: 'h-6/8 md:(h-full w-115) lg:w-160',
      title: 'line-clamp-2 text-2xl md:(text-xl leading-tight line-clamp-3) lg:text-3xl',
    },
    medium: {
      cardSize: 'col-span-6 md:col-span-3 h-90 md:h-85 lg:h-107',
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
        return postSize.medium
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

  return (
    <ListLayout>
      <div className="my-6">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">Latest Posts💫</h1>        
        <div className="grid grid-cols-6 gap-6.5 lg:gap-10">
          {mainPosts.map((post: Post, index: Number) => {
            const size = itemSizeSwitch(index)

            return (
              <div key={post.id} className={`${size.cardSize}`} data-aos={index === 0 ? `` : `fade-up`} >
                <Link href="/post/[slug]" as={`/post/${post.slug}`} >
                  <a className="w-full">
                    <div className={`bg-white rounded-3xl overflow-hidden shadow-lg md:shadow-none shadow-true-gray-200 ${size.cardSize} flex flex-col group transition duration-500 ease-in-out transform-gpu mobile-hover:hover:scale-95
                    md:hover:shadow-lg hover:rotate-0 hover:active:scale-95`}>
                      <header className={`relative ${size.imgSize} duration-500 ease-in-out md:(filter group-hover:brightness-90) transition `}>
                        <Image src={post.cover.light} quality={100} layout="fill" objectFit="cover" sizes="100%" alt={post.title}
                          // onLoadingComplete={handleLoad}
                          placeholder="blur"
                          blurDataURL={post.cover.blurLight}
                          className="transition-all duration-500 ease-in-out opacity-100 md:(group-hover:scale-105 group-hover:opacity-90) transform-gpu" />
                      </header>
                      <div className="flex flex-col justify-between flex-1 p-6">
                        <article>
                          <Link href="/category/[{Category}]" as={`/category/${post.category.name}`} passHref>
                            {/* <a> */}
                            <p className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[post.category.color].text.light} `} >{post.category.name}</p>
                            {/* </a> */}
                          </Link>
                          <h2 className={`${size.title} font-bold`}>{post.title}</h2>
                        </article>
                        <Moment className="block mt-2 text-sm font-semibold text-true-gray-600" date={post.date} fromNow
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
  )
}

export default PostList