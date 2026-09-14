import { styled } from '@mui/material'
import { stepButtonClasses } from '@mui/material/StepButton'

import { CheckIcon } from '../../../assets/icons'
import { reducedMotionTransitionReset } from './reducedMotion'
import { stepIconStatusColors } from './stepper.colors'
import type { StepIconStatusColors } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

const paintCircle = ({ background, foreground, hoverBackground }: StepIconStatusColors) => ({
  backgroundColor: background,
  color: foreground,
  [`.${stepButtonClasses.root} &:hover`]: { backgroundColor: hoverBackground },
})

export const StyledStepIconRoot = styled('span')(({ theme }) => {
  const colorsByStatus = stepIconStatusColors(theme)

  return {
    boxSizing: 'border-box',
    flexShrink: 0,
    width: stepperSizes.iconSize,
    height: stepperSizes.iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: stepperSizes.checkIconSize,
    border: 0,
    boxShadow: 'none',
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    ...reducedMotionTransitionReset,

    '&[data-status="completed"]': paintCircle(colorsByStatus.completed),
    '&[data-status="active"]': paintCircle(colorsByStatus.active),
    '&[data-status="upcoming"]': paintCircle(colorsByStatus.upcoming),
  }
})

export const StyledStepCheckIcon = styled(CheckIcon)({
  width: '1em',
  height: '1em',
})
