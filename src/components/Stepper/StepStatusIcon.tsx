import type { ReactNode } from 'react'

import { StepIconGlyph } from './StepIconGlyph'
import { StyledStepIconRoot } from './styled'
import type { StepperOrientation, StepStatus } from './stepper.models'

export type StepStatusIconProps = {
  status: StepStatus
  orientation: StepperOrientation
  icon?: ReactNode
  className?: string
}

/**
 * The circle is hidden from assistive tech: it carries no text, and its check duplicates
 * the status the stepper renders next to the label.
 */
export const StepStatusIcon = ({ status, orientation, icon, className }: StepStatusIconProps) => (
  <StyledStepIconRoot
    status={status}
    orientation={orientation}
    data-status={status}
    className={className}
    aria-hidden="true"
  >
    <StepIconGlyph status={status} icon={icon} />
  </StyledStepIconRoot>
)
