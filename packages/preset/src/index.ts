import type { Preset, PresetOptions } from '@unocss/core'
import { rules } from './rules'
import { PREFIX, root } from './theme/var'

interface UiPresetOptions extends PresetOptions {
  prefix?: string
}

export default function preset(options: UiPresetOptions = {}): Preset {
  options.prefix = options.prefix ?? PREFIX
  return {
    name: 'my-unocss-preset-ui',
    options,
    prefix: options.prefix,
    rules,
    preflights: [
      {
        getCSS() {
          return root
        },
        layer: 'unoRootVar',
      },
    ],
  }
}
