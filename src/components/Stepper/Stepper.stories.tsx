import { useState } from 'react'
import Box from '@mui/material/Box'
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
  content: `Treść kroku „${String(step.label)}”.`,
}))

const CHECKOUT_PANEL_ID = 'checkout-panel'

const CheckoutWizard = (stepperProps: StepperProps) => {
  const { activeStepIndex, isFirstStep, isLastStep, goToNextStep, goToPreviousStep, goToStep } =
    useStepper({
      totalSteps: stepperProps.steps.length,
      defaultActiveStepIndex: 1,
    })

  return (
    <Stack spacing={3}>
      <Stepper
        {...stepperProps}
        steps={stepperProps.steps.map((step) => ({
          ...step,
          controlsElementId: CHECKOUT_PANEL_ID,
        }))}
        activeStepIndex={activeStepIndex}
        onStepChange={goToStep}
      />
      <Paper variant="outlined" id={CHECKOUT_PANEL_ID} role="tabpanel" sx={{ p: 2 }}>
        <Typography>{stepperProps.steps[activeStepIndex].label}</Typography>
      </Paper>
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

const STORY_MAX_WIDTH = '44rem'

const CONTAINER_WIDTHS = ['100%', '34rem', '19rem']

const LineLengthShowcase = (stepperProps: StepperProps) => (
  <Stack spacing={4}>
    {CONTAINER_WIDTHS.map((width) => (
      <Stack key={width} spacing={1}>
        <Typography variant="overline" color="text.secondary">
          kontener {width}
        </Typography>
        <Box sx={{ width, outline: '1px dashed', outlineColor: 'divider', p: 2 }}>
          <Stack spacing={3}>
            <Stepper {...stepperProps} lineLength={undefined} />
            <Stepper {...stepperProps} />
          </Stack>
        </Box>
      </Stack>
    ))}
  </Stack>
)

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: STORY_MAX_WIDTH }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    steps,
    activeStepIndex: 2,
    orientation: 'horizontal',
  },
  argTypes: {
    steps: {
      control: 'object',
      description:
        'Kroki opisane danymi — tablica obiektów `StepItem`. Edytuj ją tutaj, żeby zobaczyć, jak stepper reaguje.',
      table: {
        type: {
          summary: 'StepItem[]',
          detail: [
            '{',
            '  id: string | number      // klucz listy, wartość w onStepChange',
            '  label: ReactNode         // tytuł kroku',
            '  caption?: ReactNode      // podpis pod tytułem',
            '  content?: ReactNode      // treść pod krokiem, tylko orientation="vertical"',
            '  icon?: ReactNode         // zamiast ptaszka i pustego kółka',
            '  disabled?: boolean       // krok trwale niedostępny',
            '}',
          ].join('\n'),
        },
      },
    },
    activeStepIndex: {
      control: { type: 'number', min: 0, max: steps.length - 1 },
      description: 'Bieżący krok. Stepper go tylko odzwierciedla — stanem zarządza rodzic.',
    },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    lineLength: {
      control: { type: 'number', min: 0, step: 0.5 },
      description:
        'Długość kreski między kółkami, w remach. Bez niej poziomy stepper rozkłada się ' +
        'równomiernie na całą szerokość kontenera.',
    },
    completedStepIds: {
      control: false,
      description:
        'Włącza tryb nieliniowy: ukończenie bierze się z tej listy zamiast z pozycji kroku, ' +
        'a żaden krok nie jest blokowany tym, że stoi przed bieżącym.',
    },
    stepStatusLabels: {
      control: false,
      description:
        'Nadpisuje treść statusu czytaną przez czytniki ekranu, np. żeby ją przetłumaczyć.',
    },
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

/** `disabled: true` greys a step out and blocks it, even when it is already behind us. */
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

/**
 * Hover darkens the circle and nothing else — the label and the space around it stay untouched.
 *
 * `storybook-addon-pseudo-states` holds the completed circles in their hover state so the shade
 * can be compared with the untouched ones next to them; the addon does not run on the Docs page,
 * which is why the same story looks unhovered there.
 */
export const HoverAccent: Story = {
  parameters: { pseudo: { hover: ['[data-status="completed"]'] } },
  render: (args) => (
    <Stack spacing={4}>
      <Stepper {...args} />
      <Stepper {...args} orientation="vertical" />
    </Stack>
  ),
}

/**
 * Non-linear: completion comes from `completedStepIds`, so a skipped step gets no check and every
 * step stays open — position no longer blocks anything, only `disabled` on the step itself does.
 */
export const NonLinear: Story = {
  render: (args) => <NonLinearCheckoutWizard {...args} />,
}

/**
 * Left alone the steps share their container out between them, so the stepper follows whatever
 * width it is given. `lineLength` caps how far they grow, which is how the stepper keeps its
 * shape in a container far wider than it needs — the upper stepper in each box has no length set,
 * the lower one is held to the value in the control. A narrow container squeezes both rather than
 * being overflowed.
 */
export const LineLength: Story = {
  args: { lineLength: 6, steps: steps.map(({ id, label }) => ({ id, label })) },
  render: (args) => <LineLengthShowcase {...args} />,
}

/** `step.icon` takes the place of the check inside the circle. */
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

/**
 * Bez `onStepChange` kroki nie są klikalne: stepper zostaje zwykłą listą z `aria-current="step"`
 * zamiast zakładek. To tryb dla wskaźnika postępu, po którym nie da się nawigować.
 */
export const ReadOnly: Story = {
  args: { onStepChange: undefined },
}

export const OnSurface: Story = {
  render: (args) => (
    <Paper variant="outlined" sx={{ p: 3, maxWidth: '45rem' }}>
      <Stepper {...args} />
    </Paper>
  ),
}
