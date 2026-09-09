import { styled } from '@mui/material'
import { stepButtonClasses } from '@mui/material/StepButton'

import { CheckIcon } from '../../../assets/icons'
import type { StepStatus } from '../stepper.models'
import { reducedMotionTransitionReset } from './reducedMotion'
import { createShouldForwardProp } from './shouldForwardProp'
import { stepIconStatusColors } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

export const StyledStepIconRoot = styled('span', {
  shouldForwardProp: createShouldForwardProp('status'),
})<{ status: StepStatus }>(({ theme, status }) => {
  const statusColors = stepIconStatusColors(theme)[status]

  return {
    boxSizing: 'border-box',
    flexShrink: 0,
    width: stepperSizes.iconSize,
    height: stepperSizes.iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: statusColors.background,
    color: statusColors.foreground,
    fontSize: stepperSizes.checkIconSize,
    // Stated explicitly: this component never draws a ring or a border around a circle, so a
    // stray one always comes from somewhere else.
    border: 0,
    boxShadow: 'none',
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    ...reducedMotionTransitionReset,

    // Only the circle reacts to hover, and only on a step that is actually clickable — the button
    // in the selector limits it, and a disabled one has `pointer-events: none` anyway.
    [`.${stepButtonClasses.root} &:hover`]: {
      backgroundColor: statusColors.hoverBackground,
    },
  }
})

/** The circle sets `font-size`, so `1em` keeps the check proportional to it. */
export const StyledStepCheckIcon = styled(CheckIcon)({
  width: '1em',
  height: '1em',
})
