import MuiStepButton from '@mui/material/StepButton'

import { StepStatusIcon } from './StepStatusIcon'
import {
  StyledStepContent,
  StyledStepLabel,
  StyledVisuallyHiddenText,
} from './styled'
import type {
  StepBodyElements,
  StepItem,
  StepperOrientation,
  StepRenderer,
  StepView,
} from './stepper.models'

export const renderStepIconElement = <TStep extends StepItem>(
  view: StepView<TStep>,
  renderStepIcon?: StepRenderer<TStep>,
) => {
  if (renderStepIcon) {
    return renderStepIcon(view)
  }

  return <StepStatusIcon status={view.status} icon={view.step.icon} />
}

const renderVisibleLabel = <TStep extends StepItem>(
  view: StepView<TStep>,
  renderStepLabel?: StepRenderer<TStep>,
) => {
  if (renderStepLabel) {
    return renderStepLabel(view)
  }

  return view.step.label
}

export const renderStepLabelElement = <TStep extends StepItem>(
  view: StepView<TStep>,
  statusLabel: string,
  renderStepLabel?: StepRenderer<TStep>,
) => (
  <>
    <span>{renderVisibleLabel(view, renderStepLabel)}</span>
    <StyledVisuallyHiddenText>{statusLabel}</StyledVisuallyHiddenText>
  </>
)

export const renderStepContentElement = <TStep extends StepItem>(
  view: StepView<TStep>,
  orientation: StepperOrientation,
) => {
  if (orientation === 'horizontal' || !view.step.content) {
    return null
  }

  return <StyledStepContent>{view.step.content}</StyledStepContent>
}

export const renderStepBodyElement = ({
  iconElement,
  labelElement,
  captionElement,
  controlsElementId,
  onSelect,
}: StepBodyElements) => {
  if (!onSelect) {
    return (
      <StyledStepLabel icon={iconElement} optional={captionElement}>
        {labelElement}
      </StyledStepLabel>
    )
  }

  return (
    <MuiStepButton
      onClick={onSelect}
      icon={iconElement}
      optional={captionElement}
      aria-controls={controlsElementId}
      disableRipple
    >
      <StyledStepLabel>{labelElement}</StyledStepLabel>
    </MuiStepButton>
  )
}
