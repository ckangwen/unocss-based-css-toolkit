import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import {
  ElCollapseTransition,
  ElDivider,
  ElTooltip,
} from 'element-plus'
import Demo from '../components/Demo.vue'
import 'element-plus/dist/index.css'
import 'uno.css'

const themeConfig: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElCollapseTransition)
    app.use(ElDivider)
    app.use(ElTooltip)

    app.component('Demo', Demo)
  },
}

export default themeConfig
