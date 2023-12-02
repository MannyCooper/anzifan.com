import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type SocialLink = {
  id: string
  link: string
  color_1: string
  color_2: string
  icon: string
}

export const formatSocialLinksDatabase = (
  socialLinkDatabase: PageObjectResponse[]
): SocialLink[] => {
  const socialLinks: SocialLink[] = socialLinkDatabase.map((socialLink) => {
    const { properties } = socialLink
    const { id, link, color_1, color_2, icon } = properties

    const idText = id.type === 'title' && id.title[0]?.plain_text
    const linkText = link.type === 'rich_text' && link.rich_text[0]?.plain_text
    const color_1Text =
      color_1.type === 'rich_text' && color_1.rich_text[0]?.plain_text
    const color_2Text =
      color_2.type === 'rich_text' && color_2.rich_text[0]?.plain_text
    const iconText = icon.type === 'rich_text' && icon.rich_text[0]?.plain_text

    return {
      icon: iconText ? iconText : '',
      id: idText ? idText : '',
      link: linkText ? linkText : '',
      color_1: color_1Text ? color_1Text : '',
      color_2: color_2Text ? color_2Text : '',
    }
  })

  return socialLinks
}
