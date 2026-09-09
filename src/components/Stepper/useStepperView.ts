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
  renderStepConnectorElement,
  renderStepContentElement,
  renderStepIconElement,
  renderStepLabelElement,
} from './stepper.renderers'
import {
  areStepsInteractive,
  buildStepViews,
  resolveAriaCurrent,
  resolveStepperRootProps,
  resolveStepStatusLabels,
  toCompletedStepIdSet,
} from './stepper.utils'
import { useStepper } from './useStepper'

/** Turns the stepper props into ready-to-render steps, so the component itself stays markup only. */
export const useStepperView = <TStep extends StepItem = StepItem>({
  steps,
  activeStepIndex: controlledActiveStepIndex,
  defaultActiveStepIndex = 0,
  completedStepIds,
  orientation = 'horizontal',
  isInteractive,
  onStepChange,
  resolveStepStatus,
  renderStepIcon,
  renderStepLabel,
  stepStatusLabels,
}: StepperProps<TStep>): StepperViewModel<TStep> => {
  const { activeStepIndex, goToStep } = useStepper({
    totalSteps: steps.length,
    activeStepIndex: controlledActiveStepIndex,
    defaultActiveStepIndex,
  })

  const isStepperInteractive = areStepsInteractive(isInteractive, Boolean(onStepChange))

  const selectStep = useCallback(
    (view: StepView<TStep>) => () => {
      goToStep(view.index)
      onStepChange?.(view.index, view.step)
    },
    [goToStep, onStepChange],
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
      activeStepIndex,
      completedStepIds: completedStepIdSet,
      resolveStatus: resolveStepStatus,
    })

    return stepViews.map((view) => ({
      ...view,
      key: view.step.id,
      isActive: view.status === 'active',
      isCompleted: view.status === 'completed',
      ariaCurrent: resolveAriaCurrent(view.status, isStepperInteractive),
      bodyElement: renderStepBodyElement({
        iconElement: renderStepIconElement(view, orientation, renderStepIcon),
        labelElement: renderStepLabelElement(view, statusLabels[view.status], renderStepLabel),
        captionElement: view.step.caption,
        onSelect: isStepperInteractive ? selectStep(view) : undefined,
      }),
      contentElement: renderStepContentElement(view, orientation),
    }))
  }, [
    activeStepIndex,
    completedStepIdSet,
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
    activeStepIndex,
    orientation,
    hasLabelUnderIcon: orientation === 'horizontal',
    connectorElement: renderStepConnectorElement(orientation),
    rootProps: resolveStepperRootProps(isStepperInteractive),
    stepModels,
  }
}
