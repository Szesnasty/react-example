import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#0ea5e9' },
  },
  typography: {
    fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
  },
  shape: { borderRadius: 10 },
})
