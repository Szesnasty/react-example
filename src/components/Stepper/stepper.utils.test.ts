import { describe, expect, it } from 'vitest'

import type { StepItem, StepStatusResolver } from './stepper.models'
import {
  buildStepViews,
  clampStepIndex,
  isStepDisabled,
  resolveStepStatus,
  toCompletedStepIdSet,
} from './stepper.utils'

const steps: StepItem[] = [
  { id: 'cart', label: 'Koszyk' },
  { id: 'delivery', label: 'Dostawa' },
  { id: 'payment', label: 'Płatność' },
]

describe('clampStepIndex', () => {
  it('keeps an index that is already in range', () => {
    expect(clampStepIndex(1, 3)).toBe(1)
  })

  it('clamps an out-of-range index to the ends of the list', () => {
    expect(clampStepIndex(-5, 3)).toBe(0)
    expect(clampStepIndex(99, 3)).toBe(2)
  })

  it('stays at zero for an empty list', () => {
    expect(clampStepIndex(0, 0)).toBe(0)
    expect(clampStepIndex(3, 0)).toBe(0)
  })
})

describe('toCompletedStepIdSet', () => {
  it('returns undefined when no list is given', () => {
    expect(toCompletedStepIdSet(undefined)).toBeUndefined()
  })

  it('keeps an empty list as a deliberate non-linear mode with nothing completed', () => {
    expect(toCompletedStepIdSet([])).toEqual(new Set())
  })

  it('collapses duplicates', () => {
    expect(toCompletedStepIdSet(['cart', 'cart', 'payment'])).toEqual(new Set(['cart', 'payment']))
  })
})

describe('resolveStepStatus', () => {
  const linear = (index: number) => resolveStepStatus({ step: steps[index], index, activeStepIndex: 1 })

  it('marks a step before the active one as completed', () => {
    expect(linear(0)).toBe('completed')
  })

  it('marks the step at the active index as active', () => {
    expect(linear(1)).toBe('active')
  })

  it('marks a step after the active one as upcoming', () => {
    expect(linear(2)).toBe('upcoming')
  })

  it('takes completion from completedStepIds instead of the position', () => {
    const completedStepIds = new Set(['payment'])

    expect(resolveStepStatus({ step: steps[0], index: 0, activeStepIndex: 1, completedStepIds })).toBe(
      'upcoming',
    )
    expect(resolveStepStatus({ step: steps[2], index: 2, activeStepIndex: 1, completedStepIds })).toBe(
      'completed',
    )
  })

  it('greys a step marked disabled instead of showing it as completed', () => {
    expect(
      resolveStepStatus({ step: { ...steps[0], disabled: true }, index: 0, activeStepIndex: 2 }),
    ).toBe('upcoming')
  })

  it('keeps the current step active even when it is listed as completed', () => {
    const completedStepIds = new Set(['delivery'])

    expect(resolveStepStatus({ step: steps[1], index: 1, activeStepIndex: 1, completedStepIds })).toBe(
      'active',
    )
  })
})

describe('isStepDisabled', () => {
  it('blocks steps ahead of us', () => {
    expect(isStepDisabled(steps[0], 'upcoming', false)).toBe(true)
  })

  it('leaves the active and completed steps enabled', () => {
    expect(isStepDisabled(steps[0], 'active', false)).toBe(false)
    expect(isStepDisabled(steps[0], 'completed', false)).toBe(false)
  })

  it('honours a step marked disabled regardless of its position', () => {
    expect(isStepDisabled({ ...steps[0], disabled: true }, 'completed', false)).toBe(true)
  })

  it('leaves a step ahead of us open when the stepper is non-linear', () => {
    expect(isStepDisabled(steps[0], 'upcoming', true)).toBe(false)
  })

  it('still honours a step marked disabled when the stepper is non-linear', () => {
    expect(isStepDisabled({ ...steps[0], disabled: true }, 'upcoming', true)).toBe(true)
  })
})

describe('buildStepViews', () => {
  it('describes every step with a status, a block flag and its position', () => {
    const views = buildStepViews(steps, { activeStepIndex: 1 })

    expect(views.map((view) => view.status)).toEqual(['completed', 'active', 'upcoming'])
    expect(views.map((view) => view.isDisabled)).toEqual([false, false, true])
    expect(views.map((view) => view.index)).toEqual([0, 1, 2])
    expect(views[0].isFirstStep).toBe(true)
    expect(views[2].isLastStep).toBe(true)
  })

  it('passes custom step fields through to the view', () => {
    const richSteps = steps.map((step) => ({ ...step, formKey: `form-${step.id}` }))
    const views = buildStepViews(richSteps, { activeStepIndex: 0 })

    expect(views[1].step.formKey).toBe('form-delivery')
  })

  it('hands status resolution over to a custom resolver', () => {
    const everythingDone: StepStatusResolver = () => 'completed'
    const views = buildStepViews(steps, { activeStepIndex: 0, resolveStatus: everythingDone })

    expect(views.every((view) => view.status === 'completed')).toBe(true)
    expect(views.every((view) => !view.isDisabled)).toBe(true)
  })

  it('returns an empty array for an empty list', () => {
    expect(buildStepViews([], { activeStepIndex: 0 })).toEqual([])
  })
})
