import { Friend } from '@/src/types/blog'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const formatFriendsDatabase = (
  friendsDatabase: PageObjectResponse[]
): Friend[] => {
  const friends: Friend[] = friendsDatabase.map((friend) => {
    const { properties } = friend
    const { name, url, avatar } = properties

    const nameText = name.type === 'title' && name.title[0]?.plain_text
    const link = url.type === 'url' && url.url
    const image =
      avatar.type === 'files' &&
      avatar.files[0].type === 'external' &&
      avatar.files[0].external.url

    return {
      name: nameText ? nameText : '',
      link: link ? link : '',
      avatar: image ? image : '',
    }
  })

  return friends
}
