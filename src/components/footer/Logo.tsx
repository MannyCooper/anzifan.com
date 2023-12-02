/* eslint-disable @next/next/no-img-element */
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const Logo = ({
  logo,
}: {
  logo: DatabaseObjectResponse['icon'] | undefined
}) => {
  if (!logo)
    return (
      <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
    )

  if (logo.type === 'emoji')
    return (
      <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600">
        {logo.emoji}
      </div>
    )

  if (logo.type === 'file')
    return (
      <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600">
        <img src={logo.file.url} alt="logo" />
      </div>
    )

  if (logo.type === 'external')
    return (
      <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600">
        <img src={logo.external.url} alt="logo" />
      </div>
    )

  return (
    <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-600"></div>
  )
}
