import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CssBaseline } from '@mui/material'
import { decomposeColor, recomposeColor, ThemeProvider } from '@mui/material'
import { stepLabelClasses } from '@mui/material/StepLabel'

import { Stepper } from './Stepper'
import type { StepItem } from './stepper.models'
import { DEFAULT_STEP_STATUS_LABELS } from './stepper.utils'
import { stepIconStatusColors } from './styled/stepper.colors'
import { theme } from '../../theme'

const steps: StepItem[] = [
  { id: 'cart', label: 'Koszyk' },
  { id: 'delivery', label: 'Dostawa' },
  { id: 'payment', label: 'Płatność' },
  { id: 'summary', label: 'Podsumowanie' },
]

const stepsWithContent = steps.map((step) => ({ ...step, content: `Treść ${step.label}` }))

const renderInTheme = (ui: ReactElement) =>
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>,
  )

const toRgb = (color: string) => recomposeColor(decomposeColor(color))

const stepStatuses = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-status]')).map((node) =>
    node.getAttribute('data-status'),
  )

describe('Stepper', () => {
  it('renders every step label', () => {
    renderInTheme(<Stepper steps={steps} activeStepIndex={1} />)

    for (const step of steps) {
      expect(screen.getByText(String(step.label))).toBeInTheDocument()
    }
  })

  it('splits the steps into completed, active and upcoming', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={2} />)

    expect(stepStatuses(container)).toEqual(['completed', 'completed', 'active', 'upcoming'])
  })

  it('shows the check only on completed steps', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={2} />)

    const completedIcons = container.querySelectorAll('[data-status="completed"]')

    expect(completedIcons).toHaveLength(2)
    for (const icon of completedIcons) {
      expect(icon.querySelector('svg')).toBeInTheDocument()
    }
    expect(container.querySelector('[data-status="active"] svg')).toBeNull()
    expect(container.querySelector('[data-status="upcoming"] svg')).toBeNull()
  })

  it('never numbers the steps', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={2} />)

    for (const icon of container.querySelectorAll('[data-status]')) {
      expect(icon).toHaveTextContent('')
    }
  })

  it('paints every circle from the palette', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={2} />)
    const paletteColors = stepIconStatusColors(theme)

    for (const icon of container.querySelectorAll('[data-status]')) {
      const status = icon.getAttribute('data-status') as keyof typeof paletteColors
      const { backgroundColor, color } = getComputedStyle(icon)

      expect(backgroundColor).toBe(toRgb(paletteColors[status].background))
      expect(color).toBe(toRgb(paletteColors[status].foreground))
    }
  })

  it('marks the current step with aria-current', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={1} />)

    const current = container.querySelectorAll('[aria-current="step"]')

    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent('Dostawa')
  })

  it('exposes upcoming steps as disabled', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={1} />)

    expect(container.querySelectorAll('.Mui-disabled').length).toBeGreaterThan(0)
  })

  it('clamps an out-of-range activeStep instead of losing its state', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={99} />)

    expect(stepStatuses(container)).toEqual(['completed', 'completed', 'completed', 'active'])
  })

  it('tracks the active step itself when activeStep is not given', () => {
    const { container } = renderInTheme(<Stepper steps={steps} defaultActiveStepIndex={1} />)

    expect(stepStatuses(container)).toEqual(['completed', 'active', 'upcoming', 'upcoming'])
  })

  it('blocks a step marked disabled even when it is already behind us', () => {
    const withDisabled = steps.map((step) =>
      step.id === 'cart' ? { ...step, disabled: true } : step,
    )

    renderInTheme(<Stepper steps={withDisabled} activeStepIndex={2} onStepChange={vi.fn()} />)

    expect(screen.getByRole('tab', { name: /Koszyk/ })).toBeDisabled()
  })

  it('greys a disabled step out instead of showing it as completed', () => {
    const withDisabled = steps.map((step) =>
      step.id === 'payment' ? { ...step, disabled: true } : step,
    )

    const { container } = renderInTheme(<Stepper steps={withDisabled} activeStepIndex={3} />)

    expect(stepStatuses(container)).toEqual(['completed', 'completed', 'upcoming', 'active'])
  })

  it('turns lineLength into the room one step takes', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps} activeStepIndex={1} lineLength={7} />,
    )

    expect(container.querySelector('ol')).toHaveStyle({
      '--stepper-step-size': 'calc(2.25rem + 7rem)',
    })
  })

  it('takes a CSS length for lineLength as it is', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps} activeStepIndex={1} lineLength="9rem" />,
    )

    expect(container.querySelector('ol')).toHaveStyle({
      '--stepper-step-size': 'calc(2.25rem + 9rem)',
    })
  })

  it('handles an empty list of steps', () => {
    const { container } = renderInTheme(<Stepper steps={[]} />)

    expect(within(container).queryAllByRole('listitem')).toHaveLength(0)
  })
})

