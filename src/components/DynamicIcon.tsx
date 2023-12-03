import loadable from '@loadable/component'
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

  const ElementIcon = loadable(() =>
    import(`react-icons/${lib}/index.js`).then((module) => ({
      default: module[nameIcon as keyof typeof module],
    }))
  ) as React.ComponentType<IconBaseProps>

  return <ElementIcon {...propsIcon} />
}
