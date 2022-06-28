import { Fragment } from "react"
import { NotionText } from "./notionBlocks/NotionTextBlock"
import NotionImage from "./notionBlocks/NotionImage";
import NotionVideo from "./notionBlocks/NotionVideo";
import NotionBookmark from "./notionBlocks/NotionBookmark";
import NotionCode from "./notionBlocks/NotionCode";
import NotionCallout from "./notionBlocks/NotionCallout";
import NotionQuote from "./notionBlocks/NotionQuote";
import { slugify } from 'transliteration'

export function renderNotionBlock(block: any) {
    const { type, id } = block
    const value = block[type]

    switch (type) {
        case 'paragraph':
            return (
                <p className="my-4 font-light leading-7">
                    <NotionText text={value.text} />
                </p>
            )

        case 'heading_1':
            return (
                <h1 id={slugify(value.text[0].text.content).replace(/[^A-Za-z0-9]/g, '-')} className="mt-12 mb-5 text-2xl font-bold leading-7 snap-mt-20">
                    <NotionText text={value.text} />
                </h1>
            )

        case 'heading_2':
            return (
                <h2 id={slugify(value.text[0].text.content).replace(/[^A-Za-z0-9]/g, '-')} className="mt-5 mb-4 text-xl font-bold leading-7 snap-mt-16">
                    <NotionText text={value.text} />
                </h2>
            )

        case 'heading_3':
            return (
                <h3 id={slugify(value.text[0].text.content).replace(/[^A-Za-z0-9]/g, '-')} className="mt-4 mb-3 text-lg font-bold leading-7 snap-mt-16">
                    <NotionText text={value.text} />
                </h3>
            )

        case 'bulleted_list_item':
            return (
                <ul className="ml-5 my-2 list-disc list-outside font-light">
                    <li>
                        <NotionText text={value.text} />
                        {value.children?.map((block: any) => (
                            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                        ))}
                    </li>
                </ul>
            )

        // TODO: Fix number order
        case 'numbered_list_item':
            return (
                <ol className="ml-5 my-1 list-decimal list-outside font-light">
                    <li>
                        <NotionText text={value.text} />
                        {value.children?.map((block: any) => (
                            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                        ))}
                    </li>
                </ol>
            )

        case 'to_do':
            return (
                <div className="font-light">
                    <label htmlFor={id}>
                        <input type="checkbox" id={id} defaultChecked={value.checked} />
                        <span> </span>
                        <NotionText text={value.text} />
                    </label>
                </div>
            )

        case 'toggle':
            return (
                <details className="bg-light-400 rounded-3xl pl-4 py-1" dark="bg-dark-400">
                    <summary>
                        <NotionText text={value.text} />
                    </summary>
                    <div className="ml-16px">
                        {value.children?.map((block: any) => (
                            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                        ))}
                    </div>
                </details>
            )

        case 'child_page':
            return <p className="my-2">{value.title}</p>

        case 'image':
            return <NotionImage value={value} />

        case 'video':
            return <NotionVideo value={value} />

        case 'divider':
            return (
                <div className="py-4 flex align-center">
                    <hr className="w-9/10 m-auto" dark="border-true-gray-600" />
                </div>
            )

        case 'quote':
            return (
                <NotionQuote value={value} />
            )

        case 'callout':
            return (
                <NotionCallout value={value}></NotionCallout>
            )

        case 'bookmark':
            return <NotionBookmark value={value} />

        case 'code':
            return (
                <NotionCode value={value} />
            )

        case 'column_list':
            if (block.blocks == null) return null
            return (
                <div
                    className={`grid my-2 gap-x-6`}
                    style={{ gridTemplateColumns: `repeat(${block.blocks.length}, minmax(0, 1fr))` }}
                >
                    {block.blocks.map((column: any, index: any) => {
                        const blocks = column.blocks ?? []
                        return (
                            <section key={index}>
                                {blocks.map((block: any) => (
                                    <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
                                ))}
                            </section>
                        )
                    })}
                </div>
            )

        // case 'column':
        //     console.log(block)
        //     return (
        //         <div></div>
        //     )

        case 'embed':
            return <iframe src={block.embed.url} className="w-full my-5 h-50" />
        // case 'equation':
        //   return <Latex>{`\\[${value.expression}\\]`}</Latex>

        default:
            return <p>`❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`</p>
    }
}