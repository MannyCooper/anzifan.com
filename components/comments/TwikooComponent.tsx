import { FC, useEffect, useRef, useState } from 'react'
import cloudbase from '@cloudbase/js-sdk';
import { useRouter } from 'next/router';

const TwikooComponent: FC = () => {
    const router = useRouter()
    const initTwikoo = () => {
        cloudbase
        const twikoo = require('twikoo/dist/twikoo.min')
        twikoo.init({
            envId: 'twikoo-7gjtx7whfd732c11',
            el: '#twikoo',
        })
    }

    const updateTwikoo = () => {
        const wrapper = document.getElementById('twrapper')
        const comment = document.getElementById('twikoo')
        if (wrapper && comment) {
            wrapper.removeChild(comment)
        }
        const newComment = document.createElement('div')
        newComment.id = 'twikoo'
        if (wrapper) {
            wrapper.appendChild(newComment)
        }
        initTwikoo()
    }

    useEffect(() => {
        initTwikoo()
        // 切换 post 页面时，更新 twikoo
        router.events.on('routeChangeComplete', updateTwikoo)
        return () => {
            router.events.off('routeChangeComplete', updateTwikoo)
        }
    })

    return <div id='twrapper'>
        <div id='twikoo'></div>
    </div> 
}

export default TwikooComponent