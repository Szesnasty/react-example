import { Box, Container, Typography } from '@mui/material'

/** Punkt startowy aplikacji — miejsce na pierwszy własny komponent. */
export default function App() {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          React Example
        </Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary' }}>
          Vite + React + TypeScript + MUI + Storybook + Vitest.
        </Typography>
      </Container>
    </Box>
  )
}
