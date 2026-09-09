import { styled } from '@mui/material'
import MuiStep, { stepClasses } from '@mui/material/Step'
import { stepButtonClasses } from '@mui/material/StepButton'
import MuiStepper from '@mui/material/Stepper'

import { stepLineColor } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

export const StyledStepper = styled(MuiStepper)(({ theme }) => ({
  padding: `${stepperSizes.rootPaddingBlock} 0`,

  // MUI detects its tablist mode by `StepButton` identity, so the button cannot be
  // wrapped in `styled` — it is styled from here through its slot class instead.
  [`& .${stepButtonClasses.root}`]: {
    // ButtonBase resets colour but not the font, so the caption would keep the browser
    // default size and stop scaling with the root font size.
    font: 'inherit',
    // The one value taken from the host theme, which keeps it in px.
    borderRadius: theme.shape.borderRadius,
    padding: `${stepperSizes.buttonPaddingBlock} ${stepperSizes.buttonPaddingInline}`,
    margin: `-${stepperSizes.buttonPaddingBlock} -${stepperSizes.buttonPaddingInline}`,
    width: 'auto',
    // No background of its own — the hover accent lives on the circle.
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

export const StyledStep = styled(MuiStep)(({ theme }) => ({
  [`&.${stepClasses.horizontal}`]: {
    // The connector is positioned with a ±50% offset against its own step, so the gap to a circle
    // only stays at `lineEndGap` while every step is exactly the same width. Anything that
    // unbalances them — a min-content floor, padding on some of the steps — makes the line drift
    // towards one circle, so the width is pinned here rather than left to the surrounding styles.
    flex: '1 1 0',
    minWidth: 0,
    boxSizing: 'border-box',
    padding: 0,
    // The clickable step is inline-flex and shrinks to its label, so it has to be centred here
    // or the circle drifts off the step centre the connector measures from.
    textAlign: 'center',
  },

  [`&.${stepClasses.vertical}`]: {
    position: 'relative',
    paddingBottom: stepperSizes.verticalStepGap,

    '&:last-of-type': { paddingBottom: 0 },

    // MUI's vertical connector is a fixed-height flex item, so it cannot span the gap between
    // two circles. Drawing the line on the step lets it stretch however tall the step grows.
    '&:not(:last-of-type)::before': {
      content: '""',
      position: 'absolute',
      top: `calc(${stepperSizes.iconSize} + ${stepperSizes.lineEndGap})`,
      bottom: stepperSizes.lineEndGap,
      left: stepperSizes.lineOffset,
      width: stepperSizes.connectorThickness,
      borderRadius: stepperSizes.connectorThickness,
      backgroundColor: stepLineColor(theme),
    },
  },
}))
