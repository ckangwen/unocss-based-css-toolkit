import {
  FILL_COLOR_BLANK,
  FILL_COLOR_DARKER,
  PRIMARY_COLOR,
} from './color'

export const PREFIX = 'my-'

export const getVar = (name: string, defaultValue?: string) => {
  return `var(${name}${defaultValue ? '' : `,${defaultValue}`})`
}

export const BUTTON_BORDER_COLOR = `--${PREFIX}button-border-color`
export const BUTTON_BG_COLOR = `--${PREFIX}button-bg-color`
export const BUTTON_TEXT_COLOR = `--${PREFIX}button-text-color`

export const root = `
:root {
  ${BUTTON_BORDER_COLOR}: ${FILL_COLOR_DARKER};
  ${BUTTON_BG_COLOR}: ${PRIMARY_COLOR};
  ${BUTTON_TEXT_COLOR}: ${FILL_COLOR_BLANK};
}
`
