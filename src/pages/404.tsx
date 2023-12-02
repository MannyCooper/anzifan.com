import CONFIG from '@/blog.config'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import ContainerLayout from '../components/post/ContainerLayout'
import { Section404 } from '../components/section/Section404'
import withNavFooter from '../components/withNavFooter'
import { withNavFooterStaticProps } from '../lib/blog/withNavFooterStaticProps'
import { SharedNavFooterStaticProps } from '../types/blog'

const Custom404: NextPage = () => {
  return (
    <ContainerLayout>
      <Section404 />
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

export default withNavFooter(Custom404, true, false)
