import { styled } from '@mui/material'
import type { Theme } from '@mui/material'
import MuiStep, { stepClasses } from '@mui/material/Step'
import { stepButtonClasses } from '@mui/material/StepButton'
import MuiStepper, { stepperClasses } from '@mui/material/Stepper'

import { stepLineColor } from './stepper.colors'
import { STEP_SIZE_VAR, stepperSizes } from './stepper.sizes'

export const StyledStepper = styled(MuiStepper)(({ theme }) => ({
  padding: `${stepperSizes.rootPaddingBlock} 0`,

  [`&.${stepperClasses.horizontal}`]: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: `minmax(0, var(${STEP_SIZE_VAR}, 1fr))`,
  },

  [`&.${stepperClasses.vertical}`]: {
    boxSizing: 'border-box',
    height: '100%',
  },

  [`& .${stepButtonClasses.root}`]: {
    font: 'inherit',
    borderRadius: theme.shape.borderRadius,
    padding: `${stepperSizes.buttonPaddingBlock} ${stepperSizes.buttonPaddingInline}`,
    margin: `-${stepperSizes.buttonPaddingBlock} -${stepperSizes.buttonPaddingInline}`,
    width: 'auto',
    '&:hover': { backgroundColor: 'transparent' },
    '&.Mui-disabled': {
      cursor: 'default',
    },
    '&.Mui-focusVisible': {
      outline: `${stepperSizes.focusOutlineWidth} solid ${theme.palette.primary.main}`,
      outlineOffset: stepperSizes.focusOutlineOffset,
    },
  },
}))

const lineHalf = {
  content: '""',
  position: 'absolute' as const,
}

const horizontalLineHalf = (theme: Theme) => ({
  ...lineHalf,
  top: `calc((${stepperSizes.iconSize} - ${stepperSizes.connectorThickness}) / 2)`,
  borderTop: `${stepperSizes.connectorThickness} solid ${stepLineColor(theme)}`,
})

export const StyledStep = styled(MuiStep)(({ theme }) => ({
  [`&.${stepClasses.horizontal}`]: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: `0 ${stepperSizes.horizontalStepPaddingInline}`,
    textAlign: 'center',

    '&:not(:last-of-type)::after': {
      ...horizontalLineHalf(theme),
      left: `calc(50% + ${stepperSizes.lineInset})`,
      right: 0,
    },
    '&:not(:first-of-type)::before': {
      ...horizontalLineHalf(theme),
      left: 0,
      right: `calc(50% + ${stepperSizes.lineInset})`,
    },
  },

  [`&.${stepClasses.vertical}`]: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    height: `var(${STEP_SIZE_VAR}, ${stepperSizes.verticalStepSize})`,
    maxHeight: `var(${STEP_SIZE_VAR}, none)`,

    '&:last-of-type': { flexGrow: 0, height: 'auto', maxHeight: 'none' },

    '&:not(:last-of-type)::before': {
      ...lineHalf,
      top: `calc(${stepperSizes.iconSize} + ${stepperSizes.lineEndGap})`,
      bottom: stepperSizes.lineEndGap,
      left: stepperSizes.lineOffset,
      borderLeft: `${stepperSizes.connectorThickness} solid ${stepLineColor(theme)}`,
    },
  },
}))
