import type { ReactNode } from 'react'

import { StyledStepCheckIcon } from './styled'
import type { StepStatus } from './stepper.models'

export type StepIconGlyphProps = {
  status: StepStatus
  icon?: ReactNode
}

/** What sits inside the circle: a custom icon, a check once the step is done, otherwise nothing. */
export const StepIconGlyph = ({ status, icon }: StepIconGlyphProps) => {
  if (icon) {
    return icon
  }

  if (status === 'completed') {
    return <StyledStepCheckIcon />
  }

  return null
}
