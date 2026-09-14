import { useCallback, useMemo, useState } from 'react'

import type { UseStepperApi, UseStepperOptions } from './stepper.models'
import { clampStepIndex } from './stepper.utils'

/**
 * Holds the current step and the moves around it, so buttons outside the stepper share its state.
 *
 * @example
 * const { activeStepIndex, goToStep, goToNextStep, isLastStep } = useStepper({
 *   totalSteps: steps.length,
 * })
 */
export const useStepper = ({
  totalSteps,
  defaultActiveStepIndex = 0,
  onActiveStepIndexChange,
}: UseStepperOptions): UseStepperApi => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(() =>
    clampStepIndex(defaultActiveStepIndex, totalSteps),
  )

  const activeStepIndex = clampStepIndex(selectedStepIndex, totalSteps)
  const lastStepIndex = Math.max(totalSteps - 1, 0)

  const goToStep = useCallback(
    (stepIndex: number) => {
      const targetStepIndex = clampStepIndex(stepIndex, totalSteps)

      setSelectedStepIndex(targetStepIndex)

      if (targetStepIndex === activeStepIndex) {
        return
      }

      onActiveStepIndexChange?.(targetStepIndex)
    },
    [activeStepIndex, onActiveStepIndexChange, totalSteps],
  )

  return useMemo(
    () => ({
      activeStepIndex,
      isFirstStep: activeStepIndex === 0,
      isLastStep: activeStepIndex === lastStepIndex,
      goToStep,
      goToNextStep: () => goToStep(activeStepIndex + 1),
      goToPreviousStep: () => goToStep(activeStepIndex - 1),
      resetToDefaultStep: () => goToStep(defaultActiveStepIndex),
    }),
    [activeStepIndex, defaultActiveStepIndex, goToStep, lastStepIndex],
  )
}
