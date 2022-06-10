import Image from "next/image";
import Link from 'next/link';
// import ThemeToggle from "../../utils/ThemeToggle";
import { Nextdotjs, Notion, Windicss, Vercel, Icon } from '@icons-pack/react-simple-icons'
import ThemeSwitch from "./ThemeSwitch";


const Footer = () => {
    const thisYear = new Date().getFullYear();
    const tools = [{
        icon: Notion,
        url: "https://developers.notion.com"
    }, {
        icon: Nextdotjs,
        url: "https://nextjs.org"
    }, {
        icon: Windicss,
        url: "https://windicss.org"
    }, {
        icon: Vercel,
        url: "https://vercel.com"
    }

    ]
    return (
        <>
            <footer className="relative bg-true-gray-100" dark="bg-true-gray-800">
                <div className="flex flex-col px-6 mx-auto items-left lg:px-11 lg:w-screen-lg">
                    <nav className="py-4 flex justify-between items-center">
                        <Link href='/'>
                            <a>
                                <Image className="" src="/static/images/favicon.png" alt="logo" width="20px" height="20px" />
                            </a>
                        </Link>
                        <ThemeSwitch />
                    </nav>
                    <section className="pt-2 pb-5 text-true-gray-400" dark="text-true-gray-500">
                        <div className="flex justify-between w-full pb-2 my-2 text-xs border-b border-footer items-end" dark="border-true-gray-700">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">Powered by
                                    <div className="inline-flex px-2 py-1 mx-2 space-x-2 bg-true-gray-200 rounded-full place-items-center" dark="bg-true-gray-700">
                                        {tools.map(tool =>
                                            <a key={tool.url} className="leading-0  hover:text-true-gray-600" dark="hover:text-white" href={tool.url} target="_blank" rel="noopener noreferrer">
                                                <tool.icon size={12} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="group">Design & Build with <span className="group-hover:text-red-400 transition-colors duration-500 ease-in-out">❤</span> by <a className="text-true-gray-600 hover:underline" href="https://github.com/MannyCooper/anzifan.com" target="_blank" rel="noopener noreferrer" dark="text-true-gray-400">MannyCooper</a></p>
                            </div>
                            <p className="flex flex-col items-end">
                                <a className="hover:underline" href="https://anzifan-old.vercel.app" target="_blank" rel="noopener noreferrer">Old Blog</a>
                            </p>
                        </div>
                        <div className="text-xs flex justify-between">
                            <div>
                                <span>
                                    {`Copyright © 2020-${thisYear} `}
                                    <Link href={"/me"}>
                                        <a className="text-true-gray-600 hover:underline" dark="text-true-gray-400">
                                            安子璠
                                        </a>
                                    </Link>
                                </span>                                
                            </div>
                            <span><a className="text-true-gray-600 hover:underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" dark="text-true-gray-400">CC BY-NC-SA 4.0</a></span>
                        </div>
                        <p className="space-x-1 md:space-x-2 text-[10px] mt-2 text-true-gray-300">
                                    <span><a className="hover:underline hover:text-true-gray-400" dark="text-true-gray-700 hover:text-true-gray-400" href="http://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">苏ICP备 2020060340 号</a></span>
                                    <span><a className="hover:underline hover:text-true-gray-400" dark="text-true-gray-700 hover:text-true-gray-400" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011202000528" rel="noopener noreferrer" target="_blank">苏公网安备 32011202000528 号</a></span>
                                </p>
                    </section>
                </div>
            </footer>
        </>
    )
}

export default Footer