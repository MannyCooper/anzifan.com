import React, { useEffect, useState } from "react";
import { Wechat, Sinaweibo, Twitter } from '@icons-pack/react-simple-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InlineShareButtons } from 'sharethis-reactjs';
import { useRouter } from "next/router";
import { me } from "../config/me";

export const Share = () => {
  const share: any[] = []
  const [shares, setShares] = useState(share)
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const wechatShare = document.querySelector('#sharethis [data-network="wechat"]') as HTMLElement
    const weiboShare = document.querySelector('#sharethis [data-network="weibo"]') as HTMLElement
    const twitterShare = document.querySelector('#sharethis [data-network="twitter"]') as HTMLElement

    setShares([
      { name: 'wechat', icon: <Wechat size="20" />, color: 'hover:text-green-400', onClick: () => wechatShare.click() },
      { name: 'weibo', icon: <Sinaweibo size="20" />, color: 'hover:text-red-400', onClick: () => weiboShare.click() },
      { name: 'twitter', icon: <Twitter size="20" />, color: 'hover:text-blue-400', onClick: () => twitterShare.click() },
      {
        name: 'link', icon: <FontAwesomeIcon icon={faLink} />, color: 'hover:text-orange-400', onClick: () => {
          navigator.clipboard.writeText(me.site + router.asPath)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 2000);
        }
      },
    ])    
  }, [router.asPath])

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
            networks: [
              'twitter',
              'weibo',
              'wechat',
            ],
            padding: 7,
            radius: 9,
            show_total: false,
            size: 25,
          }}
        />
      </div>
      <div className="flex items-center space-x-5 text-true-gray-400 mt-4 relative">
        {shares.map(share => (
          <button key={share.name} className={`leading-0 ${share.color}`} onClick={share.onClick}>
            {share.icon}
          </button>
        ))}
          <p id="copiedNotify" className={`pointer-events-none transition-all duration-500 delay-100 ease-in-out ${copied ? "opacity-100" : "opacity-0"} text-sm rounded-full border-1 border-true-gray-400/10 px-2 py-1 absolute left-32`}>Copied</p>
      </div>
    </>
  )
}