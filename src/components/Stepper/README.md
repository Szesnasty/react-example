# Stepper

Progress through a sequence of steps, described by data rather than children. Built on MUI's
`Stepper`, styled entirely from the theme palette, horizontal or vertical.

The current step always lives outside the component. Pass `activeStepIndex`; add `onStepChange`
when the steps should be clickable.

Run `npm run storybook` for the variants and the generated props table. What follows is only what
Storybook cannot show you.

## Putting it together

`useStepper` holds the step, so the stepper and the buttons next to it share one source of truth.
The handler decides whether a move happens at all — here the second step is locked until the
address is confirmed, while going back stays open.

```tsx
import { Stepper, useStepper } from '../components/Stepper'

const PANEL_ID = 'checkout-panel'

const CheckoutWizard = () => {
  const { activeStepIndex, isFirstStep, isLastStep, goToStep, goToPreviousStep } = useStepper({
    totalSteps: steps.length,
  })
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false)

  const requestStep = (stepIndex: number) => {
    if (stepIndex > activeStepIndex && activeStepIndex === 1 && !isAddressConfirmed) {
      return
    }

    goToStep(stepIndex)
  }

  return (
    <>
      <Stepper
        steps={steps.map((step) => ({ ...step, controlsElementId: PANEL_ID }))}
        activeStepIndex={activeStepIndex}
        onStepChange={requestStep}
        aria-label="Postęp zamówienia"
      />

      <section id={PANEL_ID} role="tabpanel">
        {steps[activeStepIndex].label}
      </section>

      <Button onClick={goToPreviousStep} disabled={isFirstStep}>
        Wstecz
      </Button>
      <Button onClick={() => requestStep(activeStepIndex + 1)} disabled={isLastStep}>
        Dalej
      </Button>
    </>
  )
}
```

Blocking works only because the stepper holds no step of its own: it reports the click and waits.

## Accessibility

Handled for you:

- clickable steps become a tablist with roving arrow-key navigation; without `onStepChange` the
  steps are a plain list with `role="list"` and `aria-current="step"`
- each label carries a visually hidden status, so the state never rests on colour alone; the
  wording comes from i18next under `stepper.status.*`, with the Polish default built in, and
  `stepStatusLabels` overrides it for one instance

Yours to do: give each step a `controlsElementId` pointing at the element it reveals, and name the
stepper with `aria-label`. MUI asks every clickable step to name the section it controls.

## Where things live

| file | holds |
| --- | --- |
| `Stepper.tsx` | markup only |
| `useStepperView.ts` | props turned into ready-to-render steps |
| `useStepper.ts` | the step and the moves around it |
| `stepper.renderers.tsx` | the elements a step is built from |
| `stepper.utils.ts` | pure logic: statuses, clamping, ARIA decisions |
| `stepper.models.ts` | types |
| `styled/` | every style, plus the sizes and palette lookups |

`stepper.renderers.tsx` holds functions rather than components on purpose: MUI detects its tablist
mode by finding `StepButton` as a direct child of `Step`, and wrapping it in a component breaks
keyboard navigation.
