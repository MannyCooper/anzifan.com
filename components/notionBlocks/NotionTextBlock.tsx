import { Colors } from '../../lib/colors';

export function NotionText({ text }: { text: any }) {
    if (!text) return null

    return text.map((value: any, index: number) => {
        const {
            annotations: { bold, code, color, italic, strikethrough, underline },
            text,
        } = value
        
        const className = [
            bold ? 'font-semibold' : '',
            code ? 'font-mono text-sm px-1 bg-light-600 rounded-md text-hex-5856d6 px-2 py-0.5' : '',
            italic ? 'italic' : '',
            strikethrough ? 'line-through' : '',
            underline ? 'underline' : '',
            Colors[color]?.text.light ?? '',
            color.endsWith('background') ? Colors[color.replace('_background','')]?.bg.light: ''
        ]

        return (
            <span key={index}            
                className={`${text.content.indexOf('\n') > -1 ? 'whitespace-pre-line' :'' } ${className.join('') !== '' ? className.join(' '):''}`}
            >
                {text.link ? (
                    <a className={`transition-all duration-200 ease-in-out bg-bottom bg-no-repeat bg-no-underline-size hover:bg-underline-size bg-underline  text-hex-ff2d55`} 
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