/** WCAG 2.3.3 — the movement is decoration, so it is dropped rather than replaced. */
export const reducedMotionTransitionReset = {
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}
