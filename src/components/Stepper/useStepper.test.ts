import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'

import { useStepper } from './useStepper'

describe('useStepper — uncontrolled', () => {
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
})

describe('useStepper — controlled', () => {
  it('sticks to the activeStep prop instead of moving itself', () => {
    const { result } = renderHook(() => useStepper({ totalSteps: 4, activeStepIndex: 2 }))

    act(() => result.current.goToNextStep())

    expect(result.current.activeStepIndex).toBe(2)
  })

  it('reports the requested step through onActiveStepIndexChange', () => {
    const onActiveStepIndexChange = vi.fn()
    const { result } = renderHook(() =>
      useStepper({ totalSteps: 4, activeStepIndex: 2, onActiveStepIndexChange }),
    )

    act(() => result.current.goToNextStep())

    expect(onActiveStepIndexChange).toHaveBeenCalledWith(3)
  })

  it('stays silent when the target step is already active', () => {
    const onActiveStepIndexChange = vi.fn()
    const { result } = renderHook(() =>
      useStepper({ totalSteps: 4, activeStepIndex: 0, onActiveStepIndexChange }),
    )

    act(() => result.current.goToPreviousStep())

    expect(onActiveStepIndexChange).not.toHaveBeenCalled()
  })

  it('follows a change of the prop', () => {
    const { result, rerender } = renderHook(
      ({ activeStepIndex }: { activeStepIndex: number }) => useStepper({ totalSteps: 4, activeStepIndex }),
      { initialProps: { activeStepIndex: 0 } },
    )

    rerender({ activeStepIndex: 3 })

    expect(result.current.activeStepIndex).toBe(3)
  })
})
