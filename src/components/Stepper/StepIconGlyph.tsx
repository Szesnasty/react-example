import type { ReactNode } from 'react'

import { StyledStepCheckIcon } from './styled'
import type { StepStatus } from './stepper.models'

export type StepIconGlyphProps = {
  status: StepStatus
  icon?: ReactNode
}

export const StepIconGlyph = ({ status, icon }: StepIconGlyphProps) => {
  if (icon) {
    return icon
  }

  if (status === 'completed') {
    return <StyledStepCheckIcon />
  }

  return null
}
