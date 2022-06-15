import { Client } from '@notionhq/client'
import { Post } from './types'

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID || '7fddb522451e4ac68922d1515da1f5f4'

// export const getBasicDBInfo = async () => {
//     const dbQuery: any = {
//         database_id: databaseId,
//         filter: { and: [{ property: 'Published', checkbox: { equals: true } }] },
//         sorts: [{ property: 'Date', direction: 'descending' }],
//     }
//     const response = await notion.databases.query(dbQuery)
//     return response.results.map(result => {
//         if (!("properties" in result)) return {} as Post
//         const properties = result.properties
//         const slug = properties.Slug.type === "rich_text" && properties.Slug.rich_text[0]?.plain_text
//         const tags = properties.Tags.type === "multi_select" && properties.Tags.multi_select.map(tag => ({ name: tag.name, color: tag.color }))
//         const undefinedCover = "https://cdn.dribbble.com/users/3167939/screenshots/10422336/media/b618a0e73996c3b24b58b2db1c881ee3.png"
//         const cover_light = properties.Cover.type === "rich_text" && properties.Cover.rich_text[0]?.plain_text || undefinedCover
//         const cover_dark = properties.Cover_dark.type === "rich_text" && properties.Cover_dark.rich_text[0]?.plain_text || cover_light
//         const cover = { light: cover_light, dark: cover_dark }
//         const title = properties.Title.type === "title" && properties.Title.title.slice(-1)[0]?.plain_text

//         return {
//             id: result.id,
//             title : title,
//             slug: slug,
//             tags: tags,
//             cover: cover,
//         }
//     })
// }

export const getDatabase = async (slug?: string) => {
    // TODO: Preview mode support in future
    // TODO: Fix when posts are more than 100
    let dbQuery: any = {
        database_id: databaseId,
        filter: { and: [{ property: 'Published', checkbox: { equals: true } }] },
        sorts: [{ property: 'Date', direction: 'descending' }],
        // page_size: 10,
    }

    // //Get post by slug
    // if (slug) {
    //     dbQuery.filter.and.push({ property: 'Slug', rich_text: { equals: slug } })
    // }

    const response = await notion.databases.query(dbQuery)

    return response.results
        .map(result => {
            if (!("properties" in result)) return {} as Post
            const properties = result.properties

            const slug = properties.Slug.type === "rich_text" && properties.Slug.rich_text[0]?.plain_text
            const title = properties.Title.type === "title" && properties.Title.title.slice(-1)[0]?.plain_text
            const date = properties.Date.type === "date" && properties.Date.date?.start
            const updateDate = properties.UpdateDate.type === "last_edited_time" && properties.UpdateDate.last_edited_time

            const undefinedCover = "https://cdn.dribbble.com/users/3167939/screenshots/10422336/media/b618a0e73996c3b24b58b2db1c881ee3.png"
            const cover_light = properties.Cover.type === "url" && properties.Cover.url || undefinedCover
            const cover_dark = properties.Cover_dark.type === "url" && properties.Cover_dark.url || cover_light
            const cover = { light: cover_light, dark: cover_dark }

            const category = properties.Category.type === "select" && { name: properties.Category.select?.name, color: properties.Category.select?.color }
            const tags = properties.Tags.type === "multi_select" && properties.Tags.multi_select.map(tag => ({ name: tag.name, color: tag.color }))
            const series = properties.Series.type === "select" && properties.Series.select?.name !== undefined && { name: properties.Series.select?.name, color: properties.Series.select?.color }
            const excerpt = properties.Excerpt.type === "rich_text" && properties.Excerpt.rich_text[0]?.plain_text
            const tip = properties.Tip.type == "rich_text" && properties.Tip.rich_text[0]?.plain_text
            const sspai = properties.SSPAI.type == "url" && properties.SSPAI.url
            const originalCover = properties.OriginalCover.type == "checkbox" && properties.OriginalCover.checkbox
            const colorTitle = properties.ColorTitle.type == "checkbox" && properties.ColorTitle.checkbox
            return {
                id: result.id,
                slug: slug || "",
                title: title || "",
                date: date || Date(),
                updateDate: updateDate || Date(),
                cover: cover,
                category: category,
                tags: tags,
                series: series || null,
                excerpt: excerpt || "",
                tip: tip || "",
                sspai: sspai || "",
                originalCover: originalCover || false,
                colorTitle: colorTitle || false,
            } as unknown as Post
        })
}

export const getPage = async (pageId: string) => {
    const response = await notion.pages.retrieve({ page_id: pageId })
    return response
}

// export const getBlocks = async (blockId: string) => {
//     const response = await notion.blocks.children.list({
//         block_id: blockId,
//         page_size: 100,
//     })

//     return response.results
// }

export const getAllBlocks = async (parentId: string) => {
    const injectChildren = async (block: any, fetcher: any) => {
        const response = await fetcher(block.id);
        return { ...block, blocks: response };
    }

    const rawBlocks = await notion.blocks.children.list({
        block_id: parentId,
        page_size: 100,
    })

    let blocks = rawBlocks.results;

    if (rawBlocks.has_more) {
        let cursor = rawBlocks.next_cursor
        do {
            const additional = await notion.blocks.children.list({
                block_id: parentId,
                page_size: 100,
                start_cursor: cursor || undefined,
            })
            blocks = [...blocks, ...additional.results]
            cursor = additional.next_cursor
        } while (cursor)
    }

    const result = Promise.all(
        blocks.map((b: any) => {
            if (b.has_children) {
                return injectChildren(b, getAllBlocks);
            }

            // Reduce size
            b.id = Buffer.from(b.id.replace(/-/g, ''), 'hex').toString('base64')
            const { created_time, last_edited_time, object, ...liteBlocks } = b

            liteBlocks[liteBlocks.type]['text'] && liteBlocks[liteBlocks.type]['text'].map((t: any) => {
                delete t['plain_text']
                delete t['href']
            })

            return Promise.resolve({ ...liteBlocks });
        })
    );
    return result;
}