import Moment from "react-moment";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { Colors } from "../lib/colors";
import { getDatabase } from "../lib/notion";
import { Post } from "../lib/types";
import Image from "next/image";
import { FullListLayout } from "../components/layout/ListLayout";
import moment from "moment";
import ThemedImage from "../components/ThemedImage";

// TODO: Add pagination and filter

const Archive: NextPage<{ posts: Post[] }> = ({ posts }) => {
    const yearArray = posts.map((post) => moment(post.date).format('YYYY'))

    return (
        <FullListLayout>
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">
                Archive 📡
            </h1>
            <ul className="flex flex-row flex-wrap items-stretch">
                {posts.map((post, index) =>
                    <div className="w-full" key={post.id}>
                        {index === 0 || (index > 0 && yearArray[index] !== yearArray[index - 1]) ?
                            <div className="w-full">
                                <Moment className={`block text-[28px] font-semibold ${index !== 0 ? "mt-13" : ""} mb-4`} date={post.date} fromNow
                                    // format="MM 月 yyyy 年"
                                    format="yyyy 年"
                                    local />
                            </div> : null
                        }
                        <li className={`mb-8 w-full group`} key={post.id} before={`content-DEFAULT flex-shrink-0 flex-grow-0 text-transparent select-none h-[1px] block bg-true-gray-200 mb-8`}>
                            <Link href="/post/[slug]" as={`/post/${post.slug}`} >
                                <a className="flex flex-row lg:items-center">
                                    <div className="aspect-square md:aspect-video h-26 md:h-37 lg:h-41.5 rounded-2xl overflow-hidden shrink-0">
                                        <div className={`relative duration-500 ease-in-out filter group-hover:brightness-90 transition w-full h-full rounded-2xl overflow-hidden transform rotate-0`}>
                                            <ThemedImage post={post} quality={80} className="transition-all duration-500 ease-in-out opacity-100 mobile-hover:group-hover:scale-105
                                                group-hover:rotate-0 group-hover:active:scale-105 group-hover:opacity-90 transform-gpu rounded-2xl overflow-hidden" />
                                        </div>
                                    </div>
                                    <div className="pl-4 md:pl-8 basis-0 flex-shrink-0 flex-grow">
                                        <Link href="/category/[{Category}]" as={`/category/${post.category.name}`} passHref>
                                            {/* <a> */}
                                            <p className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[post.category.color].text.normal} `} >{post.category.name}</p>
                                            {/* </a> */}
                                        </Link>
                                        <p className="font-semibold line-clamp-3 text-lg leading-5 md:text-xl lg:text-2xl mt-1 md:mt-2">{post.title}</p>
                                        <Moment className="block mt-2 md:mt-3 text-sm font-semibold text-true-gray-600" date={post.date} fromNow
                                            // format="MMM DD, yy"
                                            format="yyyy 年 MM 月 DD 日"
                                            local />
                                    </div>
                                </a>
                            </Link>
                        </li>
                    </div>
                )}
            </ul>
        </FullListLayout>
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

export default Archive