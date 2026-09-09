/**
 * Every size is a rem literal, with the px it renders to at a 16px root in the comment.
 *
 * They are written out rather than derived through `theme.typography.pxToRem`, which multiplies
 * by `typography.fontSize / 14` — in a theme that sets its own font size that helper would
 * quietly resize the whole component (with `fontSize: 16` a 24px circle comes out as 27.4px).
 */
export const stepperSizes = {
  /** The circle is the same size in both orientations. */
  iconSize: '1.5rem', // 24px
  /** The box the check sits in; the glyph inside it measures 8 x 5.5px. */
  checkIconSize: '0.75rem', // 12px

  connectorThickness: '0.0625rem', // 1px
  /** How far a line stops short of a circle, in both orientations. */
  lineEndGap: '0.375rem', // 6px
  /** Left edge of a vertical line: half the circle minus half the line, so it runs through the centre. */
  lineOffset: '0.71875rem', // 11.5px
  /** How far a horizontal line starts from the centre of its step: half the circle plus the end gap. */
  lineInset: '1.125rem', // 18px

  /** Breathing room between the circle and its hover ring. */
  hoverRingGap: '0.125rem', // 2px
  /** Outer edge of the hover ring, measured from the circle. */
  hoverRingOuter: '0.25rem', // 4px
  /** Kept apart from the line: a 1px focus ring would be too faint to spot. */
  focusOutlineWidth: '0.125rem', // 2px
  focusOutlineOffset: '0.125rem', // 2px

  rootPaddingBlock: '0.5rem', // 8px
  buttonPaddingBlock: '0.25rem', // 4px
  buttonPaddingInline: '0.5rem', // 8px

  /** Gap between the circle and the text beside it. */
  verticalIconGap: '0.75rem', // 12px
  /** Left edge of the step content: the circle plus that gap. */
  verticalContentIndent: '2.25rem', // 36px
  /** Space below a vertical step, which is also how far its line runs. */
  verticalStepGap: '1rem', // 16px
  /**
   * Pushes a vertical label down so the tops of its letters sit 10px below the top of the circle:
   * that 10px minus where Poppins puts a capital inside a 1rem/1.5rem line box.
   * Measured against a rendered page.
   */
  verticalLabelCapOffset: '0.228rem', // 3.65px

  horizontalLabelFontSize: '0.875rem', // 14px
  horizontalLabelLineHeight: '1.25rem', // 20px
  /** Space between the title and the caption under it. */
  horizontalLabelParagraphGap: '0.875rem', // 14px

  verticalLabelFontSize: '1rem', // 16px
  verticalLabelLineHeight: '1.5rem', // 24px
  verticalLabelParagraphGap: '0rem', // 0px
}
