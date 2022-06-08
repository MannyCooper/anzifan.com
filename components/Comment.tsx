import Head from "next/head"
import { Giscus } from '@giscus/react';
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Comment = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    // useEffect(() => {
    //     var twikoo = require('twikoo/dist/twikoo.min')
    //     twikoo.getRecentComments({
    //         envId: 'https://twikoo-vercel-rho.vercel.app',
    //         el: '#tcomment'
    //     }).then((res: any) => {
    //         console.log(res)
    //     })
    // })

    return (
        <>
            {/* <Head>
                <script defer src="https://cdn.jsdelivr.net/npm/twikoo@1.4.15/dist/twikoo.all.min.js"></script>
                <script defer>
                    {`twikoo.init({envId: 'twikoo-7gjtx7whfd732c11',el: '#tcomment',})`}
                </script>
            </Head> */}
            <div className="my-8 rounded-3xl">
                <div className="flex justify-between">
                    {/* <h1 className="text-xl mb-2 text-bold">评论</h1> */}
                    {/* <p>切换至 Giscus</p> */}
                </div>
                {/* TODO: Gradually switch to Giscus */}

                <Giscus
                    repo="MannyCooper/giscus-discussions"
                    repoId="R_kgDOGtIyjw"
                    category="Comments"
                    categoryId="DIC_kwDOGtIyj84CAxTy"
                    mapping="pathname"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    // TODO: Follow color scheme truly
                    theme="preferred_color_scheme"
                />
                {/* <div id="tcomment"></div> */}
            </div>
        </>
    )
}

export default Comment