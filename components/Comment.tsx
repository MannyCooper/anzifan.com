import Head from "next/head"
import { Giscus } from '@giscus/react';
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Tab } from '@headlessui/react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const GiscusComponent = dynamic(
    () => {
        return import('../components/comments/GiscusComponent')
    },
    { ssr: false }
)

const TwikooComponent = dynamic(
    () => {
        return import('../components/comments/TwikooComponent')
    },
    { ssr: false }
)

const Comment = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const comments = [        
        {
            name: 'Twikoo (国内访问，无需登录)',
            component: <TwikooComponent />
        },
        {
            name: 'Giscus',
            component: <GiscusComponent theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
        },
    ]

    return (
        <div className="pb-4 md:pb-8">
            <h1 className="my-4 text-2xl font-bold md:text-3xl lg:my-8 text-center">
                Comments
            </h1>
            <div className="mb-8 rounded-3xl">
                <Tab.Group>
                    <Tab.List className="flex rounded-xl bg-true-gray-100 p-1 flex-col md:flex-row" dark="bg-true-gray-800">
                        {
                            comments.map(comment => (
                                <Tab
                                    key={comment.name}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full rounded-lg py-2.5 text-xs xs:text-sm font-medium leading-5 line-clamp-1',
                                            selected
                                                ? 'bg-white dark:(bg-true-gray-900 text-true-gray-200) shadow text-true-gray-700'
                                                : 'text-true-gray-400 hover:bg-white/[0.12] hover:text-true-gray-500'
                                        )
                                    }>{comment.name}</Tab>
                            ))
                        }
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {
                            comments.map(comment => (
                                <Tab.Panel
                                    key={comment.name + "_component"}
                                    className="my-8"
                                >
                                    {comment.component}
                                </Tab.Panel>
                            ))
                        }
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default Comment