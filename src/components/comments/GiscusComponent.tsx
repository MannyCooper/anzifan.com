import CONFIG from '@/blog.config'
import Giscus from '@giscus/react'
import { FC } from 'react'

const { COMMENT_CONFIG } = CONFIG

type GiscusComponentProps = {
  theme: 'light' | 'dark'
}

const GiscusComponent: FC<GiscusComponentProps> = ({ theme }) => {
  const config = COMMENT_CONFIG?.GISCUS
  const repo = config?.REPO
  const repoId = config?.REPOID
  const category = config?.CATEGORY
  const categoryId = config?.CATEGORYID

  return (
    <Giscus
      repo={repo!}
      repoId={repoId!}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      theme={theme}
    />
  )
}

export default GiscusComponent
