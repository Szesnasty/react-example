import { styled } from '@mui/material'
import { stepButtonClasses } from '@mui/material/StepButton'

import { CheckIcon } from '../../../assets/icons'
import type { StepStatus } from '../stepper.models'
import { reducedMotionTransitionReset } from './reducedMotion'
import { createShouldForwardProp } from './shouldForwardProp'
import { stepIconRingGapColor, stepIconStatusColors } from './stepper.colors'
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
    // Stated explicitly so nothing in the host app can leave a ring on a resting circle —
    // the only ring this component draws is the hover one below.
    border: 0,
    boxShadow: 'none',
    transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    ...reducedMotionTransitionReset,

    // Only the circle reacts to hover: the label and the space around it stay untouched.
    // A disabled step has `pointer-events: none`, so an upcoming circle never lights up.
    [`.${stepButtonClasses.root}:hover &`]: {
      boxShadow: [
        `0 0 0 ${stepperSizes.hoverRingGap} ${stepIconRingGapColor(theme)}`,
        `0 0 0 ${stepperSizes.hoverRingOuter} ${statusColors.hoverRing}`,
      ].join(', '),
    },
  }
})

/** The circle sets `font-size`, so `1em` keeps the check proportional to it. */
export const StyledStepCheckIcon = styled(CheckIcon)({
  width: '1em',
  height: '1em',
})
