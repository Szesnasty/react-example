import { styled } from '@mui/material'
import MuiStepLabel, { stepLabelClasses } from '@mui/material/StepLabel'

import { stepLabelStatusColors } from './stepper.colors'
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

export const StyledStepLabel = styled(MuiStepLabel)(({ theme }) => {
  const statusColors = stepLabelStatusColors(theme)

  return {
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
      color: statusColors.upcoming,
      fontWeight: theme.typography.fontWeightRegular,
    },

    // Horizontal keeps every title the same colour; only the weight marks the active step.
    [`& .${stepLabelClasses.label}`]: {
      color: statusColors.completed,
      fontSize: 'inherit',
      lineHeight: 'inherit',
      fontWeight: theme.typography.fontWeightRegular,

      [`&.${stepLabelClasses.active}`]: {
        fontWeight: theme.typography.fontWeightBold,
      },
    },

    // Vertical is where the state also shows in the colour of the title.
    [`&.${stepLabelClasses.vertical} .${stepLabelClasses.label}`]: {
      [`&.${stepLabelClasses.completed}`]: {
        color: statusColors.completed,
      },
      [`&.${stepLabelClasses.active}`]: {
        color: statusColors.active,
      },
      [`&.${stepLabelClasses.disabled}`]: {
        color: statusColors.upcoming,
      },
    },
  }
})
