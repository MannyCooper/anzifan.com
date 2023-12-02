/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import CONFIG from '@/blog.config'
import { colorMap } from '@/src/lib/colors'
import {
  classNames,
  extractDomain,
  getFileNameFromURL,
  removeHTMLTags,
} from '@/src/lib/util'
import {
  BlockComponentType,
  BlockDataType,
  BookmarkBlockType,
  CodeBlockType,
  ImageBlockType,
  ListBlockType,
  QuoteBlockType,
} from '@/src/types/blog'
import { ApiColor } from '@/src/types/notion'
import {
  BulletedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  EmbedBlockObjectResponse,
  EquationBlockObjectResponse,
  FileBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  PdfBlockObjectResponse,
  RichTextItemResponse,
  TableRowBlockObjectResponse,
  ToDoBlockObjectResponse,
  ToggleBlockObjectResponse,
  VideoBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { MathJax } from 'better-react-mathjax'
import he from 'he'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { FaLink } from 'react-icons/fa'
import {
  HiExclamation as Exclamation,
  HiInformationCircle as Information,
  HiQuestionMarkCircle as QuestionMark,
  HiXCircle as Cross,
} from 'react-icons/hi'
import { HiBell as Bell } from 'react-icons/hi2'
import { TbCloudDownload, TbFileDownload, TbMoon } from 'react-icons/tb'
import { TiTick as Tick } from 'react-icons/ti'
import ReactPlayer from 'react-player/lazy'
import ImageWithFallback from '../image/ImageWithFallback'
import { BlockRender } from './BlockRender'
import { getColor, Texts } from './Text'

const ToggleDetail = ({
  color,
  summary,
  detail,
  size,
}: {
  color: ApiColor
  summary: JSX.Element
  detail: JSX.Element
  size: 'heading_1' | 'heading_2' | 'heading_3' | 'paragraph'
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const styleMap = {
    heading_1: { indent: 'px-5', iconSize: 20, margin: 'mt-12 mb-5' },
    heading_2: { indent: 'px-[1.2rem]', iconSize: 17, margin: 'mt-5 mb-4 ' },
    heading_3: { indent: 'px-5', iconSize: 14, margin: 'mt-4 mb-3' },
    paragraph: { indent: 'px-[1.1rem]', iconSize: 12, margin: 'mx-2' },
  }

  return (
    <div
      className={classNames(
        'overflow-hidden',
        size === 'paragraph' ? 'rounded-2xl' : '',
        getColor(color)
      )}
    >
      <div
        className="flex cursor-pointer list-none flex-row items-center py-1 pr-2 font-medium [&::-webkit-details-marker]:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsFillCaretDownFill
          className={classNames(
            'mr-1 min-w-[12px] transition-transform',
            !isOpen ? '-rotate-90 transform' : '',
            styleMap[size].margin
          )}
          size={14}
        />
        {summary}
      </div>
      {/* {isOpen && ( */}
      <div
        className={classNames(
          styleMap[size].indent,
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-screen' : 'max-h-0 select-none'
        )}
      >
        <div>{detail}</div>
      </div>
      {/* )} */}
    </div>
  )
}

export const Unsupported = ({ block }: BlockComponentType) => {
  const isShow = CONFIG.SHOW_UNSUPPORTED_BLOCK
  return isShow ? <div>Unsupported block ❌ {block.type}</div> : <></>
}

export const Paragraph = ({ block }: BlockComponentType) => {
  const { paragraph, id } = block as ParagraphBlockObjectResponse
  const { rich_text: richText, color } = paragraph

  return (
    <p className={classNames(getColor(color))}>
      <Texts id={id} richTexts={richText} outerColor={color} />
    </p>
  )
}

const Heading = ({
  id,
  richText,
  color,
  isToggleable,
  children,
  size,
}: {
  id: string
  richText: Heading1BlockObjectResponse['heading_1']['rich_text']
  color: ApiColor
  isToggleable: boolean
  children: JSX.Element
  size: 'h2' | 'h3' | 'h4'
}) => {
  const HeadingTag = size
  const sizeMap: {
    [key in 'h2' | 'h3' | 'h4']: {
      style: string
      indent: 'heading_1' | 'heading_2' | 'heading_3'
    }
  } = {
    h2: {
      style: 'mt-12 mb-5 scroll-mt-20 text-2xl',
      indent: 'heading_1',
    },
    h3: {
      style: 'mt-5 mb-4 text-xl scroll-mt-16',
      indent: 'heading_2',
    },
    h4: {
      style: 'mt-4 mb-3 text-lg scroll-mt-16',
      indent: 'heading_3',
    },
  }
  const heading = (
    <HeadingTag
      id={id}
      className={classNames(
        getColor(color),
        sizeMap[size].style,
        'font-bold leading-7',
        'flex flex-row items-center justify-start',
        isToggleable ? 'cursor-pointer' : ''
      )}
    >
      <Texts id={id} richTexts={richText} outerColor={color} />
    </HeadingTag>
  )

  return (
    <>
      {!isToggleable ? (
        heading
      ) : (
        <ToggleDetail
          color={color}
          summary={heading}
          detail={children}
          size={sizeMap[size].indent}
        />
      )}
    </>
  )
}

export const Heading1 = ({ block, children }: BlockComponentType) => {
  const { heading_1, id } = block as Heading1BlockObjectResponse
  const { rich_text: richText, color } = heading_1
  // 👇 Notion API Response Type Bug？
  const isToggleable = (heading_1 as any).is_toggleable

  return (
    <>
      <Heading
        id={id}
        richText={richText}
        color={color}
        isToggleable={isToggleable}
        size="h2"
      >
        {children}
      </Heading>
    </>
  )
}

export const Heading2 = ({ block, children }: BlockComponentType) => {
  const { heading_2, id } = block as Heading2BlockObjectResponse
  const { rich_text: richText, color } = heading_2
  // 👇 Notion API Response Type Bug？
  const isToggleable = (heading_2 as any).is_toggleable

  return (
    <>
      <Heading
        id={id}
        richText={richText}
        color={color}
        isToggleable={isToggleable}
        size="h3"
      >
        {children}
      </Heading>
    </>
  )
}

export const Heading3 = ({ block, children }: BlockComponentType) => {
  const { heading_3, id } = block as Heading3BlockObjectResponse
  const { rich_text: richText, color } = heading_3
  // 👇 Notion API Response Type Bug？
  const isToggleable = (heading_3 as any).is_toggleable

  return (
    <>
      <Heading
        id={id}
        richText={richText}
        color={color}
        isToggleable={isToggleable}
        size="h4"
      >
        {children}
      </Heading>
    </>
  )
}

const ListItem = ({
  id,
  color,
  richText,
  children,
}: {
  id: string
  color: ApiColor
  richText: BulletedListItemBlockObjectResponse['bulleted_list_item']['rich_text']
  children: BlockDataType[]
}) => {
  return (
    <li className={classNames('mx-[1.2rem]', getColor(color))}>
      <Texts id={id} richTexts={richText} outerColor={color} />
      <BlockRender blocks={children} />
    </li>
  )
}

export const BulletedList = ({ block }: BlockComponentType) => {
  const { children: list } = block as ListBlockType
  return (
    <ul className="list-disc list-outside">
      {list.map((item, index) => {
        const { bulleted_list_item, id, children } =
          item as BulletedListItemBlockObjectResponse & {
            children: BlockDataType[]
          }
        const { color, rich_text: richText } = bulleted_list_item
        return (
          <ListItem
            key={id + 'li' + index}
            id={id}
            color={color}
            richText={richText}
          >
            {children}
          </ListItem>
        )
      })}
    </ul>
  )
}

export const NumberedList = ({ block }: BlockComponentType) => {
  const { children: list } = block as ListBlockType
  return (
    <ol className="list-decimal list-outside">
      {list.map((item, index) => {
        const { numbered_list_item, id, children } =
          item as NumberedListItemBlockObjectResponse & {
            children: BlockDataType[]
          }
        const { color, rich_text: richText } = numbered_list_item
        return (
          <ListItem
            key={id + 'li' + index}
            id={id}
            color={color}
            richText={richText}
          >
            {children}
          </ListItem>
        )
      })}
    </ol>
  )
}

export const Todo = ({ block }: BlockComponentType) => {
  const { to_do: todo } = block as ToDoBlockObjectResponse
  const { color, rich_text: richText, checked } = todo

  return (
    <form className="flex flex-row items-start">
      <input
        type="checkbox"
        defaultChecked={checked}
        className={classNames(
          'mt-1 h-4 w-4',
          'rounded border-2 border-neutral-100 dark:border-neutral-700',
          'cursor-pointer'
        )}
      />
      <label className={`ml-2 ${checked ? 'line-through opacity-50' : ''}`}>
        <Texts id={'todo'} richTexts={richText} outerColor={color} />
      </label>
    </form>
  )
}

export const Toggle = ({ block, children }: BlockComponentType) => {
  const { toggle } = block as ToggleBlockObjectResponse
  const { color, rich_text: richText } = toggle

  const toggleColor = 'gray_background'
  return (
    <ToggleDetail
      color={color && color.endsWith('_background') ? color : toggleColor}
      size={'paragraph'}
      summary={<Texts id="toggle" richTexts={richText} outerColor={color} />}
      detail={<div className="pl-2">{children}</div>}
    />
  )
}

export const Embed = ({ block }: BlockComponentType) => {
  const { embed } = block as EmbedBlockObjectResponse
  const { url, caption } = embed
  return (
    <>
      <iframe
        src={url}
        frameBorder="0"
        allowFullScreen
        className="w-full border aspect-video rounded-2xl border-neutral-100 dark:border-neutral-700"
      />
      <Caption caption={caption} />
    </>
  )
}

const Caption = ({ caption }: { caption: RichTextItemResponse[] }) => {
  return (
    <figcaption
      className={classNames(
        caption.length > 0 ? 'pt-3 pb-2' : '',
        'text-center text-sm text-gray-500 opacity-50'
      )}
    >
      <Texts id={'caption'} richTexts={caption} />
    </figcaption>
  )
}

const DownloadButton = ({
  url,
  filename,
  disabled = false,
  fileType = 'file',
}: {
  url: string
  filename: string
  disabled?: boolean
  fileType?: 'pdf' | 'file'
}) => {
  const [loading, setLoading] = useState(false)

  const [canDownload, setCanDownload] = useState(true)

  const handleDownload = async () => {
    if (!canDownload) {
      return
    }
    setLoading(true)
    setCanDownload(false)
    setTimeout(() => {
      setCanDownload(true)
    }, 5 * 60 * 1000)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const disable = (!disabled && loading) || !canDownload

  return (
    <div className="flex items-center justify-center w-full">
      <button
        className={classNames(
          'md:max-w-2/3 truncate rounded-full border border-blue-500 bg-blue-100 font-medium text-blue-500 transition  dark:border-blue-600 dark:bg-blue-800 dark:text-blue-200',
          disable
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white'
        )}
        onClick={handleDownload}
        disabled={disable}
      >
        <p className="flex items-center justify-start mx-4 my-2 overflow-hidden gap-x-2">
          {disable ? (
            <>
              <TbMoon size={18} />
              <span>Moon out~ Cloud need rest</span>
            </>
          ) : (
            <>
              {fileType === 'file' ? (
                <TbCloudDownload size={18} />
              ) : (
                <TbFileDownload size={18} />
              )}
              <span>{loading ? 'Downloading...' : filename}</span>
            </>
          )}
        </p>
      </button>
    </div>
  )
}

export const File = ({ block }: BlockComponentType) => {
  const { file } = block as FileBlockObjectResponse
  const type = file.type
  const caption = file.caption

  if (type === 'file') {
    const { url, expiry_time } = file.file
    const fileName = getFileNameFromURL(url) ?? 'Untitled'
    const allowDownload = new Date(expiry_time) > new Date()

    return (
      <>
        <DownloadButton
          url={url}
          filename={fileName}
          disabled={!allowDownload}
        />
        <Caption caption={caption} />
      </>
    )
  }

  const { url } = file.external
  const fileName = getFileNameFromURL(url) ?? 'Untitled File'
  return (
    <>
      <DownloadButton url={url} filename={fileName} />
      <Caption caption={caption} />
    </>
  )
}

export const Pdf = ({ block }: BlockComponentType) => {
  const { pdf } = block as PdfBlockObjectResponse
  const type = pdf.type
  const caption = pdf.caption

  if (type === 'file') {
    const { url, expiry_time } = pdf.file
    const fileName = getFileNameFromURL(url) ?? 'Untitled'
    const allowDownload = new Date(expiry_time) > new Date()

    return (
      <>
        <DownloadButton
          url={url}
          filename={fileName}
          disabled={!allowDownload}
          fileType="pdf"
        />
        <Caption caption={caption} />
      </>
    )
  }

  const { url } = pdf.external
  const fileName = getFileNameFromURL(url) ?? 'Untitled File'
  return (
    <>
      <DownloadButton url={url} filename={fileName} fileType="pdf" />
      <Caption caption={caption} />
    </>
  )
}

export const Callout = ({ block, children }: BlockComponentType) => {
  const { callout } = block as CalloutBlockObjectResponse
  const { icon, color, rich_text: richText } = callout

  const getIcon = (icon: string) => {
    switch (icon) {
      case '⚠️':
        return Exclamation
      case '🔔':
        return Bell
      case 'ℹ️':
        return Information
      case 'i':
        return Information
      case '❓':
        return QuestionMark
      case '❌':
        return Cross

      default:
        const EmojiComponent = ({}: { size?: number }) => {
          return <p className="-mt-[0.2rem] text-xl">{icon}</p>
        }
        return EmojiComponent
    }
  }

  const CalloutContainer = ({
    icon,
    children,
  }: {
    icon: JSX.Element
    children: JSX.Element
  }) => (
    <div
      className={classNames(
        'relative flex h-full flex-row items-start justify-between overflow-hidden rounded-2xl p-4 sm:rounded-[1.25rem] sm:p-5',
        color !== 'default' ? getColor(color) : 'bg-gray-50 dark:bg-[#171717]'
      )}
    >
      <div
        className={classNames(
          'absolute left-0 top-0 mt-[0.8px] flex h-full rounded-full py-4 pl-4 sm:py-5 sm:pl-5',
          getColor(color.replace('_background', '') as ApiColor)
        )}
      >
        {icon}
      </div>
      <div className="w-full ml-9">
        <div>
          <Texts
            id={'callout'}
            richTexts={richText}
            outerColor={color.replace('_background', '') as ApiColor}
          />
        </div>
        {children}
      </div>
    </div>
  )

  if (icon?.type === 'emoji') {
    const Emoji = getIcon(icon.emoji)
    const Icon = <Emoji size={24} />
    return <CalloutContainer icon={Icon}>{children}</CalloutContainer>
  }

  if (icon?.type === 'file') {
    const { url } = icon.file

    return (
      <CalloutContainer
        icon={
          <img
            className="flex items-center justify-center h-5 aspect-square"
            src={url}
            alt="callout-icon"
          />
        }
      >
        {children}
      </CalloutContainer>
    )
  }

  if (icon?.type === 'external') {
    const { url } = icon.external
    return (
      <CalloutContainer
        icon={
          <img
            className="flex items-center justify-center w-6 aspect-square max-h-7"
            src={url}
            alt={'callout-icon'}
          />
        }
      >
        {children}
      </CalloutContainer>
    )
  }

  return <CalloutContainer icon={<></>}>{children}</CalloutContainer>
}

export const Divider = ({}: BlockComponentType) => {
  return (
    <div className="flex items-center justify-center py-6">
      <div
        className={classNames(
          'h-[1px] w-11/12 rounded-full',
          'bg-gray-200 dark:bg-gray-700'
        )}
      />
    </div>
  )
}

export const TableRow = ({ block }: BlockComponentType) => {
  const { table_row } = block as TableRowBlockObjectResponse
  const { cells } = table_row

  return (
    <tr className="border-gray-200 border-y first:border-none last:border-none odd:bg-slate-50 dark:border-gray-700 dark:odd:bg-slate-900">
      {cells.map((cell, index) => {
        const text = cell
        return (
          <td
            key={index}
            className={classNames(
              'border-collapse whitespace-nowrap border-x border-gray-200 px-6 py-1 text-center first:border-none last:border-none dark:border-gray-700'
            )}
          >
            <Texts id={'table'} richTexts={text} />
          </td>
        )
      })}
    </tr>
  )
}

export const Table = ({ children }: BlockComponentType) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [isAtLeft, setIsAtLeft] = useState(false)
  const [isAtRight, setIsAtRight] = useState(false)

  useEffect(() => {
    const element = scrollRef.current
    let resizeObserver: ResizeObserver | null = null

    if (element) {
      element.addEventListener('scroll', handleScroll)
      resizeObserver = new ResizeObserver(() => {
        if (element.scrollWidth <= element.clientWidth) {
          setIsAtLeft(true)
          setIsAtRight(true)
        } else {
          setIsAtLeft(false)
          setIsAtRight(false)
        }
        if (element.scrollLeft === 0) {
          setIsAtLeft(true)
        }
        if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
          setIsAtRight(true)
        }
      })

      resizeObserver.observe(element)
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [scrollRef])

  const handleScroll = (event: Event) => {
    const element = event.target as HTMLDivElement

    const isAtLeft = element.scrollLeft === 0
    const isAtRight =
      element.scrollLeft + element.clientWidth >= element.scrollWidth

    setIsAtLeft(isAtLeft)
    setIsAtRight(isAtRight)
  }

  return (
    <div className="flex items-center justify-center my-6">
      <div className="relative max-w-full sm:max-w-11/12">
        <div
          ref={scrollRef}
          className="w-full overflow-scroll border rounded-lg border-neutral-200 dark:border-neutral-700"
        >
          <table className="border-collapse table-auto">
            <tbody
              className={classNames(
                'first:before:transition first:before:duration-500  first:before:ease-in-out first:after:transition first:after:duration-500 first:after:ease-in-out',
                isAtLeft
                  ? 'first:before:opacity-0'
                  : 'first:before:opacity-100',
                isAtRight ? 'first:after:opacity-0' : 'first:after:opacity-100',
                "first:before:absolute first:before:top-0 first:before:left-0 first:before:z-20 first:before:h-full first:before:w-12 first:before:rounded-l-lg first:before:border first:before:border-r-0 first:before:border-neutral-200 first:before:bg-gradient-to-r first:before:from-white first:before:content-[''] first:before:dark:border-neutral-700 dark:first:before:from-neutral-900 sm:first:before:w-16",
                "first:after:absolute first:after:top-0 first:after:right-0 first:after:z-20 first:after:h-full first:after:w-12 first:after:rounded-r-lg first:after:border first:after:border-l-0 first:after:border-neutral-200 first:after:bg-gradient-to-l first:after:from-white first:after:content-[''] first:after:dark:border-neutral-700 dark:first:after:from-neutral-900 sm:first:after:w-16"
              )}
            >
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Column = ({ children }: BlockComponentType) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-start justify-start',
        'w-full px-2 first:pl-0 last:pr-0'
      )}
    >
      {children}
    </div>
  )
}

export const ColumnList = ({ children }: BlockComponentType) => {
  return (
    <div
      className={classNames(
        'flex w-full flex-row justify-between'
        // "divide-x-[1px] divide-gray-200 dark:divide-gray-700"
      )}
    >
      {children}
    </div>
  )
}

export const Equation = ({ block }: BlockComponentType) => {
  const { equation } = block as EquationBlockObjectResponse
  const { expression } = equation

  return (
    <MathJax
      renderMode={'pre'}
      typesettingOptions={{ fn: 'tex2chtml' }}
      text={expression}
    />
  )
}

export const Bookmark = ({ block }: BlockComponentType) => {
  const { bookmark } = block as BookmarkBlockType
  const { title, description, url, favicon, image } = bookmark

  if (!title) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full cursor-pointer flex-row items-center space-x-2 overflow-hidden rounded-[1.25rem] border-[0.5px] border-neutral-100 bg-[#f8f9fa] py-2  px-4 text-neutral-400 filter transition duration-300 ease-in-out hover:brightness-90 dark:border-neutral-700 dark:bg-[#2d2d2d]"
      >
        {favicon ? (
          <div className="relative h-4 rounded-full aspect-square">
            <ImageWithFallback
              className="text-transparent"
              unoptimized
              fill
              src={favicon}
              alt={title}
              fallbackSrc={`https://${
                CONFIG.NOTION_SITE_NAME
              }.notion.site/image/${encodeURIComponent(favicon)}`}
              isIcon
            />
          </div>
        ) : (
          <FaLink className="w-3 h-3" />
        )}
        <p className="truncate">{url}</p>
      </Link>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-28 w-full cursor-pointer flex-row items-center overflow-hidden rounded-[1.25rem] border-[0.5px] border-neutral-100 bg-[#f8f9fa] text-neutral-600 filter transition duration-300 ease-in-out hover:brightness-90 dark:border-neutral-700 dark:bg-[#2d2d2d] dark:text-neutral-200 sm:h-32"
      >
        <div className="flex h-full w-[70%] flex-col justify-between overflow-hidden p-3 sm:p-4">
          <p className="mb-1 font-semibold truncate">{title}</p>
          <p className="mb-2 text-xs !leading-4 text-neutral-400 line-clamp-2 sm:text-sm ">
            {description}
          </p>
          <div className="flex flex-row items-center space-x-2 text-xs text-neutral-400 sm:text-sm">
            {favicon && (
              <div className="relative h-4 bg-white rounded-full aspect-square">
                <ImageWithFallback
                  className="text-transparent"
                  unoptimized
                  fill
                  src={favicon}
                  alt={title}
                  fallbackSrc={`https://${
                    CONFIG.NOTION_SITE_NAME
                  }.notion.site/image/${encodeURIComponent(favicon)}`}
                  isIcon
                />
              </div>
            )}
            <p className="truncate">{url}</p>
          </div>
        </div>
        <div className="relative flex h-full w-[30%] items-center justify-center bg-[#f6f6f6] dark:bg-[#222222]">
          {(image || favicon) &&
            (image ? (
              <ImageWithFallback
                unoptimized
                fill
                className="object-cover w-full h-full"
                src={image.url!}
                alt={title}
                fallbackSrc={`https://${
                  CONFIG.NOTION_SITE_NAME
                }.notion.site/image/${encodeURIComponent(image.url!)}`}
              />
            ) : favicon ? (
              <div className="relative w-10 h-10 overflow-hidden bg-white rounded-full">
                <ImageWithFallback
                  isIcon
                  unoptimized
                  fill
                  src={favicon}
                  alt={title}
                  fallbackSrc={`https://${
                    CONFIG.NOTION_SITE_NAME
                  }.notion.site/image/${encodeURIComponent(favicon)}`}
                />
              </div>
            ) : null)}
        </div>
      </Link>
    </div>
  )
}

export const AdvancedQuote = ({
  id,
  color,
  content,
  info,
}: {
  id: string
  color: ApiColor
  content: RichTextItemResponse[]
  info?: {
    reference?: BookmarkBlockType['bookmark']
    author: string
  }
}) => {
  const author = info?.author
  const reference = info?.reference

  const url = reference?.url
  const title = reference?.title
  const image = reference?.image?.url
  const favicon = reference?.favicon

  return (
    <div
      className={classNames(
        'my-2 mx-auto flex flex-col justify-center rounded-2xl pt-4 text-neutral-500 transition-all duration-500 ease-in-out md:w-[90%] md:hover:scale-105',
        // 'before:w-10 before:px-3 before:text-4xl before:font-bold before:leading-8 before:content-["❝"]',
        color !== 'default' ? getColor(color) : 'bg-[#f8f9fa] dark:bg-[#2d2d2d]'
      )}
    >
      <p
        className={classNames(
          'px-3 text-4xl font-bold leading-8',
          color !== 'default'
            ? `${getColor(
                color,
                undefined,
                false
              )} bg-clip-text text-transparent`
            : ''
        )}
      >
        ❝
      </p>
      <blockquote
        className={classNames(
          'text-xl font-bold leading-7',
          'after:content-["❞"]',
          'p-3 pt-0',
          color !== 'default'
            ? `${colorMap[color]} bg-clip-text text-transparent dark:bg-clip-text dark:text-transparent`
            : ``
        )}
      >
        <Texts id={id} richTexts={content} outerColor={color} />
      </blockquote>
      {url && (
        <Link
          href={url}
          className={classNames(
            'flex flex-row justify-between rounded-b-2xl p-3 font-light leading-4 transition duration-300 ease-in-out hover:brightness-90 hover:filter',
            color !== 'default'
              ? `${getColor(
                  color,
                  undefined,
                  false
                )} bg-opacity-80 dark:bg-opacity-80`
              : 'bg-[#f2f3f5] dark:bg-[#1c1c1e]'
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex max-w-[80%] flex-col justify-between pr-1">
            {title && (
              <div
                className={classNames(
                  'mb-1 text-sm font-semibold leading-4 line-clamp-2',
                  color !== 'default'
                    ? 'text-neutral-50'
                    : 'text-neutral-600 dark:text-neutral-200'
                )}
              >
                {title}
              </div>
            )}
            <p
              className={classNames(
                'truncate pb-0.5 text-[0.8em] font-normal',
                color !== 'default'
                  ? `text-white text-opacity-60`
                  : 'text-neutral-400'
              )}
            >
              {author} | {extractDomain(url)}↗
            </p>
          </div>
          {(image || favicon) && (
            <div className="relative flex items-center justify-center object-cover w-12 h-12 overflow-hidden bg-white rounded-lg dark:bg-black">
              {image ? (
                <ImageWithFallback
                  unoptimized
                  fill
                  className="object-cover w-full h-full"
                  src={image}
                  alt={title || 'image'}
                  fallbackSrc={`https://${
                    CONFIG.NOTION_SITE_NAME
                  }.notion.site/image/${encodeURIComponent(image)}`}
                />
              ) : favicon ? (
                <div className="relative w-5 h-5">
                  <ImageWithFallback
                    className="w-5 h-5 bg-white rounded-full"
                    unoptimized
                    fill
                    src={favicon}
                    alt={title || 'favicon'}
                    fallbackSrc={`https://${
                      CONFIG.NOTION_SITE_NAME
                    }.notion.site/image/${encodeURIComponent(favicon)}`}
                    isIcon
                  />
                </div>
              ) : null}
            </div>
          )}
        </Link>
      )}
    </div>
  )
}

export const Quote = ({ block }: BlockComponentType) => {
  const { quote, id } = block as QuoteBlockType
  const { color, rich_text: richText, reference: metadata, author } = quote

  if (author && metadata) {
    return (
      <AdvancedQuote
        id={id}
        color={color}
        content={richText}
        info={{
          author: author,
          reference: metadata,
        }}
      />
    )
  }

  return (
    <div
      className={classNames(
        'my-2 mx-auto flex flex-row justify-center rounded-2xl py-4 text-neutral-500 md:w-[90%]',
        'before:w-10 before:text-4xl before:font-bold before:leading-8 before:content-["❝"]'
      )}
    >
      <div>
        <blockquote
          className={classNames(
            'text-xl font-bold leading-7 text-neutral-900 dark:text-neutral-50',
            'after:text-neutral-500 after:content-["❞"] after:dark:text-neutral-400'
          )}
        >
          <Texts id={id} richTexts={richText} outerColor={color} />
        </blockquote>
        {author && <p className="font-light leading-4">{author}</p>}
      </div>
    </div>
  )
}

export const Code = ({ block }: BlockComponentType) => {
  const { code } = block as CodeBlockType
  const { language, caption } = code
  const html = code.html
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (html?.customCode) {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: html.customCode }}></div>{' '}
        {caption && <Caption caption={caption} />}
      </>
    )
  }

  const plainCode = he.decode(removeHTMLTags(html?.light ?? ''))

  return (
    <div className={classNames('relative my-2 flex flex-col justify-center')}>
      <div className="absolute top-0 left-0 flex justify-between w-full p-2 space-x-2">
        <div className="flex select-none items-center justify-center rounded-full border border-neutral-100 bg-gray-100 px-2 py-0.5 text-xs text-gray-300 transition dark:border-neutral-700  dark:bg-neutral-800 dark:text-gray-500 sm:text-sm">
          {language}
        </div>
        {html?.name && (
          <div className="flex select-none items-center justify-center overflow-scroll rounded-full border border-neutral-100 bg-gray-100 px-2 py-0.5 text-xs text-gray-300 transition dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-500 sm:text-sm">
            {html?.name}
          </div>
        )}
        <div
          className="flex cursor-pointer select-none items-center justify-center rounded-full border border-neutral-100 bg-gray-200 px-2 py-0.5 text-xs text-gray-400 transition hover:bg-indigo-400 hover:text-white active:scale-95 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-indigo-900 sm:text-sm"
          onClick={() => {
            navigator.clipboard.writeText(plainCode)
            setCopied(true)
          }}
        >
          {copied ? <Tick className="text-green-500" /> : ''}
          Copy
        </div>
      </div>
      <div
        className={classNames(
          'overflow-scroll rounded-2xl border border-neutral-100 bg-gray-100 bg-opacity-50 pt-11 pb-3 font-mono text-sm leading-4 dark:border-neutral-700 dark:bg-neutral-900 sm:text-base'
        )}
        dangerouslySetInnerHTML={{
          __html:
            resolvedTheme === 'dark'
              ? html?.dark ?? 'Error loading code'
              : html?.light ?? 'Error loading code',
        }}
      />
      {caption && <Caption caption={caption} />}
    </div>
  )
}

export const Video = ({ block }: BlockComponentType) => {
  const { video } = block as VideoBlockObjectResponse
  const { type, caption } = video

  let videoSrc = ''

  if (type === 'external') {
    videoSrc = video.external.url
  } else if (type === 'file') {
    videoSrc = video.file.url
  }

  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {error && (
        <video
          className="w-full border rounded-2xl border-neutral-100 dark:border-neutral-700"
          src={videoSrc + '#t=0.01'}
          controls
        />
      )}
      {!error && mounted && (
        <div className="w-full overflow-hidden border rounded-2xl border-neutral-100 dark:border-neutral-700">
          <ReactPlayer
            controls
            width={'100%'}
            url={videoSrc}
            onError={() => setError(true)}
          />
        </div>
      )}
      {caption && <Caption caption={caption} />}
    </>
  )
}

