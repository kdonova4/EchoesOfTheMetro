import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <App />
    
    
  </StrictMode>,
)
