/* eslint-disable @typescript-eslint/no-var-requires */
import CONFIG from '@/blog.config'
import { useEffect } from 'react'
import twikoo from 'twikoo'

const TwikooComponent = () => {
  const initTwikoo = () => {
    twikoo({
      envId: CONFIG.COMMENT_CONFIG?.TWIKOO?.ENVID,
      el: '#twikoo',
    })
  }
  useEffect(() => {
    initTwikoo()
  })
  return <div id="twikoo"></div>
}

export default TwikooComponent
