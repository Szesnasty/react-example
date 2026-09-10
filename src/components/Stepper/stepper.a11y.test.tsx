import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { decomposeColor, getContrastRatio, recomposeColor, ThemeProvider } from '@mui/material'
import axe from 'axe-core'

import { theme } from '../../theme'
import { Stepper } from './Stepper'
import type { StepItem, StepStatus } from './stepper.models'
import {
  activeStepLabelColor,
  stepIconStatusColors,
  stepLabelColor,
} from './styled/stepper.colors'

/** WCAG 1.4.3 level AA for text below 18.66px, which is what the labels use. */
const MINIMUM_CONTRAST_RATIO = 4.5

const STEP_STATUSES: StepStatus[] = ['completed', 'active', 'upcoming']

const steps: StepItem[] = [
  { id: 'cart', label: 'Koszyk', caption: 'Sprawdź produkty' },
  { id: 'delivery', label: 'Dostawa', caption: 'Adres i kurier' },
  { id: 'payment', label: 'Płatność', caption: 'Wybierz metodę' },
]

/** MUI palette text colours are semi-transparent, so they must be flattened before measuring. */
const flattenOverBackground = (foreground: string, background: string) => {
  const foregroundColor = decomposeColor(foreground)
  const backgroundColor = decomposeColor(background)
  const [red, green, blue, alpha = 1] = foregroundColor.values

  return recomposeColor({
    type: 'rgb',
    values: [red, green, blue].map((channel, index) =>
      Math.round(channel * alpha + backgroundColor.values[index] * (1 - alpha)),
    ) as [number, number, number],
  })
}

const contrastRatio = (foreground: string, background: string) =>
  getContrastRatio(flattenOverBackground(foreground, background), background)

describe('Stepper contrast', () => {
  const iconColors = stepIconStatusColors(theme)
  const surfaceColor = theme.palette.background.paper

  it.each(STEP_STATUSES)('keeps a glyph inside the %s circle readable', (status) => {
    const { foreground, background } = iconColors[status]

    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(MINIMUM_CONTRAST_RATIO)
  })

  it('keeps the label colour readable on the surface', () => {
    expect(contrastRatio(stepLabelColor(theme), surfaceColor)).toBeGreaterThanOrEqual(
      MINIMUM_CONTRAST_RATIO,
    )
  })

  it('keeps the active label colour readable on the surface', () => {
    expect(contrastRatio(activeStepLabelColor(theme), surfaceColor)).toBeGreaterThanOrEqual(
      MINIMUM_CONTRAST_RATIO,
    )
  })
})

const stepperVariants: Record<string, ReactElement> = {
  horizontal: <Stepper steps={steps} activeStepIndex={1} aria-label="Postęp zamówienia" />,
  vertical: (
    <Stepper
      steps={steps.map((step) => ({ ...step, content: `Treść ${step.label}` }))}
      activeStepIndex={1}
      orientation="vertical"
      aria-label="Postęp zamówienia"
    />
  ),
  interactive: (
    <Stepper
      steps={steps}
      activeStepIndex={1}
      onStepChange={() => {}}
      aria-label="Postęp zamówienia"
    />
  ),
}

/** Contrast is covered above instead: jsdom cannot resolve rendered colours for axe. */
const axeOptions: axe.RunOptions = { rules: { 'color-contrast': { enabled: false } } }

describe('Stepper axe audit', () => {
  it.each(Object.entries(stepperVariants))('reports no violations for %s', async (_name, ui) => {
    const { container } = render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

    const { violations } = await axe.run(container, axeOptions)

    expect(violations.map((violation) => `${violation.id} (${violation.impact})`)).toEqual([])
  })
})
