import type { CSSProperties, ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material'

export type StepperOrientation = 'horizontal' | 'vertical'

export type StepStatus = 'completed' | 'active' | 'upcoming'

export type StepId = string | number

export type StepStatusLabels = Record<StepStatus, string>

export type StepItem = {
  id: StepId
  label: ReactNode
  caption?: ReactNode
  content?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  controlsElementId?: string
}

export type StepView<TStep extends StepItem = StepItem> = {
  step: TStep
  index: number
  status: StepStatus
  isDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
}

export type StepStatusContext<TStep extends StepItem = StepItem> = {
  step: TStep
  index: number
  activeStepIndex: number
  completedStepIds?: ReadonlySet<StepId>
}

export type StepStatusResolver<TStep extends StepItem = StepItem> = (
  context: StepStatusContext<TStep>,
) => StepStatus

export type StepRenderer<TStep extends StepItem = StepItem> = (view: StepView<TStep>) => ReactNode

export type UseStepperOptions = {
  totalSteps: number
  activeStepIndex?: number
  defaultActiveStepIndex?: number
  onActiveStepIndexChange?: (stepIndex: number) => void
}

export type UseStepperApi = {
  activeStepIndex: number
  isFirstStep: boolean
  isLastStep: boolean
  goToStep: (stepIndex: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  resetToDefaultStep: () => void
}

export type StepperProps<TStep extends StepItem = StepItem> = {
  steps: readonly TStep[]
  activeStepIndex?: number
  defaultActiveStepIndex?: number
  completedStepIds?: readonly StepId[]
  orientation?: StepperOrientation
  lineLength?: number | string
  isInteractive?: boolean
  onStepChange?: (stepIndex: number, step: TStep) => void
  resolveStepStatus?: StepStatusResolver<TStep>
  renderStepIcon?: StepRenderer<TStep>
  renderStepLabel?: StepRenderer<TStep>
  stepStatusLabels?: Partial<StepStatusLabels>
  className?: string
  sx?: SxProps<Theme>
  'aria-label'?: string
}

export type StepBodyElements = {
  iconElement: ReactNode
  labelElement: ReactNode
  captionElement: ReactNode
  controlsElementId?: string
  onSelect?: () => void
}

export type StepRenderModel<TStep extends StepItem = StepItem> = StepView<TStep> & {
  isActive: boolean
  isCompleted: boolean
  ariaCurrent: 'step' | undefined
  bodyElement: ReactNode
  contentElement: ReactNode
}

export type StepperRootProps = { role?: 'list' }

export type StepperViewModel<TStep extends StepItem = StepItem> = {
  activeStepIndex: number
  orientation: StepperOrientation
  hasLabelUnderIcon: boolean
  rootProps: StepperRootProps
  rootStyle: CSSProperties | undefined
  stepModels: StepRenderModel<TStep>[]
}
