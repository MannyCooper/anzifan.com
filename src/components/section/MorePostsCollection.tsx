import CONFIG from '@/blog.config'
import { Post } from '@/src/types/blog'
import { Empty } from '../Empty'
import { LargeTitle } from '../LargeTitle'
import ContainerLayout from '../post/ContainerLayout'
import PostList from '../PostList'
import { TimelineButton } from './TimelineButton'

export const MorePostsCollection = ({ posts }: { posts: Post[] }) => {
  const { LARGE, MEDIUM, SMALL, MORE } = CONFIG.HOME_POSTS_COUNT

  const startIndex = LARGE + MEDIUM + SMALL
  const endIndex = startIndex + MORE

  const postsToDisplay = posts.slice(startIndex, endIndex)

  if (posts.length === 0) return null

  return (
    <div className="bg-white dark:bg-background-dark">
      <ContainerLayout>
        <div className="py-2 md:py-12">
          <LargeTitle title="More Posts 🔭" />
          {postsToDisplay.length <= 0 ? (
            <Empty />
          ) : (
            <>
              <PostList posts={postsToDisplay}></PostList>
              <TimelineButton />
            </>
          )}
        </div>
      </ContainerLayout>
    </div>
  )
}
