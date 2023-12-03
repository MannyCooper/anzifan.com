import { ContentType } from '@/src/types/blog'
import { isFullDatabase, isFullPage } from '@notionhq/client'
import {
  DatabaseObjectResponse,
  GetDatabaseResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { ApiScope } from './../../types/notion'
import { filterSwitch } from './filter'
import { databaseId, notion } from './notion'

// TODO: Refactor this to use the Utility functions `iteratePaginatedAPI` & `collectPaginatedAPI`  in @notionhq/client

export const getDatabase = async (
  scope?: ApiScope,
  cursor?: string,
  id?: string
): Promise<QueryDatabaseResponse> => {
  const filter = scope ? filterSwitch(scope) : undefined

  const response = await notion.databases.query({
    database_id: id ?? databaseId,
    filter: filter,
    sorts: id
      ? [
          {
            timestamp: 'created_time',
            direction: 'ascending',
          },
        ]
      : [{ property: 'date', direction: 'descending' }],
    start_cursor: cursor,
  })

  return response
}

export const getAll = async (
  scope?: ApiScope,
  id?: string
): Promise<Array<PageObjectResponse>> => {
  const response = await getDatabase(scope, undefined, id)
  const objects: PageObjectResponse[] = []
  addObjects(response.results, objects)
  let cursor = response.next_cursor
  if (cursor) {
    do {
      const additional: QueryDatabaseResponse = await getDatabase(
        scope,
        cursor,
        id
      )
      addObjects(additional.results, objects)
      cursor = additional.next_cursor
    } while (cursor)
  }

  return objects
}

export const getLimitPosts = async (
  limit: number,
  scope: ApiScope.Home | ApiScope.Archive | ApiScope.Draft,
  id?: string
): Promise<Array<PageObjectResponse>> => {
  const response = await getDatabase(scope, undefined, id)
  const objects: PageObjectResponse[] = []
  addObjects(response.results, objects, ContentType.Post, limit)
  let cursor = response.next_cursor

  if (cursor) {
    do {
      const additional: QueryDatabaseResponse = await getDatabase(
        scope,
        cursor,
        id
      )
      addObjects(additional.results, objects, ContentType.Post, limit)
      cursor = additional.next_cursor
    } while (cursor && objects.length < limit)
  }
  return objects
}

export const getDatabaseMetadata = async (): Promise<GetDatabaseResponse> => {
  const response = await notion.databases.retrieve({ database_id: databaseId })
  return response
}

export const getDatabaseTitle = async (): Promise<
  Array<RichTextItemResponse>
> => {
  const response = await getDatabaseMetadata()
  if (!isFullDatabase(response)) {
    throw new Error('Database response is not full')
  }
  return response.title
}

export const getDatabaseIcon = async (): Promise<
  DatabaseObjectResponse['icon']
> => {
  const response = await getDatabaseMetadata()
  if (!isFullDatabase(response)) {
    throw new Error('Database response is not full')
  }
  return response.icon
}

export const getDatabaseProperties = async (): Promise<
  PartialDatabaseObjectResponse['properties']
> => {
  const response = await getDatabaseMetadata()
  return response.properties
}

function addObjects(
  results: QueryDatabaseResponse['results'],
  objects: PageObjectResponse[] | PartialPageObjectResponse[],
  filter?: ContentType,
  limit?: number
) {
  results.forEach((object) => {
    if (object.object === 'page' && isFullPage(object)) {
      if (limit && objects.length >= limit) {
        return
      }
      if (
        !filter ||
        (object.properties.type.type === 'select' &&
          object.properties.type.select?.name === filter)
      ) {
        objects.push(object as PageObjectResponse)
      }
    }
  })
}
