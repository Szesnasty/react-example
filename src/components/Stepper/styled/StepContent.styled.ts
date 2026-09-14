import { styled } from '@mui/material'
import MuiStepContent from '@mui/material/StepContent'

import { stepperSizes } from './stepper.sizes'

export const StyledStepContent = styled(MuiStepContent)(({ theme }) => ({
  marginLeft: 0,
  paddingLeft: stepperSizes.verticalContentIndent,
  paddingRight: 0,
  borderLeft: 'none',
  color: theme.palette.text.secondary,
}))
