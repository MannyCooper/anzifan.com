import CONFIG from '@/blog.config'
import {
  BlockDataType,
  BlockEnum,
  BlockType,
  BookmarkBlockType,
  CodeBlockType,
  ImageBlockType,
  QuoteBlockType,
} from '@/src/types/blog'
import { BlockResponse } from '@/src/types/notion'
import { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { randomUUID } from 'crypto'
import { unfurl } from 'unfurl.js'
import { satisfiesRequiredAnnotation } from '../../util'
import { getImageInfo } from '../getImageInfo'
import codesToHtml from './code'

export async function formatBlocks(blocks: BlockResponse[]) {
  const mergedListBlocks = mergeListItems(blocks)

  async function formatBlock(mergedListBlocks: BlockDataType[]) {
    for (const block of mergedListBlocks) {
      if (block.children && block.children.length > 0) {
        await formatBlock(block.children as BlockDataType[])
      }
      if (block.type === BlockEnum.bookmark) {
        const metadata = await getBookmarkMetadata(block)
        ;(block as BookmarkBlockType).bookmark = metadata
      }
      if (block.type === BlockEnum.quote) {
        await formatQuoteBlock(block)
      }
      if (block.type === BlockEnum.code) {
        await formatCodeBlock(block)
      }
      if (block.type === BlockEnum.image) {
        await formatImageBlock(block)
      }
    }
  }
  await formatBlock(mergedListBlocks)
  const formattedBlocks = mergedListBlocks

  return formattedBlocks
}

async function formatImageBlock(block: BlockDataType) {
  const { image } = block as ImageBlockType
  let src = ''
  if (image.type === 'external') {
    src = image.external.url
  }
  if (image.type === 'file') {
    src = image.file.url
  }
  const { width, height, placeholder, type } = await getImageInfo(src)
  ;(block as ImageBlockType).info = { width, height, placeholder, type }
}

async function formatCodeBlock(block: BlockDataType) {
  const { code } = block as CodeBlockType
  const { language, rich_text: richText } = code
  const html = await codesToHtml(richText!, language)
  code.html = html
  delete code.rich_text
}

async function formatQuoteBlock(block: BlockDataType) {
  const quoteBlock = block as QuoteBlockType
  const { rich_text: richText } = quoteBlock.quote
  const {
    plain_text: plainText,
    annotations,
    href,
  } = richText[richText.length - 1]
  const requiredAnnotation = CONFIG.STRICT_QUOTE_CARD
    ? { underline: true, code: true }
    : { code: true }

  if (satisfiesRequiredAnnotation(annotations, requiredAnnotation)) {
    quoteBlock.quote = {
      ...quoteBlock.quote,
      author: plainText,
    }
    if (href) {
      const metadata = await getMetadata(href)
      quoteBlock.quote = {
        ...quoteBlock.quote,
        reference: metadata,
      }
    }
    quoteBlock.quote.rich_text = richText.slice(0, richText.length - 1)
  }
}

async function getMetadata(
  url: string
): Promise<BookmarkBlockType['bookmark']> {
  let metadata = {} as BookmarkBlockType['bookmark']
  try {
    const result = await unfurl(url, {
      headers: {
        Accept:
          'application/json, text/plain, text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/json',
        'User-Agent': 'facebookexternalhit',
      },
    })
    const { title, description, favicon, oEmbed, open_graph, twitter_card } =
      result
    const oEmbedThumbnail = oEmbed?.thumbnails?.[0]
    const oEmbedTitle = oEmbed?.title

    const openGraphDescription = open_graph?.description
    const openGraphTitle = open_graph?.title
    const openGraphImage = open_graph?.images?.[0]

    const twitterCardDescription = twitter_card?.description
    const twitterCardTitle = twitter_card?.title
    const twitterCardImage = twitter_card?.images?.[0]

    metadata = {
      title: title ?? oEmbedTitle ?? openGraphTitle ?? twitterCardTitle ?? '',
      description:
        description ?? openGraphDescription ?? twitterCardDescription ?? '',
      favicon: favicon ?? null,
      image: oEmbedThumbnail ?? openGraphImage ?? twitterCardImage ?? null,
      url: url ?? '',
    }
  } catch (error) {
    // console.error(error)
  }
  return metadata
}

async function getBookmarkMetadata(block: BlockDataType) {
  const { url } = (block as BookmarkBlockObjectResponse).bookmark
  const metadata = await getMetadata(url)
  return metadata
}

function mergeListItems(items: BlockDataType[]): BlockDataType[] {
  const mergedList: BlockDataType[] = []

  items.forEach((item) => {
    if (
      item.type !== (BlockEnum.bulleted_list_item as BlockType) &&
      item.type !== (BlockEnum.numbered_list_item as BlockType)
    ) {
      if (item.children) {
        item.children = mergeListItems(item.children as BlockDataType[])
      }
      mergedList.push(item)
      return
    }
    const currentList = mergedList[mergedList.length - 1]
    const listType =
      item.type === (BlockEnum.bulleted_list_item as BlockType)
        ? (BlockEnum.bulleted_list as BlockType)
        : (BlockEnum.numbered_list as BlockType)
    if (!currentList || currentList.type !== listType) {
      mergedList.push({
        id: randomUUID(),
        type: listType,
        children: [item],
      })
    } else {
      currentList.children?.push(item as BlockResponse)
    }

    if (item.children) {
      item.children = mergeListItems(item.children as BlockDataType[])
    }
  })

  return mergedList
}
