import Moment from "react-moment";
import { Post } from "../lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCreativeCommons, faCreativeCommonsBy, faCreativeCommonsNc } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Licensing = (post: { page: Post }) => {
    let hostname
    if (typeof window !== 'undefined') {
        hostname = window.location.hostname;
    }

    const ccLicense = <>
        <a className="mr-1" rel="noopener noreferrer" target="_blank" title="Creative Commons" href="https://creativecommons.org/">
            <FontAwesomeIcon icon={faCreativeCommons} />
        </a>
        <a className="mr-1" rel="noopener noreferrer" target="_blank" title="Attribution" href="https://creativecommons.org/licenses/by/4.0/">
            <FontAwesomeIcon icon={faCreativeCommonsBy} />
        </a>
        <a rel="noopener noreferrer" target="_blank" title="Noncommercial" href="https://creativecommons.org/licenses/by-nc/4.0/">
            <FontAwesomeIcon icon={faCreativeCommonsNc} />
        </a>
    </>

    const config: any = {
        '作者': '安子璠',
        '分布于': <Moment date={post.page.date} fromNow format="MMM DD, YYYY" local />,
        '更新于': <Moment date={post.page.updateDate} fromNow format="MMM DD, YYYY" local />,
        '许可协议': ccLicense,
    }

    return (
        <>
            <div className="relative z-10 w-full p-4 my-4 overflow-hidden bg-true-gray-100 rounded-3xl licensing">
                <FontAwesomeIcon className="overflow-hidden absolute -right-11 -top-6 text-11xl text-true-gray-200 z-0" icon={faCreativeCommons} />
                <header className="z-10 relative">
                    <p className="line-clamp-1 font-semibold">{post.page.title}</p>
                    <Link href={`/post/${post.page.slug}`} as={`/post/${post.page.slug}`}>
                        <a>
                        <p className="text-sm text-gray-400 line-clamp-1">{hostname}/post/{post.page.slug}</p>
                        </a>
                    </Link>
                </header>
                <nav className="flex flex-row mt-4 z-10 relative">
                    {
                        Object.keys(config).map(key =>
                            <div className="mr-4" key={key}>
                                <p className="text-xs line-clamp-1">{key}</p>
                                <p className="md:text-sm text-xs line-clamp-1 font-semibold">{config[key]}</p>
                            </div>
                        )
                    }
                </nav>
            </div>
        </>
    )
}

export default Licensing