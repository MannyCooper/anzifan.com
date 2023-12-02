import { BlockDataType, BlockEnum, BlockType } from '@/src/types/blog'
import {
  Bookmark,
  BulletedList,
  Callout,
  Code,
  Column,
  ColumnList,
  Divider,
  Embed,
  Equation,
  File,
  Heading1,
  Heading2,
  Heading3,
  Image,
  NumberedList,
  Paragraph,
  Pdf,
  Quote,
  Table,
  TableRow,
  Todo,
  Toggle,
  Unsupported,
  Video,
} from './BasicBlock'

export const unsupportedBlockTypes: BlockType[] = [
  BlockEnum.unsupported,
  BlockEnum.synced_block,
  BlockEnum.template,
  BlockEnum.link_to_page,
  BlockEnum.child_page,
  BlockEnum.child_database,
  BlockEnum.table_of_contents,
]

const getBlockComponent = (blockType: BlockType) => {
  if (unsupportedBlockTypes.includes(blockType)) {
    return Unsupported
  }
  switch (blockType) {
    case BlockEnum.paragraph:
      return Paragraph
    case BlockEnum.heading_1:
      return Heading1
    case BlockEnum.heading_2:
      return Heading2
    case BlockEnum.heading_3:
      return Heading3
    case BlockEnum.bulleted_list:
      return BulletedList
    case BlockEnum.numbered_list:
      return NumberedList
    case BlockEnum.to_do:
      return Todo
    case BlockEnum.toggle:
      return Toggle
    case BlockEnum.embed:
      return Embed
    case BlockEnum.file:
      return File
    case BlockEnum.pdf:
      return Pdf
    case BlockEnum.callout:
      return Callout
    case BlockEnum.divider:
      return Divider
    case BlockEnum.table_row:
      return TableRow
    case BlockEnum.table:
      return Table
    case BlockEnum.column_list:
      return ColumnList
    case BlockEnum.column:
      return Column
    case BlockEnum.equation:
      return Equation
    case BlockEnum.bookmark:
      return Bookmark
    case BlockEnum.quote:
      return Quote
    case BlockEnum.code:
      return Code
    case BlockEnum.video:
      return Video
    case BlockEnum.image:
      return Image
    default:
      return Unsupported
  }
}

export const BlockRender = ({ blocks }: { blocks: BlockDataType[] }) => {
  return (
    <>
      {blocks.map((block) => {
        const type = block.type ?? BlockEnum.unsupported
        const Block = getBlockComponent(type)
        if (type === BlockEnum.table_row || type === BlockEnum.column) {
          return (
            <Block key={block.id} block={block}>
              <BlockRender blocks={block.children as BlockDataType[]} />
            </Block>
          )
        }
        return (
          <div key={block.id} className="py-2">
            <Block block={block}>
              <BlockRender blocks={block.children as BlockDataType[]} />
            </Block>
          </div>
        )
      })}
    </>
  )
}
