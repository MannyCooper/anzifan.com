import { GetStaticProps, NextPage } from "next"
import PostList from "../../components/PostList"
import { getDatabase } from "../../lib/notion"
import { Post, Tag } from "../../lib/types"
import { getPlaiceholder } from "plaiceholder";
import { ParsedUrlQuery } from "querystring";

const TagPage: NextPage<{ posts: Post[], tag: Tag }> = ({ posts, tag }) => {

    return (
      <>
        <PostList posts={posts} filter={tag.name} color={tag.color} count={tag.count} />
      </>
    )
  }

export const getStaticPaths = async () => {
    var db = await getDatabase()
    const tags = Array.from(new Set(db.map(p => p.tags).flat().map(t => t.name)))
    // db = db.filter((p: any) => p.tags.filter((t: any) => t.name === 'tag').length > 0)

    return {
        paths: tags.map((p: any) => ({ params: { tag: p } })),
        fallback: 'blocking',
    }
}

interface Props extends ParsedUrlQuery {
    tag: string
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const { tag } = params as Props
    var db = await getDatabase()

    const tags = db.map(p => p.tags).flat();
    const tagsMap = new Map(tags.map(o => [o.name, { ...o, count: 0 }]));
    for (const { name } of tags) {
        tagsMap.get(name)!.count++
    };
    const tagsCount = Array.from(tagsMap.values());

    db = db.filter((p: any) => p.tags.filter((t: any) => t.name === tag).length > 0)
  
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
        tag: tagsCount.filter((t: any) => t.name === tag)[0]
      },
      revalidate: 60 * 60,
    }
  }
  


export default TagPage