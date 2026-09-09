import type { Theme } from '@mui/material'

import type { StepperOrientation } from '../stepper.models'

/** Px only for the arithmetic below — every value that reaches CSS is converted to rem. */
const ICON_SIZE_PX: Record<StepperOrientation, number> = { horizontal: 32, vertical: 24 }
const ICON_GAP_PX: Record<StepperOrientation, number> = { horizontal: 8, vertical: 12 }
const CHECK_ICON_SIZE_PX: Record<StepperOrientation, number> = { horizontal: 18, vertical: 14 }
const LABEL_FONT_SIZE_PX: Record<StepperOrientation, number> = { horizontal: 14, vertical: 16 }
const LABEL_LINE_HEIGHT_PX: Record<StepperOrientation, number> = { horizontal: 20, vertical: 24 }
const LABEL_PARAGRAPH_GAP_PX: Record<StepperOrientation, number> = { horizontal: 14, vertical: 0 }

const CONNECTOR_THICKNESS_PX = 1
/** How far a line stops short of a circle — it should read as running from one to the next. */
const LINE_END_GAP_PX = 4
/** Kept apart from the line: a 1px focus ring would be too faint to spot. */
const FOCUS_OUTLINE_WIDTH_PX = 2
const FOCUS_OUTLINE_OFFSET_PX = 2

const HOVER_RING_GAP_PX = 2
const HOVER_RING_WIDTH_PX = 2
const ROOT_PADDING_BLOCK_PX = 8
const BUTTON_PADDING_BLOCK_PX = 4
const BUTTON_PADDING_INLINE_PX = 8
const VERTICAL_STEP_GAP_PX = 16

/**
 * Poppins metrics, measured against a rendered page: the content box is about 1.4em tall
 * and the top of a capital sits about 0.362em below the top of that box.
 */
const FONT_CONTENT_RATIO = 1.4
const FONT_CAP_TOP_RATIO = 0.362

const capTopOffsetPx = (fontSizePx: number, lineHeightPx: number) =>
  (lineHeightPx - FONT_CONTENT_RATIO * fontSizePx) / 2 + FONT_CAP_TOP_RATIO * fontSizePx

export type StepperOrientationSizes = {
  iconSize: string
  iconGap: string
  checkIconSize: string
  /** Distance from the left edge of a circle to the text beside it. */
  contentIndent: string
  /** Left position of a vertical line so that it runs through the centre of the circles. */
  lineOffset: string
  /** How far a horizontal line starts from the centre of its step. */
  lineInset: string
  labelFontSize: string
  labelLineHeight: string
  labelParagraphGap: string
  /** Pushes a vertical label down so the tops of its letters meet the middle of the circle. */
  labelCapOffset: string
}

export type StepperSizes = {
  horizontal: StepperOrientationSizes
  vertical: StepperOrientationSizes
  connectorThickness: string
  lineEndGap: string
  focusOutlineWidth: string
  focusOutlineOffset: string
  /** Breathing room between the circle and its hover ring. */
  hoverRingGap: string
  /** Outer edge of the hover ring, measured from the circle. */
  hoverRingOuter: string
  rootPaddingBlock: string
  buttonPaddingBlock: string
  buttonPaddingInline: string
  /** Space below a vertical step, which is also how far the line runs. */
  verticalStepGap: string
  /** `shape.borderRadius` may already be a CSS string, so only a raw number is converted. */
  buttonRadius: string
}

const orientationSizes = (
  theme: Theme,
  orientation: StepperOrientation,
): StepperOrientationSizes => {
  const toRem = theme.typography.pxToRem
  const iconSize = ICON_SIZE_PX[orientation]
  const fontSize = LABEL_FONT_SIZE_PX[orientation]
  const lineHeight = LABEL_LINE_HEIGHT_PX[orientation]

  return {
    iconSize: toRem(iconSize),
    iconGap: toRem(ICON_GAP_PX[orientation]),
    checkIconSize: toRem(CHECK_ICON_SIZE_PX[orientation]),
    contentIndent: toRem(iconSize + ICON_GAP_PX[orientation]),
    lineOffset: toRem(iconSize / 2 - CONNECTOR_THICKNESS_PX / 2),
    lineInset: toRem(iconSize / 2 + LINE_END_GAP_PX),
    labelFontSize: toRem(fontSize),
    labelLineHeight: toRem(lineHeight),
    labelParagraphGap: toRem(LABEL_PARAGRAPH_GAP_PX[orientation]),
    labelCapOffset: toRem(iconSize / 2 - capTopOffsetPx(fontSize, lineHeight)),
  }
}

/**
 * Sizes are emitted in rem so the stepper scales with the browser font size (WCAG 1.4.4).
 * They are deliberately not taken from `theme.spacing`, which is in px in a stock MUI theme —
 * the stepper stays rem-based whatever spacing unit the host project uses.
 */
export const stepperSizes = (theme: Theme): StepperSizes => {
  const toRem = theme.typography.pxToRem

  return {
    horizontal: orientationSizes(theme, 'horizontal'),
    vertical: orientationSizes(theme, 'vertical'),
    connectorThickness: toRem(CONNECTOR_THICKNESS_PX),
    lineEndGap: toRem(LINE_END_GAP_PX),
    focusOutlineWidth: toRem(FOCUS_OUTLINE_WIDTH_PX),
    focusOutlineOffset: toRem(FOCUS_OUTLINE_OFFSET_PX),
    hoverRingGap: toRem(HOVER_RING_GAP_PX),
    hoverRingOuter: toRem(HOVER_RING_GAP_PX + HOVER_RING_WIDTH_PX),
    rootPaddingBlock: toRem(ROOT_PADDING_BLOCK_PX),
    buttonPaddingBlock: toRem(BUTTON_PADDING_BLOCK_PX),
    buttonPaddingInline: toRem(BUTTON_PADDING_INLINE_PX),
    verticalStepGap: toRem(VERTICAL_STEP_GAP_PX),
    buttonRadius:
      typeof theme.shape.borderRadius === 'number'
        ? toRem(theme.shape.borderRadius)
        : theme.shape.borderRadius,
  }
}
