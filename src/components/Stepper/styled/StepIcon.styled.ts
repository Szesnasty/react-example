import { styled } from '@mui/material'
import { stepButtonClasses } from '@mui/material/StepButton'

import { CheckIcon } from '../../../assets/icons'
import type { StepperOrientation, StepStatus } from '../stepper.models'
import { reducedMotionTransitionReset } from './reducedMotion'
import { createShouldForwardProp } from './shouldForwardProp'
import { stepIconRingGapColor, stepIconStatusColors } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

type StepIconStyleProps = { status: StepStatus; orientation: StepperOrientation }

export const StyledStepIconRoot = styled('span', {
  shouldForwardProp: createShouldForwardProp('status', 'orientation'),
})<StepIconStyleProps>(({ theme, status, orientation }) => {
  const statusColors = stepIconStatusColors(theme)[status]
  const sizes = stepperSizes(theme)
  const orientationSizes = sizes[orientation]

  return {
    boxSizing: 'border-box',
    flexShrink: 0,
    width: orientationSizes.iconSize,
    height: orientationSizes.iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: statusColors.background,
    color: statusColors.foreground,
    fontSize: orientationSizes.checkIconSize,
    transition: theme.transitions.create(['background-color', 'color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    ...reducedMotionTransitionReset,

    // Only the circle reacts to hover: the label and the space around it stay untouched.
    // A disabled step has `pointer-events: none`, so an upcoming circle never lights up.
    [`.${stepButtonClasses.root}:hover &`]: {
      boxShadow: [
        `0 0 0 ${sizes.hoverRingGap} ${stepIconRingGapColor(theme)}`,
        `0 0 0 ${sizes.hoverRingOuter} ${statusColors.hoverRing}`,
      ].join(', '),
    },
  }
})

/** The circle sets `font-size`, so `1em` keeps the check proportional to it in both orientations. */
export const StyledStepCheckIcon = styled(CheckIcon)({
  width: '1em',
  height: '1em',
})