export const Image = ({ block }: BlockComponentType) => {
  const { image } = block as ImageBlockType
  const { caption, type } = image
  let src = ''

  if (type === 'external') {
    src = image.external.url
  } else if (type === 'file') {
    src = image.file.url
  }
  const imageInfo = (block as ImageBlockType).info
  const width = imageInfo?.width
  const height = imageInfo?.height
  const placeholder = imageInfo?.placeholder
  const extension = imageInfo?.type
  const [blur, setBlur] = useState(true)

  return (
    <>
      <figure
        data-aos="fade-up"
        data-aos-duration="600"
        className="flex items-center justify-center overflow-hidden rounded-[1.25rem]"
      >
        <ImageWithFallback
          onLoadingComplete={() => setBlur(false)}
          className={classNames(
            'rounded-[1.25rem] transition-all duration-500 ease-in-out',
            extension === 'png'
              ? ''
              : 'border border-neutral-100 dark:border-neutral-700',
            blur ? 'blur-xl' : 'unblur'
          )}
          src={src}
          alt={'image'}
          fallbackSrc={CONFIG.DEFAULT_POST_COVER}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={placeholder}
        />
      </figure>
      {caption && (
        <figcaption
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-duration="300"
        >
          <Caption caption={caption} />
        </figcaption>
      )}
    </>
  )
}
