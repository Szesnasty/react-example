import { StyledStep, StyledStepper } from './styled'
import type { StepItem, StepperProps } from './stepper.models'
import { useStepperView } from './useStepperView'

export const Stepper = <TStep extends StepItem = StepItem>(stepperProps: StepperProps<TStep>) => {
  const {
    activeStepIndex,
    orientation,
    hasLabelUnderIcon,
    connectorElement,
    rootProps,
    rootStyle,
    stepModels,
  } = useStepperView(stepperProps)

  return (
    <StyledStepper
      activeStep={activeStepIndex}
      orientation={orientation}
      alternativeLabel={hasLabelUnderIcon}
      connector={connectorElement}
      className={stepperProps.className}
      sx={stepperProps.sx}
      aria-label={stepperProps['aria-label']}
      style={rootStyle}
      {...rootProps}
    >
      {stepModels.map((stepModel) => (
        <StyledStep
          key={stepModel.key}
          active={stepModel.isActive}
          completed={stepModel.isCompleted}
          disabled={stepModel.isDisabled}
          aria-current={stepModel.ariaCurrent}
        >
          {stepModel.bodyElement}
          {stepModel.contentElement}
        </StyledStep>
      ))}
    </StyledStepper>
  )
}
