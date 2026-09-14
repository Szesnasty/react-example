import type { CSSProperties, ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material'

/** Horizontal puts the label under the circle, vertical beside it. */
export type StepperOrientation = 'horizontal' | 'vertical'

/** `completed` shows a check, `active` is a filled circle, `upcoming` is greyed out. */
export type StepStatus = 'completed' | 'active' | 'upcoming'

/** Identifies a step in `completedStepIds` and in the `onStepChange` callback. */
export type StepId = string | number

/** Wording announced next to each label, so the status does not rest on colour alone. */
export type StepStatusLabels = Record<StepStatus, string>

/** One step, described by data. The stepper takes an array of these instead of children. */
export type StepItem = {
  /** Stable key for the list, and the value handed back by `onStepChange`. */
  id: StepId
  /** Title shown next to or under the circle. */
  label: ReactNode
  /** Secondary line under the title. */
  caption?: ReactNode
  /** Body revealed under the step. Vertical orientation only. */
  content?: ReactNode
  /** Replaces what sits inside the circle: the check on a completed step, nothing otherwise. */
  icon?: ReactNode
  /** Blocks the step and greys it out wherever it sits, even behind the active one. */
  disabled?: boolean
  /** Id of the section this step reveals. Clickable steps are tabs, which MUI asks to point at the content they control. */
  controlsElementId?: string
}

/** A step with its position and status resolved. Handed to `renderStepIcon` and `renderStepLabel`. */
export type StepView<TStep extends StepItem = StepItem> = {
  step: TStep
  index: number
  status: StepStatus
  isDisabled: boolean
  isFirstStep: boolean
  isLastStep: boolean
}

/** Everything a custom status rule gets to decide from. */
export type StepStatusContext<TStep extends StepItem = StepItem> = {
  step: TStep
  index: number
  activeStepIndex: number
  completedStepIds?: ReadonlySet<StepId>
}

/** Replaces the built-in rule that derives a step's status from its position. */
export type StepStatusResolver<TStep extends StepItem = StepItem> = (
  context: StepStatusContext<TStep>,
) => StepStatus

/** Takes over the content of one slot of a step, keeping the surrounding markup intact. */
export type StepRenderer<TStep extends StepItem = StepItem> = (view: StepView<TStep>) => ReactNode

export type UseStepperOptions = {
  /** Usually `steps.length`. Every move is clamped to this range. */
  totalSteps: number
  /** Step to start on, and the one `resetToDefaultStep` returns to. Defaults to `0`. */
  defaultActiveStepIndex?: number
  /** Fires on an actual change of step, not on re-selecting the current one. */
  onActiveStepIndexChange?: (stepIndex: number) => void
}

export type UseStepperApi = {
  /** Pass this straight to the stepper's `activeStepIndex`. */
  activeStepIndex: number
  /** Handy for disabling a back button. */
  isFirstStep: boolean
  /** Handy for turning a next button into a submit. */
  isLastStep: boolean
  /** Out-of-range indexes are clamped to the list. */
  goToStep: (stepIndex: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  resetToDefaultStep: () => void
}

export type StepperProps<TStep extends StepItem = StepItem> = {
  /** The steps to render, in order. */
  steps: readonly TStep[]
  /** The current step. The stepper only reflects it — hold the value yourself, e.g. with `useStepper`. */
  activeStepIndex: number
  /**
   * Turns on non-linear mode: completion comes from this list instead of the step position, and no
   * step is blocked by sitting ahead of the active one.
   */
  completedStepIds?: readonly StepId[]
  /** Defaults to `horizontal`. */
  orientation?: StepperOrientation
  /**
   * Length of the line between two circles, in rem.
   *
   * Left out, the steps simply share out their container. Given, they stop growing at that length,
   * which is how the stepper keeps its shape in a container far wider than it needs. Either way a
   * narrow container squeezes them rather than being overflowed.
   */
  lineLength?: number
  /**
   * Makes the steps clickable. Without it they are a plain list that cannot be navigated, so this
   * is also the switch between tab and list semantics for screen readers.
   */
  onStepChange?: (stepIndex: number, step: TStep) => void
  /** Replaces the whole status rule, e.g. to drive it from your own validation. */
  resolveStepStatus?: StepStatusResolver<TStep>
  /** Replaces what sits inside every circle. */
  renderStepIcon?: StepRenderer<TStep>
  /** Replaces the visible label, leaving the announced status in place. */
  renderStepLabel?: StepRenderer<TStep>
  /** Overrides the wording announced next to each label, e.g. to translate it. */
  stepStatusLabels?: Partial<StepStatusLabels>
  className?: string
  sx?: SxProps<Theme>
  /** Names the stepper for screen readers, e.g. "Checkout progress". */
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
