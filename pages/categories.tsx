import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import ListLayout from "../components/layout/ListLayout";
import { Colors } from "../lib/colors";
import { getDatabase } from "../lib/notion";
import { Tag } from "../lib/types";


const CateCard = ({ name, color, count }: { name: string, color: string, count: number }) => {
    return (
        <Link href="/category/[name]" as={`/category/${name}`} key={name} >
            <a className="select-none transform transition ease-in-out duration-200 hover:scale-95">
                {/* <div className={`${Colors[color]?.bg.msgLight ?? Colors['gray'].bg.msgLight} text-white flex items-center text-2xl font-semibold py-10 px-5  rounded-3xl justify-between  transform transition ease-in-out duration-200 hover:scale-95`}>
                    <p>{name}</p>
                    <p className={`bg-white ${Colors[color]?.text.light ?? Colors['gray'].text.light} text-lg px-2 h-full text-center rounded-full`}>{count}</p>
                </div> */}
                <div className={`aspect-square ${Colors[color]?.bg.msgLight ?? Colors['gray'].bg.msgLight} rounded-xl p-3 md:p-4 text-white relative z-0 font-semibold`} before="content-0 text-transparent absolute h-full w-full top-0 left-0 z-10 bg-gradient-to-l from-white opacity-40">
                    <div className="flex flex-row items-center justify-between text-normal md:text-lg lg:text-xl">
                        <p>{name}</p>
                        <p className={`bg-white ${Colors[color]?.text.light ?? Colors['gray'].text.light} px-2 text-center rounded-full`}>{count}</p>
                    </div>
                    <p className={`p-3 md:p-4 text-6xl md:text-7xl lg:text-8xl font-semibold absolute left-0 bottom-0 ${Colors[color]?.bg.dark ?? Colors['gray'].bg.dark} bg-clip-text text-transparent opacity-20 bg-gradient-to-l from-white/20 w-full whitespace-nowrap`}>{name}</p>
                </div>
            </a>
        </Link>
    )
}

const Cates: NextPage<{ cates: [Tag] }> = ({ cates }) => {

    const initialValue = 0;
    const sumWithInitial = cates.reduce(
        (previousValue, currentValue) => previousValue + currentValue.count,
        initialValue
    );

    return (
        <ListLayout>
            {/* <div className="bg-white rounded-3xl p-4 xs:(px-10 py-8)"> */}
                <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">Category🪐</h1>
                <div className="grid grid-cols-2 gap-3 xs:gap-5 md:gap-6 pb-4 lg:pb-8 md:grid-cols-3 lg:grid-cols-4">
                    {
                        cates.map((cate: Tag) => CateCard
                            ({ name: cate.name, color: cate.color, count: cate.count }))
                    }
                </div>
            {/* </div> */}
        </ListLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const db = await getDatabase();
    const cates = db.map(p => p.category).flat();

    const catesMap = new Map(cates.map(o => [o.name, { ...o, count: 0 }]));
    for (const { name } of cates) {
        catesMap.get(name)!.count++
    };
    const catesCount = Array.from(catesMap.values());
    const catesSorted = catesCount.sort((a, b) => b.count - a.count);

    return {
        props: {
            cates: catesSorted,
        },
        revalidate: 10,
    }
}

export default Cates