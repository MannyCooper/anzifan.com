import CONFIG from '@/blog.config'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import ContainerLayout from '../components/post/ContainerLayout'
import { Section500 } from '../components/section/Section500'
import withNavFooter from '../components/withNavFooter'
import { withNavFooterStaticProps } from '../lib/blog/withNavFooterStaticProps'
import { SharedNavFooterStaticProps } from '../types/blog'

const Custom500: NextPage = () => {
  return (
    <ContainerLayout>
      <Section500 />
    </ContainerLayout>
  )
}

export const getStaticProps: GetStaticProps = withNavFooterStaticProps(
  async (
    _context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => {
    return {
      props: {
        ...sharedPageStaticProps.props,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    }
  }
)
export default withNavFooter(Custom500, true, false)
