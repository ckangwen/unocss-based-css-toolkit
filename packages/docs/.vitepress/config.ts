import { defineConfig } from 'vitepress'
import Unocss from '@unocss/vite'
import MyUnoUi from 'my-unocss-preset-ui'
import sidebar from './config/sidebar'
import { mdPlugin } from './config/plugin'

export default defineConfig({
  title: 'unocss css framework',
  // base: '/document/',
  description: '基于UNOCSS的轻量级CSS框架',
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/86038711?s=400&u=a12f78c5f64e3986cc9b33fe17fc4fb68d8955ef&v=4',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/charrue' },
    ],
    sidebar,
  },
  markdown: {
    config: md => mdPlugin(md),
  },
  vite: {
    plugins: [
      Unocss({
        presets: [
          MyUnoUi(),
        ],
      }),
    ],
  },
})
