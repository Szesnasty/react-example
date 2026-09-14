import type { Theme } from '@mui/material'

import type { StepStatus } from '../stepper.models'

export type StepIconStatusColors = {
  background: string
  hoverBackground: string
  foreground: string
}

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

export const stepLabelColor = (theme: Theme) => theme.palette.grey[500]

export const activeStepLabelColor = (theme: Theme) => theme.palette.primary.main

export const stepLineColor = (theme: Theme) => theme.palette.grey[200]
