import { supportedDatabasesMap } from '@/src/lib/blog/supportedDatabasesMap'
import { BlockDataType, ChildDatabaseBlockType } from '@/src/types/blog'
import { ApiScope } from '@/src/types/notion'
import { getAll } from '../../../notion/getDatabase'

export const getFormattedChildrenDatabase = async (
  formattedBlocks: BlockDataType[],
  specificDatabase?: string
) => {
  const childDatabase = formattedBlocks
    .filter((block) =>
      specificDatabase
        ? block.type === 'child_database' &&
          (block as ChildDatabaseBlockType).child_database.title ===
            specificDatabase
        : block.type === 'child_database'
    )
    .map((block) => {
      return {
        id: block.id,
        title: (block as ChildDatabaseBlockType).child_database.title,
      }
    })
  const formattedChildDatabase = await Promise.all(
    childDatabase.map(async (database) => {
      const response = await getAll(ApiScope.Home, database.id)
      const formatFn = supportedDatabasesMap[database.title]
      const formattedResponse = formatFn(response)
      return {
        type: database.title,
        data: formattedResponse,
      }
    })
  )
  return formattedChildDatabase
}
