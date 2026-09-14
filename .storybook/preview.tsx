import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { Decorator, Preview } from '@storybook/react-vite'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '../src/index.css'
import '../src/i18n'

import { theme } from '../src/theme'
import { viewports } from './viewports'

/** Motyw MUI + reset — dokładnie to samo otoczenie co w `src/main.tsx`. */
const withTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
)

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: viewports,
    },
    a11y: {
      test: 'todo',
    },
  },
  initialGlobals: {
    // 'responsive' = pełna szerokość okna; viewport przełącza się z paska narzędzi
    viewport: { value: 'responsive', isRotated: false },
  },
}

export default preview
