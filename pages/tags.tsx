import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import { BlogLayoutPure } from "../components/layout/BlogLayout";
import ListLayout from "../components/layout/ListLayout";
import { Colors } from "../lib/colors";
import { getDatabase } from "../lib/notion";
import { Tag } from "../lib/types";
import { NextPageWithLayout } from "./_app";


const TagCard = ({ name, color, count }: { name: string, color: string, count: number }) => {
    return (
        <Link href="/tag/[name]" as={`/tag/${name}`} key={name}>
            <a>
                <div className={`${Colors[color]?.bg.msg ?? Colors['gray'].bg.msg} bg-gradient-to-bl from-white/30 text-white flex items-center font-semibold py-3 px-5  rounded-full justify-between transform transition ease-in-out duration-200 hover:scale-95`} dark="bg-gradient-to-tr from-black/30">
                    <p className="line-clamp-1"># {name}</p>
                    <p className={`bg-white ${Colors[color]?.text.normal ?? Colors['gray'].text.normal} text-sm px-1.5 text-center rounded-full`} >{count}</p>
                </div>
            </a>
        </Link>
    )
}

const Tags: NextPage<{ tags: [Tag] }> = ({ tags }) => {

    const initialValue = 0;
    const sumWithInitial = tags.reduce(
        (previousValue, currentValue) => previousValue + currentValue.count,
        initialValue
    );
    // console.log(sumWithInitial)

    return (
        <ListLayout>
            {/* <div className="bg-white rounded-4xl px-10 py-8 my-10 "> */}
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">Tags✨</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pb-4 lg:pb-8 md:grid-cols-3 lg:grid-cols-4">
                {
                    tags.map((tag: Tag) => TagCard({ name: tag.name, color: tag.color, count: tag.count }))
                }
            </div>
            {/* </div> */}
        </ListLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const db = await getDatabase();
    const tags = db.map(p => p.tags).flat();
    const tagsMap = new Map(tags.map(o => [o.name, { ...o, count: 0 }]));
    for (const { name } of tags) {
        tagsMap.get(name)!.count++
    };
    const tagsCount = Array.from(tagsMap.values());
    const tagsSorted = tagsCount.sort((a, b) => b.count - a.count);

    return {
        props: {
            tags: tagsSorted,
        },
        revalidate: 60 * 60,
    }
}

(Tags as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
    return (
        <BlogLayoutPure>
            {page}
        </BlogLayoutPure>
    )
}


export default Tags