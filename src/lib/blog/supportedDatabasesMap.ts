import { formatFriendsDatabase } from '@/src/lib/blog/format/childrenDatabase/friendsDatabase'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { formatSocialLinksDatabase } from './format/childrenDatabase/socialLinksDatabase'

export const supportedDatabasesMap: {
  [key: string]: (data: PageObjectResponse[]) => any
} = {
  Friends: formatFriendsDatabase,
  SocialLinks: formatSocialLinksDatabase,
}
