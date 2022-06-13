import { FC, useEffect, useRef, useState } from 'react'
import cloudbase from '@cloudbase/js-sdk';

const TwikooComponent: FC = () => {
    const twikooInstanceRef = useRef<any>(null)
    const containerRef = useRef<any>()
 
    useEffect(() => {
        // 基于腾讯云的 Twikoo 必须引入
        cloudbase
        const twikoo = require('twikoo/dist/twikoo.min')
        twikooInstanceRef.current = twikoo.init({
            envId: 'twikoo-7gjtx7whfd732c11',
            el: containerRef.current,
        })        
    }, [])

    return <div ref={containerRef} />
}

export default TwikooComponent