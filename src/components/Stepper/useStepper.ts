import { useCallback, useMemo, useState } from 'react'

import type { UseStepperApi, UseStepperOptions } from './stepper.models'
import { clampStepIndex } from './stepper.utils'

/** Step navigation, controlled or not. Exported so buttons outside the stepper share its state. */
export const useStepper = ({
  totalSteps,
  activeStepIndex: controlledActiveStepIndex,
  defaultActiveStepIndex = 0,
  onActiveStepIndexChange,
}: UseStepperOptions): UseStepperApi => {
  const [uncontrolledActiveStepIndex, setUncontrolledActiveStepIndex] = useState(() =>
    clampStepIndex(defaultActiveStepIndex, totalSteps),
  )

  const isControlled = controlledActiveStepIndex !== undefined
  const activeStepIndex = clampStepIndex(
    isControlled ? controlledActiveStepIndex : uncontrolledActiveStepIndex,
    totalSteps,
  )
  const lastStepIndex = Math.max(totalSteps - 1, 0)

  const goToStep = useCallback(
    (stepIndex: number) => {
      const targetStepIndex = clampStepIndex(stepIndex, totalSteps)

      if (!isControlled) {
        setUncontrolledActiveStepIndex(targetStepIndex)
      }

      if (targetStepIndex === activeStepIndex) {
        return
      }

      onActiveStepIndexChange?.(targetStepIndex)
    },
    [activeStepIndex, isControlled, onActiveStepIndexChange, totalSteps],
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
