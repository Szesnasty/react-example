import type {
  StepId,
  StepItem,
  StepperRootProps,
  StepStatus,
  StepStatusContext,
  StepStatusLabels,
  StepStatusResolver,
  StepView,
} from './stepper.models'

export const STEP_STATUS_TRANSLATION_KEYS: Record<StepStatus, string> = {
  completed: 'stepper.status.completed',
  active: 'stepper.status.active',
  upcoming: 'stepper.status.upcoming',
}

export const DEFAULT_STEP_STATUS_LABELS: StepStatusLabels = {
  completed: 'krok ukończony',
  active: 'krok bieżący',
  upcoming: 'krok jeszcze niedostępny',
}

export const clampStepIndex = (stepIndex: number, totalSteps: number): number =>
  Math.min(Math.max(stepIndex, 0), Math.max(totalSteps - 1, 0))

export const toCompletedStepIdSet = (
  completedStepIds?: readonly StepId[],
): ReadonlySet<StepId> | undefined => {
  if (!completedStepIds) {
    return undefined
  }

  return new Set(completedStepIds)
}

export const resolveStepStatus = <TStep extends StepItem>({
  step,
  index,
  activeStepIndex,
  completedStepIds,
}: StepStatusContext<TStep>): StepStatus => {
  if (index === activeStepIndex) {
    return 'active'
  }

  if (step.disabled) {
    return 'upcoming'
  }

  if (completedStepIds) {
    return completedStepIds.has(step.id) ? 'completed' : 'upcoming'
  }

  return index < activeStepIndex ? 'completed' : 'upcoming'
}

export const isStepDisabled = <TStep extends StepItem>(
  step: TStep,
  status: StepStatus,
  isNonLinear: boolean,
): boolean => {
  if (step.disabled) {
    return true
  }

  if (isNonLinear) {
    return false
  }

  return status === 'upcoming'
}

export type BuildStepViewsOptions<TStep extends StepItem> = {
  activeStepIndex: number
  completedStepIds?: ReadonlySet<StepId>
  resolveStatus?: StepStatusResolver<TStep>
}

export const buildStepViews = <TStep extends StepItem>(
  steps: readonly TStep[],
  {
    activeStepIndex,
    completedStepIds,
    resolveStatus = resolveStepStatus,
  }: BuildStepViewsOptions<TStep>,
): StepView<TStep>[] => {
  const lastStepIndex = steps.length - 1
  const isNonLinear = completedStepIds !== undefined

  return steps.map((step, index) => {
    const status = resolveStatus({ step, index, activeStepIndex, completedStepIds })

    return {
      step,
      index,
      status,
      isDisabled: isStepDisabled(step, status, isNonLinear),
      isFirstStep: index === 0,
      isLastStep: index === lastStepIndex,
    }
  })
}

export const resolveAriaCurrent = (status: StepStatus, isInteractive: boolean) => {
  if (isInteractive || status !== 'active') {
    return undefined
  }

  return 'step' as const
}

export const resolveStepperRootProps = (isInteractive: boolean): StepperRootProps => {
  if (isInteractive) {
    return {}
  }

  return { role: 'list' }
}
