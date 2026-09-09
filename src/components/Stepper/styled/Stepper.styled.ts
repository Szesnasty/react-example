import { styled } from '@mui/material'
import MuiStep, { stepClasses } from '@mui/material/Step'
import { stepButtonClasses } from '@mui/material/StepButton'
import MuiStepper from '@mui/material/Stepper'

import { stepLineColor } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

export const StyledStepper = styled(MuiStepper)(({ theme }) => {
  const sizes = stepperSizes(theme)

  return {
    padding: `${sizes.rootPaddingBlock} 0`,

    // MUI detects its tablist mode by `StepButton` identity, so the button cannot be
    // wrapped in `styled` — it is styled from here through its slot class instead.
    [`& .${stepButtonClasses.root}`]: {
      // ButtonBase resets colour but not the font, so the caption would keep the browser
      // default size and stop scaling with the root font size.
      font: 'inherit',
      borderRadius: sizes.buttonRadius,
      padding: `${sizes.buttonPaddingBlock} ${sizes.buttonPaddingInline}`,
      margin: `-${sizes.buttonPaddingBlock} -${sizes.buttonPaddingInline}`,
      width: 'auto',
      // No background of its own — the hover accent lives on the circle.
      '&:hover': { backgroundColor: 'transparent' },
      '&.Mui-disabled': {
        cursor: 'default',
      },
      '&.Mui-focusVisible': {
        outline: `${sizes.focusOutlineWidth} solid ${theme.palette.primary.main}`,
        outlineOffset: sizes.focusOutlineOffset,
      },
    },
  }
})

export const StyledStep = styled(MuiStep)(({ theme }) => {
  const sizes = stepperSizes(theme)

  return {
    [`&.${stepClasses.horizontal}`]: {
      // Steps are `flex: 1`, but their automatic minimum size lets a long label push one wider.
      // The connector is placed with a ±50% offset, so unequal steps make a line reach into a circle.
      minWidth: 0,
      '&:first-of-type': { paddingLeft: 0 },
      '&:last-of-type': { paddingRight: 0 },
    },

    [`&.${stepClasses.vertical}`]: {
      position: 'relative',
      paddingBottom: sizes.verticalStepGap,

      '&:last-of-type': { paddingBottom: 0 },

      // MUI's vertical connector is a fixed-height flex item, so it cannot span the gap between
      // two circles. Drawing the line on the step lets it stretch however tall the step grows.
      '&:not(:last-of-type)::before': {
        content: '""',
        position: 'absolute',
        top: `calc(${sizes.vertical.iconSize} + ${sizes.lineEndGap})`,
        bottom: sizes.lineEndGap,
        left: sizes.vertical.lineOffset,
        width: sizes.connectorThickness,
        borderRadius: sizes.connectorThickness,
        backgroundColor: stepLineColor(theme),
      },
    },
  }
})
