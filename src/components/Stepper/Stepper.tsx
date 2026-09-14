import { StyledStep, StyledStepper } from './styled'
import type { StepItem, StepperProps } from './stepper.models'
import { useStepperView } from './useStepperView'

/**
 * Progress through a sequence of steps, described by data rather than children.
 *
 * The current step is always held outside: pass `activeStepIndex` and, if the steps should be
 * clickable, `onStepChange`. Without a handler the steps render as a plain list that cannot be
 * navigated — which is also what screen readers are told.
 *
 * @example
 * const { activeStepIndex, goToStep } = useStepper({ totalSteps: steps.length })
 *
 * <Stepper steps={steps} activeStepIndex={activeStepIndex} onStepChange={goToStep} />
 */
export const Stepper = <TStep extends StepItem = StepItem>(stepperProps: StepperProps<TStep>) => {
  const {
    activeStepIndex,
    orientation,
    hasLabelUnderIcon,
    rootProps,
    rootStyle,
    stepModels,
  } = useStepperView(stepperProps)

  return (
    <StyledStepper
      activeStep={activeStepIndex}
      orientation={orientation}
      alternativeLabel={hasLabelUnderIcon}
      // MUI's connector is a flex item positioned from the middle of each step, so it needs every
      // step to be the same width. Each step draws its own half of the line instead.
      connector={null}
      className={stepperProps.className}
      sx={stepperProps.sx}
      aria-label={stepperProps['aria-label']}
      style={rootStyle}
      {...rootProps}
    >
      {stepModels.map((stepModel) => (
        <StyledStep
          key={stepModel.step.id}
          active={stepModel.isActive}
          completed={stepModel.isCompleted}
          disabled={stepModel.isDisabled}
          aria-current={stepModel.ariaCurrent}
          data-step-status={stepModel.status}
        >
          {stepModel.bodyElement}
          {stepModel.contentElement}
        </StyledStep>
      ))}
    </StyledStepper>
  )
}
