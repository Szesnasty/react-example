import { styled } from '@mui/material'
import { stepButtonClasses } from '@mui/material/StepButton'

import { CheckIcon } from '../../../assets/icons'
import { reducedMotionTransitionReset } from './reducedMotion'
import { stepIconStatusColors } from './stepper.colors'
import type { StepIconStatusColors } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

/** Only the circle reacts to hover, and only inside a button — a step that is not clickable has none. */
const statusRule = ({ background, foreground, hoverBackground }: StepIconStatusColors) => ({
  backgroundColor: background,
  color: foreground,
  [`.${stepButtonClasses.root} &:hover`]: { backgroundColor: hoverBackground },
})

export const StyledStepIconRoot = styled('span')(({ theme }) => {
  const statusColors = stepIconStatusColors(theme)

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
    // Stated explicitly: this component never draws a ring or a border around a circle, so a
    // stray one always comes from somewhere else.
    border: 0,
    boxShadow: 'none',
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    ...reducedMotionTransitionReset,

    // The status is already on the element for tests and for styling from outside, so the circle
    // reads its colours from there instead of taking a prop that then has to be kept off the DOM.
    '&[data-status="completed"]': statusRule(statusColors.completed),
    '&[data-status="active"]': statusRule(statusColors.active),
    '&[data-status="upcoming"]': statusRule(statusColors.upcoming),
  }
})

/** The circle sets `font-size`, so `1em` keeps the check proportional to it. */
export const StyledStepCheckIcon = styled(CheckIcon)({
  width: '1em',
  height: '1em',
})
