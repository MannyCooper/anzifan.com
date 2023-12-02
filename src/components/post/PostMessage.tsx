import CONFIG from '@/blog.config'
import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextPage } from 'next'
import { createCalloutBlockObjectResponse } from '../../lib/blog/createCallout'
import { BlockDataType, Post } from '../../types/blog'
import { ApiColor } from '../../types/notion'
import { Callout } from '../blocks/BasicBlock'

const OUTDATE_DAYS = 100

const PostMessage: NextPage<{ post: Post }> = ({ post }) => {
  const { date, options, slug } = post
  let pastBlogStopDate
  if (CONFIG.PAST_BLOG_INFO) {
    pastBlogStopDate = new Date(CONFIG.PAST_BLOG_INFO.STOP_DATE)
  }
  const isPastBlog =
    pastBlogStopDate && new Date(date.created) < pastBlogStopDate

  const days =
    pastBlogStopDate && isPastBlog
      ? Math.floor(
          (new Date().getTime() - pastBlogStopDate.getTime()) / 86400000
        )
      : Math.floor(
          (new Date().getTime() - new Date(date.updated).getTime()) / 86400000
        )

  return (
    <div className="mb-2 flex flex-col gap-4">
      {isPastBlog && <PastBlogPostMessage slug={slug} />}
      {days > OUTDATE_DAYS && <OutdatedPostMessage days={days} />}
      {options?.repost && <RepostMessage url={options.repost} />}
    </div>
  )
}

const RepostMessage = ({ url }: { url: string }) => {
  const repostSetting = CONFIG.REPOST_MESSAGE
  const setting = {
    name: '此网站',
    icon: '🌐',
    color: 'blue',
    iconType: 'emoji' as 'emoji' | 'file' | 'external',
  }

  if (repostSetting) {
    const targetSetting = repostSetting.filter((s) => url.includes(s.URL))
    if (targetSetting.length > 0) {
      setting.name = targetSetting[0].NAME ?? '此网站'
      setting.icon = targetSetting[0].ICON ?? '🌐'
      setting.color = targetSetting[0].COLOR ?? 'blue'
      setting.iconType = 'file' ?? 'emoji'
    }
  }

  const texts = [
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: setting.color,
      },
      plain_text: '本文首发于',
    },
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: setting.color,
      },
      plain_text: setting.name,
      href: url,
    },
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: setting.color,
      },
      plain_text: ' 🎉',
    },
  ] as TextRichTextItemResponse[]

  return (
    <Message
      icon={{
        type: setting.iconType,
        content: setting.icon,
      }}
      color={`${setting.color}_background` as ApiColor}
      text={texts}
    />
  )
}

const PastBlogPostMessage = ({ slug }: { slug: string }) => {
  const color = 'yellow'
  const pastBlogPostUrl = CONFIG.PAST_BLOG_INFO?.POST_URL.endsWith('/')
    ? CONFIG.PAST_BLOG_INFO?.POST_URL + slug
    : CONFIG.PAST_BLOG_INFO?.POST_URL + '/' + slug
  const texts = [
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color,
      },
      plain_text: 'This post is from the ',
    },
    {
      type: 'text',
      annotations: {
        bold: true,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color,
      },
      plain_text: 'past blog',
      href: pastBlogPostUrl,
    },
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color,
      },
      plain_text: ' and may not display optimally',
    },
  ] as TextRichTextItemResponse[]
  return (
    <Message
      icon={{
        content: '⚠️',
        type: 'emoji',
      }}
      color={`${color}_background`}
      text={texts}
    />
  )
}

const OutdatedPostMessage = ({ days }: { days: number }) => {
  const color = 'orange'
  const texts = [
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color,
      },
      plain_text: 'This post was updated ',
    },
    {
      type: 'text',
      annotations: {
        bold: true,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color,
      },
      plain_text: days.toString(),
    },
    {
      type: 'text',
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: color,
      },
      plain_text: ' days ago and may contain outdated content',
    },
  ] as TextRichTextItemResponse[]
  return (
    <Message
      icon={{
        content: '⚠️',
        type: 'emoji',
      }}
      color={`${color}_background`}
      text={texts}
    />
  )
}

const Message = ({
  icon,
  color,
  text,
}: {
  icon: {
    content: string
    type: 'emoji' | 'file' | 'external'
  }
  color: ApiColor
  text: string | TextRichTextItemResponse[]
}) => {
  if (typeof text === 'string') {
    const annotation = {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: color.endsWith('_background')
        ? color.replace('_background', '')
        : color,
    }
    const texts = [
      {
        type: 'text',
        text: {
          content: text,
          link: null,
        },
        annotations: annotation,
        plain_text: text,
        href: null,
      } as TextRichTextItemResponse,
    ]
    const callout = createCalloutBlockObjectResponse(icon, texts, color)
    return <Callout block={callout as BlockDataType}>{<></>}</Callout>
  }
  const callout = createCalloutBlockObjectResponse(icon, text, color)

  return <Callout block={callout as BlockDataType}>{<></>}</Callout>
}

export default PostMessage
