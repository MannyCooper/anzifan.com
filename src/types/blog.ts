import {
  CodeBlockObjectResponse,
  DatabaseObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'
import { ApiColor, BlockResponse } from './notion'

export type FixedLengthArray<N extends number, T> = N extends N
  ? number extends N
    ? T[]
    : _Array<N, T, []>
  : never
type _Array<N extends number, T, R extends unknown[]> = R['length'] extends N
  ? R
  : _Array<N, T, [T, ...R]>

export enum ContentType {
  Post = 'Post',
  Page = 'Page',
  Piece = 'Piece',
  Widget = 'Widget',
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type Page = {
  id: string
  status: 'Published' | 'Hidden'
  nav: string
  title: string
  slug: string
  icon: string
  color: ApiColor
}

export type PartialPost = {
  title: string
  slug: string
  cover: {
    light: {
      src: string
      info: {
        placeholder: string
        width: number
        height: number
      }
    }
    dark: {
      src: string
      info: {
        placeholder: string
        width: number
        height: number
      }
    }
  }
}

export type Post = {
  id: string
  status: 'Published' | 'Draft' | 'Hidden'
  title: string
  slug: string
  excerpt: string
  date: {
    created: string
    updated: string
  }
  cover: {
    light: {
      src: string
      info: {
        placeholder: string
        width: number
        height: number
      }
    }
    dark: {
      src: string
      info: {
        placeholder: string
        width: number
        height: number
      }
    }
  }
  category: Category
  tags: Tag[]
  options: {
    colorTitle: ApiColor[]
    originalCover: boolean
    repost: string
  }
}

export type Tag = {
  id: string
  name: string
  color: ApiColor
  count?: number
  disabled?: boolean
}

export type Category = {
  id: string
  name: string
  color: ApiColor
  count?: number
  disabled?: boolean
}

export type LayoutProps = {
  children: React.ReactNode
  showBeian?: boolean
  color?: ApiColor
}

export type SharedNavFooterStaticProps = {
  props: {
    navPages: Page[]
    siteTitle: Title
    siteSubtitle: Title | null
    logo?: DatabaseObjectResponse['icon']
    enableNavSubtitle?: boolean
  }
  revalidate: number
}

export type CachedNav = {
  navPages: Page[]
  siteTitle: Title
  logo?: DatabaseObjectResponse['icon']
  ttl: number
}

export type Title = {
  text: string
  color?: ApiColor
  slug?: string
  icon?: IconType
}

export type ArchiveFilterType = {
  tag?: string
  category?: string
}

export enum BlockEnum {
  paragraph = 'paragraph',
  heading_1 = 'heading_1',
  heading_2 = 'heading_2',
  heading_3 = 'heading_3',
  bulleted_list_item = 'bulleted_list_item',
  numbered_list_item = 'numbered_list_item',
  to_do = 'to_do',
  toggle = 'toggle',
  child_page = 'child_page',
  child_database = 'child_database',
  embed = 'embed',
  image = 'image',
  video = 'video',
  file = 'file',
  pdf = 'pdf',
  bookmark = 'bookmark',
  code = 'code',
  audio = 'audio',
  breadcrumb = 'breadcrumb',
  callout = 'callout',
  quote = 'quote',
  equation = 'equation',
  divider = 'divider',
  table_of_contents = 'table_of_contents',
  column = 'column',
  column_list = 'column_list',
  link_preview = 'link_preview',
  synced_block = 'synced_block',
  template = 'template',
  link_to_page = 'link_to_page',
  table = 'table',
  table_row = 'table_row',
  unsupported = 'unsupported',
  bulleted_list = 'bulleted_list',
  numbered_list = 'numbered_list',
}

export type BlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'to_do'
  | 'toggle'
  | 'child_page'
  | 'child_database'
  | 'embed'
  | 'image'
  | 'video'
  | 'audio'
  | 'file'
  | 'pdf'
  | 'bookmark'
  | 'code'
  | 'breadcrumb'
  | 'callout'
  | 'quote'
  | 'equation'
  | 'divider'
  | 'table_of_contents'
  | 'column'
  | 'column_list'
  | 'link_preview'
  | 'synced_block'
  | 'template'
  | 'link_to_page'
  | 'table'
  | 'table_row'
  | 'unsupported'
  | 'bulleted_list'
  | 'numbered_list'

export type BlockComponentType = {
  block: BlockDataType
  children: JSX.Element
}

export type ListBlockType = {
  id: string
  type: BlockType
  children: Array<Partial<BlockDataType>>
}

export type BookmarkBlockType = {
  id: string
  type: BlockType
  children: Array<Partial<BlockDataType>>
  bookmark: {
    title: string
    description: string
    url: string
    image: {
      url?: string
      width?: number
      height?: number
    }
    favicon?: string | null
  }
}

export type QuoteBlockType = {
  id: string
  type: BlockType
  children: Array<Partial<BlockDataType>>
  quote: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    author?: string
    reference?: BookmarkBlockType['bookmark']
  }
}

export type CodeBlockType = {
  id: string
  type: BlockType
  children: Array<Partial<BlockDataType>>
  code: {
    rich_text?: Array<RichTextItemResponse>
    caption: Array<RichTextItemResponse>
    language: CodeBlockObjectResponse['code']['language']
    html?: {
      light: string
      dark: string
      customCode?: string
      name?: string
    }
  }
}

export type ImageBlockType = {
  id: string
  type: BlockType
  children: Array<Partial<BlockDataType>>
  image:
    | {
        type: 'external'
        external: {
          url: string
        }
        caption: Array<RichTextItemResponse>
      }
    | {
        type: 'file'
        file: {
          url: string
          expiry_time: string
        }
        caption: Array<RichTextItemResponse>
      }
  info?: {
    width: number
    height: number
    placeholder: string
    type?: string
  }
}

export type ChildDatabaseBlockType = {
  id: string
  type: BlockType
  children: Array<Partial<BlockDataType>>
  child_database: {
    title: string
  }
}

export type BlockDataType =
  | BlockResponse
  | ListBlockType
  | BookmarkBlockType
  | QuoteBlockType
  | ChildDatabaseBlockType

export type Friend = {
  name: string
  link: string
  avatar: string
}

export type Widget = {
  id: string
  databaseId: string
  properties: {
    title: Post['title']
    slug: Post['slug']
    cover: Post['cover']
    excerpt: Post['excerpt']
    date: Post['date']
    tags: Post['tags']
    category: Post['category']
    options: Post['options']
  }
}

export type BlogStats = {
  posts: number
  pieces: number
  tags: number
  categories: number
  timeline: FixedLengthArray<24, number>
}
