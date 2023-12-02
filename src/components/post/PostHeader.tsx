import {
  ParagraphBlockObjectResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaSpinner } from 'react-icons/fa'
import { readingTime } from 'reading-time-estimator'
import { colorMap } from '../../lib/colors'
import { classNames, formatDate } from '../../lib/util'
import { BlockDataType, Post } from '../../types/blog'
import { ApiColor } from '../../types/notion'
import { PostImage } from '../card/CardInfo'
import ContentLayout, { CoverLayout } from '../layout/ContentLayout'
import { Share } from './Share'

const PostHeader: NextPage<{ post: Post; blocks: BlockDataType[] }> = ({
  post,
  blocks,
}) => {
  const { title, excerpt, date, cover, category, options } = post

  const plainText = blocks
    .map((b: BlockDataType) =>
      (b as ParagraphBlockObjectResponse).paragraph?.rich_text?.map(
        (t) => (t as TextRichTextItemResponse).plain_text
      )
    )
    .join('')
    .split('')
    .reduce(
      (acc, char) => acc + (/[\u4e00-\u9fa5]/.test(char) ? char + ' ' : char),
      ''
    )

  const { text } = readingTime(plainText)

  return (
    <header>
      <ContentLayout>
        <div
          className="flex flex-col items-baseline text-justify break-words"
          data-aos="fade-down"
        >
          <div className="mt-3 md:mt-6">
            <Link href="/category/[{Category}]" as={`/category/${category.id}`}>
              <p
                className={`leading-2 mb-2 inline-block text-xs font-bold ${
                  colorMap[category.color]
                    ? colorMap[category.color]
                    : 'text-neutral-600'
                } `}
              >
                {category.name}
              </p>
            </Link>
            <div className="flex flex-row flex-wrap items-center justify-start mt-2 text-sm font-semibold gap-x-2 text-neutral-600 dark:text-neutral-400">
              <time
                className="text-sm font-semibold shrink-0 text-neutral-600 dark:text-neutral-400"
                dateTime={date.created}
              >
                {formatDate(date.created)}
              </time>
              <span>·</span>
              <p className="flex flex-row shrink-0 gap-x-2 ">
                <span>{text}</span>
                <span>·</span>
              </p>
              <p className="shrink-0">
                <span
                  id="twikoo_visitors"
                  className='flex flex-row items-center justify-center gap-x-2 after:content-["_Views"]'
                >
                  <FaSpinner
                    className="text-gray-400 animate-spin dark:text-gray-500"
                    size={12}
                  />
                </span>
              </p>
            </div>
          </div>
          <p
            className={classNames(
              excerpt ? 'my-6' : 'mt-6',
              'relative z-0 whitespace-pre-wrap text-4xl font-bold lg:text-5xl',
              options.colorTitle.length > 0
                ? `bg-gradient-to-r ${options.colorTitle
                    .map((color, index) => {
                      if (index === 0) {
                        return colorMap[
                          (color + '_background_from') as ApiColor
                        ]
                      }
                      if (index === options.colorTitle.length - 1) {
                        return colorMap[(color + '_background_to') as ApiColor]
                      }
                      return colorMap[(color + '_background_via') as ApiColor]
                    })
                    .join(' ')} !bg-clip-text text-transparent`
                : ''
            )}
          >
            {title}
          </p>
          {excerpt && (
            <p className="mb-4 text-xl font-medium text-neutral-600 dark:text-neutral-400 lg:text-2xl">
              {excerpt}
            </p>
          )}
          <Share />
        </div>
      </ContentLayout>
      <CoverLayout>
        <div
          id="cover"
          className="relative w-full h-full md:rounded-3xl"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <PostImage
            cover={cover}
            alt={title}
            className={
              'z-0 overflow-hidden transition-all duration-500 ease-in-out md:rounded-3xl'
            }
          />
        </div>
      </CoverLayout>
    </header>
  )
}

export default PostHeader
