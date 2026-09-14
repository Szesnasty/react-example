import { useCallback, useMemo } from 'react'

import type {
  StepItem,
  StepRenderModel,
  StepperProps,
  StepperViewModel,
  StepView,
} from './stepper.models'
import {
  renderStepBodyElement,
  renderStepContentElement,
  renderStepIconElement,
  renderStepLabelElement,
} from './stepper.renderers'
import {
  buildStepViews,
  clampStepIndex,
  resolveAriaCurrent,
  resolveStepperRootProps,
  resolveStepStatusLabels,
  toCompletedStepIdSet,
} from './stepper.utils'
import { resolveStepSizeStyle } from './styled'

/** Turns the stepper props into ready-to-render steps, so the component itself stays markup only. */
export const useStepperView = <TStep extends StepItem = StepItem>({
  steps,
  activeStepIndex,
  completedStepIds,
  orientation = 'horizontal',
  lineLength,
  onStepChange,
  resolveStepStatus,
  renderStepIcon,
  renderStepLabel,
  stepStatusLabels,
}: StepperProps<TStep>): StepperViewModel<TStep> => {
  const currentStepIndex = clampStepIndex(activeStepIndex, steps.length)
  const isStepperInteractive = Boolean(onStepChange)

  const selectStep = useCallback(
    (view: StepView<TStep>) => () => onStepChange?.(view.index, view.step),
    [onStepChange],
  )

  const completedStepIdSet = useMemo(
    () => toCompletedStepIdSet(completedStepIds),
    [completedStepIds],
  )

  const statusLabels = useMemo(
    () => resolveStepStatusLabels(stepStatusLabels),
    [stepStatusLabels],
  )

  const stepModels = useMemo<StepRenderModel<TStep>[]>(() => {
    const stepViews = buildStepViews(steps, {
      activeStepIndex: currentStepIndex,
      completedStepIds: completedStepIdSet,
      resolveStatus: resolveStepStatus,
    })

    return stepViews.map((view) => ({
      ...view,
      isActive: view.status === 'active',
      isCompleted: view.status === 'completed',
      ariaCurrent: resolveAriaCurrent(view.status, isStepperInteractive),
      bodyElement: renderStepBodyElement({
        iconElement: renderStepIconElement(view, renderStepIcon),
        labelElement: renderStepLabelElement(view, statusLabels[view.status], renderStepLabel),
        captionElement: view.step.caption,
        controlsElementId: view.step.controlsElementId,
        onSelect: isStepperInteractive ? selectStep(view) : undefined,
      }),
      contentElement: renderStepContentElement(view, orientation),
    }))
  }, [
    completedStepIdSet,
    currentStepIndex,
    isStepperInteractive,
    orientation,
    renderStepIcon,
    renderStepLabel,
    resolveStepStatus,
    selectStep,
    statusLabels,
    steps,
  ])

  return {
    activeStepIndex: currentStepIndex,
    orientation,
    hasLabelUnderIcon: orientation === 'horizontal',
    rootProps: resolveStepperRootProps(isStepperInteractive),
    rootStyle: resolveStepSizeStyle(lineLength),
    stepModels,
  }
}
