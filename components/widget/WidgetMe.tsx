import { FC } from "react"
import Image from "next/image"
import { links, LinkType } from "../../config/links"
import { me } from "../../config/me"
import Link from "next/link"

const portraitPlaceholder = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVQYlQE2Acn+ANV6g9Z8hdV6htZ9iNFseO7KzfDQ1NJyfdZ/iNV6gwCvACStAButABioAAjJU2X78vTANUeqABCsABWvACIAqAAArwAA1n+Gy1th0nZc1oF2z2hv3I+UuAosqAAAANF/APXis/////////Tt4sbCvf////////HaeNF+AADt5wD////j8+ZSunYAnDUAgw8ArWSZ0UXw3wDq4QAA0OQA//7/NpJWAH0uKng4U5tWAGUlAGwArNIAw90AADe4qv///7yOg9eAg7CSjtm3ss54e8F3cK7eowCbhAAAQq+6yOL89+rfx6OvoYynnH3p173+/PJipNsAObAAAABKFxpuR5R9AJUAn60+SaASAJsUZoWVAAtcAABLAG4fUXIHUQBAHwCjAIlPN3KCOQCKAEElNnEQUG0hUclYmR7EScPpAAAAAElFTkSuQmCC`

export const WidgetMeSmall: FC = () => {
    return (
        <div data-aos="fade-up">
            <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100" dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-col justify-between h-full bg-white shadow-sm p-3.5" dark="bg-true-gray-900"
                //  data-aos="fade-up"
                >
                    <Link href={"/me"} >
                        <a className="h-1/2 rounded-2xl overflow-hidden">
                            <div className="rounded-2xl h-full aspect-square overflow-hidden relative transform rotate-0">
                                <Image className="rounded-2xl overflow-hidden" layout="fill" objectFit="cover" src="/static/images/portrait.png" alt="Portrait" placeholder="blur"
                                    blurDataURL={portraitPlaceholder} />
                            </div>
                        </a>
                    </Link>
                    <div className="h-1/2 flex flex-col justify-between mt-3">
                        <p className="text-left xs:text-[16px] font-semibold line-clamp-1 tracking-tighter sm:tracking-normal text-[12px]">
                            <Link href={"/me"} >
                                <a>{me.name}</a>
                            </Link></p>
                        <div className="flex items-center justify-between w-full gap-1.5 ">
                            {links.map((link: LinkType) => (
                                link.id !== "optional" ?
                                    <a key={link.url} href={link.url} className={`w-full  h-full rounded-md flex items-center font-medium text-white justify-center bg-gradient-to-tr ${link.color} transform transition ease-in-out duration-200 hover:scale-95 aspect-square`}>
                                        <link.icon className="w-3 h-3 fill-white"></link.icon>
                                    </a> : null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WidgetMeMedium: FC<{ fix?: boolean }> = ({ fix }) => {

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-col justify-between h-full bg-white shadow-sm" dark="bg-true-gray-900"
                //  data-aos="fade-up"
                >
                    <Link href={"/me"} >
                        <a className={`flex flex-row items-center h-4/7 p-3 pb-2.5 ${fix ? "" : "lg:(px-4)"}`}>
                            <div className="rounded-full aspect-square h-full relative overflow-hidden transform rotate-0">
                                <Image className="rounded-full overflow-hidden" layout="fill" objectFit="cover" src="/static/images/portrait.png" alt="Portrait" placeholder="blur"
                                    blurDataURL={portraitPlaceholder} />
                            </div>
                            <div className={`flex flex-col justify-between p-3 ${fix ? "" : "lg:p-4"}`}>
                                <p className="text-2xl font-medium line-clamp-1">{me.name}</p>
                                <p className="text-xl line-clamp-1">{me.bio}</p>
                            </div>
                        </a>
                    </Link>
                    <div className="h-3/7 bg-true-gray-100" dark="bg-true-gray-800">
                        <div className={`flex items-center justify-between p-3 ${fix ? "" : "lg:(px-4)"} h-full gap-1 overflow-scroll scrollbar-hide`}>
                            {links.map((link: LinkType, index: number) => (
                                <a target="_blank" rel="noopener noreferrer" key={link.url} href={link.url} className={`rounded-lg lg:rounded-xl flex items-center font-medium text-white justify-center h-full bg-gradient-to-tr ${link.color} ${index === 0 ? "col-span-2 text-10px gap-0.7 px-2 lg:(text-sm gap-1)" : "aspect-square"} transform transition ease-in-out duration-200 hover:scale-95 `}>
                                    <link.icon className={`w-4 h-4 fill-white ${fix ? "" : "lg:(w-5 h-5)"}`}></link.icon>
                                    {index === 0 ? link.id : ""}
                                </a>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}