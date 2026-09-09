import { styled } from '@mui/material'
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'

import { reducedMotionTransitionReset } from './reducedMotion'
import { stepLineColor } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

/**
 * Horizontal only. A vertical connector is a fixed-height flex item and cannot stretch from one
 * circle to the next, so the vertical line is drawn on the step itself instead.
 */
export const StyledStepConnector = styled(MuiStepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: `calc((${stepperSizes.iconSize} - ${stepperSizes.connectorThickness}) / 2)`,
    left: `calc(-50% + ${stepperSizes.lineInset})`,
    right: `calc(50% + ${stepperSizes.lineInset})`,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: stepLineColor(theme),
    borderTopWidth: stepperSizes.connectorThickness,
    borderRadius: stepperSizes.connectorThickness,
    transition: theme.transitions.create('border-color', {
      duration: theme.transitions.duration.short,
    }),
    ...reducedMotionTransitionReset,
  },
}))
