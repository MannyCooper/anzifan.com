// import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight as lightStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import { getHighlighter, setCDN } from 'shiki';

const NotionCode = ({ value }: { value: any }) => {

    // TODO:Replace Prism with shiki.js
    // setCDN("https://unpkg.com/shiki/");

    // const [innerHtml, setHtml] = useState("Loading...");
    // useEffect(() => {
    //     getHighlighter({
    //         theme: 'github-light'
    //     }).then((highlighter: any) => {
    //         const html: any = highlighter.codeToHtml(value.text.length > 0 && value.text[0].text.content, { lang: value.language })
    //         setHtml(html)
    //     })
    // })

    let syntax = value.language
    let code = value.text.length > 0 && value.text[0].text.content

    const renderRawHTMLTag = "<!--HTML-->"

    if (
        syntax === 'html' &&
        code
          .trimLeft()
          .startsWith(renderRawHTMLTag)
      ) {
        return (
            <div dangerouslySetInnerHTML={{__html: code.replace(renderRawHTMLTag,'')}} />          
        )
      }

    // for jsx
    if (syntax === 'javascript' &&
        code
            .trimStart()
            .startsWith('{jsx}')
    ) {
        syntax = 'jsx'
        code = code.split("\n").slice(1).join("\n")
    }

    return (
        <div className="relative my-4 rounded-2xl overflow-hidden">
            <span className="absolute top-0 right-0 pr-2 pt-1 font-mono text-sm font-semibold opacity-30 z-10">
                {syntax}
            </span>
            {/* <div dangerouslySetInnerHTML={{ __html: innerHtml }} /> */}
            <pre className="font-mono text-sm">
                <SyntaxHighlighter style={lightStyle} wrapLongLines language={syntax} customStyle={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25, margin: 0 }} >
                    {code}
                </SyntaxHighlighter>
            </pre>
        </div>
    )

}

export default NotionCode