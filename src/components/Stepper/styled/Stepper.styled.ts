import { styled } from '@mui/material'
import type { Theme } from '@mui/material'
import MuiStep, { stepClasses } from '@mui/material/Step'
import { stepButtonClasses } from '@mui/material/StepButton'
import MuiStepper, { stepperClasses } from '@mui/material/Stepper'

import { stepLineColor } from './stepper.colors'
import { STEP_SIZE_VAR, stepperSizes } from './stepper.sizes'

export const StyledStepper = styled(MuiStepper)(({ theme }) => ({
  padding: `${stepperSizes.rootPaddingBlock} 0`,

  // Lying down the steps are grid columns rather than flex items. One track sizing gives equal
  // steps in every situation MUI's flex row had to be argued into: they share out a container
  // that has a width, they settle on the widest label when the stepper is measured by its own
  // content, and they shrink rather than overflow a narrow one. `lineLength` sets the track and
  // takes over from `1fr`, which is what stops them growing.
  [`&.${stepperClasses.horizontal}`]: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: `minmax(0, var(${STEP_SIZE_VAR}, 1fr))`,
  },

  // Standing up there is usually no height to share, so a percentage resolves to `auto` and
  // nothing changes. Where the container does have one, this lets the steps share it out.
  [`&.${stepperClasses.vertical}`]: {
    boxSizing: 'border-box',
    height: '100%',
  },

  // MUI detects its tablist mode by `StepButton` identity, so the button cannot be
  // wrapped in `styled` — it is styled from here through its slot class instead.
  [`& .${stepButtonClasses.root}`]: {
    // ButtonBase resets colour but not the font, so the caption would keep the browser
    // default size and stop scaling with the root font size.
    font: 'inherit',
    // The one value taken from the host theme, which keeps it in px.
    borderRadius: theme.shape.borderRadius,
    padding: `${stepperSizes.buttonPaddingBlock} ${stepperSizes.buttonPaddingInline}`,
    margin: `-${stepperSizes.buttonPaddingBlock} -${stepperSizes.buttonPaddingInline}`,
    width: 'auto',
    // No background of its own — the hover accent lives on the circle.
    '&:hover': { backgroundColor: 'transparent' },
    '&.Mui-disabled': {
      cursor: 'default',
    },
    '&.Mui-focusVisible': {
      outline: `${stepperSizes.focusOutlineWidth} solid ${theme.palette.primary.main}`,
      outlineOffset: stepperSizes.focusOutlineOffset,
    },
  },
}))

/** A line runs from the edge of a circle to the edge of its step, where it meets its other half. */
const lineHalf = (theme: Theme) => ({
  content: '""',
  position: 'absolute' as const,
  backgroundColor: stepLineColor(theme),
})

/** Lying down both halves sit level with the middle of the circles; only their ends differ. */
const horizontalLineHalf = (theme: Theme) => ({
  ...lineHalf(theme),
  top: `calc((${stepperSizes.iconSize} - ${stepperSizes.connectorThickness}) / 2)`,
  height: stepperSizes.connectorThickness,
})

export const StyledStep = styled(MuiStep)(({ theme }) => ({
  [`&.${stepClasses.horizontal}`]: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: `0 ${stepperSizes.horizontalStepPaddingInline}`,
    // The clickable step is inline-flex and shrinks to its label, so it has to be centred here
    // or the circle drifts off the centre its half of the line starts from.
    textAlign: 'center',

    // Each step draws the half of the line on either side of its own circle, and the halves meet
    // on the boundary between two steps. Drawn this way neither half needs to know how wide its
    // neighbour is, which is what lets a step be sized purely by the grid.
    '&:not(:last-of-type)::after': {
      ...horizontalLineHalf(theme),
      left: `calc(50% + ${stepperSizes.lineInset})`,
      right: 0,
    },
    '&:not(:first-of-type)::before': {
      ...horizontalLineHalf(theme),
      left: 0,
      right: `calc(50% + ${stepperSizes.lineInset})`,
    },
  },

  [`&.${stepClasses.vertical}`]: {
    position: 'relative',
    // The same bargain as lying down, in the axis flexbox already handles well: the steps share
    // out a container tall enough to give them room, and `lineLength` caps how far they stretch.
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    height: `var(${STEP_SIZE_VAR}, ${stepperSizes.verticalStepSize})`,
    maxHeight: `var(${STEP_SIZE_VAR}, none)`,

    // The last step has no line under it, so growing it would only pad the bottom.
    '&:last-of-type': { flexGrow: 0, height: 'auto', maxHeight: 'none' },

    // MUI's own connector is a fixed-height flex item and could not span the gap between two
    // circles, so this line is drawn on the step and stretches with it.
    '&:not(:last-of-type)::before': {
      ...lineHalf(theme),
      top: `calc(${stepperSizes.iconSize} + ${stepperSizes.lineEndGap})`,
      bottom: stepperSizes.lineEndGap,
      left: stepperSizes.lineOffset,
      width: stepperSizes.connectorThickness,
    },
  },
}))
