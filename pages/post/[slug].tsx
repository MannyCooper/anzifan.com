import { GetStaticProps, NextPage } from "next"
import Image from "next/image";
import { ParsedUrlQuery } from "querystring"
import { getAllBlocks, getDatabase, getPage } from "../../lib/notion"
import { Fragment, useEffect, useState } from 'react'
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
import { Reaction, Share } from "../../components/Share";
import Licensing from "../../components/Licensing";
import TagsIcon from '../../assets/tags.svg'
import Pagination from "../../components/Pagination";
import Comment from "../../components/Comment";
import { Media, MediaContextProvider } from "../../components/utility/Breakpoints";
import { WidgetMeMedium, WidgetMeSmall } from "../../components/widget/WidgetMe";
import { WidgetOverViewMedium, WidgetOverViewSmall } from "../../components/widget/WidgetOverview";
import ListLayout from "../../components/layout/ListLayout";
import ThemedImage from "../../components/ThemedImage";

const PostPage: NextPage<{ page: any; blocks: any[]; pagination: any; posts: any }> = ({ page, blocks, pagination, posts }) => {    
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
            <ContentLayout>
                <header className="flex flex-col text-justify break-word" data-aos="fade-down">
                    <div>
                        <Link href="/category/[{Category}]" as={`/category/${page.category.name}`} passHref>
                            <p className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[page.category.color].text.normal} `}>{page.category.name}</p>
                        </Link>
                        <Moment className="block mt-2 text-sm font-semibold text-true-gray-600 dark:text-true-gray-400" date={page.date} fromNow
                            // format="MMM DD, yy"
                            format="yyyy 年 MM 月 DD 日"
                            local />
                    </div>
                    <p className="my-6 text-4xl font-bold whitespace-pre-wrap lg:text-5xl">{page.title}</p>
                    <p className="mb-4 text-xl font-medium text-true-gray-600 lg:text-2xl" dark="text-true-gray-400">
                        {page.excerpt}
                    </p>
                    <Share />
                </header>
            </ContentLayout>
            <CoverLayout>
                <div className="md:rounded-3xl relative w-full h-full" data-aos="fade-up" data-aos-duration="500">
                    <ThemedImage className="z-0 overflow-hidden transition-all duration-500 ease-in-out md:rounded-3xl" post={page}/>
                </div>
            </CoverLayout>
            <ContentLayout>
                {/* <div data-aos="fade-down"> */}
                {blocks.map(block => {
                    return (
                        <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                    )
                })}
                {/* </div> */}
                {/* Tags */}
                <div className="flex w-full space-x-2 overflow-auto flex-nowrap items-center mt-8">
                    <TagsIcon />
                    {page.tags.map((tag: any) =>
                        <Link href={`/tag/${tag.name}`} as={`/tag/${tag.name}`} key={tag.name}>
                            <a href={`/tag/${tag.name}`}>
                                <div className={`${Colors[tag.color]?.bg.msg ?? Colors['gray'].bg.msg} text-white flex items-center text-xs py-1 px-2  rounded-full whitespace-nowrap`} >
                                    {tag.name}
                                </div>
                            </a>
                        </Link>
                    )}
                </div>
                <Licensing page={page} data-aos="fade-up" data-aos-duration="500" />
                <Pagination pagination={pagination} data-aos="fade-up" data-aos-duration="500"></Pagination>
                {/* <Reaction /> */}
            </ContentLayout>
            <ContentLayout>
                <MediaContextProvider >
                    <Media greaterThanOrEqual="sm" className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        {/* <WidgetMeSmall />
                        <WidgetOverViewSmall posts=1{posts} /> */}
                        <WidgetMeMedium fix={true} />
                        <WidgetOverViewMedium posts={posts} fix={true} />
                    </Media>
                    <Media lessThan="sm" className="grid grid-cols-2 gap-2">
                        {/* <WidgetMeMedium />
                        <WidgetOverViewMedium posts={posts} /> */}
                        <WidgetMeSmall />
                        <WidgetOverViewSmall posts={posts} />
                    </Media>
                </MediaContextProvider>
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

    if (!page) return { props: {}, revalidate: 10 }


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
                                        value['size'] = { width, height }
                                        b[type] = value
                                    })
                            )
                        })
                )
            })
    )

    return { props: { page, blocks: blocksWithChildren, pagination, posts: db }, revalidate: 10 }
}

(PostPage as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
    return (
        <BlogLayoutWhite>
            {page}
        </BlogLayoutWhite>
    )
}

export default PostPage