import { Github, Dribbble, Props, Linkedin } from '@icons-pack/react-simple-icons'
import { FC } from 'react'
import Sspai from '../assets/sspai.svg'
import Zhihu from '../assets/zhihu.svg'

export type LinkType = {
    url: string,
    icon: FC<Props> | string,
    color: string,
    fill: string,
    border: string,
    text: string,
    shadow: string,
    id?: string,
    name?: string,
}


export const links : readonly [LinkType, LinkType, LinkType, LinkType, LinkType] = [
    {
        url: 'https://github.com/MannyCooper',
        icon: Github,
        color: 'from-bg-[#24292f] to-bg-[#040d21]',
        fill: "fill-[#181717]",
        border: "border-[#181717]",
        text:"text-[#181717]",
        shadow: "shadow-true-gray-400",
        id: "MannyCooper",
        name: "GitHub"
    },
    {
        url: 'https://sspai.com/u/mannycooper/updates',
        icon: Sspai,
        color: 'from-bg-[#d7161c] to-bg-[#fc281a]',
        fill: "fill-[#da282a]",
        border: "border-[#da282a]",
        shadow: "shadow-red-300",
        text:"text-[#da282a]",
        name: "少数派"
    },
    {
        // # banned
        url: 'https://www.zhihu.com/people/an-zi-fan-62',
        icon: Zhihu,
        color: 'from-true-gray-400 to-true-gray-300 dark:(from-true-gray-600 to-true-gray-500)',
        fill: "fill-[#0084FF]",
        border: "border-[#0084FF]",
        shadow: "shadow-blue-300",
        text:"text-[#0084FF]",
        id: "optional",
        name: "知乎"
    },
    {
        url: 'https://dribbble.com/anzifan',
        icon: Dribbble,
        fill: "fill-[#EA4C89]",
        border: "border-[#EA4C89]",
        shadow: "shadow-pink-300",
        text:"text-[#EA4C89]",
        color: 'from-bg-[#ea4c89] to-bg-[#ff589f]',
        name: 'Dribbble'
    },
    {
        url: 'http://linkedin.com/in/zifan-an/',
        icon: Linkedin,
        fill: "fill-[#0A66C2]",
        border: "border-[#0A66C2]",
        shadow: "shadow-blue-300",
        text:"text-[#0A66C2]",
        color: 'from-bg-[#0b66c2] to-bg-[#008bff]',
        name: 'LinkedIn'
    }
]