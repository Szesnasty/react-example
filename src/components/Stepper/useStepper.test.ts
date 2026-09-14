import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'

import { useStepper } from './useStepper'

describe('useStepper', () => {
  it('starts at defaultActiveStep', () => {
    const { result } = renderHook(() => useStepper({ totalSteps: 4, defaultActiveStepIndex: 2 }))

    expect(result.current.activeStepIndex).toBe(2)
  })

  it('moves one step at a time with next and back', () => {
    const { result } = renderHook(() => useStepper({ totalSteps: 4 }))

    act(() => result.current.goToNextStep())
    expect(result.current.activeStepIndex).toBe(1)

    act(() => result.current.goToPreviousStep())
    expect(result.current.activeStepIndex).toBe(0)
  })

  it('never leaves the bounds of the list', () => {
    const { result } = renderHook(() => useStepper({ totalSteps: 2 }))

    act(() => result.current.goToPreviousStep())
    expect(result.current.activeStepIndex).toBe(0)

    act(() => result.current.goToStep(99))
    expect(result.current.activeStepIndex).toBe(1)
  })

  it('returns to the starting step on reset', () => {
    const { result } = renderHook(() => useStepper({ totalSteps: 4, defaultActiveStepIndex: 1 }))

    act(() => result.current.goToStep(3))
    act(() => result.current.resetToDefaultStep())

    expect(result.current.activeStepIndex).toBe(1)
  })

  it('flags the first and the last step', () => {
    const { result } = renderHook(() => useStepper({ totalSteps: 3 }))

    expect(result.current.isFirstStep).toBe(true)
    expect(result.current.isLastStep).toBe(false)

    act(() => result.current.goToStep(2))

    expect(result.current.isFirstStep).toBe(false)
    expect(result.current.isLastStep).toBe(true)
  })

  it('reports every move through onActiveStepIndexChange', () => {
    const onActiveStepIndexChange = vi.fn()
    const { result } = renderHook(() => useStepper({ totalSteps: 4, onActiveStepIndexChange }))

    act(() => result.current.goToNextStep())

    expect(onActiveStepIndexChange).toHaveBeenCalledWith(1)
  })

  it('stays silent when the target step is already active', () => {
    const onActiveStepIndexChange = vi.fn()
    const { result } = renderHook(() => useStepper({ totalSteps: 4, onActiveStepIndexChange }))

    act(() => result.current.goToPreviousStep())

    expect(onActiveStepIndexChange).not.toHaveBeenCalled()
  })
})
