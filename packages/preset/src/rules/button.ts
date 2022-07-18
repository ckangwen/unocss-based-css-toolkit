import type { Rule } from '@unocss/core'
import { BUTTON_BG_COLOR, BUTTON_BORDER_COLOR, BUTTON_TEXT_COLOR, getVar } from '../theme/var'
import { PRIMARY_COLOR } from '../theme/color'

const ButtonStyle = {
  'display': 'inline-block',
  'line-height': 1,
  'white-space': 'nowrap',
  'cursor': 'pointer',
  'background': getVar(BUTTON_BG_COLOR),
  'border': `1px solid ${getVar(BUTTON_BORDER_COLOR)}`,
  'color': getVar(BUTTON_TEXT_COLOR),
  '-webkit-appearance': 'none',
  'text-align': 'center',
  'box-sizing': 'border-box',
  'outline': 'none',
  'margin': 0,
  'transition': '0.1s',
  'font-weight': 500,
  'user-select': 'none',
  'padding': '12px 20px',
  'font-size': '14px',
  'border-radius': '4px',
}

const TextButtonStyle = {
  [BUTTON_TEXT_COLOR]: PRIMARY_COLOR,
  'border-color': 'transparent',
  'background': 'transparent',
  'padding-left': 0,
  'padding-right': 0,
}

export const button: Rule[] = [
  ['button', ButtonStyle],
  ['button--text', TextButtonStyle],
]
