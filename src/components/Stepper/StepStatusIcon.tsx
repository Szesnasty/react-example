import type { ReactNode } from 'react'

import { StepIconGlyph } from './StepIconGlyph'
import { StyledStepIconRoot } from './styled'
import type { StepStatus } from './stepper.models'

export type StepStatusIconProps = {
  status: StepStatus
  icon?: ReactNode
  className?: string
}

export const StepStatusIcon = ({ status, icon, className }: StepStatusIconProps) => (
  <StyledStepIconRoot data-status={status} className={className} aria-hidden="true">
    <StepIconGlyph status={status} icon={icon} />
  </StyledStepIconRoot>
)
