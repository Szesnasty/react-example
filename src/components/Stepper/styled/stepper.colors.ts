import type { Theme } from '@mui/material'

import type { StepStatus } from '../stepper.models'

export type StepIconStatusColors = {
  background: string
  /** Hover accent for a clickable step — a ring, drawn as a shadow so nothing shifts. */
  hoverRing: string
  foreground: string
}

/**
 * `upcoming` uses `text.secondary` rather than `text.disabled`: on `grey[200]` the latter
 * reaches roughly 2.6:1, well under the 4.5:1 that WCAG 1.4.3 asks for.
 */
export const stepIconStatusColors = (theme: Theme): Record<StepStatus, StepIconStatusColors> => ({
  completed: {
    background: theme.palette.primary.main,
    hoverRing: theme.palette.primary.main,
    foreground: theme.palette.primary.contrastText,
  },
  active: {
    background: theme.palette.primary.main,
    hoverRing: theme.palette.primary.main,
    foreground: theme.palette.primary.contrastText,
  },
  upcoming: {
    background: theme.palette.grey[200],
    hoverRing: theme.palette.grey[400],
    foreground: theme.palette.text.secondary,
  },
})

export const stepLabelStatusColors = (theme: Theme): Record<StepStatus, string> => ({
  completed: theme.palette.text.primary,
  active: theme.palette.primary.main,
  upcoming: theme.palette.text.secondary,
})

/** Progress is carried by the circles, so the lines stay one neutral colour throughout. */
export const stepLineColor = (theme: Theme) => theme.palette.grey[200]

/** The ring is detached from the circle by a gap painted in the surface colour. */
export const stepIconRingGapColor = (theme: Theme) => theme.palette.background.paper
