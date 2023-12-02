import { BlockResponse } from '@/src/types/notion'
import { collectPaginatedAPI, isFullBlock } from '@notionhq/client'
import { notion } from './notion'

const deleteUnnecessaryProperties = (object: BlockResponse) => {
  delete object.object
  delete object.archived
  delete object.created_by
  delete object.last_edited_by
  delete object.parent
  delete object.created_time
  delete object.last_edited_time
}

export const getAllBlocks = async (
  parentBlockId: string
): Promise<Array<BlockResponse>> => {
  const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: parentBlockId,
  })

  const fullBlocks = await Promise.all(
    blocks.filter(isFullBlock).map(async (block) => {
      const object: BlockResponse = block
      deleteUnnecessaryProperties(object)
      const { has_children } = object
      delete object.has_children
      if (has_children && object.id) {
        return {
          ...object,
          children: await getAllBlocks(object.id),
        }
      }
      return {
        ...object,
        children: [],
      }
    })
  )

  return fullBlocks as BlockResponse[]
}
