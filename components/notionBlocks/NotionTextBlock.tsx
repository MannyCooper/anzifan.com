import { Colors } from '../../lib/colors';

export function NotionText({ text, inheritColor }: { text: any, inheritColor?: boolean }) {
    if (!text) return null

    return text.map((value: any, index: number) => {
        const {
            annotations: { bold, code, color, italic, strikethrough, underline },
            text,
        } = value

        const className = [
            bold ? 'font-semibold' : '',
            code ? `font-mono text-sm px-1 bg-light-600 rounded-md px-2 py-0.5 ${Colors["purple"]?.text.normal} dark:bg-dark-600` : '',
            italic ? 'italic' : '',
            strikethrough ? 'line-through' : '',
            underline ? 'underline' : '',
            Colors[color]?.text.normal ?? '',
            color.endsWith('background') ? Colors[color.replace('_background', '')]?.bg.normal : ''
        ]

        return (
            <span key={index}
                className={`${text.content.indexOf('\n') > -1 ? 'whitespace-pre-line' : ''} ${className.join('') !== '' ? className.join(' ') : ''}`}
            >
                {text.link ? (
                    <a className={`transition-all duration-200 ease-in-out bg-bottom bg-no-repeat bg-no-underline-size hover:bg-underline-size  bg-underline ${inheritColor ? "inherit font-semibold" : text.content.startsWith('@') ? Colors["blue"]?.text.normal : Colors["orange"]?.text.normal}`}
                        after="content-↗"
                        href={text.link.url} target="_blank" rel="noopener noreferrer">
                        {text.content}
                    </a>
                ) : (
                    text.content
                )}
            </span>
        )
    })
}