describe('Stepper — accessibility', () => {
  it('announces the status of every step next to its label', () => {
    renderInTheme(<Stepper steps={steps} activeStepIndex={2} />)

    expect(screen.getAllByText(DEFAULT_STEP_STATUS_LABELS.completed)).toHaveLength(2)
    expect(screen.getAllByText(DEFAULT_STEP_STATUS_LABELS.active)).toHaveLength(1)
    expect(screen.getAllByText(DEFAULT_STEP_STATUS_LABELS.upcoming)).toHaveLength(1)
  })

  it('folds the status into the accessible name of a clickable step', () => {
    renderInTheme(<Stepper steps={steps} activeStepIndex={2} onStepChange={vi.fn()} />)

    expect(
      screen.getByRole('tab', { name: `Koszyk ${DEFAULT_STEP_STATUS_LABELS.completed}` }),
    ).toBeInTheDocument()
  })

  it('lets the announced status be translated', () => {
    renderInTheme(
      <Stepper
        steps={steps}
        activeStepIndex={0}
        stepStatusLabels={{ active: 'current step' }}
      />,
    )

    expect(screen.getByText('current step')).toBeInTheDocument()
    expect(screen.getAllByText(DEFAULT_STEP_STATUS_LABELS.upcoming)).toHaveLength(3)
  })

  it('hides the decorative circle from assistive tech', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={1} />)

    for (const icon of container.querySelectorAll('[data-status]')) {
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('marks the current tab with aria-selected instead of aria-current', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps} activeStepIndex={1} onStepChange={vi.fn()} />,
    )

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Dostawa')
    expect(container.querySelector('[aria-current]')).toBeNull()
  })

  it('keeps list semantics when the steps are not clickable', () => {
    renderInTheme(<Stepper steps={steps} activeStepIndex={1} aria-label="Zamówienie" />)

    expect(screen.getByRole('list', { name: 'Zamówienie' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(steps.length)
  })

  it('switches to tablist semantics when the steps are clickable', () => {
    renderInTheme(<Stepper steps={steps} activeStepIndex={1} onStepChange={vi.fn()} />)

    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})

describe('Stepper — orientation', () => {
  it('puts the label under the circle when horizontal', () => {
    const { container } = renderInTheme(<Stepper steps={steps} activeStepIndex={1} />)

    expect(container.querySelector(`.${stepLabelClasses.alternativeLabel}`)).toBeInTheDocument()
  })

  it('puts the label beside the circle when vertical', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps} activeStepIndex={1} orientation="vertical" />,
    )

    expect(container.querySelector(`.${stepLabelClasses.alternativeLabel}`)).toBeNull()
    expect(container.querySelector(`.${stepLabelClasses.vertical}`)).toBeInTheDocument()
  })

  it('does not render step content horizontally', () => {
    renderInTheme(<Stepper steps={stepsWithContent} activeStepIndex={1} orientation="horizontal" />)

    expect(screen.queryByText('Treść Dostawa')).not.toBeInTheDocument()
  })

  it('expands the content of the current step only', () => {
    renderInTheme(<Stepper steps={stepsWithContent} activeStepIndex={1} orientation="vertical" />)

    expect(screen.getByText('Treść Dostawa')).toBeInTheDocument()
    expect(screen.queryByText('Treść Koszyk')).not.toBeInTheDocument()
  })
})

