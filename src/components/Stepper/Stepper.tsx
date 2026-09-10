import { StyledStep, StyledStepper } from './styled'
import type { StepItem, StepperProps } from './stepper.models'
import { useStepperView } from './useStepperView'

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
