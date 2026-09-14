import type { CSSProperties } from 'react'

export const STEP_SIZE_VAR = '--stepper-step-size'

export const stepperSizes = {
  iconSize: '1.5rem',
  checkIconSize: '0.75rem',

  connectorThickness: '0.0625rem',
  lineEndGap: '0.375rem',
  lineOffset: '0.71875rem',
  lineInset: '1.125rem',

  focusOutlineWidth: '0.125rem',
  focusOutlineOffset: '0.125rem',

  rootPaddingBlock: '0.5rem',
  horizontalStepPaddingInline: '0.5rem',
  buttonPaddingBlock: '0.25rem',
  buttonPaddingInline: '0.5rem',

  verticalIconGap: '0.75rem',
  verticalContentIndent: '2.25rem',
  iconWithGaps: '2.25rem',
  verticalStepSize: '5.375rem',
  verticalLabelCapOffset: '0.228rem',

  horizontalLabelFontSize: '0.875rem',
  horizontalLabelLineHeight: '1.25rem',
  horizontalLabelParagraphGap: '0.875rem',

  verticalLabelFontSize: '1rem',
  verticalLabelLineHeight: '1.5rem',
  verticalLabelParagraphGap: '0rem',
}

const toCssLength = (value: number | string): string => {
  if (typeof value === 'number') {
    return `${value}rem`
  }

  return value
}

export const resolveStepSizeStyle = (lineLength?: number | string): CSSProperties | undefined => {
  if (lineLength === undefined) {
    return undefined
  }

  return {
    [STEP_SIZE_VAR]: `calc(${stepperSizes.iconWithGaps} + ${toCssLength(lineLength)})`,
  } as CSSProperties
}
