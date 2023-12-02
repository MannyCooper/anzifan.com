import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { AnnotationResponse, ApiColor } from '@/src/types/notion'
import {
  EquationRichTextItemResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { MathJax } from 'better-react-mathjax'

export function getColor(
  color: ApiColor,
  outerColor?: ApiColor,
  secondary = true
) {
  let textColor = colorMap['default']
  let backgroundColor = ''

  if (!outerColor) {
    textColor = colorMap[(color + (secondary ? '_secondary' : '')) as ApiColor]
  }

  if (outerColor && outerColor !== 'default') {
    if (outerColor.endsWith('_background')) {
      backgroundColor =
        colorMap[(outerColor + (secondary ? '_secondary' : '')) as ApiColor]
    } else {
      textColor = colorMap[outerColor]
    }
  }

  if (color && color !== 'default') {
    if (color.endsWith('_background')) {
      backgroundColor =
        colorMap[(color + (secondary ? '_secondary' : '')) as ApiColor]
    } else {
      textColor = colorMap[color]
    }
  }

  return classNames(backgroundColor, textColor)
}

function annotationsToStyles(
  annotations: AnnotationResponse,
  outerColor?: ApiColor,
  option?: {
    href?: boolean
    at?: boolean
  }
): string {
  const { bold, italic, strikethrough, underline, code, color } = annotations
  return classNames(
    bold ? 'font-bold' : '',
    italic ? 'italic' : '',
    strikethrough ? 'line-through text-opacity-50 dark:text-opacity-70' : '',
    underline ? 'underline' : '',
    code
      ? `font-mono text-sm bg-neutral-100 rounded-md px-1 py-0.5 mx-1 font-medium ${colorMap['purple']} dark:bg-neutral-800 dark:brightness-125`
      : '',
    color === 'default'
      ? outerColor !== 'default'
        ? getColor(color, outerColor)
        : option
        ? option.at
          ? colorMap['orange']
          : option.href
          ? colorMap['blue']
          : getColor(color, outerColor)
        : getColor(color, outerColor)
      : getColor(color, outerColor),
    !color && !outerColor && !code ? 'text-[#37352f] dark:text-[#e4e2dc]' : ''
  )
}

export const Text = ({
  richText,
  outerColor,
}: {
  richText: RichTextItemResponse
  outerColor?: ApiColor
}) => {
  const { type, annotations, plain_text: plainText, href, ...object } = richText

  if (type === 'text') {
    const isHref = href ? true : false
    const isAt = href && plainText.startsWith('@') ? true : false
    return (
      <span
        className={classNames(
          annotationsToStyles(annotations, outerColor, {
            href: isHref,
            at: isAt,
          })
        )}
      >
        {href ? (
          <a
            className={classNames(
              "mx-0.5 break-all bg-gradient-to-r bg-no-underline-size bg-bottom bg-no-repeat pb-[0.5px] transition-all duration-200 ease-in-out after:content-['↗'] hover:bg-underline-size",
              isHref &&
                !isAt &&
                (outerColor === 'default' ||
                  !outerColor ||
                  outerColor === 'default_background') &&
                annotations.color === 'default'
                ? 'from-blue-light to-blue-light'
                : isAt &&
                  (outerColor === 'default' ||
                    !outerColor ||
                    outerColor === 'default_background')
                ? 'from-orange-light to-orange-light'
                : classNames(
                    colorMap[
                      (annotations.color === 'default'
                        ? outerColor + '_background_from'
                        : annotations.color.endsWith('_background')
                        ? outerColor
                          ? outerColor + '_background_from'
                          : 'blue_background_from'
                        : annotations.color + '_background_from') as ApiColor
                    ],
                    colorMap[
                      (annotations.color === 'default'
                        ? outerColor + '_background_to'
                        : annotations.color.endsWith('_background')
                        ? outerColor
                          ? outerColor + '_background_to'
                          : 'blue_background_to'
                        : annotations.color + '_background_to') as ApiColor
                    ]
                  )
            )}
            href={href ?? ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {plainText}
          </a>
        ) : (
          <span className="relative z-10">{plainText}</span>
        )}
      </span>
    )
  }
  if (type === 'mention') {
    return (
      <span
        className={classNames(
          annotationsToStyles(annotations),
          'text-opacity-50 dark:text-opacity-50'
        )}
      >
        <span className="rounded-full bg-neutral-200 px-1 py-0.5 text-neutral-400 dark:bg-neutral-800">
          @ {plainText}
        </span>
      </span>
    )
  }
  if (type === 'equation') {
    const { equation } = object as EquationRichTextItemResponse
    const { expression } = equation
    return (
      <span className={annotationsToStyles(annotations, outerColor)}>
        <MathJax
          renderMode={'pre'}
          typesettingOptions={{ fn: 'tex2chtml' }}
          text={expression}
          inline
        />
      </span>
    )
  }

  return <>Unsupported ❌</>
}

export const Texts = ({
  id,
  richTexts,
  outerColor,
}: {
  id: string
  richTexts: RichTextItemResponse[]
  outerColor?: ApiColor
}): JSX.Element => {
  return (
    <>
      {richTexts.map((richText, index) => {
        const richTextArray: string[] = richText.plain_text.split('\n')
        return richTextArray.map((text, i) => {
          return (
            <span key={`${id}${index}${i}`}>
              <Text
                richText={{ ...richText, plain_text: text }}
                outerColor={outerColor}
              />
              {i !== richTextArray.length - 1 && <br />}
            </span>
          )
        })
      })}
    </>
  )
}
