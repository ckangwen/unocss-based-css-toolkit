import { getHighlighter, setCDN } from 'shiki'

export async function highlight(theme = 'material-palenight') {
  const themes = [theme]
  setCDN('/assets/')
  const highlighter = await getHighlighter({ themes })
  const preRE = /^<pre.*?>/

  return (str: string, lang: string) => {
    lang = lang || 'text'

    return highlighter
      .codeToHtml(str, { lang, theme })
      .replace(preRE, '<pre v-pre>')
  }
}
