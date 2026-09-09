import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#0ea5e9' },
    grey: { 200: '#e5e7eb' },
  },
  typography: {
    fontFamily: '"Poppins", system-ui, -apple-system, sans-serif',
  },
  shape: { borderRadius: 10 },
})
