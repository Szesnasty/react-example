import type { Theme } from '@mui/material'

import type { StepStatus } from '../stepper.models'

export type StepIconStatusColors = {
  background: string
  /** Hover accent for a clickable step — a deeper shade of the circle, nothing more. */
  hoverBackground: string
  foreground: string
}

/**
 * `upcoming` uses `text.secondary` rather than `text.disabled`: on `grey[200]` the latter
 * reaches roughly 2.6:1, well under the 4.5:1 that WCAG 1.4.3 asks for.
 */
export const stepIconStatusColors = (theme: Theme): Record<StepStatus, StepIconStatusColors> => ({
  completed: {
    background: theme.palette.primary.main,
    hoverBackground: theme.palette.primary.dark,
    foreground: theme.palette.primary.contrastText,
  },
  active: {
    background: theme.palette.primary.main,
    hoverBackground: theme.palette.primary.dark,
    foreground: theme.palette.primary.contrastText,
  },
  upcoming: {
    background: theme.palette.grey[200],
    hoverBackground: theme.palette.grey[300],
    foreground: theme.palette.text.secondary,
  },
})

/** The colour every label starts from, whatever the step's status or the orientation. */
export const stepLabelColor = (theme: Theme) => theme.palette.grey[500]

/** The one exception: standing up, the current step's title is picked out in the main colour. */
export const activeStepLabelColor = (theme: Theme) => theme.palette.primary.main

/** Progress is carried by the circles, so the lines stay one neutral colour throughout. */
export const stepLineColor = (theme: Theme) => theme.palette.grey[200]
