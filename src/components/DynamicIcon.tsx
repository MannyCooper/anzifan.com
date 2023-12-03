import React, { Suspense } from 'react'
import { IconBaseProps } from 'react-icons/lib'

type DynamicIconType = {
  nameIcon: string
  propsIcon?: IconBaseProps
}

export function DynamicIcon({ nameIcon, propsIcon }: DynamicIconType) {
  const lib = nameIcon
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLowerCase()

  const ElementIcon = React.lazy(() =>
    import(`react-icons/${lib}/index.js`).then((module) => ({
      default: module[nameIcon as keyof typeof module],
    }))
  )

  return (
    <Suspense fallback={<div>...</div>}>
      <ElementIcon {...propsIcon} />
    </Suspense>
  )
}
