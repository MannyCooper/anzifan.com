import { GetStaticProps, NextPage } from "next"
import PostList from "../../components/PostList"
import { getDatabase } from "../../lib/notion"
import { Post, Tag } from "../../lib/types"
import { getPlaiceholder } from "plaiceholder";
import { ParsedUrlQuery } from "querystring";

const CatePage: NextPage<{ posts: Post[], cate: Tag }> = ({ posts, cate }) => {

    return (
        <>
            <PostList posts={posts} filter={cate.name} color={cate.color} count={cate.count} />
        </>
    )
}

export const getStaticPaths = async () => {
    var db = await getDatabase()
    const cates = Array.from(new Set(db.map(p => p.category).flat().map(t => t.name)))
    // db = db.filter((p: any) => p.tags.filter((t: any) => t.name === 'tag').length > 0)

    return {
        paths: cates.map((p: any) => ({ params: { cate: p } })),
        fallback: 'blocking',
    }
}

interface Props extends ParsedUrlQuery {
    cate: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { cate } = params as Props
    var db = await getDatabase()

    const cates = db.map(p => p.category).flat();
    const catesMap = new Map(cates.map(o => [o.name, { ...o, count: 0 }]));
    for (const { name } of cates) {
        catesMap.get(name)!.count++
    };
    const catesCount = Array.from(catesMap.values());

    db = db.filter((p: any) => p.category.name === cate)

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
            cate: catesCount.filter((t: any) => t.name === cate)[0]
        },
        revalidate: 60 * 60,
    }
}



export default CatePage