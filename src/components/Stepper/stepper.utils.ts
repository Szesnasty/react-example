import type { CSSProperties } from 'react'

import { LINE_LENGTH_VAR } from './styled/stepper.sizes'
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

/** Wording is announced, never shown, so it carries the state that colour alone would encode. */
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

/** "Where you are" beats "what you finished", so the active step keeps its number even once completed. */
export const resolveStepStatus = <TStep extends StepItem>({
  step,
  index,
  activeStepIndex,
  completedStepIds,
}: StepStatusContext<TStep>): StepStatus => {
  if (index === activeStepIndex) {
    return 'active'
  }

  if (completedStepIds) {
    return completedStepIds.has(step.id) ? 'completed' : 'upcoming'
  }

  return index < activeStepIndex ? 'completed' : 'upcoming'
}

export const isStepDisabled = <TStep extends StepItem>(
  step: TStep,
  status: StepStatus,
): boolean => {
  if (step.disabled) {
    return true
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

  return steps.map((step, index) => {
    const status = resolveStatus({ step, index, activeStepIndex, completedStepIds })

    return {
      step,
      index,
      status,
      isDisabled: isStepDisabled(step, status),
      isFirstStep: index === 0,
      isLastStep: index === lastStepIndex,
    }
  })
}

export const resolveStepStatusLabels = (
  overrides?: Partial<StepStatusLabels>,
): StepStatusLabels => ({ ...DEFAULT_STEP_STATUS_LABELS, ...overrides })

export const areStepsInteractive = (
  isInteractive: boolean | undefined,
  hasStepChangeHandler: boolean,
): boolean => isInteractive ?? hasStepChangeHandler

/**
 * Clickable steps are a tablist, where `aria-selected` already marks the current tab. Adding
 * `aria-current` there would restore the role of the presentational list item and break the
 * tablist/tab relationship, so it is only used for a plain list of steps.
 */
export const resolveAriaCurrent = (status: StepStatus, isInteractive: boolean) => {
  if (isInteractive || status !== 'active') {
    return undefined
  }

  return 'step' as const
}

/**
 * `list-style: none` drops list semantics in Safari. Clickable steps become a tablist instead,
 * and the role has to be absent rather than `undefined`, or it overwrites the one MUI sets.
 */
export const resolveStepperRootProps = (isInteractive: boolean): StepperRootProps => {
  if (isInteractive) {
    return {}
  }

  return { role: 'list' }
}

/** A bare number means rem — this component states every length in rem. */
export const toCssLength = (value: number | string): string => {
  if (typeof value === 'number') {
    return `${value}rem`
  }

  return value
}

/** Hands `lineLength` to the styles as a custom property, so one prop drives both orientations. */
export const resolveLineLengthStyle = (lineLength?: number | string): CSSProperties | undefined => {
  if (lineLength === undefined) {
    return undefined
  }

  return { [LINE_LENGTH_VAR]: toCssLength(lineLength) } as CSSProperties
}
