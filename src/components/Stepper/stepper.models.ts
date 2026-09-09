import type { ReactElement, ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material'

export type StepperOrientation = 'horizontal' | 'vertical'

/** `completed` shows a check, `active` is a filled primary circle, `upcoming` is greyed out and blocked. */
export type StepStatus = 'completed' | 'active' | 'upcoming'

export type StepId = string | number

/** Read out by assistive tech only, so each status stays distinguishable without colour. */
export type StepStatusLabels = Record<StepStatus, string>

export type StepItem = {
  id: StepId
  label: ReactNode
  caption?: ReactNode
  /** Rendered under the step, vertical orientation only. */
  content?: ReactNode
  icon?: ReactNode
  disabled?: boolean
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
  /** Passing this switches the hook into controlled mode. */
  activeStepIndex?: number
  defaultActiveStepIndex?: number
  onActiveStepIndexChange?: (stepIndex: number) => void
}

export type UseStepperApi = {
  activeStepIndex: number
  isFirstStep: boolean
  isLastStep: boolean
  /** Out-of-range indexes are clamped to the list. */
  goToStep: (stepIndex: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  resetToDefaultStep: () => void
}

export type StepperProps<TStep extends StepItem = StepItem> = {
  steps: readonly TStep[]
  /** Controlled mode. Without it the stepper tracks the active step itself. */
  activeStepIndex?: number
  defaultActiveStepIndex?: number
  /** Turns on non-linear mode: completion comes from this list instead of the step position. */
  completedStepIds?: readonly StepId[]
  orientation?: StepperOrientation
  /** Defaults to `true` when `onStepChange` is given. */
  isInteractive?: boolean
  onStepChange?: (stepIndex: number, step: TStep) => void
  resolveStepStatus?: StepStatusResolver<TStep>
  renderStepIcon?: StepRenderer<TStep>
  renderStepLabel?: StepRenderer<TStep>
  /** Overrides the screen-reader status wording, e.g. to translate it. */
  stepStatusLabels?: Partial<StepStatusLabels>
  className?: string
  sx?: SxProps<Theme>
  'aria-label'?: string
}

/** The pieces a step body is assembled from. */
export type StepBodyElements = {
  iconElement: ReactNode
  labelElement: ReactNode
  captionElement: ReactNode
  onSelect?: () => void
}

/** A step with everything already resolved — the stepper only maps it to markup. */
export type StepRenderModel<TStep extends StepItem = StepItem> = StepView<TStep> & {
  key: StepId
  isActive: boolean
  isCompleted: boolean
  ariaCurrent: 'step' | undefined
  bodyElement: ReactNode
  contentElement: ReactNode
}

/** Props for the stepper root that must be absent rather than `undefined` when they do not apply. */
export type StepperRootProps = { role?: 'list' }

export type StepperViewModel<TStep extends StepItem = StepItem> = {
  activeStepIndex: number
  orientation: StepperOrientation
  /** Horizontal steppers put the label under the circle, which is MUI's alternative layout. */
  hasLabelUnderIcon: boolean
  connectorElement: ReactElement | null
  rootProps: StepperRootProps
  stepModels: StepRenderModel<TStep>[]
}
