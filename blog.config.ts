import { ApiColor } from '@/src/types/notion'
interface BlogConfig {
  NOTION_PAGE_ID: string
  NOTION_SITE_NAME: string
  NEXT_REVALIDATE_SECONDS: number
  // 某时间前，强制更新时间为创建时间
  FORCE_UPDATE_TIME: number
  // Post 默认图片
  DEFAULT_POST_COVER: string
  // 进度条颜色
  PROGRESS_BAR_COLOR: string
  // 主页/分类页显示的 Posts 数量（建议 medium, small, more 数量为偶数）
  HOME_POSTS_COUNT: {
    [type: string]: number
  }
  // 归档页每页显示的数量
  ARCHIVE_PER_COUNT: number
  // public 下图标目录
  ICON_PATH: string
  // 默认特殊页面对应的 slug
  DEFAULT_SPECIAL_PAGES: {
    [type: string]: string
  }
  // 网站开始日期
  SITE_START_DATE: string
  // 备案号
  SITE_BEIAN?: {
    ICP?: string
    GONGAN?: string
  }
  // 是否显示不支持的 block
  SHOW_UNSUPPORTED_BLOCK?: boolean
  // 引用卡片严格模式
  STRICT_QUOTE_CARD?: boolean
  // 旧博客信息
  PAST_BLOG_INFO?: {
    // 旧博客地址
    URL: string
    // 旧博客文章地址
    POST_URL: string
    // 旧博客停运日期
    STOP_DATE: string
  }
  // 转载提示
  REPOST_MESSAGE?: [
    {
      // 当匹配到此链接显示转载提示 Icon
      URL: string
      // 转载提示网站名
      NAME?: string
      // 转载提示 Icon
      ICON?: string
      // 转载提示颜色
      COLOR?: ApiColor
    }
  ]
  // 启用评论
  ENABLE_COMMENT?: boolean
  // 评论配置
  COMMENT_CONFIG?: {
    // 评论服务商配置
    TWIKOO?: {
      // Twikoo
      ENVID: string
    }
    GISCUS?: {
      // Giscus
      REPO: `${string}/${string}`
      REPOID: string
      CATEGORY: string
      CATEGORYID: string
    }
  }
  // 是否开启 Draft Dialog
  ENABLE_DRAFT_DIALOG?: boolean
}

const CONFIG: BlogConfig = {
  NOTION_PAGE_ID:
    process.env.NOTION_PAGE_ID ?? '8279f7facd874df284055b2d84cd9a58',
  NOTION_SITE_NAME: 'anzifan',
  NEXT_REVALIDATE_SECONDS: 60,
  FORCE_UPDATE_TIME: 1620000000000,
  DEFAULT_POST_COVER:
    'https://cdn.dribbble.com/users/3167939/screenshots/10422336/media/b618a0e73996c3b24b58b2db1c881ee3.png',
  PROGRESS_BAR_COLOR: '#e5e5e590',
  HOME_POSTS_COUNT: {
    LARGE: 1,
    MEDIUM: 2,
    SMALL: 6,
    MORE: 6,
  },
  ARCHIVE_PER_COUNT: 10,
  ICON_PATH: '/icons',
  DEFAULT_SPECIAL_PAGES: {
    TAG: 'tag',
    CATEGORY: 'category',
    ARCHIVE: 'archive',
    FREINDS: 'friends',
    ABOUT: 'about',
  },
  SITE_START_DATE: '2020',
  SITE_BEIAN: {
    ICP: '苏ICP备 2020060340 号',
    GONGAN: '苏公网安备 32011202000528 号',
  },
  SHOW_UNSUPPORTED_BLOCK: false,
  STRICT_QUOTE_CARD: true,
  PAST_BLOG_INFO: {
    URL: 'https://anzifan-old.vercel.app',
    POST_URL: 'https://anzifan-old.vercel.app/post',
    STOP_DATE: '2022-05-07',
  },
  REPOST_MESSAGE: [
    {
      URL: 'sspai.com',
      NAME: '少数派',
      ICON: '/static/sspai.svg',
      COLOR: 'red',
    },
  ],
  ENABLE_COMMENT: true,
  COMMENT_CONFIG: {
    GISCUS: {
      REPO: 'MannyCooper/giscus-discussions',
      REPOID: 'R_kgDOGtIyjw',
      CATEGORY: 'Comments',
      CATEGORYID: 'DIC_kwDOGtIyj84CAxTy',
    },
    TWIKOO: {
      ENVID: 'twikoo-7gjtx7whfd732c11',
    },
  },
  ENABLE_DRAFT_DIALOG: true,
}

export default CONFIG
