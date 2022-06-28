import { GetStaticProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { getAllBlocks, getDatabase, getPage } from "../../lib/notion"
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { renderNotionBlock } from "../../components/NotionBlockRenderer"
import ContentLayout, { CoverLayout } from "../../components/layout/ContentLayout"
import Head from "next/head"
import DefaultErrorPage from 'next/error'
import probeImageSize from "../../lib/probeImageSize"
import { BlogLayoutWhite } from "../../components/layout/BlogLayout"
import type { ReactElement } from 'react'
import { NextPageWithLayout } from "../_app"
import Moment from "react-moment"
import Link from "next/link"
import { Colors } from "../../lib/colors"
import { getPlaiceholder } from "plaiceholder";
import { Share } from "../../components/Share";
import Licensing from "../../components/Licensing";
import TagsIcon from '../../assets/tags.svg'
import Pagination from "../../components/Pagination";
import Comment from "../../components/Comment";
import { Media, MediaContextProvider } from "../../components/utility/Breakpoints";
import { WidgetMeMedium, WidgetMeSmall } from "../../components/widget/WidgetMe";
import { WidgetOverViewMedium, WidgetOverViewSmall } from "../../components/widget/WidgetOverview";
import ListLayout from "../../components/layout/ListLayout";
import ThemedImage from "../../components/ThemedImage";
import FrontMessage from "../../components/FrontMessage";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../lib/types";
import readingTime from "reading-time";
import PostSeo from "../../components/PostSeo";
import { useRouter } from "next/router";

const PostPage: NextPage<{ page: Post; blocks: any[]; pagination: any; posts: any; setToc : Dispatch<SetStateAction<any>> }> = ({ page, blocks, pagination, posts, setToc }) => {
    const { text } = readingTime(blocks.map(b => b.paragraph?.text?.map((t: any) => t.text?.content)).join(""));
    const router = useRouter();
    const { locale } = router;
    setToc(blocks)
    if (!page || !blocks) {
        return <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <DefaultErrorPage statusCode={404} />
        </>
    }

    return (
        <>
            <PostSeo date={page.date} description={page.excerpt} image={page.cover.light} locale={locale || ""} title={page.title} url={router.asPath}
            />
            <ContentLayout>
                <header className="flex flex-col text-justify break-word" data-aos="fade-down">
                    <div className="mt-3 md:mt-6">
                        <Link href="/category/[{Category}]" as={`/category/${page.category.name}`}>
                            <a>
                                <p className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[page.category.color].text.normal} `}>{page.category.name}</p>
                            </a>
                        </Link>
                        <div className="flex flex-row items-center mt-2 space-x-2 text-sm font-semibold text-true-gray-600 dark:text-true-gray-400">
                            <Moment date={page.date} fromNow
                                // format="MMM DD, yy"
                                format="yyyy 年 MM 月 DD 日"
                                local />
                            <p>·</p>
                            <p>{text}</p>
                            <p>·</p>
                            <p><span id="twikoo_visitors"><span className="animate-pulse">-</span></span> Views</p>
                        </div>
                    </div>
                    <p className={`my-6 text-4xl font-bold whitespace-pre-wrap lg:text-5xl ${page.colorTitle ? `${Colors[page.category.color]?.bg.gradient} bg-gradient-to-r text-transparent bg-clip-text` : ""} relative z-0`}>{page.title}</p>
                    <p className="mb-4 text-xl font-medium text-true-gray-600 lg:text-2xl" dark="text-true-gray-400">
                        {page.excerpt}
                    </p>
                    <Share />
                </header>
            </ContentLayout>
            <CoverLayout>
                <div className="relative w-full h-full md:rounded-3xl" data-aos="fade-up" data-aos-duration="500">
                    <ThemedImage className="z-0 overflow-hidden transition-all duration-500 ease-in-out md:rounded-3xl" post={page} />
                </div>
            </CoverLayout>
            <ContentLayout>
                <FrontMessage post={page} />
                {blocks.map(block => {
                    return (
                        <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                    )
                })}
                <div className={`flex flex-col mt-8 justify-between ${page.originalCover ? "md:flex-row-reverse md:items-center" : ""} gap-4 w-full`}>
                    {page.originalCover ?
                        <a href="mailto:541297173@qq.com">
                            <div className="inline-block px-2 py-1 space-x-2 text-sm rounded-full whitespace-nowrap bg-true-gray-100 text-true-gray-800" dark="bg-true-gray-800 text-true-gray-100">
                                <FontAwesomeIcon icon={faPalette} />
                                <span>原创封面图，请勿盗用</span>
                            </div>
                        </a> : null}
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 overflow-scroll scrollbar-hide">
                        <TagsIcon />
                        {page.tags.map((tag: any) =>
                            <Link href={`/tag/${tag.name}`} as={`/tag/${tag.name}`} key={tag.name}>
                                <a href={`/tag/${tag.name}`}>
                                    <div className={`${Colors[tag.color]?.bg.msg ?? Colors['gray'].bg.msg} bg-gradient-to-bl from-white/20 text-white flex items-center text-xs py-1 px-2  rounded-full whitespace-nowrap`} dark="bg-gradient-to-br to-black/10" >
                                        {tag.name}
                                    </div>
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
                <Licensing page={page} data-aos="fade-up" data-aos-duration="500" />
                <Pagination pagination={pagination} data-aos="fade-up" data-aos-duration="500"></Pagination>
            </ContentLayout>
            <ContentLayout>
                {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-2"> */}
                <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-2">
                    <WidgetMeMedium fix={true} />
                    <WidgetOverViewMedium posts={posts} fix={true} />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:hidden md:grid-cols-2">
                    <WidgetMeSmall />
                    <WidgetOverViewSmall posts={posts} />
                </div>
                {/* </div> */}
                {/* <MediaContextProvider >
                    <Media greaterThanOrEqual="sm" className="grid grid-cols-2 gap-4 md:grid-cols-2">                       
                        <WidgetMeMedium fix={true} />
                        <WidgetOverViewMedium posts={posts} fix={true} />
                    </Media>
                    <Media lessThan="sm" className="grid grid-cols-2 gap-2">                        
                        <WidgetMeSmall />
                        <WidgetOverViewSmall posts={posts} />
                    </Media>
                </MediaContextProvider> */}
            </ContentLayout>
            <ContentLayout>
                <Comment />
            </ContentLayout>
        </>
    )
}

export const getStaticPaths = async () => {
    const db = await getDatabase()

    return {
        paths: db.map((p: any) => ({ params: { slug: p.slug } })),
        fallback: 'blocking',
    }
}

interface Props extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as Props
    const db = await getDatabase(slug)
    // const posts = await getDatabase()
    // const post = db[0].id
    // const page = await getPage(post)

    // const page = db[0]
    // TODO: pagination causes the page's data too big(135kb), may be using search or changing it to a recommendation list
    const pageIndex = db.findIndex(p => p.slug === slug)
    const page = db[pageIndex]
    const prev = db[pageIndex - 1] || null
    const next = db[pageIndex + 1] || null

    if (prev) {
        prev.cover.blurLight = (await getPlaiceholder(prev.cover.light, {
            size: 10,
        })).base64
        prev.cover.blurDark = (await getPlaiceholder(prev.cover.dark, {
            size: 10,
        })).base64
    }

    if (next) {
        next.cover.blurLight = (await getPlaiceholder(next.cover.light, {
            size: 10,
        })).base64
        next.cover.blurDark = (await getPlaiceholder(next.cover.dark, {
            size: 10,
        })).base64
    }

    const pagination: any = {
        prev: pageIndex - 1 >= 0 ? prev : null,
        next: pageIndex + 1 < db.length ? next : null
    }

    if (!page) return { props: {}, revalidate: 60 * 60 }


    if (page) {
        page.cover.blurLight = (await getPlaiceholder(page.cover.light, {
            size: 10,
        })).base64
        page.cover.blurDark = (await getPlaiceholder(page.cover.dark, {
            size: 10,
        })).base64
    }


    const blocks = await getAllBlocks(page.id)

    // Retrieve all child blocks fetched
    const childBlocks = await Promise.all(
        blocks
            .filter((b: any) => b.has_children)
            .map(async b => {
                return {
                    id: b.id,
                    children: await getAllBlocks(b.id),
                }
            })
    )

    const blocksWithChildren = blocks.map((b: any) => {
        if (b.has_children && !b[b.type].children) {
            b[b.type]['children'] = childBlocks.find(x => x.id === b.id)?.children
        }
        return b
    })

    // Resolve all images' sizes
    await Promise.all(
        blocksWithChildren
            .filter((b: any) => b.type === 'image')
            .map(async b => {
                const { type } = b
                const value = b[type]
                const src = value.type === 'external' ? value.external.url : value.file.url
                const { width, height } = await probeImageSize(src)
                const blur = (await getPlaiceholder(src, {
                    size: 10,
                })).base64
                value['size'] = { width, height }
                value['blur'] = blur
                b[type] = value
            })
    )

    await Promise.all(
        blocksWithChildren
            .filter((b: any) => b.type === 'numbered_list_item' || b.type === 'bulleted_list_item')
            .map(c => {
                const { type } = c
                if (c[type].children !== undefined)
                    c[type].children
                        .filter((image: any) => image.type === 'image')
                        .map(async (b: any) => {
                            const { type } = b
                            const value = b[type]
                            const src = value.type === 'external' ? value.external.url : value.file.url
                            const { width, height } = await probeImageSize(src)
                            const blur = (await getPlaiceholder(src, {
                                size: 10,
                            })).base64
                            value['size'] = { width, height }
                            value['blur'] = blur
                            b[type] = value
                        })
            })
    )

    // TODO:Replace ugly code by promise chain
    await Promise.all(
        blocksWithChildren
            .filter((c: any) => c.type === 'column_list')
            .map(async (b: any) => {
                await Promise.all(
                    b.blocks
                        .map(async (column: any) => {
                            const blocks = column.blocks ?? []
                            await Promise.all(
                                blocks
                                    .filter((b: any) => b.type === 'image')
                                    .map(async (b: any) => {
                                        const { type } = b
                                        const value = b[type]
                                        const src = value.type === 'external' ? value.external.url : value.file.url
                                        const { width, height } = await probeImageSize(src)
                                        const blur = (await getPlaiceholder(src, {
                                            size: 10,
                                        })).base64
                                        value['size'] = { width, height }
                                        value['blur'] = blur
                                        b[type] = value
                                    })
                            )
                        })
                )
            })
    )

    return { props: { page, blocks: blocksWithChildren, pagination, posts: db }, revalidate: 60 * 60 }
}

(PostPage as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
    return (
        <BlogLayoutWhite>
            {page}
        </BlogLayoutWhite>
    )
}

export default PostPage