describe('Stepper — interactive mode', () => {
  it('reports the clicked step together with its data', async () => {
    const user = userEvent.setup()
    const onStepChange = vi.fn()

    renderInTheme(<Stepper steps={steps} activeStepIndex={2} onStepChange={onStepChange} />)
    await user.click(screen.getByRole('tab', { name: /Koszyk/ }))

    expect(onStepChange).toHaveBeenCalledWith(0, steps[0])
  })

  it('does not allow jumping to a step ahead of us', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const onStepChange = vi.fn()

    renderInTheme(<Stepper steps={steps} activeStepIndex={1} onStepChange={onStepChange} />)

    const upcoming = screen.getByRole('tab', { name: /Płatność/ })
    expect(upcoming).toBeDisabled()

    await user.click(upcoming)
    expect(onStepChange).not.toHaveBeenCalled()
  })

  it('renders plain labels without onStepChange', () => {
    renderInTheme(<Stepper steps={steps} activeStepIndex={1} />)

    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })

  it('moves to the clicked step on its own when uncontrolled', async () => {
    const user = userEvent.setup()
    const { container } = renderInTheme(
      <Stepper steps={steps} defaultActiveStepIndex={2} onStepChange={vi.fn()} />,
    )

    await user.click(screen.getByRole('tab', { name: /Koszyk/ }))

    expect(stepStatuses(container)).toEqual(['active', 'upcoming', 'upcoming', 'upcoming'])
  })
})

describe('Stepper — extension points', () => {
  it('lets completedIds decide completion instead of the position', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps} activeStepIndex={2} completedStepIds={['cart', 'summary']} />,
    )

    expect(stepStatuses(container)).toEqual(['completed', 'upcoming', 'active', 'completed'])
  })

  it('opens every step for selection in non-linear mode', async () => {
    const user = userEvent.setup()
    const onStepChange = vi.fn()

    renderInTheme(
      <Stepper
        steps={steps}
        activeStepIndex={0}
        completedStepIds={[]}
        onStepChange={onStepChange}
      />,
    )
    await user.click(screen.getByRole('tab', { name: /Podsumowanie/ }))

    expect(onStepChange).toHaveBeenCalledWith(3, steps[3])
  })

  it('still blocks a step marked disabled in non-linear mode', () => {
    const withDisabled = steps.map((step) =>
      step.id === 'summary' ? { ...step, disabled: true } : step,
    )

    renderInTheme(
      <Stepper
        steps={withDisabled}
        activeStepIndex={0}
        completedStepIds={[]}
        onStepChange={vi.fn()}
      />,
    )

    expect(screen.getByRole('tab', { name: /Podsumowanie/ })).toBeDisabled()
  })

  it('replaces the whole status rule through resolveStepStatus', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps} activeStepIndex={0} resolveStepStatus={() => 'completed'} />,
    )

    expect(stepStatuses(container)).toEqual(Array(steps.length).fill('completed'))
  })

  it('replaces the icon content through renderStepIcon', () => {
    renderInTheme(
      <Stepper
        steps={steps}
        activeStepIndex={1}
        renderStepIcon={({ index, status }) => <span>{`${index}:${status}`}</span>}
      />,
    )

    expect(screen.getByText('1:active')).toBeInTheDocument()
    expect(screen.getByText('0:completed')).toBeInTheDocument()
  })

  it('replaces the label content through renderStepLabel', () => {
    renderInTheme(
      <Stepper
        steps={steps}
        activeStepIndex={0}
        renderStepLabel={({ step, index }) => `${index + 1}. ${step.label}`}
      />,
    )

    expect(screen.getByText('1. Koszyk')).toBeInTheDocument()
  })

  it('gives step.icon priority over the check and the number', () => {
    const { container } = renderInTheme(
      <Stepper steps={steps.map((step) => ({ ...step, icon: '★' }))} activeStepIndex={1} />,
    )

    const completed = container.querySelector('[data-status="completed"]')!

    expect(completed).toHaveTextContent('★')
    expect(completed.querySelector('svg')).toBeNull()
  })

  it('passes custom step fields through to the render props', () => {
    const richSteps = steps.map((step) => ({ ...step, hint: `hint-${step.id}` }))

    renderInTheme(
      <Stepper
        steps={richSteps}
        activeStepIndex={0}
        renderStepLabel={({ step }) => <span>{step.hint}</span>}
      />,
    )

    expect(screen.getByText('hint-cart')).toBeInTheDocument()
  })

  it('renders the step caption', () => {
    renderInTheme(
      <Stepper steps={[{ id: 'cart', label: 'Koszyk', caption: 'Sprawdź' }]} activeStepIndex={0} />,
    )

    expect(screen.getByText('Sprawdź')).toBeInTheDocument()
  })
})
