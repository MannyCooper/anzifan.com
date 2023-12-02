import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { BlockType } from './blog'

export enum ApiScope {
  Home, // Published Post/Piece/Widget/Page
  Archive, // Published & Hidden Post/Piece
  Draft, // Draft Post/Piece
  Page, // Published & Hidden Page
}

export type ApiColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background'
  | 'default_background'
  | 'default_border'
  | 'gray_border'
  | 'brown_border'
  | 'orange_border'
  | 'yellow_border'
  | 'green_border'
  | 'blue_border'
  | 'purple_border'
  | 'pink_border'
  | 'red_border'
  | 'default_background_secondary'
  | 'gray_background_secondary'
  | 'brown_background_secondary'
  | 'orange_background_secondary'
  | 'yellow_background_secondary'
  | 'green_background_secondary'
  | 'blue_background_secondary'
  | 'purple_background_secondary'
  | 'pink_background_secondary'
  | 'red_background_secondary'
  | 'default_background_from'
  | 'gray_background_from'
  | 'brown_background_from'
  | 'orange_background_from'
  | 'yellow_background_from'
  | 'green_background_from'
  | 'blue_background_from'
  | 'purple_background_from'
  | 'pink_background_from'
  | 'red_background_from'
  | 'default_background_to'
  | 'gray_background_to'
  | 'brown_background_to'
  | 'orange_background_to'
  | 'yellow_background_to'
  | 'green_background_to'
  | 'blue_background_to'
  | 'purple_background_to'
  | 'pink_background_to'
  | 'red_background_to'
  | 'default_background_via'
  | 'gray_background_via'
  | 'brown_background_via'
  | 'orange_background_via'
  | 'yellow_background_via'
  | 'green_background_via'
  | 'blue_background_via'
  | 'purple_background_via'
  | 'pink_background_via'
  | 'red_background_via'

type PropertyFilter =
  | {
      property: string
      status: { equals: string } | { does_not_equal: string }
    }
  | {
      property: string
      select: { equals: string } | { does_not_equal: string }
    }

export type ApiFilter =
  | {
      or: Array<
        | PropertyFilter
        | {
            or: Array<PropertyFilter>
          }
        | {
            and: Array<PropertyFilter>
          }
      >
    }
  | {
      and: Array<
        | PropertyFilter
        | {
            or: Array<PropertyFilter>
          }
        | {
            and: Array<PropertyFilter>
          }
      >
    }
  | undefined

export type BlockResponse = Partial<BlockObjectResponse> & {
  id: string
  type: BlockType
  children?: BlockResponse[]
}

export type AnnotationResponse = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color:
    | 'default'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
    | 'gray_background'
    | 'brown_background'
    | 'orange_background'
    | 'yellow_background'
    | 'green_background'
    | 'blue_background'
    | 'purple_background'
    | 'pink_background'
    | 'red_background'
}
