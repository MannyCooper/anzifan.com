import Link from 'next/link'
import { Post } from '../lib/types'
import Image from "next/image";
import ThemedImage from './ThemedImage';
// import { useState } from "react";

export interface PaginationType {
    prev: Post | null
    next: Post | null
}

const Pagination = ({ pagination }: { pagination: PaginationType }) => {
    // const [ready, setReady] = useState(false);

    // const handleLoad = (event: any) => {
    //     event.persist();
    //     if (event.target.srcset) {
    //         setReady(true);
    //     }
    // };

    const paginationCard = (pagination: any, indicator: string) => {
        return (
            pagination && (
                <Link href={`/post/${pagination.slug}`}>
                    <a className={`relative z-0 w-full overflow-hidden transition duration-500 h-30 md:h-35 bg-true-gray-200 filter hover:brightness-90 transition duration-300 ease-in-out group hover:shadow-lg `} dark="bg-true-gray-700">
                        <div className="relative w-full h-full"
                        // style={{
                        //     opacity: ready ? 1 : 0,
                        //     transition: "opacity 1.1s cubic-bezier(0.4, 0, 0.25, 1) 0ms, background 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms",
                        // }}
                        ><ThemedImage className="transition-all duration-500 ease-in-out transform group-hover:scale-105" post={pagination} quality={80}/></div>
                        <div className={`absolute bottom-0 w-full p-4 overflow-hidden text-xl text-white bg-gradient-to-t from-black/30 to-transparent ${indicator == 'Next' ? 'text-right sm:rounded-br-3xl' : 'sm:rounded-bl-3xl'}`}>
                            <p className="font-bold">{indicator}</p>
                            {/* TODO: Switch to `height` method for smooth transition */}
                            <p className="truncate group-hover:whitespace-normal">
                                {pagination?.title}
                            </p>
                        </div>
                    </a>
                </Link>
            )
        )
    }

    return (
        <div className="my-4 flex flex-col sm:(flex-row ) rounded-3xl overflow-hidden relative z-10 border-1 border-true-gray-400/10">
            {paginationCard(pagination.prev, 'Prev')}
            {paginationCard(pagination.next, 'Next')}
        </div>
    )
}

export default Pagination