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
  const sizes = stepperSizes(theme)

  return {
    [`&.${stepLabelClasses.vertical}`]: {
      padding: 0,
      alignItems: 'flex-start',

      [`& .${stepLabelClasses.iconContainer}`]: {
        paddingRight: sizes.vertical.iconGap,
      },
      [`& .${stepLabelClasses.labelContainer}`]: {
        paddingTop: sizes.vertical.labelCapOffset,
        alignItems: 'flex-start',
        gap: sizes.vertical.labelParagraphGap,
        fontSize: sizes.vertical.labelFontSize,
        lineHeight: sizes.vertical.labelLineHeight,
      },
    },

    [`&.${stepLabelClasses.alternativeLabel}`]: {
      [`& .${stepLabelClasses.labelContainer}`]: {
        alignItems: 'center',
        gap: sizes.horizontal.labelParagraphGap,
        fontSize: sizes.horizontal.labelFontSize,
        lineHeight: sizes.horizontal.labelLineHeight,
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

    [`& .${stepLabelClasses.label}`]: {
      color: statusColors.upcoming,
      fontSize: 'inherit',
      lineHeight: 'inherit',
      fontWeight: theme.typography.fontWeightRegular,

      [`&.${stepLabelClasses.completed}`]: {
        color: statusColors.completed,
        fontWeight: theme.typography.fontWeightRegular,
      },
      [`&.${stepLabelClasses.active}`]: {
        color: statusColors.active,
        fontWeight: theme.typography.fontWeightBold,
      },
      [`&.${stepLabelClasses.disabled}`]: {
        color: statusColors.upcoming,
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
  }
})
