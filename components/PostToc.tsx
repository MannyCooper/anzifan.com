import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { slugify } from "transliteration"
import { Post } from "../lib/types"

type PostTocProps = {
    blocks: any
}

type HeadingType = {
    id: string
    type: 'heading_1' | 'heading_2' | 'heading_3'
    content: string
}

const PostToc: FC<PostTocProps> = ({ blocks }) => {

    const flatHeadings: [HeadingType] = blocks
        .filter((block: any) => block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3')
        .map((block: any) => {
            return {
                id: block.id,
                type: block.type,
                content: block[block.type].text[0].text.content,
            }
        })

    const marginMap = {
        "heading_1": "",
        "heading_2": "ml-4 md:ml-8",
        "heading_3": "ml-8 md:ml-16",
    }
   
    if (flatHeadings.length < 1) {
        return null
    }

    return (
        <div className="h-full w-full text-left p-6 whitespace-normal">
            <h3 className="text-true-gray-400 text-xs mb-3">目录</h3>
            <nav>
                {flatHeadings.map((heading: HeadingType) => {
                    return (
                        <a key={heading.id} href={`#${slugify(heading.content).replace(/[^A-Za-z0-9]/g, '-')}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(`#${slugify(heading.content).replace(/[^A-Za-z0-9]/g, '-')}`)!.scrollIntoView({
                                    behavior: "smooth"
                                });
                            }}
                        >
                            <p className={`${marginMap[heading.type]}`}>{heading.content}</p>
                        </a>
                    )
                })
                }
            </nav>
        </div>
    )
}

export default PostToc