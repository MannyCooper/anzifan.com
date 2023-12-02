import { ApiColor } from '@/src/types/notion'
import {
  CalloutBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export function createCalloutBlockObjectResponse(
  icon: {
    content: string
    type: 'emoji' | 'file' | 'external'
  },
  texts: Array<RichTextItemResponse>,
  color: ApiColor
): Partial<CalloutBlockObjectResponse> {
  switch (icon.type) {
    case 'emoji':
      return {
        type: 'callout',
        callout: {
          rich_text: texts,
          color: color,
          icon: {
            type: 'emoji',
            emoji: icon.content,
          },
        },
      } as CalloutBlockObjectResponse
    case 'file':
      return {
        type: 'callout',
        callout: {
          rich_text: texts,
          color: color,
          icon: {
            type: 'file',
            file: {
              url: icon.content,
            },
          },
        },
      } as CalloutBlockObjectResponse
    case 'external':
      return {
        type: 'callout',
        callout: {
          rich_text: texts,
          color: color,
          icon: {
            type: 'external',
            external: {
              url: icon.content,
            },
          },
        },
      } as CalloutBlockObjectResponse

    default:
      return {
        type: 'callout',
        callout: {
          rich_text: texts,
          color: color,
          icon: {
            type: 'emoji',
            emoji: '❓',
          },
        },
      } as CalloutBlockObjectResponse
  }
}
