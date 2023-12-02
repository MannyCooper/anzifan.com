import loadable from '@loadable/component'
import { IconBaseProps } from 'react-icons/lib'

type DynamicIconType = {
  nameIcon: string
  propsIcon?: IconBaseProps
}

export function DynamicIcon({
  nameIcon,
  propsIcon,
}: DynamicIconType): JSX.Element {
  const lib = nameIcon
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLocaleLowerCase()
  const ElementIcon = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[nameIcon as keyof JSX.Element],
  }) as React.ComponentType<IconBaseProps>

  return <ElementIcon {...propsIcon} />
}
