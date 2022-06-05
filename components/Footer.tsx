import Image from "next/image";
import Link from 'next/link';
// import ThemeToggle from "../../utils/ThemeToggle";
import { Nextdotjs, Notion, Tailwindcss, Vercel } from '@icons-pack/react-simple-icons'


const Footer = () => {
    const thisYear = new Date().getFullYear();
    return (
        <>
            <footer className="relative bg-true-gray-50 mt-12">
                <div className="flex flex-col px-6 mx-auto items-left lg:px-11 lg:w-screen-lg">
                    <nav className="py-4">
                        <Link href='/'>
                            <a>
                                <Image className="" src="/static/images/favicon.png" alt="logo" width="20px" height="20px" />
                            </a>
                        </Link>
                    </nav>
                    <section className="pt-2 pb-5 text-true-gray-400">
                        <div className="flex justify-between w-full pb-2 my-2 text-xs border-b border-footer">
                            <div className="flex items-center">Powered by
                                <div className="inline-flex px-2 py-1 mx-2 space-x-2 bg-true-gray-200 rounded-full">
                                    <Notion size={12} />
                                    <Nextdotjs size={12} />
                                    <Tailwindcss size={12} />
                                    <Vercel size={12} />
                                </div>
                            </div>
                            <p className="line-through">dark toggle</p>
                            {/* <ThemeToggle /> */}
                        </div>
                        <div className="text-xs text-grey">
                            Copyright © 2020-{thisYear} 安子璠
                        </div>
                    </section>
                </div>
            </footer>
        </>
    )
}

export default Footer