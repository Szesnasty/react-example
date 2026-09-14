import { styled } from '@mui/material'
import MuiStepLabel, { stepLabelClasses } from '@mui/material/StepLabel'

import { activeStepLabelColor, stepLabelColor } from './stepper.colors'
import { stepperSizes } from './stepper.sizes'

export const StyledVisuallyHiddenText = styled('span')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  display: 'block',
})

export const StyledStepLabel = styled(MuiStepLabel)(({ theme }) => ({
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
    overflowWrap: 'break-word',
    color: stepLabelColor(theme),
    fontWeight: theme.typography.fontWeightRegular,
  },

  [`&& .${stepLabelClasses.label}`]: {
    color: stepLabelColor(theme),
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontWeight: theme.typography.fontWeightRegular,
    maxWidth: '100%',
  },

  [`&&.${stepLabelClasses.vertical} .${stepLabelClasses.label}.${stepLabelClasses.active}`]: {
    color: activeStepLabelColor(theme),
    fontWeight: theme.typography.fontWeightMedium,
  },

  [`[data-step-status="active"] &.${stepLabelClasses.vertical} .${stepLabelClasses.labelContainer}`]: {
    color: activeStepLabelColor(theme),
  },
}))
