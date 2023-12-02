import { Post } from '@/src/types/blog'
import { ListCardWide } from '../card/ListCard'

export const ArchiveCollection = ({ items }: { items: Post[] }) => {
  let currentYear: number | null = null
  return (
    <ul className="my-8">
      {items.map((item) => {
        const year = new Date(item.date.created).getFullYear()
        if (year !== currentYear) {
          currentYear = year
          return (
            <div key={item.id}>
              <p className="mt-8 mb-4 block text-[28px] font-semibold">
                {year} 年
              </p>
              <ListCardWide key={item.id} post={item} />
            </div>
          )
        } else {
          return <ListCardWide key={item.id} post={item} />
        }
      })}
    </ul>
  )
}
