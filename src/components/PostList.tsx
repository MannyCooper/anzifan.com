import { Post } from '../types/blog'
import { ListPostCard } from './card/PostCard'

type PostListProps = {
  posts: Post[]
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-6 my-8 lg:gap-x-14 lg:gap-y-8">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="col-span-2 md:col-span-1"
          data-aos="fade-up"
        >
          <ListPostCard key={post.id} post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostList
