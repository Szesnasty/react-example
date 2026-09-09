import { useState } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stepper } from './Stepper'
import type { StepId, StepItem, StepperProps } from './stepper.models'
import { useStepper } from './useStepper'

const steps: StepItem[] = [
  { id: 'cart', label: 'Koszyk', caption: 'Sprawdź produkty' },
  { id: 'delivery', label: 'Dostawa', caption: 'Adres i kurier' },
  { id: 'payment', label: 'Płatność', caption: 'Wybierz metodę' },
  { id: 'summary', label: 'Podsumowanie', caption: 'Potwierdź zamówienie' },
]

const stepsWithContent: StepItem[] = steps.map((step) => ({
  ...step,
  content: (
    <Typography variant="body2" sx={{ py: 1 }}>
      Treść kroku „{step.label}”.
    </Typography>
  ),
}))

const CheckoutWizard = (stepperProps: StepperProps) => {
  const { activeStepIndex, isFirstStep, isLastStep, goToNextStep, goToPreviousStep, goToStep } =
    useStepper({
      totalSteps: stepperProps.steps.length,
      defaultActiveStepIndex: 1,
    })

  return (
    <Stack spacing={3}>
      <Stepper {...stepperProps} activeStepIndex={activeStepIndex} onStepChange={goToStep} />
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={goToPreviousStep} disabled={isFirstStep}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={goToNextStep} disabled={isLastStep}>
          Dalej
        </Button>
      </Stack>
    </Stack>
  )
}

const NonLinearCheckoutWizard = (stepperProps: StepperProps) => {
  const [completedStepIds, setCompletedStepIds] = useState<StepId[]>(['cart'])
  const { activeStepIndex, goToStep } = useStepper({
    totalSteps: stepperProps.steps.length,
    defaultActiveStepIndex: 2,
  })

  const markCurrentStepCompleted = () =>
    setCompletedStepIds((ids) => [...new Set([...ids, stepperProps.steps[activeStepIndex].id])])

  return (
    <Stack spacing={3}>
      <Stepper
        {...stepperProps}
        activeStepIndex={activeStepIndex}
        completedStepIds={completedStepIds}
        onStepChange={goToStep}
      />
      <Button variant="contained" sx={{ alignSelf: 'flex-start' }} onClick={markCurrentStepCompleted}>
        Oznacz bieżący krok jako ukończony
      </Button>
    </Stack>
  )
}

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  args: {
    steps,
    activeStepIndex: 2,
    orientation: 'horizontal',
  },
  argTypes: {
    steps: { control: false },
    activeStepIndex: { control: { type: 'number', min: 0, max: steps.length - 1 } },
    defaultActiveStepIndex: { control: { type: 'number', min: 0 } },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    isInteractive: { control: 'boolean' },
    completedStepIds: { control: false },
    stepStatusLabels: { control: false },
    onStepChange: { action: 'onStepChange' },
    resolveStepStatus: { control: false },
    renderStepIcon: { control: false },
    renderStepLabel: { control: false },
    sx: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Completed steps get a check, the active one is a filled `palette.primary.main` circle, and steps ahead are greyed out with `palette.grey[200]` and blocked. Horizontal puts the label under the circle, vertical beside it. Every colour comes from the theme palette, and each step carries a screen-reader status next to its label.',
      },
    },
  },
} satisfies Meta<StepperProps>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
}

/** `disabled: true` greys a step out even when it is already behind us. */
export const DisabledStep: Story = {
  args: {
    activeStepIndex: 3,
    steps: steps.map((step) => (step.id === 'payment' ? { ...step, disabled: true } : step)),
  },
}

/** A vertical stepper expands the `content` of the active step. */
export const WithContent: Story = {
  args: { orientation: 'vertical', steps: stepsWithContent },
}

/** `useStepper` drives the buttons next to the stepper; `onStepChange` allows going back. */
export const Interactive: Story = {
  render: (args) => <CheckoutWizard {...args} />,
}

/** Hover accent: only the circle gets a ring, the label and the space around it stay untouched. */
export const HoverAccent: Story = {
  args: { isInteractive: true },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Stack spacing={4}>
      <Stepper {...args} />
      <Stepper {...args} orientation="vertical" />
    </Stack>
  ),
}

/** Non-linear: completion comes from `completedStepIds`, so a skipped step gets no check. */
export const NonLinear: Story = {
  render: (args) => <NonLinearCheckoutWizard {...args} />,
}

/** `step.icon` replaces the check and the number for a single step. */
export const CustomIcon: Story = {
  args: {
    steps: steps.map((step, index) => ({ ...step, icon: ['🛒', '🚚', '💳', '✅'][index] })),
  },
}

/** `renderStepLabel` takes over the label content. */
export const CustomLabel: Story = {
  args: {
    renderStepLabel: ({ step, index }) => (
      <Stack>
        <Typography variant="caption" color="text.secondary">
          Krok {index + 1} z {steps.length}
        </Typography>
        <Typography variant="body2">{step.label}</Typography>
      </Stack>
    ),
  },
}

/** The announced status wording is translatable through `stepStatusLabels`. */
export const TranslatedStatusLabels: Story = {
  args: {
    'aria-label': 'Checkout progress',
    stepStatusLabels: {
      completed: 'completed',
      active: 'current step',
      upcoming: 'not available yet',
    },
  },
}

export const OnSurface: Story = {
  render: (args) => (
    <Paper variant="outlined" sx={{ p: 3, maxWidth: 720 }}>
      <Stepper {...args} />
    </Paper>
  ),
}
