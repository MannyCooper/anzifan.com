import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaLink } from 'react-icons/fa'
import { SiSinaweibo, SiTwitter, SiWechat } from 'react-icons/si'
import { InlineShareButtons } from 'sharethis-reactjs'

export const Share = () => {
  const [shares, setShares] = useState<
    {
      name: string
      icon: JSX.Element
      color: string
      onClick: () => void
    }[]
  >()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const wechatShare = document.querySelector(
      '#sharethis [data-network="wechat"]'
    ) as HTMLElement
    const weiboShare = document.querySelector(
      '#sharethis [data-network="weibo"]'
    ) as HTMLElement
    const twitterShare = document.querySelector(
      '#sharethis [data-network="twitter"]'
    ) as HTMLElement

    setShares([
      {
        name: 'wechat',
        icon: <SiWechat size="20" />,
        color: 'hover:text-green-400',
        onClick: () => wechatShare.click(),
      },
      {
        name: 'weibo',
        icon: <SiSinaweibo size="20" />,
        color: 'hover:text-red-400',
        onClick: () => weiboShare.click(),
      },
      {
        name: 'twitter',
        icon: <SiTwitter size="20" />,
        color: 'hover:text-blue-400',
        onClick: () => twitterShare.click(),
      },
      {
        name: 'link',
        icon: <FaLink />,
        color: 'hover:text-orange-400',
        onClick: () => {
          navigator.clipboard.writeText(router.route)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        },
      },
    ])
  }, [router.route])

  return (
    <>
      <div id="sharethis" className="hidden">
        <InlineShareButtons
          config={{
            alignment: 'left',
            color: 'social',
            enabled: true,
            font_size: 16,
            labels: null,
            language: 'en',
            networks: ['twitter', 'weibo', 'wechat'],
            padding: 7,
            radius: 9,
            show_total: false,
            size: 25,
          }}
        />
      </div>
      <div className="relative flex items-center mt-4 space-x-5 text-neutral-400">
        {shares &&
          shares.map((share) => (
            <button
              key={share.name}
              className={`leading-0 ${share.color}`}
              onClick={share.onClick}
            >
              {share.icon}
            </button>
          ))}
        <p
          id="copiedNotify"
          className={`pointer-events-none transition-all delay-100 duration-500 ease-in-out ${
            copied ? 'opacity-100' : 'opacity-0'
          } border-1 absolute left-32 rounded-full border-neutral-400/10 px-2 py-1 text-sm`}
        >
          Copied
        </p>
      </div>
    </>
  )
}
