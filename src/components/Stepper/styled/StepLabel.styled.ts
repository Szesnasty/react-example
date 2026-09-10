import { styled } from '@mui/material'
import MuiStepLabel, { stepLabelClasses } from '@mui/material/StepLabel'

import { stepLabelColor } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

/**
 * Carries the step status for screen readers, since colour and the check alone do not convey it.
 * `display: block` is what makes the accessible name separate it from the label with a space.
 */
export const StyledVisuallyHiddenText = styled('span')({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  display: 'block',
})

export const StyledStepLabel = styled(MuiStepLabel)(({ theme }) => ({
  // Type size is the only thing the two orientations style differently.
  [`&.${stepLabelClasses.vertical}`]: {
    padding: 0,
    alignItems: 'flex-start',

    [`& .${stepLabelClasses.iconContainer}`]: {
      paddingRight: stepperSizes.verticalIconGap,
    },
    [`& .${stepLabelClasses.labelContainer}`]: {
      paddingTop: stepperSizes.verticalLabelCapOffset,
      alignItems: 'flex-start',
      gap: stepperSizes.verticalLabelParagraphGap,
      fontSize: stepperSizes.verticalLabelFontSize,
      lineHeight: stepperSizes.verticalLabelLineHeight,
    },
  },

  [`&.${stepLabelClasses.alternativeLabel}`]: {
    [`& .${stepLabelClasses.labelContainer}`]: {
      alignItems: 'center',
      gap: stepperSizes.horizontalLabelParagraphGap,
      fontSize: stepperSizes.horizontalLabelFontSize,
      lineHeight: stepperSizes.horizontalLabelLineHeight,
    },
  },

  [`& .${stepLabelClasses.labelContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflowWrap: 'break-word',
    color: stepLabelColor(theme),
    fontWeight: theme.typography.fontWeightRegular,
  },

  // `&&` outweighs MUI's own `.MuiStepLabel-label.Mui-active` colour and weight, which a
  // single-`&` selector would only tie with — leaving the winner up to stylesheet order.
  [`&& .${stepLabelClasses.label}`]: {
    color: stepLabelColor(theme),
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: theme.typography.fontWeightRegular,
  },
}))
