import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import matter from 'gray-matter'
import shiki from 'shiki'

const THEME_LIGHT = 'github-light'
const THEME_DARK = 'github-dark'

function codeToHtml(
  code: RichTextItemResponse,
  language: string,
  theme: string,
  highlighter: shiki.Highlighter
): string {
  const { plain_text: plainText, annotations } = code
  const { color } = annotations
  const tokens = highlighter.codeToThemedTokens(plainText, language, theme)
  const html = shiki.renderToHtml(tokens, {
    fg: highlighter.getForegroundColor(theme),
    elements: {
      pre: ({ children }) => {
        return `${children}`
      },
      code({ children }) {
        return `<code class="${color}" style="display:flex;flex-direction:column;">${children}</code>`
      },
      line({ children }) {
        return (
          children &&
          `<span style="display:block;padding: 0.15rem 2rem;">${children}</span>`
        )
      },
    },
  })
  return html
}

async function codesToHtml(
  codes: RichTextItemResponse[],
  language: string
): Promise<{ light: string; dark: string; customCode?: string }> {
  const firstCodeContent = codes[0].plain_text
  const matterFirst = matter(firstCodeContent)
  codes[0].plain_text = matterFirst.content
  const matterData = matterFirst.data
  const isCustom: boolean = matterData.custom
  if (isCustom) {
    return {
      light: '',
      dark: '',
      customCode: matterFirst.content,
    }
  }
  const lang = matterData.lang || language
  const name = matterData.name ?? ''
  const result = {
    light: '',
    dark: '',
    name: name,
  }
  const highlighter = await shiki.getHighlighter({
    themes: [THEME_LIGHT, THEME_DARK],
  })
  codes.forEach((code) => {
    const lightHTML = codeToHtml(code, lang, THEME_LIGHT, highlighter)
    const darkHTML = codeToHtml(code, lang, THEME_DARK, highlighter)
    result.light += lightHTML
    result.dark += darkHTML
  })
  result.light = `<pre class="font-mono grid w-full">${result.light}</pre>`
  result.dark = `<pre class="font-mono grid w-full">${result.dark}</pre>`
  return result
}

export default codesToHtml
