import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import type { Viewport } from 'storybook/viewport'

/**
 * Viewporty odpowiadające breakpointom MUI (theme.breakpoints.values),
 * dzięki czemu podgląd w Storybooku pokrywa się z tym, co robi `sx`.
 */
export const muiViewports: Record<string, Viewport> = {
  muiXs: {
    name: 'MUI xs (0–599)',
    styles: { width: '400px', height: '780px' },
    type: 'mobile',
  },
  muiSm: {
    name: 'MUI sm (600–899)',
    styles: { width: '600px', height: '900px' },
    type: 'tablet',
  },
  muiMd: {
    name: 'MUI md (900–1199)',
    styles: { width: '900px', height: '1000px' },
    type: 'tablet',
  },
  muiLg: {
    name: 'MUI lg (1200–1535)',
    styles: { width: '1200px', height: '900px' },
    type: 'desktop',
  },
  muiXl: {
    name: 'MUI xl (1536+)',
    styles: { width: '1536px', height: '960px' },
    type: 'desktop',
  },
}

export const viewports: Record<string, Viewport> = {
  ...muiViewports,
  ...INITIAL_VIEWPORTS,
}
