import CONFIG from '@/blog.config'
import { SharedNavFooterStaticProps } from '@/src/types/blog'
import { GetStaticPropsContext } from 'next'
import { getCachedNavFooter } from '../notion/getCachedMem'

export function withNavFooterStaticProps(
  getStaticPropsFunc?: (
    context: GetStaticPropsContext,
    sharedPageStaticProps: SharedNavFooterStaticProps
  ) => Promise<SharedNavFooterStaticProps>
) {
  return async (
    context: GetStaticPropsContext
  ): Promise<SharedNavFooterStaticProps> => {
    const { navPages, siteTitle, logo } = await getCachedNavFooter()

    if (getStaticPropsFunc == null) {
      return {
        props: {
          navPages,
          siteTitle: siteTitle,
          siteSubtitle: null,
          logo: logo,
        },
        revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
      }
    }

    return await getStaticPropsFunc(context, {
      props: {
        navPages,
        siteTitle: siteTitle,
        siteSubtitle: null,
        logo: logo,
      },
      revalidate: CONFIG.NEXT_REVALIDATE_SECONDS,
    })
  }
}
