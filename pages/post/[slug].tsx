import { GetStaticProps, NextPage } from "next"
import Image from "next/image";
import { ParsedUrlQuery } from "querystring"
import { getAllBlocks, getDatabase, getPage } from "../../lib/notion"
import { Fragment } from 'react'
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


const PostPage: NextPage<{ page: any; blocks: any[] }> = ({ page, blocks }) => {
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
                            <p className={`inline-block mb-2 text-xs font-bold text-true-gray-600 leading-2 ${Colors[page.category.color].text.light} `}>{page.category.name}</p>
                        </Link>
                        <Moment className="block mt-2 text-sm font-semibold text-true-gray-600" date={page.date} fromNow
                            // format="MMM DD, yy"
                            format="yyyy 年 MM 月 DD 日"
                            local />
                    </div>
                    <p className="my-6 text-4xl font-bold whitespace-pre-wrap lg:text-5xl">{page.title}</p>
                    <p className="text-xl font-medium text-true-gray-600 lg:text-2xl">
                        {page.excerpt}
                    </p>
                </header>
            </ContentLayout>
            <CoverLayout>
                <Image src={page.cover.light} quality={100} layout="fill" objectFit="cover" sizes="100%" alt={page.title}
                    // onLoadingComplete={handleLoad}
                    placeholder="blur"
                    blurDataURL={page.cover.blurLight}
                    className="md:rounded-2xl transition-all duration-500 ease-in-out" data-aos="fade-up" data-aos-duration="500" />
            </CoverLayout>
            <ContentLayout>
                {/* <div data-aos="fade-down"> */}
                {blocks.map(block => {
                    return (
                        <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                    )
                })}
                {/* </div> */}
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

    // const post = db[0].id
    // const page = await getPage(post)

    const page = db[0]
    if (!page) return { props: {}, revalidate: 1 }


    if (page) {
        (page).cover.blurLight = (await getPlaiceholder(page.cover.light, {
            size: 10,
        })).base64;
        (page).cover.blurDark = (await getPlaiceholder(page.cover.dark, {
            size: 10,
        })).base64;
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

    return { props: { page, blocks: blocksWithChildren }, revalidate: 1 }
}

(PostPage as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
    return (
        <BlogLayoutWhite>
            {page}
        </BlogLayoutWhite>
    )
}

export default PostPage